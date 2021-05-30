import ComplexNumber from "./ComplexNumber"

const ComplexNumbers = ({complexNumbers, onDelete, onNumberChange}) => {
    
    return (
        <div className = 'card-body container bg-dark'>
            {complexNumbers.map((number) => (<ComplexNumber key = {number.id} complexNumber = {number} onDelete = {onDelete} onNumberChange = {onNumberChange}/>))}
        </div>
    )
}

export default ComplexNumbers
