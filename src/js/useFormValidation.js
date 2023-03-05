import {reactive} from 'vue';
const errors = reactive({});

export default function useFormValidation() {
    const validateNameField = (fieldName, fieldValue) => {
        errors[fieldName] = fieldValue === "" ? `The field ${fieldName} is required` : "";
        // const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        // const test = (() => {
        //     return fieldValue.test(re)
        // })
        // switch (fieldValue) {
        //     case !fieldValue:
        //         errors[fieldName] = `The field ${fieldName} is required`
        //         break;
        //     case test() == false:
        //         errors[fieldName] = `The field ${fieldName} is invalid`
        //         break;
        //     default:
        //         errors[fieldName] = '';
        //         break;
        // }
    }
    return { errors, validateNameField }
}
