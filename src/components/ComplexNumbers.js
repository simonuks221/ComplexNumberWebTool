import ComplexNumber from "./ComplexNumber"
import ComplexNumberResult from "./ComplexNumberResult"

const ComplexNumbers = ({complexNumbers, onDelete, onNumberChange, onMathAction, complexNumberResult}) => {
    
    return (
        <div className = 'card-body container bg-dark'>
            {complexNumbers.map((number) => (<ComplexNumber key = {number.id} complexNumber = {number} onDelete = {onDelete} onNumberChange = {onNumberChange} onMathAction = {onMathAction}/>))}
            {complexNumberResult.result ?<ComplexNumberResult complexNumberResult = {complexNumberResult}/>: null}
        </div>
    )
}

export default ComplexNumbers
