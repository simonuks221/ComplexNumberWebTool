//RAFCE shortcut to paste this 
const Header = ({userName, addNewNumber}) => {
    return (
        <div className = 'container bg-dark'>
            <div className = 'row'>
                <div className = 'col-10'>
                    <h4 className = 'text-light'>Add complex numbers below</h4>
                </div>
                <div className = 'col-2'>
                    <button className = 'btn-secondary rounded' onClick = {addNewNumber}>Add number</button>
                </div>

            </div>
        </div>
    )
}

export default Header