
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
}