import regex from "./regex";

export default function useValidators() {
    // const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const {regexEmail, regexPassword} = regex();
    const isEmpty = (fieldName, fieldValue) => {
        return !fieldValue ? "The " + fieldName + " field is required" : "";
    };
    const minLength = (fieldName, fieldValue, min) => {
        return fieldValue.length < min ? `The ${fieldName} field must be atleast ${min} characters long` : "";
    };
    const isEmail = (fieldName, fieldValue) => {
        // debugger
        return regexEmail.test(fieldValue) ? "" : `The ${fieldName} field is invalid`;
    }
    const isPassword = (fieldName, fieldValue) => {
        // debugger;
        return regexPassword.test(fieldValue) ? "" : `${fieldName} phải có ít nhất 6 ký tự, 1 ký tự số, 1 ký tự in hoa, 1 ký tự thường, không chưa khoảng trống`;
    }
    return { isEmpty, minLength, isEmail, isPassword }
}