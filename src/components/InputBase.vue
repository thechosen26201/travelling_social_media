<template>
    <div class="input-wrapper">
        <input :id="reference" :ref="reference" @blur="validateInput" @keyup="validateInput" v-model="input" :type="type" class="form-input form-control" :placeholder="placeholder" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
        <p class="error p-0 text-danger">{{errors[placeholder]}}</p>
    </div>
</template>
<style scoped>
    .error {
        font-size: 0.9rem;
        position: absolute;
        top: 2.5em;
    }
    .input-wrapper {
        position: relative;
    }
    input {
        margin-bottom: 1.5em;
    }
</style>
<script>
import {ref, onMounted} from 'vue';
import useFormValidation from '../js/useFormValidation';
import resource from '../js/resource';

export default {
    name: 'InputBase',
    props: ['type', 'placeholder', 'postFix', 'reference'],
    emits: ['sendString'],
    setup(props, {emit}) {
        let type = props.type,
            placeholder = props.placeholder,
            input = ref(""), reference = props.reference;
        const {EMAIL, PASSWORD, FIRST_NAME, LAST_NAME} = resource();
        const { validateFirstNameField, validateEmailField, validatePasswordField, errors } = useFormValidation();

        onMounted(() => {
            switch (reference) {
                case 'last_name':
                const input = document.querySelector(`#${reference}`);
                    input.focus();
                    break;
                default:
                    break;
            }
        });
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
        return {type, placeholder, input, errors, validateInput, reference };
    }
}
</script>