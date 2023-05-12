import regex from "./regex";

export default function useValidators() {
    // const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const {regexEmail, regexPassword} = regex();
    const isEmpty = (fieldName, fieldValue) => {
        return !fieldValue ? `${fieldName} không được để trống` : "";
    };
    const minLength = (fieldName, fieldValue, min) => {
        return fieldValue.length < min ? `The ${fieldName} field must be atleast ${min} characters long` : "";
    };
    const isEmail = (fieldName, fieldValue) => {
        // debugger
        return regexEmail.test(fieldValue) ? "" : `${fieldName} không đúng định dạng`;
    }
    const isPassword = (fieldName, fieldValue) => {
        // debugger;
        return regexPassword.test(fieldValue) ? "" : `${fieldName} phải có ít nhất 6 ký tự, 1 ký tự số, 1 ký tự in hoa, 1 ký tự thường, không chưa khoảng trống`;
    }
    const timeSince = (date) => {
        try {
            let seconds = Math.floor((new Date() - date) / 1000);
    
            let interval = seconds / 31536000;
    
            if (interval > 1) {
                return Math.floor(interval) + " năm trước";
            }
            interval = seconds / 2592000;
            if (interval > 1) {
                return Math.floor(interval) + " tháng trước";
            }
            interval = seconds / 86400;
            if (interval > 1) {
                return Math.floor(interval) + " ngày trước";
            }
            interval = seconds / 3600;
            if (interval > 1) {
                return Math.floor(interval) + " giờ trước";
            }
            interval = seconds / 60;
            if (interval > 1) {
                return Math.floor(interval) + " phút trước";
            }
            return Math.floor(seconds) + " giây trước";
        } catch (error) {
            console.log(error);
        }
    }
    return { isEmpty, minLength, isEmail, isPassword, timeSince }
}