<template>
    <nav class="navbar">
        <div class="nav-left" id="navbarTogglerDemo02">
            <img class="logo" src="../temp/css/assets/images/user_img/logo.png" alt="">
            <ul class="navlogo">
                <li><img src="../temp/css/assets/images/user_img/notification.png"></li>
                <li><img src="../temp/css/assets/images/user_img/inbox.png"></li>
                <li><img src="../temp/css/assets/images/user_img/video.png"></li>
            </ul>
        </div>
        <div class="search-box--mobile" @click="toggleSearchMobile">
            <img src="../temp/css/assets/images/user_img/search.png" alt="">
        </div>
        <div class="nav-right">
            <div class="search-box">
                <img src="../temp/css/assets/images/user_img/search.png" alt="">
                <input type="text" placeholder="Search">
            </div>
            <div class="profile-image online" @click="userSettingToggle">
                <img src="../temp/css/assets/images/user_img/profile-pic.png" alt="">
            </div>
        </div>
        <!-- Mobile only -->
        <!-- <div class="search-box--mobile" @click="toggleSearchMobile">
            <img src="../temp/css/assets/images/user_img/search.png" alt="">
        </div> -->
        <div class="collapse__button" @click="toggleSubNavMobile">
            <font-awesome-icon icon="fa-solid fa-bars" />
        </div>
        <!-- End mobile-->

        <div class="sub-nav" v-if="this.isShowMobileSubNav">
            <div class="profile-image online" onclick="UserSettingToggle()">
                <img src="../temp/css/assets/images/user_img/profile-pic.png" alt="">
                Xem thông tin cá nhân
            </div>
            <ul class="navlogo--mobile">
                <li><font-awesome-icon icon="fa-solid fa-bell" />Thông báo</li>
                <li><font-awesome-icon icon="fa-solid fa-message" />Tin nhắn</li>
                <li><font-awesome-icon icon="fa-solid fa-tv" />Xem video</li>
            </ul>
        </div>
        <div class="user-settings" :class="{'user-setting-showup-toggle': isShowUserSettings}">
            <div class="profile-darkButton">
                <div class="user-profile">
                    <img src="../temp/css/assets/images/user_img/profile-pic.png" alt="">
                    <div>
                        <p> Alex Carry</p>
                        <RouterLink :to="{name: 'UserProfile', params: {id: this.test_object.id}}">See your profile</RouterLink>
                    </div>
                </div>
                <div id="dark-button" onclick="darkModeON()">
                    <span></span>
                </div>
            </div>
            <hr>
            <div class="user-profile">
                <img src="../temp/css/assets/images/user_img/feedback.png" alt="">
                <div>
                    <p> Give Feedback</p>
                    <a href="#">Help us to improve</a>
                </div>
            </div>
            <hr>
            <div class="settings-links">
                <img src="../temp/css/assets/images/user_img/setting.png" alt="" class="settings-icon">
                <a href="#">Settings & Privary <img src="../temp/css/assets/images/user_img/arrow.png" alt=""></a>
            </div>

            <div class="settings-links">
                <img src="../temp/css/assets/images/user_img/help.png" alt="" class="settings-icon">
                <a href="#">Help & Support <img src="../temp/css/assets/images/user_img/arrow.png" alt=""></a>
            </div>

            <div class="settings-links">
                <img src="../temp/css/assets/images/user_img/Display.png" alt="" class="settings-icon">
                <a href="#">Display & Accessibility <img src="../temp/css/assets/images/user_img/arrow.png" alt=""></a>
            </div>

            <div class="settings-links">
                <img src="../temp/css/assets/images/user_img/logout.png" alt="" class="settings-icon">
                <a href="#">Logout <img src="../temp/css/assets/images/user_img/arrow.png" alt=""></a>
            </div>

        </div>
    </nav>
    <input type="text" placeholder="Search" class="search--mobile" v-if="this.isShowMobileSearch">

    <!-- content-area------------ -->

    <div class="container">
        <div class="left-sidebar">
            <div class="important-links">
                <a href="#"><img src="../temp/css/assets/images/user_img/news.png" alt="">Latest News</a>
                <a href="#"><img src="../temp/css/assets/images/user_img/friends.png" alt="">Friends</a>
                <a href="#"><img src="../temp/css/assets/images/user_img/group.png" alt="">Groups</a>
                <a href="#"><img src="../temp/css/assets/images/user_img/marketplace.png" alt="">marketplace</a>
                <a href="#"><img src="../temp/css/assets/images/user_img/watch.png" alt="">Watch</a>
                <a href="#">See More</a>
            </div>

            <div class="shortcut-links">
                <p>Your Shortcuts</p>
                <a href="#"> <img src="../temp/css/assets/images/user_img/shortcut-1.png" alt="">Web Developers</a>
                <a href="#"> <img src="../temp/css/assets/images/user_img/shortcut-2.png" alt="">Web Design Course</a>
                <a href="#"> <img src="../temp/css/assets/images/user_img/shortcut-3.png" alt="">Full Stack Development</a>
                <a href="#"> <img src="../temp/css/assets/images/user_img/shortcut-4.png" alt="">Website Experts</a>
            </div>
        </div>

        <!-- main-content------- -->

        <div class="content-area">
            <div class="story-gallery">
                <div class="story story1">
                    <img src="../temp/css/assets/images/user_img/upload.png" alt="">
                    <p>Post Story</p>
                </div>
                <div class="story story2">
                    <img src="../temp/css/assets/images/user_img/member-1.png" alt="">
                    <p>Alison</p>
                </div>
                <div class="story story3">
                    <img src="../temp/css/assets/images/user_img/member-2.png" alt="">
                    <p>Jackson</p>
                </div>
                <div class="story story4">
                    <img src="../temp/css/assets/images/user_img/member-3.png" alt="">
                    <p>Samona</p>
                </div>
                <div class="story story5">
                    <img src="../temp/css/assets/images/user_img/member-4.png" alt="">
                    <p>John</p>
                </div>
            </div>

            <div class="write-post-container">
                <div class="user-profile">
                    <img src="../temp/css/assets/images/user_img/profile-pic.png" alt="">
                    <div>
                        <p> Alex Carry</p>
                        <small>Public <i class="fas fa-caret-down"></i></small>
                    </div>
                </div>

                <div class="post-upload-textarea">
                    <textarea name="" placeholder="What's on your mind, Alex?" id="" cols="30" rows="3"
                        data-bs-toggle="modal" data-bs-target="#staticBackdrop"></textarea>
                    <div class="add-post-links">
                        <a href="#"><img src="../temp/css/assets/images/user_img/live-video.png" alt="">Live Video</a>
                        <a href="#"><img src="../temp/css/assets/images/user_img/photo.png" alt="">Photo/Video</a>
                        <a href="#"><img src="../temp/css/assets/images/user_img/feeling.png" alt="">Feeling Activity</a>
                    </div>
                </div>
                <div class="add-post-links--mobile">
                    <div><i class="fa-solid fa-video me-1"></i>Live Video</div>
                    <div><i class="fa-solid fa-camera me-1"></i>Photo/Video</div>
                    <div><i class="fa-solid fa-face-smile me-1"></i>Feeling Activity</div>
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
                        laborum nihil accusantium odit laboriosam, sed sit autem! <a href="#">#This_Post_is_Better!!!!</a>
                    </p>
                    <img src="../temp/css/assets/images/user_img/feed-image-1.png" alt="">

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
                                <textarea style="resize: none;" class="form-control" id="exampleFormControlTextarea1"
                                    rows="3" placeholder="Viết bình luận công khai"></textarea>
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
            <button type="button" class="btn-LoadMore" onclick="LoadMoreToggle()">Load More</button>
        </div>
        
        <!-- sidebar------------ -->
        <div class="right-sidebar">
            <div class="heading-link">
                <h4>Events</h4>
                <a href="">See All</a>
            </div>

            <div class="events">
                <div class="left-event">
                    <h4>13</h4>
                    <span>august</span>
                </div>
                <div class="right-event">
                    <h4>Social Media</h4>
                    <p> <i class="fas fa-map-marker-alt"></i> wisdom em Park</p>
                    <a href="#">More Info</a>
                </div>
            </div>
            <div class="events">
                <div class="left-event">
                    <h4>18</h4>
                    <span>January</span>
                </div>
                <div class="right-event">
                    <h4>Mobile Marketing</h4>
                    <p><i class="fas fa-map-marker-alt"></i> wisdom em Park</p>
                    <a href="#">More Info</a>
                </div>
            </div>

            <div class="heading-link">
                <h4>Advertisement</h4>
                <a href="">Close</a>
            </div>
            <div class="advertisement">
                <img src="../temp/css/assets/images/user_img/advertisement.png" class="advertisement-image" alt="">
            </div>

            <div class="heading-link">
                <h4>Conversation</h4>
                <a href="">Hide Chat</a>
            </div>

            <div class="online-list">
                <div class="online">
                    <img src="../temp/css/assets/images/user_img/member-1.png" alt="">
                </div>
                <p>Alison Mina</p>
            </div>

            <div class="online-list">
                <div class="online">
                    <img src="../temp/css/assets/images/user_img/member-2.png" alt="">
                </div>
                <p>Jackson Aston</p>
            </div>
            <div class="online-list">
                <div class="online">
                    <img src="../temp/css/assets/images/user_img/member-3.png" alt="">
                </div>
                <p>Samona Rose</p>
            </div>
        </div>
    </div>
    <!-- <footer id="footer">
        <p>&copy; Copyright 2021 - Socialbook All Rights Reserved</p>
    </footer> -->

    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5 text-center" id="staticBackdropLabel">Tạo bài viết</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2"
                        style="height: 100px"></textarea>
                    <div class="border border-secondary-subtle modal__footer">
                        <div class="title">Thêm ảnh vào bài viết của bạn</div>
                        <div class="input__image"><input type="file" name="filefield" multiple="multiple"
                                placeholder="Chọn ảnh"></div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import 'bootstrap/dist/css/bootstrap.css';
    import 'bootstrap/dist/js/bootstrap.bundle.js';
    import '@fortawesome/vue-fontawesome';
    import { RouterLink} from 'vue-router';
    
    export default {
        name: 'UserPage',
        data() {
            return {
                isShowMobileSearch: false,
                isShowMobileSubNav: false,
                isShowUserSettings: false,
                test_object: {
                    id: 1,
                    name: 'khanh',
                    email: 'khanh@gmail.com',
                    phone: '0385182287',
                    address: 'HaNoi'
                }
            }
        },
        methods: {
            /**
             * Ẩn / hiện input search trên di động
             * nnkhanh 22/02/23
             */
            toggleSearchMobile() {
                return this.isShowMobileSearch = !this.isShowMobileSearch;
            },

            /**
             * Ẩn / hiện hộp thông tin (Toggling the sub-nav)
             * nnkhanh 23/02/23
             */
            toggleSubNavMobile(){
                // debugger;
                return this.isShowMobileSubNav = !this.isShowMobileSubNav;
            },

            /**
             * Ẩn / hiện user-settings
             * nnkhanh 23/02/23
             */
            userSettingToggle() {
                return this.isShowUserSettings = !this.isShowUserSettings;
            }
        },
    }
</script>
<style scoped>
   @import url('../temp/css/user.css'); 
</style>