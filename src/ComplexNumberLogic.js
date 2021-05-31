//Gets real and imaginary parts of rectangular form
const PartitionComplex = (number) => {
    var regExRec = /^(?:(?<real>\d+(?:(?:\.\d+)?(?:e[+\-]\d+)?)?)?(?:[+\-]))?(?<imaginary>\d+(?:(?:\.\d+)?(?:e[+\-]\d+)?)?)?[iI]$/i
    var result = number.match(regExRec)
    return [result[1], result[2]]
}

//Reconstructs complex number from real and imag parts to rectangular form
const ReconstructComplex = (realPart, imagPart) => {
    return realPart + (realPart > 0? '+': '-') + imagPart + 'i'
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