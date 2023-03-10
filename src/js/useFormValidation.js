import {reactive} from 'vue';
import useValidators from './validators';
import resource from './resource';

const errors = reactive({});

export default function useFormValidation() {
    // Destructuring hàm useValidators
    const {isEmpty, isEmail, isPassword} = useValidators();
    // Destructuring hàm resource
    const {EMAIL, PASSWORD} = resource();

    const validateFirstNameField = (fieldName, fieldValue) => {
        try {
            errors[fieldName] = isEmpty(fieldName, fieldValue);
            return errors[fieldName] === '';
        } catch (error) {
            console.log(error);
        }
    };

    const validateEmailField = (fieldName, fieldValue) => {
        try {
            if (fieldName === EMAIL) {
                errors[fieldName] = !fieldValue ? isEmpty(fieldName, fieldValue) : isEmail(fieldName, fieldValue)
                return errors[fieldName] === '';
            } 
        } catch (error) {
            console.log(error);
        }
    }
    const validatePasswordField = (fieldName, fieldValue) => {
        try {
            if (fieldName === PASSWORD) {
                errors[fieldName] = !fieldValue ? isEmpty(fieldName, fieldValue) : isPassword(fieldName, fieldValue)
                return errors[fieldName] === '';
            } 
        } catch (error) {
            console.log(error);
        }
    }
    return { errors, validateFirstNameField, validateEmailField, validatePasswordField}
}
