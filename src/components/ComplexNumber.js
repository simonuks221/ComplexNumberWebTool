import {FaTimes} from 'react-icons/fa'

const ComplexNumber = ({complexNumber, onDelete, onNumberChange}) => {
    return (
        <div className = 'card bg-dark'>
            <div className = {complexNumber.correct ?'bg-success card-body row': 'bg-danger card-body row'}>
                <div className = 'col-3'>
                    <input type = 'text' className = 'form-control' placeholder ='In rectangular form' value = {complexNumber.rectangularForm} onChange = {(e) => onNumberChange(e.target.value, complexNumber.id, 0)}/>
                </div>
                <div className = 'col-3'>
                    <input type = 'text' className = 'form-control' placeholder ='In exponential form' value = {complexNumber.exponentialForm} onChange = {(e) => onNumberChange(e.target.value, complexNumber.id, 1)}/>
                </div>
                <div className = 'col-3'>
                    <input type = 'text' className = 'form-control' placeholder ='In time form' value = {complexNumber.timeForm} onChange = {(e) => onNumberChange(e.target.value, complexNumber.id, 2)}/>
                </div>
                <div className = 'col-3'>
                    <button className = 'btn-danger float-end' onClick = {() => onDelete(complexNumber.id)}><FaTimes className = 'my-1 mx-0'/></button>
                </div>
            </div>
        </div>
    )
}

export default ComplexNumber
