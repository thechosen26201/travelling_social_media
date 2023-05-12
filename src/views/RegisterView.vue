<template lang="">
    <div class="container-fluid">
        <div class="row">
            <div class="left-side col-12 col-lg-6">
                <div class="logo">
                    <!-- <img src="../temp/css/assets/images/user_img/logo3.png" alt="Social book"> -->
                </div>
                <!-- <h1>{{ firstName }}</h1> -->
                <div class="title">
                    Nơi tìm hiểu và chia sẻ những vị trí, trải nghiệm với những địa điểm du lịch                   
                </div>
            </div>
            <form class="right-side col-12 col-lg-6" @submit.prevent="handleSubmit">
                <div class="container">
                    <div class="row">
                        <div class="col-6 p-0"><InputBase :reference="'last_name'" :type="'text'" :placeholder="'Họ'" @sendString="sendString"/></div>
                        <div class="col-6 ps-1 pe-0"><InputBase :reference="'first_name'" :type="'text'" :placeholder="'Tên'" @sendString="sendString"/></div>
                    </div>
                </div>
                <InputBase :reference="'Email'" :type="'text'" :placeholder="'Email'" @sendString="sendString"/>
                <InputBase :reference="'Password'" :type="'password'" :placeholder="'Mật khẩu'" @sendString="sendString"/>
                <!-- <input type="text" class="form-input form-control" placeholder="Email" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                <input type="password" class="form-input form-control" placeholder="Mật khẩu" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"> -->
                <!-- <InputBase :type="'text'" :placeholder="'Nhập lại mật khẩu'"/>
                <InputBase :type="'date'" :placeholder="'Ngày sinh'"/> -->
                <button type="submit" class="sign-up-btn form-btn btn btn-success" :disabled="!isValid && Object.keys(data).length !== 0">Đăng ký</button>
                <button type="button" class="sign-in-btn form-btn btn btn-primary" @click="moveToLogin">Đã có tài khoản? Đăng nhập ngay</button>
            </form>
        </div>
    </div>
</template>
<script>
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import InputBase from '../components/InputBase.vue';
import {useRouter} from 'vue-router';
import {reactive, ref, onMounted} from 'vue';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import 'vue3-toastify/dist/index.css';
import { toast } from 'vue3-toastify';
import { setDoc, doc, Timestamp } from '@firebase/firestore';
import { db } from '../firebase';

export default {
    components: {InputBase},
    setup() {
        const data = reactive({ });
        const isValid = ref(true);
        const router = useRouter();
        const auth = getAuth();
        
        const moveToLogin = () => {
            router.push('/');
        }
        const sendString = (sendString) => {
            let obj = Object.assign({}, sendString);
            if(obj['type'] === 'Họ' && obj['condition']) {
                data.lastName = obj['value'];
                isValid.value = true;
            }
            else if (obj['type'] === 'Tên' && obj['condition']) {
                data.firstName = obj['value'];
                isValid.value = true;
            }
            else if (obj['type'] === 'Email' && obj['condition']) {
                data.email = obj['value'];
                isValid.value = true;
            }
            else if (obj['type'] === 'Mật khẩu' && obj['condition']) {
                data.password = obj['value'];
                isValid.value = true;
            }
            else {
                isValid.value = false;
            }
        }
        const handleSubmit = async () => {   
            try {
                if (isValid.value && Object.keys(data).length !== 0) {
                    const response = await createUserWithEmailAndPassword(auth, data.email, data.password);
                    // Cập nhật lại tên
                    await updateProfile(auth.currentUser, {
                        displayName: data.firstName,
                    });
                    await setDoc(doc(db, "users", auth.currentUser.uid), {
                        firstName: data.firstName,
                        lastName: data.lastName,
                        displayName: data.firstName,
                        email: auth.currentUser.email,        
                        emailVerified: false,
                        photoURL: null,
                        phoneNumber: auth.currentUser.phoneNumber,
                        role: 1,
                        created_at: Timestamp.fromDate(new Date()),
                    });
                    console.log(auth.currentUser);
                    notify('Đăng ký tài khoản mới thành công', 'success', 3000);
                    return response;
                } else {
                    throw new Error('Vui lòng kiểm tra lại các trường !');
                } 
            } catch (error) {
                // console.log(error.message);
                notify(error.message, 'error', 3000);
            }         
        };
        const notify = (message, type, duration) => {
            toast(message, {
                autoClose: duration,
                type: type
            });
        }
        return {router, moveToLogin, sendString, handleSubmit, isValid, data}
    }
}
</script>
<style scoped lang="scss">
    .container-fluid {
        background-color: #f0f2f5;
        display: flex;
        align-items: center;
        height: 100vh;
        justify-content: center;
    }
    .logo {
        background: url('../temp/css/assets/images/user_img/logo3.png') left / contain no-repeat;
        height: 4rem;
        margin-bottom: 1rem;
    }
    .left-side {
        display: flex;
        justify-content: center;
        flex-direction: column;
        & img {
            max-width: 100%;
        }
    }
    .right-side {
        border-radius: 2%;
        background-color: #fff;
        box-shadow: 0 0 1.6em #ccc;
        max-width: 400px;
        margin: 0 auto;
        padding: 12px;
    }
    .sign-in-form {
        padding: 1rem;
    }
    input.form-input {
        /* border: none; */
        outline: none;
        &:focus {
            box-shadow: none;
        }
    }
    input.form-input, .sign-up-btn {
        margin-bottom: 1rem;
    } 
    .sign-in-btn, .sign-up-btn {
        width: 100%;
    }
    button {
        font-weight: bold;
        padding: 0.5rem;
    }
    a.link-forgot-password {
        text-decoration: none;
        &:hover {
            text-decoration: underline;
        }
    }
    /**Responsive */
    @media (max-width: 576px) {
        .right-side {
            margin: 1rem auto;
        }
    }

    @media (min-width: 576px) and (max-width: 768px){
        .right-side {
            margin: 1rem auto;
        }
        .logo {
            background-position-x: center;
        }
        .title {
            text-align: center;
        }
    }
    @media (min-width: 1200px) {
        .container-fluid {
            height: 100vh;
        }
    }
</style>