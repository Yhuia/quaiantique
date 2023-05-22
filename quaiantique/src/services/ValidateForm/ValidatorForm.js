
export class ValidatorForm {
    static min(value,min){
        if(value.length < min){
            return `Le champ doit contenir au minimum ${min} lettre(s)`
        }
    }
    static max(value,max){
        if(value.length > max){
            return `Le champ doit contenir au maximum ${max} lettre(s)`
        }
    }
    static numberValid(value,min = null){
        if(value < min ){
            return `Le nombre ne peut pas être infèrieur à  ${min}`
        } else if (isNaN(value) ){
            return `Ne peut recevoir que des nombres et non ${value}`
        } else if(value.length < 1){
            return `Champs Obligatoire`
        }
    }
}