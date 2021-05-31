//Gets real and imaginary parts of rectangular form
export const PartitionComplex = (number) => {
    var regExRec = /^(?:(?<real>\d+(?:(?:\.\d+)?)?)?)?(?:[+\-])?(?<imaginary>\d+(?:(?:\.\d+)??)?)?[iI]$/i
    var regExExp = /^(?:(?<amplitude>\d+(?:(?:(?:\.\d+)?)))(?:e))(?<phase>(?:[+\-])?(\d+(?:\.\d+)?)?)?[iI]$/i
    var regExTime = /^(?:(?<amplitude>\d+(?:(?:(?:\.\d+)?)))(?:cos\())(?:(?<frequency>\d+(?:)(?:(?:\.\d+)?)))(?<phase>(?:[+\-])?(\d+(?:\.\d+)?)?)?(?:(\)))$/i

    var result = number.match(regExRec)
    try{
        if(result === null){//Rectangular form
            result = number.match(regExExp)

            if(result === null){//Exponential form
                result = number.match(regExTime)

                if(result === null){ //Time form
                    console.log('Error reading string')
                    return null
                }
                else{
                    var newReal = result[1] * Math.cos(result[3] * Math.PI / 180).toFixed(3)
                    var newImag = result[1] * Math.sin(result[3] * Math.PI / 180).toFixed(3)
                    console.log(newReal, newImag, 'time')
                    return [parseFloat(newReal), parseFloat(newImag)]
                }
            }
            else{ //Expoenntial
            
                var newReal = result[1] * Math.cos(result[2] * Math.PI / 180).toFixed(3)
                var newImag = result[1] * Math.sin(result[2] * Math.PI / 180).toFixed(3)
                console.log(newReal, newImag, 'exponential')
                return[parseFloat(newReal), parseFloat(newImag)]
            }
        }
        else{ //Rectangular
            return [parseFloat(result[1]), parseFloat(result[2])]
        }
    }
    catch(error){
        console.log('Error reading string')
        return null
    }
}

//Reconstructs complex number from real and imag parts to rectangular form
export const ReconstructComplex = (parts, form) => { //Parts[0] - real, 1 - imag
    var newAmplitude = Math.sqrt(Math.pow(parts[0], 2) + Math.pow(parts[1], 2))
    var newPhase = Math.atan(parts[1]/parts[0]) * 180 / Math.PI
    switch(form){
        default:
            console.log('Bad reconstrucion form selected') 
            return ''
        case 'rectangular':
            console.log('here', parts)
            return parts[0].toFixed(3) + (parts[1] > 0? '+': '') + parts[1].toFixed(3) + 'i'
        case 'exponential':
            return newAmplitude.toFixed(3) + 'e' + newPhase.toFixed(3) + 'i'
        case 'time':
            return newAmplitude.toFixed(3) + 'cos(w' + (newPhase > 0 ? '+': '') + newPhase.toFixed(3) + ')'
    }
}

export const AddComplex = (number1, number2) => {
    var complex1 = PartitionComplex(number1)
    var complex2 = PartitionComplex(number2)
    console.log(complex1, complex2)
    return ReconstructComplex(parseInt(complex1[0]) + parseInt(complex2[0]), parseInt(complex1[1]) + parseInt(complex2[1]))
}

export const SubtractComplex = (number1, number2) => {
    var complex1 = PartitionComplex(number1)
    var complex2 = PartitionComplex(number2)
    return ReconstructComplex(parseInt(complex1[0]) - parseInt(complex2[0]), parseInt(complex1[1]) - parseInt(complex2[1]))
}