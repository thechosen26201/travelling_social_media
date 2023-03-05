<template>
    <div class="container-fluid">
        <div class="row">
            <div class="left-side col-12 col-lg-6">
                <div class="logo">
                    <!-- <img src="../temp/css/assets/images/user_img/logo3.png" alt="Social book"> -->
                </div>
                <h1>{{ firstName }}</h1>
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
    @media (min-width: 1200px) {
        .container-fluid {
            height: 100vh;
        }
    }
</style>
<script>
    import 'bootstrap/dist/css/bootstrap.css';
    import 'bootstrap/dist/js/bootstrap.bundle.js';
    import '@fortawesome/vue-fontawesome';
    import {mapState} from 'vuex';
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
        
        computed: {
            // mapState({
            // // arrow functions can make the code very succinct!
            // firstName: state => state.name,
            // })
            
            // ...mapState({
            //     firstName: (state) => console.log(state.name),
            // }),

            // firstName() {
            //     return store.state.name;
            // },

            // ...mapState(['name']),
            // firstName() {
            //     return this.name;
            // },

            ...mapState('auth', {
                firstName: (state) => state.name,
            }),
            
        }
    }
</script>