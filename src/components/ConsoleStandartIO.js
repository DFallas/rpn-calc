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

const greetingMessage = '> Welcome to web console type help for available commands'
const availableComands = [' ', 'clear : clear up console', 'q: quit current program', 'calc: start RPN calculator']
const calcAvailableComands = [`valid operants : ${Object.keys(VALID_OPERANTS).toString()}`, 'q: quit current program']
const ConsoleStandartIO=({
    OnRead
})=>{

    const [readBuffer, setReadBuffer] = useState('');
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

    const resetIO = ()=>{
        setReadBuffer([]);
        inputRef.current.value='';
    }

    const onInnputChange = (event)=>{
        const  value = event.target.value;
        const { keyCode } = event;
        if(keyCode===13){
            console.log("on enter",{readBuffer})
            switch (value) {
                case 'q':
                    setRunning('standartIO')
                    exitMessage();
                    resetIO();
                    inputRef.current.value='';
                    break;
                case 'clear':
                    setHistory([]);
                    resetIO();
                    break;
                case 'help':
                    displayHelp();
                    resetIO();
                    break;
                case 'calc':
                    setRunning('calc')
                    const messages = []
                    messages.push('... Starting NPN Calculator');
                    cOut(messages)
                    resetIO();
                    break;
            
                default:
                    if(running === 'calc'){
                        processInput(readBuffer);
                    } else{
                        if(readBuffer.length > 0) comandNotFound(readBuffer)
                    } 
                    setReadBuffer([]);
                    inputRef.current.value='';
                    break
            }
        } 
    
    }

    return(
        <>
        <Box flexDirection={"column"} sx={{textAlign:'left'}}>
        <Typography  sx={{p:0,m:0, fontFamily: 'Source Code Pro'}}><pre>{greetingMessage}</pre></Typography>
        {history.length > 0 && (
            history.map((item)=><Typography  sx={{p:0,m:0, fontFamily: 'Source Code Pro'}}>{item}</Typography>)
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
        </Box>
        
        </>
    )
}

export default ConsoleStandartIO