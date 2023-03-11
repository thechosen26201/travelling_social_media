<template>
    <div class="status-field-container write-post-container">
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
            <!-- <img src="../temp/css/assets/images/user_img/feed-image-1.png" alt=""> -->
            <div class="sub-blog__post">
                <!-- <div class="sub-blog__post-slider flex"> -->
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
                </div>
            </div>
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
                </div>
            </div>
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
                </div>
            </div>
        </div>
        <div class="post-comment-input border-secondary-subtle">
            <div class="comment__input">
                <textarea style="resize: none;" class="form-control" id="exampleFormControlTextarea1" rows="3"
                    placeholder="Viết bình luận công khai"></textarea>
            </div>
        </div>
    </div>
    <div class="status-field-container write-post-container">
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
                laborum nihil accusantium odit laboriosam, sed sit autem! <a href="#">#This_Post_is_Bigger!!!!</a>
            </p>
            <img src="../temp/css/assets/images/user_img/feed-image-2.png" alt="">

        </div>
        <div class="post-reaction">
            <div class="activity-icons">
                <div><img src="../temp/css/assets/images/user_img/like-blue.png" alt="">120</div>
                <div><img src="../temp/css/assets/images/user_img/comments.png" alt="">52</div>
                <div><img src="../temp/css/assets/images/user_img/share.png" alt="">35</div>
            </div>
            <div class="post-profile-picture">
                <img src="../temp/css/assets/images/user_img/profile-pic.png " alt=""> <i class=" fas fa-caret-down"></i>
            </div>
        </div>
    </div>
    <div class="status-field-container write-post-container">
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
                laborum nihil accusantium odit laboriosam, sed sit autem! <a href="#">#This_Post_is_faster!!!!</a>
            </p>
            <img src="../temp/css/assets/images/user_img/feed-image-3.png" alt="">

        </div>
        <div class="post-reaction">
            <div class="activity-icons">
                <div><img src="../temp/css/assets/images/user_img/like-blue.png" alt="">120</div>
                <div><img src="../temp/css/assets/images/user_img/comments.png" alt="">52</div>
                <div><img src="../temp/css/assets/images/user_img/share.png" alt="">35</div>
            </div>
            <div class="post-profile-picture">
                <img src="../temp/css/assets/images/user_img/profile-pic.png " alt=""> <i class=" fas fa-caret-down"></i>
            </div>
        </div>
    </div>
    <div class="status-field-container write-post-container">
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
                laborum nihil accusantium odit laboriosam, sed sit autem! <a href="#">#This_Post_is_perfect!!!!</a>
            </p>
            <img src="../temp/css/assets/images/user_img/feed-image-4.png" alt="">

        </div>
        <div class="post-reaction">
            <div class="activity-icons">
                <div><img src="../temp/css/assets/images/user_img/like-blue.png" alt="">120</div>
                <div><img src="../temp/css/assets/images/user_img/comments.png" alt="">52</div>
                <div><img src="../temp/css/assets/images/user_img/share.png" alt="">35</div>
            </div>
            <div class="post-profile-picture">
                <img src="../temp/css/assets/images/user_img/profile-pic.png " alt=""> <i class=" fas fa-caret-down"></i>
            </div>
        </div>
    </div>
</template>
<script>
import {onMounted} from 'vue';
import modalSlider from '../js/modalSlider'
export default {
    name: 'LatestView',
    setup(props) {
        onMounted(() => {
            showSlides(slideIndex);
        })
        const {slideIndex, i, plusSlides, currentSlide, showSlides} = modalSlider();
        return {slideIndex, i, plusSlides, currentSlide, showSlides};
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
</style>