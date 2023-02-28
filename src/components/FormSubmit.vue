<template>
    <!-- <slot></slot> -->
    <ChildForm v-if="this.isSignIn">
        <input type="text" class="form-input form-control" placeholder="Email" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
        <input type="password" class="form-input form-control" placeholder="Mật khẩu" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
        <button class="sign-in-btn form-btn btn btn-primary">Đăng nhập</button>
        <a href="" class="link-forgot-password mb-2">Quên mật khẩu?</a>
        <button class="sign-up-btn form-btn btn btn-success" @click="openSignUpForm">Đăng ký</button>
    </ChildForm>

    <ChildForm v-else>
        <input type="text" class="form-input form-control" placeholder="Họ" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
        <input type="text" class="form-input form-control" placeholder="Tên" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
        <input type="text" class="form-input form-control" placeholder="Email" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
        <input type="password" class="form-input form-control" placeholder="Mật khẩu" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
        <input type="password" class="form-input form-control" placeholder="Nhập lại mật khẩu" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
        <input type="date" class="form-input form-control" name="" id="">
        <button class="sign-up-btn form-btn btn btn-success">Đăng ký</button>
        <button class="sign-in-btn form-btn btn btn-primary" @click="openSignUpForm">Đã có tài khoản? Đăng nhập ngay</button>
    </ChildForm>
</template>
<style scoped lang="scss">
    .container-fluid {
        background-color: #f0f2f5;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    // .logo {
    //     background: url('../temp/css/assets/images/user_img/logo3.png') left / contain no-repeat;
    //     height: 4rem;
    //     margin-bottom: 1rem;
    // }
    .right-side {
        border-radius: 2%;
        background-color: #fff;
        box-shadow: 0 0 1.6em #ccc;
    }
    .sign-in-form {
        padding: 1rem;
    }
    .right-side {
        max-width: 400px;
        margin: 0 auto;
    }
    input.form-input {
        /* border: none; */
        outline: none;
        &:focus {
            box-shadow: none;
        }
    }
    input.form-input, .form-btn {
        margin-bottom: 1rem;
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
</style>
<script>
import ChildForm from './ChildForm.vue';

export default {
    name: "FormSubmit",
    components: { ChildForm },
    data() {
        return {
            isSignIn: true
        }
    },
    methods: {
        openSignUpForm() {
            return this.isSignIn = !this.isSignIn;
        }
    },
}
</script>