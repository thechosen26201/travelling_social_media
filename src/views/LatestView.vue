<template>
    <div class="status-field-container write-post-container" v-for="(post, index) in listPost" :key="post.id">
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
            
            <div class="sub-blog__post">
                <div class="sub-blog__post-slider">
                    <Carousel id="gallery" :items-to-show="1" :wrap-around="false" v-model="currentSlide">
                        <Slide v-for="(slide, index) in post['images']" :key="index">
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
                        ref="carousel"
                    >
                        <Slide v-for="(slide, index) in post['images']" :key="slide">
                            <div class="carousel__item" @click="slideTo(index + 1  - 1)">
                                <img :src="getImageUrl(slide['path'])">
                            </div>
                        </Slide>
                    </Carousel>
                </div>
            </div>
        </div>
        <div class="post-reaction">
            <div class="activity-icons">
                <div><img src="../temp/css/assets/images/user_img/like.png" alt="">120</div>
                <div><img src="../temp/css/assets/images/user_img/comments.png" alt="">{{totalComment[index]}}</div>
                <div><img src="../temp/css/assets/images/user_img/share.png" alt="">35</div>
            </div>
            <div class="post-profile-picture">
                <img src="../temp/css/assets/images/user_img/profile-pic.png " alt=""> <i class=" fas fa-caret-down"></i>
            </div>
        </div>
        <div class="post-list-comment border-secondary-subtle">
            
            <CommentBlock :commentList="post['comments']"/>
            
        </div>
        <div class="post-comment-input border-secondary-subtle">
            <div class="comment__input">
                <textarea v-model="comment" style="resize: none;" class="form-control" id="exampleFormControlTextarea1" rows="3"
                    placeholder="Viết bình luận công khai" @keyup.enter="postComment(post.id, index)"></textarea>
            </div>
        </div>
    </div>
</template>
<script>
import {onMounted, ref, computed, reactive, watch } from 'vue';
import CommentBlock from '../components/CommentBlock.vue';
import { Carousel, Slide, Navigation } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css'

export default {
    name: 'LatestView',
    components: {CommentBlock, Carousel, Slide, Navigation},
    setup(props) {
        let comment = ref('');
        const total = ref([]);
        const totalComment = ref([]);
        let listPost = ref([
            {
                id: 1, 
                images: [
                    {id_image: 1, path: "../temp/css/assets/images/user_img/feed-image-1.png"},
                    {id_image: 2, path: "../temp/css/assets/images/user_img/feed-image-2.png"},
                    {id_image: 3, path: "../temp/css/assets/images/user_img/feed-image-3.png"}
                ],
                comments: [
                    {
                        id: 1, 
                        username: 'Naruto', 
                        text: 'OK nhe', 
                        id_parent: null,
                        comments: [
                            {id: 2, username: 'Khanh Nguyen', text: 'Cai djt me cuoc doi', id_parent: 1, comments: [
                                {id: 5, username: 'Khanh Nguyen', text: 'Deo', id_parent: 2, comments: null},
                            ]},
                        ]
                    },
                    {
                        id: 3, 
                        username: 'Sasuke', 
                        text: 'OK nhe', 
                        id_parent: null,
                        comments: [
                            {id: 4, username: 'Khanh Nguyen', text: 'Deo', id_parent: 3, comments: null},
                        ]
                    },
                ],
                reactions: 12
            },
        ]);
        let currentSlide = ref(0);

        const slideTo = (val) => {
            currentSlide.value = val
        };

        const postComment = (post_id, index) => {
            listPost.value[index]['comments'].push({id: 20, username: 'Khanh Nguyen', text: comment.value, id_parent: post_id, comments: null})
            comment.value = '';
            totalComment.value[index] += 1;
        };

        const getImageUrl = (name) => {
            return new URL(name, import.meta.url).href
        }
        
        const fetchPost = async () => {
            const querySnapshot = await getDocs(collection(db, "news"));
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
            });
        }

        const getTotalComment = onMounted(() => {
            let temp = ref(listPost.value);
            for (const iterator of temp.value) {
                total.value = 0;
                if(iterator['comments'] !== [] || iterator['comments']) {
                    recursiveComment(iterator['comments']);
                }
                totalComment.value.push(total.value)
            }
            return totalComment;
        });

        const recursiveComment = (commentArray) => {
            if (commentArray) {
                for (const iterator of commentArray) {
                    if(iterator['comments'] !== [] || iterator['comments']) {
                        total.value += 1;
                        recursiveComment(iterator['comments']);
                    }
                }
            }
            return total.value;
        };
        
        return {slideTo, currentSlide, comment, postComment, listPost, getImageUrl, getTotalComment, total, totalComment};
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
#gallery .carousel__track li:hover, #thumbnails .carousel__track li:hover{
    cursor: pointer;
}
</style>