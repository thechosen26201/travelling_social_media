<template>
    <div class="container-fluid">
        <div class="row">
            <div class="left-side col-12 col-lg-6">
                <div class="logo">
                    <!-- <img src="../temp/css/assets/images/user_img/logo3.png" alt="Social book"> -->
                </div>
                <div class="title">
                    Nơi tìm hiểu và chia sẻ những vị trí, trải nghiệm với những địa điểm du lịch
                </div>
            </div>

            <form class="right-side col-12 col-lg-6" @submit.prevent="handleResetSubmit">
                <InputBase :type="'text'" :placeholder="'Email'" @sendString="sendString"/>
                <button type="submit" class="sign-in-btn form-btn btn btn-primary" :disabled="!isValid">Gửi email lấy lại mật khẩu</button>
                <button type="button" class="sign-up-btn form-btn btn btn-success" @click="() => router.push('/')">Quay về trang đăng nhập</button>
            </form>
        </div>
    </div>
</template>
<script setup>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import 'bootstrap/dist/css/bootstrap.css';
import InputBase from '../components/InputBase.vue';
import { ref, reactive } from 'vue';
import {auth} from '../firebase/index';
import { sendPasswordResetEmail } from "firebase/auth";
import router from '../router';

const data = reactive({ });
const isValid = ref(true);

const handleResetSubmit = async () => {
    if (data.email && isValid) {
        try {
            await sendPasswordResetEmail(auth, data.email);
            console.log('Gửi yêu cầu thành công');
            notify('Gửi yêu cầu thành công, vui lòng truy cập email và làm theo hướng dẫn', 'success');
        } catch (error) {
            notify('Email không tồn tại', 'error');
            console.log(error.message);
        }
    }
    else {
        notify('Vui lòng kiểm tra lại email', 'error');
    }
    
};
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
};

const notify = (message, type, duration = 3000) => {
    toast(message, {
        autoClose: duration,
        type: type
    });
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
    padding: 0;

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

input.form-input {
    margin-bottom: 1rem;
    width: 100%;
}

.form-btn {
    width: 100%;
}

button {
    font-weight: bold;
    padding: 0.5rem;
    &.sign-in-btn {
        margin-bottom: 1em;
    }
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

@media (min-width: 576px) and (max-width: 768px) {
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

@media (min-width: 768px) and (max-width: 992px) {
    .title {
        text-align: center;
    }

    .logo {
        background-position-x: center;
    }
}

@media (min-width: 1200px) {
    .container-fluid {
        height: 100vh;
    }
}
</style>