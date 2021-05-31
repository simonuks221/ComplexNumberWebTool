import Header from "./components/Header"
import ComplexNumbers from "./components/ComplexNumbers"

import {AddComplex, SubtractComplex, PartitionComplex, ReconstructComplex} from './ComplexNumberLogic'

import 'bootstrap/dist/css/bootstrap.min.css'

import {} from 'react-bootstrap'

import {useState} from 'react' //A so called Hook

function App() {
  const name = "Simonas"
  const [mathResult, setResult] = useState({result: false, rectangularForm: '', exponentialForm: '', timeForm: '',});

  const [complexNumbers, setNumbers] = useState([])
  

//Delete number
const deleteNumber  = (id) => {
  setNumbers(complexNumbers.filter((number) => (number.id !== id)))
}

//ChangeComplexNUmberVlaue
const changeNumber = (newNumber, id, numberType) =>{
  var result = PartitionComplex(newNumber)
  switch(numberType){
    default:
      break;
    case 0:
      if (result === null){
        setNumbers(complexNumbers.map((number) => (number.id === id ?{... number, rectangularForm: newNumber, exponentialForm: '', timeForm: '', correct: false} : number)))
      }
      else{
        setNumbers(complexNumbers.map((number) => (number.id === id ?{... number, rectangularForm: newNumber, exponentialForm: ReconstructComplex(result, 'exponential'), timeForm: ReconstructComplex(result, 'time'), correct: true} : number)))
      }
      break;
    case 1:
      if (result === null){
        setNumbers(complexNumbers.map((number) => (number.id === id ?{... number, rectangularForm: '', exponentialForm: newNumber, timeForm: '', correct: false} : number)))
      }
      else{
        setNumbers(complexNumbers.map((number) => (number.id === id ?{... number, rectangularForm: ReconstructComplex(result, 'rectangular'), exponentialForm: newNumber, timeForm: ReconstructComplex(result, 'time'), correct: true} : number)))
      }
      break;
    case 2:
      if (result === null){
        setNumbers(complexNumbers.map((number) => (number.id === id ?{... number, rectangularForm: '', exponentialForm: '', timeForm: newNumber, correct: false} : number)))
      }
      else{
        setNumbers(complexNumbers.map((number) => (number.id === id ?{... number, rectangularForm: ReconstructComplex(result, 'rectangular'), exponentialForm: ReconstructComplex(result, 'exponential'), timeForm: newNumber, correct: true} : number)))
      }
      break;
  }
}

//Addition substraction operations
const MathAction = (mathAction, complexNumber) => {
  if(complexNumber.correct){
    complexNumber.mathAction = mathAction
    if(mathAction === 0){ //Action is discarded
      
    }
    else{ //Action is added
      complexNumber.mathAction = mathAction
      var answer = ''
      var numbersUsed = 0
      switch(mathAction){
        default:
          break;
        case 1: //Addition
          complexNumbers.forEach(function(number){
            if(number.mathAction === mathAction){
              if(numbersUsed === 0){
                answer = number.rectangularForm
                numbersUsed++
              }
              else{
                answer = AddComplex(answer, number.rectangularForm)
              }
            }
          })
          break;
        case 2: //Subtraction
          complexNumbers.forEach(function(number){
            if(number.mathAction === mathAction){
              if(numbersUsed === 0){
                answer = number.rectangularForm
                numbersUsed++
              }
              else{
                answer = SubtractComplex(answer, number.rectangularForm)
              }
            }
          })
          break;
      }

    setResult({...mathResult, rectangularForm: answer, result: true})
    }
  }
}

//AddComplexNumber
const AddNewNumber = () => {
  const newNumber = {id: complexNumbers.length + 1,
    rectangularForm: '', exponentialForm: '', timeForm: '', correct: false, mathAction: 0,
}
  setNumbers([...complexNumbers, newNumber])
}

  return (
    <div className="App bg-dark">
      <div className = 'container bg-dark'>
        <div className = 'row'>
          <div className = 'col-12'>
            <h1 className = 'h1 text-center bg-dark text-light'>Complex number converter</h1>
          </div>
        </div>
      </div>
      <Header userName = {name} addNewNumber = {AddNewNumber}/>
      <div className = 'card mx-5 my-2 bg-dark'>
        {complexNumbers.length > 0 ?<ComplexNumbers complexNumbers = {complexNumbers} onDelete = {deleteNumber} onNumberChange = {changeNumber} onMathAction = {MathAction} complexNumberResult = {mathResult}/>
        : <p className = 'text mx-2 my-2 text-light'>No numbers, press above to add</p> }
       </div>
    </div>
  );
}

export default App;