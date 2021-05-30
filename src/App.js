import Header from "./components/Header"
import ComplexNumbers from "./components/ComplexNumbers"

import 'bootstrap/dist/css/bootstrap.min.css'

import {} from 'react-bootstrap'

import {useState} from 'react' //A so called Hook

function App() {
  const name = "Simonas"

  const [complexNumbers, setNumbers] = useState([])

//Delete number
const deleteNumber  = (id) => {
  setNumbers(complexNumbers.filter((number) => (number.id !== id)))
}

//ChangeComplexNUmberVlaue
const changeNumber = (newNumber, id, numberType) =>{
  var regExRec = /^(?:(?<real>\d+(?:(?:\.\d+)?(?:e[+\-]\d+)?)?)?(?:[+\-]))?(?<imaginary>\d+(?:(?:\.\d+)?(?:e[+\-]\d+)?)?)?[iI]$/i
  var regExExp = /^(?:(?<amplitude>\d+(?:(?:(?:\.\d+)?)))(?:e))(?<phase>(?:[+\-])?(\d+(?:\.\d+)?)?)?[iI]$/i
  var regExTime = /^(?:(?<amplitude>\d+(?:(?:(?:\.\d+)?)))(?:cos\())(?:(?<frequency>\d+(?:)(?:(?:\.\d+)?)))(?<phase>(?:[+\-])?(\d+(?:\.\d+)?)?)?(?:(\)))$/i
  var result
  switch(numberType){
    default:
      break;
    case 0:
      result = newNumber.match(regExRec)
      if (result === null){
        setNumbers(complexNumbers.map((number) => (number.id === id ?{... number, rectangularForm: newNumber, exponentialForm: '', timeForm: '', correct: false} : number)))
      }
      else{
        var newAmplitude = Math.sqrt(Math.pow(result[1], 2) + Math.pow(result[2], 2))
        var newPhase = Math.atan(result[2]/result[1]) * 180 / Math.PI
        var newExponentialForm = newAmplitude.toFixed(3) + 'e' + newPhase.toFixed(3) + 'i'
        var newTimeForm = newAmplitude.toFixed(3) + 'cos(w' + (newPhase > 0 ? '+': '') + newPhase.toFixed(3) + ')'
        setNumbers(complexNumbers.map((number) => (number.id === id ?{... number, rectangularForm: newNumber, exponentialForm: newExponentialForm, timeForm: newTimeForm, correct: true} : number)))

      }

      break;
    case 1:
      result = newNumber.match(regExExp)
      if (result === null){
        setNumbers(complexNumbers.map((number) => (number.id === id ?{... number, rectangularForm: '', exponentialForm: newNumber, timeForm: '', correct: false} : number)))
      }
      else{
        var newRectangularForm = result[1] * Math.cos(result[2] * Math.PI / 180).toFixed(3) + (result[1] > 0 ? '+': '') + result[1] * Math.sin(result[2] * Math.PI / 180).toFixed(3) + 'i'
        var newTimeForm = result[1] + 'cos(w' + (result[2] > 0 ? '+': '-') + result[2] + ')'
        setNumbers(complexNumbers.map((number) => (number.id === id ?{... number, rectangularForm: newRectangularForm, exponentialForm: newNumber, timeForm: newTimeForm, correct: true} : number)))
      }
      break;
    case 2:
      result = newNumber.match(regExTime)
      if (result === null){
        setNumbers(complexNumbers.map((number) => (number.id === id ?{... number, rectangularForm: '', exponentialForm: '', timeForm: newNumber, correct: false} : number)))
      }
      else{
        var newRectangularForm = result[1] * Math.cos(result[3] * Math.PI / 180).toFixed(3) + (newAmplitude > 0 ? '+': '') + result[1] * Math.sin(result[3] * Math.PI / 180).toFixed(3) + 'i'
        var newExponentialForm = result[1] + 'e' + result[3] + 'i'
        setNumbers(complexNumbers.map((number) => (number.id === id ?{... number, rectangularForm: newRectangularForm, exponentialForm: newExponentialForm, timeForm: newNumber, correct: true} : number)))
      }
      break;
  }
  //setNumbers(complexNumbers.map((number) => (number.id === id ?{... number, value: newNumber} : number)))
}

//AddComplexNumber
const AddNewNumber = () => {
  const newNumber = {id: complexNumbers.length + 1,
    rectangularForm: '', exponentialForm: '', timeForm: '', correct: false,
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
        {complexNumbers.length > 0 ?<ComplexNumbers complexNumbers = {complexNumbers} onDelete = {deleteNumber} onNumberChange = {changeNumber}/>
        : <p className = 'text mx-2 my-2 text-light'>No numbers, press above to add</p> }
       </div>
       <div className = 'bg-primary d-flex flex-column'>

       </div>
    </div>
  );
}

export default App;