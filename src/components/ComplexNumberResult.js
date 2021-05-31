const ComplexNumberResult = ({complexNumberResult}) => {
    return (
        <div className = 'card bg-dark'>
            <div className = 'bg-info card-body row rounded'>
                <div className = 'col-3'>
                    <input type = 'text' className = 'form-control' placeholder ='In rectangular form' value = {complexNumberResult.rectangularForm} readonly/>
                </div>
                <div className = 'col-3'>
                    <input type = 'text' className = 'form-control' placeholder ='In exponential form' value = {complexNumberResult.exponentialForm} readonly/>
                </div>
                <div className = 'col-3'>
                    <input type = 'text' className = 'form-control' placeholder ='In time form' value = {complexNumberResult.timeForm} readonly/>
                </div>
            </div>
        </div>
    )
}

export default ComplexNumberResult
