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

        <div class="nav-right">
            <div class="search-box">
                <img src="../temp/css/assets/images/user_img/search.png" alt="">
                <input v-model="searchQuery" type="text" placeholder="Search" data-bs-toggle="dropdown">
                <div class="search-bar-list">
                    <ul class="dropdown-list dropdown-menu">
                        <li v-for="(item) in filteredList" :key="item.id">{{ item.name }}</li>
                    </ul>
                </div>
            </div>
            <div id="profile-image" class="profile-image online" @click="userSettingToggle">
                <img src="../temp/css/assets/images/user_img/profile-pic.png" alt="">

            </div>
        </div>
        <!-- Mobile only -->

        <div class="collapse__button">
            <div class="search-box--mobile" @click="toggleSearchMobile">
                <img src="../temp/css/assets/images/user_img/search.png" alt="">
            </div>
            <div class="collapse__btn" style="padding: 0.75em" data-bs-toggle="dropdown">
                <font-awesome-icon icon="fa-solid fa-bars" />
                <div class="sub-nav dropdown-menu">
                    <div class="profile-image online" onclick="UserSettingToggle()">
                        <img src="../temp/css/assets/images/user_img/profile-pic.png" alt="">
                        Xem thông tin cá nhân
                    </div>
                    <ul class="navlogo--mobile">
                        <li><font-awesome-icon icon="fa-solid fa-bell" />Thông báo</li>
                        <li><font-awesome-icon icon="fa-solid fa-message" />Tin nhắn</li>
                        <li><font-awesome-icon icon="fa-solid fa-tv" />Xem video</li>
                        <li>
                            <RouterLink to="/latest">Latest News</RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/location">Location</RouterLink>
                        </li>
                        <li @click="logOut">Đăng xuất</li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- End mobile-->

        <div id="user-settings" class="user-settings" :class="'user-setting-showup-toggle'" v-show="isShowUserSettings">
            <div class="profile-darkButton">
                <div class="user-profile">
                    <img src="../temp/css/assets/images/user_img/profile-pic.png" alt="">
                    <div>
                        <p> Khanh Nguyen</p>
                        <RouterLink :to="{ name: 'UserProfile', params: { id: this.test_object.id } }">See your profile
                        </RouterLink>
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

            <div class="settings-links" @click="logOut">
                <img src="../temp/css/assets/images/user_img/logout.png" alt="" class="settings-icon">
                <a>Logout <img src="../temp/css/assets/images/user_img/arrow.png" alt=""></a>
            </div>

        </div>
    </nav>
    <div class="search-bar-list">
        <input v-model="searchQuery" type="text" placeholder="Search" class="search--mobile dropdown-toggle"
            v-if="this.isShowMobileSearch" data-bs-toggle="dropdown">
        <ul class="dropdown-list dropdown-menu">
            <li v-for="(item) in filteredList" :key="item.id">{{ item.name }}</li>
        </ul>
    </div>
    <!-- content-area------------ -->

    <div class="container-fluid">
        <div class="row">
            <div class="left-sidebar col-sm-4 col-md-3 col-lg-3">
                <div class="important-links">
                    <RouterLink to="#"><img src="../temp/css/assets/images/user_img/news.png" alt="">
                        Latest News
                    </RouterLink>
                    <RouterLink to="#"><img src="../temp/css/assets/images/user_img/friends.png" alt="">
                        Friends
                    </RouterLink>
                    <a href="#"><img src="../temp/css/assets/images/user_img/group.png" alt="">Groups</a>
                    <a href="#"><img src="../temp/css/assets/images/user_img/marketplace.png" alt="">marketplace</a>
                    <a href="#"><img src="../temp/css/assets/images/user_img/watch.png" alt="">Watch</a>
                    <a href="#">See More</a>
                </div>

                <div class="shortcut-links">
                    <p>Your Shortcuts</p>
                    <a href="#"> <img src="../temp/css/assets/images/user_img/shortcut-1.png" alt="">Web Developers</a>
                    <a href="#"> <img src="../temp/css/assets/images/user_img/shortcut-2.png" alt="">Web Design Course</a>
                    <a href="#"> <img src="../temp/css/assets/images/user_img/shortcut-3.png" alt="">Full Stack
                        Development</a>
                    <a href="#"> <img src="../temp/css/assets/images/user_img/shortcut-4.png" alt="">Website Experts</a>
                </div>
            </div>

            <!-- main-content------- -->

            <div class="content-area col-12 col-sm-8 col-md-9 col-lg-6">
                <div class="story-gallery">
                    <!-- <div class="story story1">
                        <img src="../temp/css/assets/images/user_img/upload.png" alt="">
                        <p>Post Story</p>
                    </div> -->
                    <div v-for="item in routerlink" :key="item.id" :class="item.name">
                        <RouterLink :to="`/${item.name}`"
                            :class="this.$route.name === item.name ? 'underline-selected' : ''">
                            {{ item.text }}
                        </RouterLink>
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
                            <a href="#"><img src="../temp/css/assets/images/user_img/feeling.png" alt="">Feeling
                                Activity</a>
                        </div>
                    </div>
                    <div class="add-post-links--mobile">
                        <div><i class="fa-solid fa-video me-1"></i>Live Video</div>
                        <div><i class="fa-solid fa-camera me-1"></i>Photo/Video</div>
                        <div><i class="fa-solid fa-face-smile me-1"></i>Feeling Activity</div>
                    </div>
                </div>

                <RouterView />
                <button type="button" class="btn-LoadMore">Load More</button>
            </div>

            <!-- sidebar------------ -->
            <div class="right-sidebar col-lg-3">
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
    </div>

    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5 text-center" id="staticBackdropLabel">Tạo bài viết</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <textarea class="form-control" placeholder="Bạn đang nghĩ gì?" id="floatingTextarea2"
                        style="height: 10%"></textarea>
                    <div class="border border-secondary-subtle modal__footer">
                        <div class="input__image">
                            <input ref="file-input" id="file-input" type="file" name="filefield" multiple="multiple"
                                @change="previewImage" hidden>
                            <button type="button" class="btn btn-primary add-images" @click="addImages">Thêm ảnh</button>
                            <div id="num-of-files" v-if="num_of_files > 0">{{ num_of_files }} ảnh đã được chọn</div>
                            <div id="num-of-files" v-else>Chưa có ảnh nào được chọn</div>
                        </div>
                        <div id="images">
                            <div v-for="(item, index) in list_image" :key="index" class="card">
                                <img :src="item" alt="">
                                <div class="card-body">
                                    <figcaption class="card-text">{{ imagesObj[index]['name'] }}</figcaption>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="clearInput">Xóa ảnh</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                    <button type="button" class="btn btn-primary" @click="createPost">Đăng bài ngay</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import '@fortawesome/vue-fontawesome';
import axios from 'axios';
import { RouterView, RouterLink } from 'vue-router';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, doc, setDoc, addDoc, getDoc, getDocs } from "firebase/firestore";
import { db } from '../firebase/index';

export default {
    name: 'UserPage',
    data() {
        return {
            isShowMobileSearch: false,
            isShowMobileSubNav: false,
            isShowUserSettings: false,
            selectedItem: '',
            test_object: {
                id: 1,
            },
            routerlink: [
                { id: 1, name: 'latest', text: 'Mới nhất' },
                { id: 2, name: 'location', text: 'Địa điểm' },
                { id: 3, name: 'your-post', text: 'Bài đăng của bạn' },
            ],
            token: '',
            imagesObj: [],
            list_image: [],
            num_of_files: 0,
            searchedList: [],
            searchQuery: '',
            listData: [],
            image_download_url: [],
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
        toggleSubNavMobile() {
            // debugger;
            return this.isShowMobileSubNav = !this.isShowMobileSubNav;
        },

        /**
         * Ẩn / hiện user-settings
         * nnkhanh 23/02/23
         */
        userSettingToggle() {
            return this.isShowUserSettings = !this.isShowUserSettings;
        },

        logOut() {
            localStorage.removeItem('token');
            this.$router.push('/');
        },

        addImages() {
            try {
                const inputFile = this.$refs['file-input'];
                inputFile.click();
            } catch (error) {
                console.log(error);
            }
        },

        async previewImage() {
            let fileInput = await this.$refs['file-input'];
            for (let i of fileInput.files) {
                let reader = new FileReader();
                reader.onload = () => {
                    this.list_image.unshift(reader.result);
                    this.imagesObj.unshift(i);
                }
                reader.readAsDataURL(i);
                this.num_of_files++;

            }
        },

        clearInput() {
            const fileInput = this.$refs['file-input'];;
            fileInput.value = '';
            this.num_of_files = 0;
            this.list_image = [];
            this.imagesObj = [];
        },

        /**Tạo bài đăng mới */
        async createPost() {
            try {
                const storage = getStorage();
                let fileInput = this.$refs['file-input'];

                for (let i of fileInput.files) {
                    const storageRef = ref(storage, `images/${i.name}`);
                    const uploadTask = uploadBytesResumable(storageRef, i);
                    uploadTask.on('state_changed',
                        (snapshot) => {
                            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            console.log(`${i.name} is ${progress}% done`);

                        },
                        (error) => {
                            switch (error.code) {
                                case 'storage/unauthorized':
                                    break;
                                case 'storage/canceled':
                                    break;
                                case 'storage/unknown':
                                    break;
                            }
                        },
                        async () => {
                            // Upload completed successfully, now we can get the download URL
                            await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                                this.image_download_url.push({ path: downloadURL });
                                setDoc(doc(db, 'KhanhNguyen', 'images'), { path: downloadURL })
                                // console.log(`File is available at: ${downloadURL}`);
                            });
                        }
                    );

                    // const colRef = collection(db, 'images');
                    // const docRef = await addDoc(colRef, this.image_download_url[0]);

                }
            } catch (error) {
                console.log(error);
            }
        },

        async uploadTaskPromise(path, file) {
            return new Promise(function (resolve, reject) {
                const uploadTask = uploadBytesResumable(path, file);
                uploadTask.on('state_changed',
                    (snapshot) => { // Progress
                        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log(`${file.name} is ${progress}% done`);
                    },
                    (err) => { // Error
                        console.log('error', err);
                        reject();
                    },
                    () => { // Complete
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            resolve(downloadURL);
                        });
                    }
                )
            })
        },

        async callApiProvinces() {
            await axios.get('https://provinces.open-api.vn/api/p/')
                .then(res => {
                    this.listData = res.data;
                })
                .catch(e => {
                    console.log(e);
                })
        },
        
    },
    created() {
        // this.token = localStorage.getItem('token')
        // if (!this.token) {
        //     this.$router.push('/');
        // }
        // else {
        //     this.$router.push('/latest');
        // }
        // setTimeout(() => {
        //     localStorage.removeItem('token');
        //     this.$router.push('/');
        // }, 5 * 1000);
        // let parseData = JSON.parse(localStorage.getItem('token'));
        // let exp = Number(parseData.expiresIn) - new Date().getTime();
    },

    computed: {
        filteredList() {
            if (this.searchQuery) {
                return this.listData.filter((item) => {
                    // return this.searchQuery.toLowerCase().split(' ').every(v => item.name.toLowerCase().includes(v))
                    let queryString = this.searchQuery.toLowerCase().trim();
                    return item.name.toLocaleLowerCase().trim().includes(queryString)
                });
            } else {
                return this.listData;
            }
        }
    },
    mounted() {
        this.callApiProvinces();
    },
}
</script>
<style scoped>
@import url('../temp/css/user.css');

.content-area {
    margin-top: 0.5em;
}

a {
    cursor: pointer;
}

.add-images {
    width: 100%;
}

.input__image {
    margin-top: 1em;
    padding: 0 1em;
}

#images {
    /* display: flex; */
    justify-content: space-between;
    overflow-y: overlay;
    max-height: 20rem;
    padding: 0 1em;
    margin-top: 1em;
}

figcaption {
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

figure img {
    width: 100%;
}

figure {
    max-width: 45%;
    max-height: 20%;
    margin: 0;
}

div.card:not(:first-child) {
    margin: 1em 0;
}

.dropdown-list {
    z-index: 12;
    background-color: #fff;
    width: 100%;
    border-radius: 10px;
    box-shadow: 0px 2px 15px grey;
    list-style-type: none;
    padding: 0;
    height: 29vh;
    overflow: overlay;
}

.dropdown-list li {
    padding: 0.5em 1em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* width */
::-webkit-scrollbar {
    height: 8px;
    /* height of horizontal scrollbar ← You're missing this */
    width: 8px;
    /* width of vertical scrollbar */
    border: 1px solid #d5d5d5;
}

/* Track */
::-webkit-scrollbar-track {
    background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: #555;
}
</style>