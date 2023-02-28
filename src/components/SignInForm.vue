<template>
    <div class="row sign-in-form">
        <slot></slot>
    </div>
</template>

<script>
    import 'bootstrap/dist/css/bootstrap.css';
    import 'bootstrap/dist/js/bootstrap.bundle.js';
    export default {
        name: 'SignInForm'
    }
</script>