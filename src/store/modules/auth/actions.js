import { SIGNUP_ACTION } from "../../storeconstants";
import axios from 'axios';

export default {
    [SIGNUP_ACTION](context, payload){
        let postData = {
            email: payload.email,
            password: payload.password,
            returnSecureToken: true,
        }
        let response = axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDT5wm4oPfy7gUnuLQSQrWf-0Hyg0lR28U`, postData)
        console.log(response);
    }
};