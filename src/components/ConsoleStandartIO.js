import { InputBase, Typography } from '@mui/material';
import { Box, InputAdornment } from '@mui/material';
import { useState, useRef } from 'react';
import useRpnCalc from '../hooks/useRpnCalc';

const VALID_OPERANTS = {
    '-' : (left, right) => left - right,
    '+': (left, right) =>  left + right,
    '/': (left , right) => {
        if(right === 0)return NaN 
        else return left / right
    },
    '*': (left, right) => left * right,
};

const availableComands = [' ', 'clear : clear up console', 'q: quit current program', 'calc: start RPN calculator']
const calcAvailableComands = [`valid operants : ${Object.keys(VALID_OPERANTS).toString()}`, 'q: quit current program']
const ConsoleStandartIO=({
    OnRead
})=>{

    const [history, setHistory] = useState([]);
    const [running, setRunning] = useState(null);
    const inputRef = useRef();

    const cOut = (messages)=>{
        if (!messages) return;
        if (typeof(messages) === 'string')
            setHistory([...history, messages])
        else {
            const tempHistory = [...history]
            messages.forEach((message)=>tempHistory.push(message));
            setHistory([...tempHistory])
        }
    }

    const { processInput }  = useRpnCalc({supportedOperators: VALID_OPERANTS , cOut});
    
    const displayHelp = ()=>{
        switch (running) {
            case 'calc':
                cOut(calcAvailableComands);
                break;
        
            default:
                cOut(availableComands);
                break;
        }
    } 

    const exitMessage = ()=>{
        switch (running) {
            case 'calc':
                cOut('... Exiting RPN Calc');
                break;
            default:
                break;
        }
    }

    const comandNotFound = (input)=>{
        cOut(` comand not found : [${input}]`);
    }
    const getDir = ()=>{
        let dir = '';
        switch (running) {
            case 'calc':
                dir = 'rpn-calc/>'
                break;
        
            default:
               dir = '>'
                break;
        }

        return dir;
    }

    const onInnputChange = (event)=>{
        const  value = event.target.value.toLowerCase();
        const { keyCode } = event;
        if(keyCode===13){
            switch (value) {
                case 'q':
                    setRunning('standartIO')
                    exitMessage();
                    break;
                case 'clear':
                    setHistory([]);
                    break;
                case 'help':
                    displayHelp();
                    break;
                case 'calc':
                    if(running !== 'calc'){
                        setRunning('calc')
                        cOut('... Starting NPN Calculator')
                    } else {comandNotFound(value)}
                    break;
            
                default:
                    if(running === 'calc'){
                        processInput(value);
                    } else{
                        if(value.length > 0) comandNotFound(value)
                    } 
                    
                    inputRef.current.value='';
                    break
            }
            inputRef.current.value='';
        } 
    
    }

    const keyBase = Date.now();

    return(
        <Box sx={{
                textAlign:'left', 
                marginLeft: 2, 
                display: "flex",
                flexDirection: 'row',
                justifyContent:'center' 
            }}>
            <div>
            <Typography  sx={{p:0,m:0, fontFamily: 'Source Code Pro'}}>Welcome to web console</Typography>
            <Typography  sx={{p:0,m:0, fontFamily: 'Source Code Pro'}}>Project Developed by David Fallas, for reference visit <a href="https://github.com/DFallas/rpn-calc">rpn-calc</a></Typography>
            <br/>
            <br/>
            <Typography  sx={{p:0,m:0, fontFamily: 'Source Code Pro'}}>You can type help for available commands</Typography>
            {history.length > 0 && (
                history.map((item, idx)=><Typography key={`${keyBase}-${idx}`} sx={{p:0,m:0, fontFamily: 'Source Code Pro'}}>{item}</Typography>)
            )}
            <InputBase
            autoFocus
            sx={{fontFamily: 'Source Code Pro'}}
            outline='none'
            fullWidth
            onKeyUp={(value)=>onInnputChange(value)}
            inputRef={inputRef}
            startAdornment={<InputAdornment sx={{fontFamily: 'Source Code Pro', color:'inherit'}} position="start"> {getDir()}  </InputAdornment>}
            />
            </div>

        </Box>
    )
}

export default ConsoleStandartIO