<template>
    <div class="container-fluid">
        <div class="row row-cols-1 row-cols-md-3 g-4">
            <div class="col col-md-6" v-for="(des, index) in list_destination" :key="des.id" @click="openModal(des)">
                <div class="card h-100">
                    <img :src="des.images[0]" class="card-img-top" :alt="des.name">
                    <div class="card-body">
                        <h5 class="card-title">{{ des.name }}</h5>
                        <p class="card-text">{{ des.content }}</p>
                    </div>
                    <div class="card-footer">
                        <small class="text-body-secondary">{{convertTimestampToDate(des.created_date)}}</small>
                        <small><el-rate 
                        v-model="rate" 
                        :texts="['Rất tệ', 'Kém', 'Bình thường', 'Tốt', 'Rất hài lòng']" 
                        show-text/></small>
                    </div>
                </div>
            </div>
        </div>
        <ModalForm v-if="isModalOpen" @closeModal="closeModal"/>
    </div>
</template>
<script setup>
import ModalForm from '../components/ModalForm.vue';
import 'vue3-carousel/dist/carousel.css';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/vue-fontawesome';
import { onMounted, ref, watch } from 'vue';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import store from '../store/store';
import {ElRate} from 'element-plus';

const isModalOpen = ref(false);
const list_destination = ref([]);
const props = defineProps({cityCode: String});
const rate = ref(0);
onMounted( () => {
    fectchDestinations();
})
watch(() => props.cityCode, (code) => {
    console.log(code);
    list_destination.value = [];
    fectchDestinations();
});
const openModal = async (des) => {
    console.log(des);
    store.dispatch('setModal', des);
    isModalOpen.value = true;
}
const closeModal = (close) => {
    isModalOpen.value = close;
}

const fectchDestinations = async () => {
    // const querySnapshot = await getDocs(collection(db, "destinations"));
    const q = query(collection(db, "destinations"), where("cityCode", "==",  Number(props.cityCode)));
    const querySnapshot = await getDocs(q);
    let i = 0;
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        list_destination.value[i] = { id: doc.id, ...doc.data() };
        i++;
    });
};
const convertTimestampToDate = (time) => {
    //time should be server timestamp seconds only
    let date = time.toDate();
    let mm = date.getMonth();
    let dd = date.getDate();
    let yyyy = date.getFullYear();

    date = dd + '/' + mm + '/' + yyyy + ' ' + date.toLocaleTimeString();
    return date;
}
</script>
<style lang="scss" scoped>

.card:hover {
    cursor: pointer;
}
.card-text:last-child {
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 7;
    -webkit-box-orient: vertical;
}
</style>