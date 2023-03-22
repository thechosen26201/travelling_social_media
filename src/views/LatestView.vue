<template>
    <div class="status-field-container write-post-container" v-for="index in 3" :key="index">
        <div class="user-profile-box">
            <div class="user-profile">
                <img src="../temp/css/assets/images/user_img/profile-pic.png" alt="">
                <div>
                    <p> Alex Carry</p>
                    <small>August 13 1999, 09.18 pm</small>
                </div>
            </div>
            <div>
                <a href="#"><i class="fas fa-ellipsis-v"></i></a>
            </div>
        </div>
        <div class="status-field">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis dolores praesentium dicta
                laborum nihil accusantium odit laboriosam, sed sit autem! <a href="#">#This_Post_is_Better!!!!</a>
            </p>
            <!-- <div class="sub-blog__post">
                <div class="sub-blog__post-slider">

                    <div class="mySlides" ref="mySlides">
                        <div class="numbertext">1 / 6</div>
                        <img src="../temp/css/assets/images/user_img/feed-image-1.png" style="width:100%">
                    </div>

                    <div class="mySlides" ref="mySlides">
                        <div class="numbertext">2 / 6</div>
                        <img src="../temp/css/assets/images/user_img/feed-image-1.png" style="width:100%">
                    </div>



                    <a class="prev" @click="plusSlides(-1)">❮</a>
                    <a class="next" @click="plusSlides(1)">❯</a>

                    <div class="row">
                        <div class="column">
                            <img ref="demo" class="demo cursor" src="../temp/css/assets/images/user_img/feed-image-1.png"
                                style="width:100%" @click="currentSlide(1)" alt="The Woods">
                        </div>
                        <div class="column">
                            <img ref="demo" class="demo cursor" src="../temp/css/assets/images/user_img/feed-image-1.png"
                                style="width:100%" @click="currentSlide(2)" alt="Cinque Terre">
                        </div>
                        <div class="column">
                            <img ref="demo" class="demo cursor" src="../temp/css/assets/images/user_img/feed-image-1.png"
                                style="width:100%" @click="currentSlide(3)" alt="Cinque Terre">
                        </div>
                        <div class="column">
                            <img ref="demo" class="demo cursor" src="../temp/css/assets/images/user_img/feed-image-1.png"
                                style="width:100%" @click="currentSlide(4)" alt="Cinque Terre">
                        </div>
                        <div class="column">
                            <img ref="demo" class="demo cursor" src="../temp/css/assets/images/user_img/feed-image-1.png"
                                style="width:100%" @click="currentSlide(5)" alt="Cinque Terre">
                        </div>
                        <div class="column">
                            <img ref="demo" class="demo cursor" src="../temp/css/assets/images/user_img/feed-image-1.png"
                                style="width:100%" @click="currentSlide(6)" alt="Cinque Terre">
                        </div>
                        <div class="column">
                            <img ref="demo" class="demo cursor" src="../temp/css/assets/images/user_img/feed-image-1.png"
                                style="width:100%" @click="currentSlide(7)" alt="Cinque Terre">
                        </div>
                        <div class="column">
                            <img ref="demo" class="demo cursor" src="../temp/css/assets/images/user_img/feed-image-1.png"
                                style="width:100%" @click="currentSlide(8)" alt="Cinque Terre">
                        </div>
                        <div class="column">
                            <img ref="demo" class="demo cursor" src="../temp/css/assets/images/user_img/feed-image-1.png"
                                style="width:100%" @click="currentSlide(9)" alt="Cinque Terre">
                        </div>
                        <div class="column">
                            <img ref="demo" class="demo cursor" src="../temp/css/assets/images/user_img/feed-image-1.png"
                                style="width:100%" @click="currentSlide(10)" alt="Cinque Terre">
                        </div>
                        <div class="column">
                            <img ref="demo" class="demo cursor" src="../temp/css/assets/images/user_img/feed-image-1.png"
                                style="width:100%" @click="currentSlide(11)" alt="Cinque Terre">
                        </div>
                        <div class="column">
                            <img ref="demo" class="demo cursor" src="../temp/css/assets/images/user_img/feed-image-1.png"
                                style="width:100%" @click="currentSlide(12)" alt="Cinque Terre">
                        </div>
                    </div>
                </div>
            </div> -->
            <div class="sub-blog__post">
                <div class="sub-blog__post-slider">
                    <Carousel id="gallery" :items-to-show="1" :wrap-around="false" v-model="currentSlide">
                        <Slide v-for="(slide, index) in listPost" :key="index">
                            <div class="carousel__item">
                                <img :src="getImageUrl('../temp/css/assets/images/user_img/feed-image-1.png')">
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
                        ref="carousel"
                    >
                        <Slide v-for="slide in 10" :key="slide">
                            <div class="carousel__item" @click="slideTo(slide - 1)">{{ slide }}</div>
                        </Slide>
                    </Carousel>
                </div>
            </div>
        </div>
        <div class="post-reaction">
            <div class="activity-icons">
                <div><img src="../temp/css/assets/images/user_img/like.png" alt="">120</div>
                <div><img src="../temp/css/assets/images/user_img/comments.png" alt="">52</div>
                <div><img src="../temp/css/assets/images/user_img/share.png" alt="">35</div>
            </div>
            <div class="post-profile-picture">
                <img src="../temp/css/assets/images/user_img/profile-pic.png " alt=""> <i class=" fas fa-caret-down"></i>
            </div>
        </div>
        <div class="post-list-comment border-secondary-subtle">
            <div class="user__comment d-flex align-item-start">
                <div class="user-profile avatar">
                    <img src="../temp/css/assets/images/user_img/profile-pic.png" alt="">
                </div>
                <div class="comment__block">
                    <h6 class="username m-0"> Khanh Nguyen</h6>
                    <div class="comment">
                        Cai nay hay day
                    </div>
                    <div class="response-features d-flex">
                        <p>Thích</p>
                        <p class="ms-2">Phản hồi</p>
                        <div class="ms-2 created-date">10 giờ trước</div>
                    </div>
                    <div class="sub-comment d-flex">
                        <div class="user-profile avatar">
                            <img src="../temp/css/assets/images/user_img/profile-pic.png" alt="">
                        </div>
                        <textarea style="resize: none;" class="form-control" id="exampleFormControlTextarea1" rows="3"
                            placeholder="Viết bình luận công khai"></textarea>
                    </div>
                    <!-- Reply -->
                    <!-- <CommentBlock/> -->
                </div>
            </div>
            <CommentBlock :commentList="commentList"/>
            
        </div>
        <div class="post-comment-input border-secondary-subtle">
            <div class="comment__input">
                <textarea v-model="comment" style="resize: none;" class="form-control" id="exampleFormControlTextarea1" rows="3"
                    placeholder="Viết bình luận công khai" @keyup.enter="postComment"></textarea>
            </div>
        </div>
    </div>
</template>
<script>
import {onMounted, ref, computed, reactive } from 'vue';
import modalSlider from '../js/modalSlider'
import CommentBlock from '../components/CommentBlock.vue';
import { Carousel, Slide, Navigation } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css'

export default {
    name: 'LatestView',
    components: {CommentBlock, Carousel, Slide, Navigation,},
    setup(props) {
        let comment = ref('');
        let listPost = reactive([
            {id: 1, path: "../temp/css/assets/images/user_img/feed-image-1.png"},
            {id: 1, path: "../temp/css/assets/images/user_img/feed-image-1.png"},
            {id: 1, path: "../temp/css/assets/images/user_img/feed-image-1.png"},
        ]);
        let commentList = ref([
            {id: 1, username: 'Naruto', comment: 'OK nhe', id_parent: null},
            {id: 2, username: 'Sasuke', comment: 'OK nhe', id_parent: null},
            {id: 3, username: 'Khanh Nguyen', comment: 'Deo', id_parent: 2},
            {id: 3, username: 'Khanh Nguyen', comment: 'Cai djt me cuoc doi', id_parent: 1},
        ]);
        let currentSlide = ref(0);

        const slideTo = (val) => {
            currentSlide.value = val
        };

        onMounted(() => {
            // console.log(mySlides.value);
            // showSlides(slideIndex);
        });

        const postComment = computed(() => {
            commentList.value.push({id: 3, username: 'Khanh Nguyen', comment: comment.value})
            comment.value = '';
        });

        const postReply = computed(() => {

        });

        const getImageUrl = (name) => {
            return new URL(name, import.meta.url).href
        }
  
        // const {slideIndex, i, plusSlides, currentSlide, showSlides} = modalSlider();
        return {slideTo, currentSlide, comment, commentList, postComment, listPost, getImageUrl};
    }
}
</script>
<style scoped>
@import url('../temp/css/user.css');
.column {
    padding: 0;
}
.row {
    margin: 0;
}
.mySlides img{
    margin: 0;
}

.carousel__item {
  /* min-height: 200px; */
  width: 100%;
  background-color: #10b981;
  color: #fff;
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel__slide {
  padding: 10px;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
}

#gallery .carousel__track li{
    padding: 0;
}

</style>