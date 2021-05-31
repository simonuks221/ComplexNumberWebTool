const ComplexNumberResult = ({complexNumberResult}) => {
    return (
        <div className = 'card bg-dark'>
            <div className = 'bg-info card-body row rounded'>
                <div className = 'col-1'>
                    <h3 className = 'text-light'>Result: </h3>
                </div>
                <div className = 'col-3'>
                    <input type = 'text' className = 'form-control' placeholder ='In rectangular form' value = {complexNumberResult.rectangularForm} readOnly/>
                </div>
                <div className = 'col-3'>
                    <input type = 'text' className = 'form-control' placeholder ='In exponential form' value = {complexNumberResult.exponentialForm} readOnly/>
                </div>
                <div className = 'col-3'>
                    <input type = 'text' className = 'form-control' placeholder ='In time form' value = {complexNumberResult.timeForm} readOnly/>
                </div>
            </div>
        </div>
    )
}

export default ComplexNumberResult
