<template>
    <input @blur="validateInput" @keyup="validateInput" v-model="input" :type="type" class="form-input form-control" :placeholder="placeholder" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
    <p class="error p-0 text-danger">{{errors[placeholder]}}</p>
</template>
<style scoped>
    .error {
        font-size: 0.9rem;
    }
</style>
<script>
import {ref} from 'vue';
import useFormValidation from '../js/useFormValidation';

export default {
    name: 'InputBase',
    props: ['type', 'placeholder', 'postFix'],
    setup(props, {emit}) {
        let type = props.type,
            placeholder = props.placeholder,
            input = ref("");
        const { validateFirstNameField, validateEmailField, errors } = useFormValidation();
        const validateInput = () => {
            // Gọi tới hàm validateNameField để check lỗi
            validateFirstNameField(props.placeholder, input.value);
            validateEmailField(props.placeholder, input.value);
        };
        return {type, placeholder, input, errors, validateInput };
    }
}
</script>