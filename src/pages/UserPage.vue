<template>
    <nav class="navbar">
        <div class="nav-left" id="navbarTogglerDemo02">
            <img class="logo" src="../temp/css/assets/images/user_img/logo.png" alt="">
            <ul class="navlogo">
                <li class="position-relative">
                    <img src="../temp/css/assets/images/user_img/notification.png">
                </li>
                <li><img src="../temp/css/assets/images/user_img/inbox.png"></li>
                <li><img src="../temp/css/assets/images/user_img/video.png"></li>
            </ul>
        </div>

        <div class="nav-right">
            <div class="search-box">
                <img src="../temp/css/assets/images/user_img/search.png" alt="">
                <input v-model="searchQuery" type="text" placeholder="Nhập tên thành phố" data-bs-toggle="dropdown">
                <div class="search-bar-list">
                    <ul class="dropdown-list dropdown-menu">
                        <li v-for="(item) in filteredList" :key="item.code" @click="getLocationCode(item.code)">{{ item.name
                        }}</li>
                    </ul>
                </div>
            </div>
            <div id="profile-image" class="profile-image online" @click="userSettingToggle($event)">
                <img :src="user_profile.photoURL" alt="">

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
                            <RouterLink to="/list_destination">Latest News</RouterLink>
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
                    <img :src="user_profile.photoURL" alt="">
                    <div>
                        <p> {{ user_profile.displayName }}</p>
                        <!-- <RouterLink :to="{ name: 'UserProfile', params: { id: user_profile.uid } }">Xem thông tin cá nhân
                        </RouterLink> -->
                        <!-- <a @click="() => this.$router.push({ path: `/profile`, query: { id: user_profile.uid }, props: true })">Xem thông tin cá nhân</a> -->
                        <!-- <a
                            @click="() => this.$router.push({ path: `/profile/${user_profile.uid}`, params: { id: user_profile.uid } })">Xem
                            thông tin cá nhân</a> -->
                            <a @click="() => this.$router.push({ path: `/profile/${user_profile.uid}`})">Xem thông tin cá nhân</a>
                    </div>
                </div>
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" role="switch" ref="dark-mode" id="toggle-dark-mode" @click="isChecked">
                    <label class="form-check-label" for="flexSwitchCheckDefault"></label>
                </div>
                
            </div>
            <hr>
            <div class="user-profile">
                <img src="../temp/css/assets/images/user_img/feedback.png" alt="">
                <div>
                    <p> Phản hồi của bạn</p>
                    <a href="#">Giúp chúng tôi cải thiện nhiều hơn</a>
                </div>
            </div>
            <hr>
            <div class="settings-links">
                <img src="../temp/css/assets/images/user_img/setting.png" alt="" class="settings-icon">
                <a href="#">Chính sách & Cài đặt <img src="../temp/css/assets/images/user_img/arrow.png" alt=""></a>
            </div>

            <div class="settings-links">
                <img src="../temp/css/assets/images/user_img/help.png" alt="" class="settings-icon">
                <a href="#">Hỗ trợ <img src="../temp/css/assets/images/user_img/arrow.png" alt=""></a>
            </div>

            <div class="settings-links">
                <img src="../temp/css/assets/images/user_img/Display.png" alt="" class="settings-icon">
                <a href="#">Hiển thị & trợ năng <img src="../temp/css/assets/images/user_img/arrow.png" alt=""></a>
            </div>

            <div class="settings-links" @click="logOut">
                <img src="../temp/css/assets/images/user_img/logout.png" alt="" class="settings-icon">
                <a>Đăng xuất <img src="../temp/css/assets/images/user_img/arrow.png" alt=""></a>
            </div>

        </div>
    </nav>
    <div class="search-bar-list">
        <input v-model="searchQuery" type="text" placeholder="Nhập tên thành phố" class="search--mobile dropdown-toggle"
            v-if="this.isShowMobileSearch" data-bs-toggle="dropdown">
        <ul class="dropdown-list dropdown-menu">
            <li v-for="(item) in filteredList" :key="item.code" @click="getLocationCode(item.code)">{{ item.name }}</li>
        </ul>
    </div>

    <!-- content-area------------ -->

    <div class="container-fluid">
        <div class="row">
            <div class="left-sidebar col-sm-4 col-md-3 col-lg-3">
                <div class="important-links">
                    <RouterLink to="/list_destination"><img src="../temp/css/assets/images/user_img/news.png" alt="">
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

            <div class="content-area col-12 col-sm-8 col-md-9 col-lg-6" @scroll="onScroll($event)">
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
                        <img :src="user_profile.photoURL" alt="">
                        <div class="dropdown">
                            <p> {{user_profile.displayName}}</p>
                            <small data-bs-toggle="dropdown">
                                <div v-if="current_policy === 0">Công khai <font-awesome-icon icon="fa-solid fa-caret-down"/></div> 
                                <div v-if="current_policy === 1">Bạn bè <font-awesome-icon icon="fa-solid fa-caret-down"/></div> 
                                <div v-if="current_policy === 2">Chỉ mình tôi <font-awesome-icon icon="fa-solid fa-caret-down"/></div> 
                            </small>
                            <ul class="dropdown__privacy dropdown-menu p-0">
                                <li class="dropdown__privacy--item" @click="selectPolicy(0)">Công khai</li>
                                <li class="dropdown__privacy--item" @click="selectPolicy(1)">Bạn bè</li>
                                <li class="dropdown__privacy--item" @click="selectPolicy(2)">Chỉ mình tôi</li>
                            </ul>
                        </div>
                    </div>

                    <div class="post-upload-textarea">
                        <textarea name="" :placeholder="`Bạn đang nghĩ gì vậy, ${user_profile.displayName}?`" id="" cols="30" rows="3"
                            data-bs-toggle="modal" data-bs-target="#staticBackdrop" disabled></textarea>
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
                <button type="button" class="btn-LoadMore" @click="fetchNext">Load More</button>
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
    <!-- Create Post  -->
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
                        style="height: 10%" v-model="caption" @keyup="setButtonStatus"></textarea>
                    <div class="container-fluid list__locations">
                        <div class="row flex-wrap">
                            <div class="list__cities col-12 col-md-6">
                                <input v-model="searchQuery" type="text" name="" id="city-modal__input" 
                                placeholder="Tên thành phố" @click="showCityList($event)">
                                <div class="dropdown__icon"><font-awesome-icon icon="fa-solid fa-caret-down" /></div>
                                <div class="dropdown__cities" v-if="isShowCityList">
                                    <div class="dropdown__item" 
                                        v-for="(item) in filteredList" :key="item.code"
                                        @click="getCityCode(item.code, item.name)">
                                        {{item.name}}
                                    </div>
                                </div>
                            </div>    
                            <div class="list__places col-12 col-md-6">
                                <input v-model="v_place" type="text" name="" id="place-modal__input" placeholder="Tên điểm du lịch" @click="showPlaceList($event)">
                                <div class="dropdown__icon"><font-awesome-icon icon="fa-solid fa-caret-down" /></div>
                                <div class="dropdown__places" v-if="isShowPlaceList">
                                    <div class="dropdown__item" 
                                        v-for="place in list_places" :key="place.id"
                                        @click="() => v_place = place.name">
                                        {{place.name}}
                                    </div>
                                </div>
                            </div>    
                        </div>
                    </div>    
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
                    <button type="button" class="btn btn-primary" @click="createPost" :disabled="status_btn">Đăng bài ngay</button>
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
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { doc, getDoc, getDocs, collection, Timestamp, setDoc, query, where } from "firebase/firestore";
import { db, auth } from '../firebase/index';
import { onAuthStateChanged } from "firebase/auth";
import store from '../store/store';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    name: 'UserPage',
    data() {
        return {
            isScrolled: false,
            isShowMobileSearch: false,
            isShowMobileSubNav: false,
            isShowUserSettings: false,
            isShowCityList: false,
            isShowPlaceList: false,
            routerlink: [
                { id: 1, name: 'latest', text: 'Mới nhất' },
                { id: 2, name: 'list_destination', text: 'Địa danh' },
                { id: 3, name: 'your-post', text: 'Bài đăng của bạn' },
            ],
            imagesObj: [],
            list_image: [],
            num_of_files: 0,
            searchQuery: '',
            listData: [],
            image_download_url: [],
            user_profile: {},
            caption: '',
            status_btn: true,
            cityCode: 1,
            current_policy: 0,
            list_places: [],
            v_place: ''
        }
    },
    methods: {
        fetchNext () {
            try {
                store.dispatch('setFetchFlag', true);
            } catch (error) {
                console.log(error);
            }
        },
        onScroll (event) {
            try {
                // const { scrollTop, clientHeight, scrollHeight } = event.target;
                // if (Math.ceil(scrollTop + clientHeight) >= scrollHeight && !this.isScrolled) {
                //     console.log('we are now in page bottom');
                //     store.dispatch('setFetchFlag', true);
                //     this.isScrolled = true;
                // }
                // else {
                //     store.dispatch('setFetchFlag', false);
                //     this.isScrolled = false;
                // }
            } catch (error) {
                console.log(error);
            }
        },
        isChecked() {
            const res = this.$refs['dark-mode'].checked;
            const target = document.body;
            (res) ? target.classList.add('bg-dark') : target.classList.remove('bg-dark');
        },
        notify(message, type, duration) {
            toast(message, {
                autoClose: duration,
                type: type
            });
        },
        selectPolicy(policy) {
            this.current_policy = policy;
        },
        getCityCode(code, name) {
            this.cityCode = code;
            this.searchQuery = name;
            this.getPlaceList(code);
        },
        async getPlaceList (code) {
            const collectionRef = collection(db, "destinations");
            const whereConditionalString = where("cityCode", "==", code);
            const q = query(collectionRef, whereConditionalString);
            const querySnapshot = await getDocs(q);
            this.list_places.length = 0;
            querySnapshot.forEach((doc) => {
                this.list_places.push({ id: doc.id, ...doc.data() });
            });
        },
        showCityList(event){
            event.stopPropagation();
            this.isShowPlaceList = false;
            return this.isShowCityList = true;
        },
        showPlaceList(event) {
            event.stopPropagation();
            this.isShowCityList = false;
            return this.isShowPlaceList = true;
        },
        setButtonStatus() {
            // Disabled: true là ẩn, false là hiện nút
            (this.caption || this.num_of_files > 0) ? this.status_btn = false : this.status_btn = true
        },
        getProfile() {
            let uid;
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    uid = user.uid;
                    const docRef = doc(db, "users", uid);
                    const docSnap = await getDoc(docRef);
        
                    if (docSnap.exists()) {
                        this.user_profile = {...docSnap.data(), uid: uid};
                    }
                }
            });
        },
        getLocationCode(code) {
            this.$router.push({ name: 'location', params: { code: code } })
        },
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
        userSettingToggle(event) {
            event.stopPropagation();
            return this.isShowUserSettings = !this.isShowUserSettings;
        },

        logOut() {
            store.dispatch('logOut');
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
            this.setButtonStatus();
        },

        clearInput() {
            const fileInput = this.$refs['file-input'];;
            fileInput.value = '';
            this.num_of_files = 0;
            this.list_image = [];
            this.imagesObj = [];
            this.setButtonStatus();
        },

        /**Tạo bài đăng mới */
        async createPost() {
            try {
                const generated_id = doc(collection(db, "news"));
                const id = await this.getCurrentUserId();
                const url = await this.getImagesURL(id, generated_id.id);
                const post = await this.uploadPost(id, url, generated_id);
                console.log('Đăng post thành công, vui lòng đợi quản trị viên duyệt bài của bạn!!');
                this.notify('Đăng bài viết thành công, vui lòng đợi quản trị viên duyệt bài của bạn!!', 'success', 2000);
            } catch (error) {
                console.log(error);
            }
        },
        uploadPost(id, url, generated_ref) {
            return new Promise((resolve, reject) => {
                setDoc(generated_ref, {
                    user_id: id,
                    comments: [],
                    content: this.caption,
                    images: url,
                    isApproved: false,
                    location_code: this.cityCode,
                    reactions: [],
                    created_date: Timestamp.fromDate(new Date()),
                })
                    .then(() => resolve())
                    .catch((error) => {
                        console.log(error);
                        reject(error);
                    })
            })
        },
        async getCurrentUserId() {
            await store.dispatch('setUser');
            return await store.getters.getUser.uid;
        },
        async getImagesURL(folder_name, post_id) {
            
            let fileInput = this.$refs['file-input'];
            const storage = getStorage();
            if (!fileInput.files.length) return [];
            const promises = []
            const data = []
            for (const item of fileInput.files) {
                const storageRef = ref(storage, `${folder_name}/${post_id}/${item.name}`)
                promises.push(uploadBytes(storageRef, item))
            }
            const uploadResults = await Promise.all(promises)
            const downloadURLs = []

            for (const item of uploadResults) {
                // data.push({ fullPath: item.metadata.fullPath, downloadURL: '', name: '' })
                downloadURLs.push(getDownloadURL(item.ref))
            }

            const downloadURLsResult = await Promise.all(downloadURLs)

            for (var i = 0; i < downloadURLsResult.length; i++) {
                // data[i].downloadURL = downloadURLsResult[i]
                data[i] = downloadURLsResult[i]
                // data[i].name = files.files[i].name
            }
            return data
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
        this.getProfile();
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
        document.querySelector('#app').addEventListener('click', () => {
            this.isShowCityList = false;
            this.isShowPlaceList = false;
            this.isShowUserSettings = false;
        });
    },
}
</script>
<style scoped>
@import url('../temp/css/user.css');

.message-item {
    padding: 0 1em;
}
.unread-message {
    min-width: 200px;
    background-color: #fff;
    z-index: 10;
    box-shadow: 1px 1px 7px grey;
    left: 1.5em;
    top: 2.5em;
}
.dropdown small {
    cursor: pointer;
}
.write-post-user-info {
    position: relative;
}
.dropdown__privacy {
    overflow: hidden;
}

.dropdown__privacy--item{
    padding: 0 0.5em;
}
.list__locations {
    padding: 0;
}
.list__cities, .list__places {
    margin-top: 0.5em;
    position: relative;
}
.dropdown__icon {
    position: absolute;
    top: 1.25em;
    right: 1.125em;
}
.dropdown__cities, .dropdown__places {
    margin: 0.5em 0;
    box-shadow: 0px 2px 15px grey;
    height: 10.5em;
    border-radius: 0.25em;
    overflow-y: overlay;
}
.dropdown__item {
    padding: 1em;
    white-space: nowrap;
    overflow-x: hidden;
    overflow-y: auto;
    text-overflow: ellipsis;
}

.dropdown__item:hover, .dropdown__privacy--item:hover, .message-item:hover {
    background-color: #1876f2;
    cursor: pointer;
    color: #fff;
}
#city-modal__input, #place-modal__input {
    width: 100%;
    padding: 1em;
    border-radius: 0.25em;
    outline-color: #1876f2;
    border: 1px solid #ccc;
}

/** */
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

.dropdown-list li:hover {
    background-color: #d5d5d5;
    box-shadow: 0px 2px 15px grey;
    cursor: pointer;
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