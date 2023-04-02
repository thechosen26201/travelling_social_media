<template lang="">
    <div class="modal">
        <div class="sub-blog">
            <div class="sub-blog__title flex">
                <div></div>
                <div class="title">Bài viết của khanhnguyen</div>
                <div class="sub-blog__icon--exit" @click="sendEventClose">
                    <font-awesome-icon icon="fa-solid fa-xmark" class="xmark-icon"/>
                </div>
            </div>
            <div class="scrollable">
                <div class="sub-blog__header flex">
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
                </div>
                <div class="sub-blog__post">
                    <div class="sub-blog__post-slider">
                        <Carousel id="gallery" :items-to-show="1" :wrap-around="false" v-model="currentSlide">
                            <Slide v-for="(slide, index) in images" :key="index">
                                <div class="carousel__item">
                                    <img :src="getImageUrl(slide['path'])">
                                </div>
                            </Slide>
                            <template #addons>
                                <Navigation />
                            </template>
                        </Carousel>

                        <Carousel
                            id="thumbnails"
                            :items-to-show="4"
                            :wrap-around="true"
                            v-model="currentSlide"
                            ref="carousel">
                            <Slide v-for="(slide, index) in images" :key="slide">
                                <div class="carousel__item" @click="slideTo(index + 1 - 1)">
                                    <img :src="getImageUrl(slide['path'])">
                                </div>
                            </Slide>
                        </Carousel>
                    </div>
                </div>
                <div class="sub-blog__reaction flex">
                    <div class="sub-blog__reaction--left flex">
                        <div class="sub-blog-reaction-icon flex">
                            <div class="like"></div>
                            <div class="love"></div>
                        </div>
                        <div class="reaction__quantity">12K</div>
                    </div>
                    <div class="sub-blog__reaction--right flex">
                        <div class="comment__quantity">30 comments</div>
                        <div class="shares__quantity">10 shares</div>
                    </div>
                </div>
                <div class="sub-blog__features flex">
                    <div class="sub-blog__features-thumbs-up feature">
                        <div>
                            <font-awesome-icon icon="fa-solid fa-thumbs-up" />
                            Like
                        </div>
                    </div>
                    <div class="sub-blog__features-comments feature">
                        <div>
                            <font-awesome-icon icon="fa-solid fa-comment" />
                            Comment
                        </div>
                    </div>
                    <div class="sub-blog__features-share feature">
                        <div>
                            <font-awesome-icon icon="fa-solid fa-share" />
                            Share
                        </div>
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

export default {
    components: {Carousel, Slide, Navigation},

    setup(props, {emit}) {
        let currentSlide = ref(0);
        const images = [
            {id_image: 1, path: "../temp/css/assets/images/user_img/feed-image-1.png"},
            {id_image: 2, path: "../temp/css/assets/images/user_img/feed-image-2.png"},
            {id_image: 3, path: "../temp/css/assets/images/user_img/feed-image-3.png"}
        ];
        const slideTo = (val) => {
            currentSlide.value = val
        };
        const getImageUrl = (name) => {
            return new URL(name, import.meta.url).href
        }
        const sendEventClose = () => {
            emit('closeModal', false)
        }
        return {slideTo, currentSlide, images, getImageUrl, sendEventClose};
    }
}
</script>
<style lang="scss" scoped>
    @use '../temp/css/abstracts' as ab;
    @use '../temp/css/layouts/admin/subBlog';
    @use '../temp/css/layouts/admin/test';
    @use '../temp/css/components/scrollbar';
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
        padding: 0;
    }
    #gallery .carousel__track li:hover, #thumbnails .carousel__track li:hover{
        cursor: pointer;
    }
</style>