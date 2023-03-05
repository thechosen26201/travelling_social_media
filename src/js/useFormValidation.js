import {reactive} from 'vue';
import useValidators from './validators';

const errors = reactive({});

export default function useFormValidation() {
    const {isEmpty, isEmail} = useValidators();

    const validateFirstNameField = (fieldName, fieldValue) => {
        errors[fieldName] = isEmpty(fieldName, fieldValue);
    };

    const validateEmailField = (fieldName, fieldValue) => {
        if (fieldName === 'Email') {
            errors[fieldName] = !fieldValue ? isEmpty(fieldName, fieldValue) : isEmail(fieldName, fieldValue)
        } 
    }
    return { errors, validateFirstNameField, validateEmailField}
}
