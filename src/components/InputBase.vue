<template>
    <input @blur="validateInput" @keyup="validateInput" v-model="input" :type="type" class="form-input form-control" :placeholder="placeholder" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
    <p class="error p-0 text-danger">{{errors[placeholder]}}</p>
</template>
<style>

</style>
<script>
import { getCurrentInstance, ref} from 'vue';
import useFormValidation from '../js/useFormValidation';

export default {
    name: 'InputBase',
    props: ['type', 'placeholder', 'postFix'],
    setup(props, {emit}) {
        const {proxy} = getCurrentInstance(); 
        let type = props.type,
            placeholder = props.placeholder,
            input = ref("");
        const { validateNameField, errors } = useFormValidation();
        const validateInput = () => {
            // Gọi tới hàm validateNameField để check lỗi
            validateNameField(props.placeholder, input.value);
        };
        return {type, placeholder, input, errors, validateInput };
    }
}
</script>