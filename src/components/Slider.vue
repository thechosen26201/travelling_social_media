<template>
    <Carousel id="gallery" :items-to-show="1" :wrap-around="false" v-model="currentSlide">
        <Slide v-for="slide in post" :key="slide">
            <div class="carousel__item">
                <img :src="getImageUrl(slide)">
            </div>
        </Slide>
        <template #addons>
            <Navigation />
        </template>
    </Carousel>

    <Carousel id="thumbnails" :items-to-show="4" :wrap-around="true" v-model="currentSlide" ref="carousel">
        <Slide v-for="(slide, index) in post" :key="slide">
            <div class="carousel__item" @click="slideTo(index + 1 - 1)">
                <img :src="getImageUrl(slide)">
            </div>
        </Slide>
    </Carousel>
</template>
<script setup>
import { Carousel, Slide, Navigation } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';
import { ref } from 'vue';
const currentSlide = ref(0);

const slideTo = (val) => {
    currentSlide.value = val
};
const getImageUrl = (name) => {
    return new URL(name, import.meta.url).href
}
const props = defineProps({
    post: Array
})
</script>
<style lang="scss" scoped>
@use '../temp/css/pages/users/home';

// .carousel__item {
//     height: 100%;
//     width: 100%;
//     color: #fff;
//     font-size: 20px;
//     border-radius: 8px;
//     display: flex;
//     justify-content: center;
//     align-items: center;
// }

// .carousel__slide {
//     padding: 10px;
// }

// .carousel__prev,
// .carousel__next {
//     box-sizing: content-box;
//     border: 5px solid white;
// }

// #gallery .carousel__track li {
//     padding: 0;
//     max-height: 25em;
// }

// #gallery .carousel__track li:hover,
// #thumbnails .carousel__track li:hover {
//     cursor: pointer;
// }
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
.carousel__track {
    height: 100%;
    & img {
        height: 100%;
    }
}
</style>