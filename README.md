# Getting Started with IO Console
This project was created by David Fallas, for comments reach at [devFallas.io@gmail.com](devFallas.io@gmail.com)
 
 
## NPN Calculator
 
This project was intended to do a simulation of a console that runs a Reverse Polish Notation (rpn) Calculator program.
If you don't know what a Reverse Polish Notation Calc is, visit [this video!!!](https://www.youtube.com/watch?v=7edoVNuwGvc)
 
Main purpose was to abstract the read,  calculation and output operations so that we may have different interfaces to provide the input of for the calculations and we cann write out in different interfaces.
 
To accomplish this we build a ConsoleStandartIO that will be responsible for reading the input from the user also, it provides a cOut method interface so that others programs can use it to write outputs to the user.
 
The calculation of the operations was encapsulated in the useRpnCalc so that we can use that logic within any different inputs, let it be console input or other kind of interface input.
 
For this specific case 1 component and 1 react hook were created. Given tha fact that there is plenty of ways we can approach this exercise I decided to include React and MUI libraries just to have a grasp on how will these frameworks behave to implement such an exercise.
 
### ConsoleStandadartIO Component
 
This component will manage the buffer of incoming messages it'll read until and 'enter' key is type
Once after this it'll handle the input and match it with any of the available commands:
* clear : clear up console
* q: quit current program
* calc: start RPN calculator
* help: display available commands
 
Depending on a running variable console component can run other pseudo programs for example our rpn calculator
If a program is running the console will pass the input to that specific program until the 'q' command is executed
to exit.
 
This is accomplished by a switch that will be reading from the input on the browser that will work as our standard input reader.
 
### useRpnCalc Hook
 
This hook exposes a processInput method interface, which manages the operations registered by the input.
It also has a reference for the standard output which a 'cOut' method in case it needs to write something out to the external program/user
 
The hook is initialized wiht the list of supported operations, which is defined outside to have more flexibility on the supported operations for each instance on the function.

The supported operation object is a hash that contains a key for each operator and a function as value that executes
that operator, in this way we can directly reference the operator's function once we identify that is a valid operation,
such as `operators[typedOperator](leftOp, rightOp)`;
 
This custom hook manages the sate of the calculation queue, and if the input is trying to process is valid.
 
For this initial version valid operators are : + - * /
 
### What could be better?
 
Well there's always space for improvement, making things more flexible, more reusable and more extensible
In this particular case I already have in mind some improvements for the current state:
-  Read and Write operations could be much more robust to accomplish a better user experience
- The approach of giving the calculator a cOut method is right now to coupled with the    expected output for the console. In other words the interface (inputs and outputs) of the cOut function should be abstracted a bit more for it to work with other interfaces besides conosle.
 - Definitely a typed command memory when pressing the up arrow key  is always useful on a terminal, which is not present in this exercise.

## Unit Testing
Test cases where implemented  with  React-Test Library  which comes by default when scaffolding an app  with Create Rreact App, for more information  see [React Testing  Library  Doc](https://testing-library.com/docs/)
 
The main approach for testing was to mock the event or series of events on the application and then looking for the expected output string on the console output.
### ConsoleStandartIO
For the console component the following scenarios where tested:
-  `q`
- `calc`
- `help`
### useCalcHook
For the calculation hook the following scenarios where tested
 
- inline typing operations
- complex (several operands  and operators in  the same input) where
-  inline and complex operation combined
- invalid operant testing
-  invalid expression testing.
## Available Scripts
 
In the project directory, you can run:
 
### `npm start`
 
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
 
The page will reload when you make changes.\
You may also see any lint errors in the console.
 
### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
 
### `npm run build`
 
Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
 
The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
 
See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
 
### Deployment
 
This app has been deployed along with Vercel continous deployment support.
For more information see []
 