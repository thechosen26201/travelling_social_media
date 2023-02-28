<template>
    <div class="container-fluid">
        <div class="row">
            <div class="left-side col-12 col-lg-6">
                <div class="logo">
                    <!-- <img src="../temp/css/assets/images/user_img/logo.png" alt="Social book"> -->
                </div>
                <div class="title">
                    Nơi tìm hiểu và chia sẻ những vị trí, trải nghiệm với những địa điểm du lịch
                </div>
            </div>
            <form class="right-side col-12 col-lg-6">
                <FormSubmit/>
            </form>
        </div>
    </div>
</template>
<style scoped lang="scss">
    .container-fluid {
        background-color: #f0f2f5;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .logo {
        background: url('../temp/css/assets/images/user_img/logo3.png') left / contain no-repeat;
        height: 4rem;
        margin-bottom: 1rem;
    }
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
            // margin-top: 1rem;
            // max-width: none;
            // padding: 1rem;
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
    import 'bootstrap/dist/css/bootstrap.css';
    import 'bootstrap/dist/js/bootstrap.bundle.js';
    import '@fortawesome/vue-fontawesome';
    // import {FormSubmit} from '../components/test.js';
    import FormSubmit from '../components/FormSubmit.vue';

    export default {
        name: 'LoginView',
        components: {
            FormSubmit
        },
        data() {
            return {
               
            }
        },
    }
</script>