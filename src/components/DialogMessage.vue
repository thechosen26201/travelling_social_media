<template>
    <div class="dialog">
        <div class="dialog__wrapper">
            <div class="dialog__header flex">
                <div class="title">
                    <h6>Thông báo</h6>
                </div>
                <div @click="close"><font-awesome-icon icon="fa-solid fa-xmark" class="xmark-icon" /></div>
            </div>
            <div class="dialog__body">
                Bạn có muốn xóa bình luận này?
            </div>
            <div class="dialog__footer flex">
                <button type="button" class="btn btn-light" @click="close">Hủy</button>
                <button type="button" class="btn btn-danger" @click="confirm">Đồng ý</button>
            </div>
        </div>
    </div>
</template>
<script setup>
import 'bootstrap/dist/css/bootstrap.css';
const emit = defineEmits(['closeDialog', 'confirmDialog']);
const close = () => {
    emit('closeDialog', false);
}
const confirm = () => {
    emit('confirmDialog');
    close();
}
</script>
<style scoped lang="scss">
@use '../temp/css/abstracts' as ab;

.flex {
    @include ab.flex;
}

.dialog {
    @include ab.modal(0, 0, 0, 0);
    &__wrapper {
        position: absolute;
        top: 25%;
        left: 40%;
        background-color: ab.$base-color;
        padding: 1em;
    }
    &__header {
        justify-content: space-between;
    }
    &__body {

    }
    &__footer {
        justify-content: flex-end;
    }
    button {
        margin-left: 1em;
        min-width: 5em;
    }
}
@media (max-width: 576px) { 
    .dialog {
        &__wrapper {
            left: 15%;
        }
    }
}
</style>