<template>
    <div class="modal-custom">
        <div class="sub-blog">
            <div class="sub-blog__title flex">
                <div></div>
                <div class="title">{{ modal_content.name }}</div>
                <div class="sub-blog__icon--exit" @click="sendEventClose">
                    <font-awesome-icon icon="fa-solid fa-xmark" class="xmark-icon"/>
                </div>
            </div>
            <div class="scrollable">
                <!-- <div class="sub-blog__header flex">
                    <div class="sub-blog__header--left flex">
                        <div class="sub-blog__header-avatar"></div>
    
                        <div class="sub-blog__header-info">
                            <div class="sub-blog__header-username">Khánh Nguyễn</div>
                            <div class="sub-blog__header-created-date">1 giờ trước</div>
                        </div>
                    </div>
    
                    <div class="sub-blog__header--right flex">
                        <div class="sub-blog__icon--option">
                            <i class="fa-solid fa-ellipsis"></i>
                        </div>
                    </div>
                </div> -->
                <div>{{ modal_content.content }}</div>
                <div class="sub-blog__post" v-if="image_length > 0">
                    <div class="sub-blog__post-slider">
                        <Slider :post="modal_content.images"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {ref, onMounted} from 'vue';
import { Carousel, Slide, Navigation } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css'
import '@fortawesome/vue-fontawesome';
import store from '../store/store';
import Slider from './Slider.vue';

export default {
    components: {Carousel, Slide, Navigation, Slider},

    setup(props, {emit}) {
        let currentSlide = ref(0);
        const modal_content = ref({});
        const image_length = ref(0);

        const images = [
            {id_image: 1, path: "../temp/css/assets/images/user_img/feed-image-1.png"},
            {id_image: 2, path: "../temp/css/assets/images/user_img/feed-image-2.png"},
            {id_image: 3, path: "../temp/css/assets/images/user_img/feed-image-3.png"}
        ];
        onMounted(() => {
            modal_content.value = store.getters.getModal;
            image_length.value = store.getters.getModal.images.length;
        });
        const slideTo = (val) => {
            currentSlide.value = val
        };
        const getImageUrl = (name) => {
            return new URL(name, import.meta.url).href
        }
        const sendEventClose = () => {
            emit('closeModal', false)
        }
        return {slideTo, currentSlide, images, getImageUrl, sendEventClose, modal_content, image_length};
    }
}
</script>
<style lang="scss" scoped>
    @use '../temp/css/abstracts' as ab;
    @use '../temp/css/layouts/admin/subBlog';
    @use '../temp/css/layouts/admin/test';
    @use '../temp/css/components/scrollbar';
    .card-text {
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 7;
        -webkit-box-orient: vertical;
    }
    .modal-custom {
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        z-index: 111;
    }
    *.flex {
        @include ab.flex;
    }
    .column {
        padding: 0;
    }

    .carousel__item img{
        width: 100%;
        border-radius: 8px;   
    }
    li.carousel__slide {
        padding: 8px;  
    }
    #gallery .carousel__track li{
        // padding: 0;
    }
    #gallery .carousel__track li:hover, #thumbnails .carousel__track li:hover{
        cursor: pointer;
    }
</style>