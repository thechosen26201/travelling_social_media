<template>
    <input @blur="validateInput" @keyup="" v-model="input" :type="type" class="form-input form-control" :placeholder="placeholder" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
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
import resource from '../js/resource';

export default {
    name: 'InputBase',
    props: ['type', 'placeholder', 'postFix'],
    emits: ['sendString'],
    setup(props, {emit}) {
        let type = props.type,
            placeholder = props.placeholder,
            input = ref("");
        const {EMAIL, PASSWORD, FIRST_NAME, LAST_NAME} = resource();
        const { validateFirstNameField, validateEmailField, validatePasswordField, errors } = useFormValidation();
        const validateInput = () => {
            // Gọi tới hàm validateNameField để check lỗi
            if(props.placeholder === FIRST_NAME || props.placeholder === LAST_NAME) {
                let validated = validateFirstNameField(props.placeholder, input.value);
                emit('sendString', {value: input.value, type: props.placeholder, condition: validated});
            }
            else if (props.placeholder === EMAIL) {
                let validated = validateEmailField(props.placeholder, input.value);
                emit('sendString', {value: input.value, type: props.placeholder, condition: validated});
            }
            else if (props.placeholder === PASSWORD) {
                let validated = validatePasswordField(props.placeholder, input.value);
                emit('sendString', {value: input.value, type: props.placeholder, condition: validated});
            }
            // emit('sendString', {value: input.value, type: props.placeholder});
        };
        return {type, placeholder, input, errors, validateInput };
    }
}
</script>