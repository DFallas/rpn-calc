import { useState, useEffect, useRef } from "react"

const useRpnCalc = ({supportedOperators, cOut})=>{
 const [operators, setOperators] = useState()
 const calcStackRef = useRef();

 useEffect(() => {
    calcStackRef.current = [];
}, []);

 useEffect(()=>{
    setOperators({...supportedOperators});
 }, [supportedOperators])

 const calc = (operator, stack)=>{
    const currentStack =[...stack]
     let result = '';
     let error = false
     const rightOp = parseFloat(currentStack.pop()) 
     const leftOp = parseFloat(currentStack.pop())
     result = operators[`${operator}`](leftOp, rightOp);
     if(Number.isNaN(result)) error = true;
     return {result, currentStack, error};
 }

 const isValidOperant =  (input)=> !Number.isNaN(Number.parseFloat(input));
 const isValidOperator = (input)=> {
     return Object.keys(operators).toString().indexOf(input) >= 0
    };
 
 const processSingleInput = (input)=>{
    if(isValidOperator(input)){
         const {result, currentStack, error} = calc(input, calcStackRef.current);
         if (!error) calcStackRef.current = [...currentStack, result] 
         else calcStackRef.current=[];
         return error ? 'unprocesable entity'  :  result;
         
     }
     else{
         if(isValidOperant(input)){
            calcStackRef.current = [...calcStackRef.current, input];
             return input
         } else{
             return 'Invalid Operant'
         }
     } 
}

const processInput = (input) =>{
    if(input.length > 0){
        const readBuffer =  input.split(' ').filter(item => item);
        let result = '';
        if(readBuffer.length === 1){
            result = processSingleInput(readBuffer[0])
        } else{
            readBuffer.some(item => {
                 result = processSingleInput(item);
                 console.log('process several inp', {result})
                 if (result === 'unprocesable entity') return true
                 else return false;
               
            });
        }
        cOut([`rpn-calc/>${input}`, result]);
    }
}

 return {
     calc,
     isValidOperant,
     isValidOperator,
     processSingleInput,
     processInput,
 }
}

export default useRpnCalc;