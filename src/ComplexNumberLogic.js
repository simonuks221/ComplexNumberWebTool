//Gets real and imaginary, amplitude, phase parts
export const PartitionComplex = (number) => {
    var regExRec = /^(?:(?<real>(?:[-])?\d+(?:(?:\.\d+)?)?(?!i))?)?(?<imaginary>(?:[+\-])?\d+(?:\.\d+)?)?[iI]$/i
    var regExExp = /^(?:(?<amplitude>\d+(?:(?:(?:\.\d+)?)))?(?:e))(?<phase>(?:[+\-])?(\d+(?:\.\d+)?)?)?[iI]$/i
    var regExTime = /^(?:(?<amplitude>(?:[+\-])?\d+(?:(?:(?:\.\d+)?)))?(?:cos\())(?:(?<frequency>[0-9w]+(?:(?:\.\d+)?)))(?<phase>(?:[+\-])?(\d+(?:\.\d+)?)?)?(?:(\)))$/i

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
                    var newReal = (Number.isNaN(parseFloat(result[1]))? 0: parseFloat(result[1])) * Math.cos((Number.isNaN(parseFloat(result[3]))? 0: parseFloat(result[3])) * Math.PI / 180).toFixed(3)
                    var newImag = (Number.isNaN(parseFloat(result[1]))? 0: parseFloat(result[1])) * Math.sin((Number.isNaN(parseFloat(result[3]))? 0: parseFloat(result[3])) * Math.PI / 180).toFixed(3)
                    return [parseFloat(newReal), parseFloat(newImag), (Number.isNaN(parseFloat(result[1]))? 0: parseFloat(result[1])), (Number.isNaN(parseFloat(result[3]))? 0: parseFloat(result[3]))]
                }
            }
            else{ //Expoenntial
                console.log((Number.isNaN(parseFloat(result[1]))? 0: parseFloat(result[1])))
                var newReal = (Number.isNaN(parseFloat(result[1]))? 0: parseFloat(result[1])) * Math.cos((Number.isNaN(parseFloat(result[2]))? 0: parseFloat(result[2])) * Math.PI / 180).toFixed(3)
                var newImag = (Number.isNaN(parseFloat(result[1]))? 0: parseFloat(result[1])) * Math.sin((Number.isNaN(parseFloat(result[2]))? 0: parseFloat(result[2])) * Math.PI / 180).toFixed(3)
                return[parseFloat(newReal), parseFloat(newImag), (Number.isNaN(parseFloat(result[1]))? 0: parseFloat(result[1])), (Number.isNaN(parseFloat(result[2]))? 0: parseFloat(result[2]))]
            }
        }
        else{ //Rectangular
            var newReal = (Number.isNaN(parseFloat(result[1]))? 0: parseFloat(result[1]))
            var newImag = (Number.isNaN(parseFloat(result[2]))? 0: parseFloat(result[2]))
            return [newReal, newImag]
        }
    }
    catch(error){
        console.log('Error reading string')
        return null
    }
}

//Reconstructs complex number from real and imag parts to rectangular form
export const ReconstructComplex = (parts, form) => { //Parts[0] - real, 1 - imag, 2-amplitude, 3-phase
    var newAmplitude = Math.sqrt(Math.pow(parts[0], 2) + Math.pow(parts[1], 2))
    var newPhase = Math.atan(parts[1]/parts[0]) * 180 / Math.PI
    switch(form){
        default:
            console.log('Bad reconstrucion form selected: ', form) 
            return ''
        case 'rectangular':
            return parseFloat(parts[0].toFixed(3)) + (parts[1] > 0? '+': '') + parseFloat(parts[1].toFixed(3)) + 'i'
        case 'exponential':
            if(parts.length > 2){
                return parseFloat(parts[2].toFixed(3)) + 'e' + parseFloat(parts[3].toFixed(3)) + 'i'
            }
            else{
                return parseFloat(newAmplitude.toFixed(3)) + 'e' + parseFloat(newPhase.toFixed(3)) + 'i'
            }
        case 'time':
            if(parts.length > 2){
                return parseFloat(parts[2].toFixed(3)) + 'cos(w' + (parts[3] > 0 ? '+': '') + parseFloat(parts[3].toFixed(3)) + ')'
            }
            else{
                return parseFloat(newAmplitude.toFixed(3)) + 'cos(w' + (newPhase > 0 ? '+': '') + parseFloat(newPhase.toFixed(3)) + ')'
            }
    }
}

export const AddComplex = (number1, number2) => {
    var complex1 = PartitionComplex(number1)
    var complex2 = PartitionComplex(number2)
    return ReconstructComplex([parseInt(complex1[0]) + parseInt(complex2[0]), parseInt(complex1[1]) + parseInt(complex2[1])], 'rectangular')
}

export const SubtractComplex = (number1, number2) => {
    var complex1 = PartitionComplex(number1)
    var complex2 = PartitionComplex(number2)
    return ReconstructComplex([parseInt(complex1[0]) - parseInt(complex2[0]), parseInt(complex1[1]) - parseInt(complex2[1])], 'rectangular')
}