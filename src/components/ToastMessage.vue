<template>
    <div class="toast show align-items-center position-absolute" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
            <ToastContent v-if="isError">
                <div class="toast-body">
                    <font-awesome-icon icon="fa-solid fa-circle-xmark" />
                    {{ setToastMessage }}
                </div>
            </ToastContent>

            <ToastContent v-else>
                <div class="toast-body">
                    <font-awesome-icon icon="fa-solid fa-circle-check" />
                    {{ setToastMessage }}
                </div>
            </ToastContent>
            <button type="button" class="btn-close me-2 m-auto" aria-label="Close" @click="closeToast"></button>
        </div>
    </div>
</template>
<style scoped>
    .toast-body {
        font-size: 1em;
    }
    svg.fa-circle-xmark {
        color: red;
    }
    svg.fa-circle-check {
        color: #198754;
    }
</style>
<script>
import ToastContent from './ToastContent.vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import '@fortawesome/vue-fontawesome';
export default {
    components: {ToastContent},
    props: ['propsMessage', 'typeMessage'],
    // props: {
    //     show: {
    //         type: Boolean
    //     }
    // },
    data() {
        return {
            toastMessage: this.propsMessage,
            isError: this.typeMessage
        }
    },
    methods: {
        
    },
    computed: {
        setToastMessage() {
            return this.toastMessage = this.propsMessage;
        }
    }
    
}
</script>
