<template>
    <!-- <slot></slot> -->
    <SignInForm v-if="this.isSignIn">
        <input type="text" class="form-input form-control" placeholder="Email" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
        <input type="password" class="form-input form-control" placeholder="Mật khẩu" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
        <button class="sign-in-btn form-btn btn btn-primary">Đăng nhập</button>
        <a href="" class="link-forgot-password mb-2">Quên mật khẩu?</a>
        <button class="sign-up-btn form-btn btn btn-success" @click="openSignUpForm">Đăng ký</button>
    </SignInForm>

    <SignInForm v-else>
        <input type="text" class="form-input form-control" placeholder="Email" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
        <input type="password" class="form-input form-control" placeholder="Mật khẩu" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
        <button class="sign-up-btn form-btn btn btn-success">Đăng ký</button>
    </SignInForm>
</template>

<script>
import SignInForm from './SignInForm.vue';

export default {
    name: "FormSubmit",
    components: { SignInForm },
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