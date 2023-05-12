<template>
    <section style="background-color: #eee;">
        <div class="container py-5">
            <div class="row">
                <div class="col">
                    <nav aria-label="breadcrumb" class="bg-light rounded-3 p-3 mb-4">
                        <ol class="breadcrumb mb-0">
                            <li class="breadcrumb-item">
                                <RouterLink to="/latest">Trang chủ</RouterLink>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">Hồ sơ cá nhân</li>
                        </ol>
                    </nav>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-4">
                    <div class="card mb-4">
                        <div class="card-body text-center">
                            <div class="user-avatar" @click="selectImg">
                                <img :src="photo_link" alt="avatar" class="rounded-circle img-fluid"
                                    style="width: 150px;">
                                <input ref="inputFile" id="inputFile" type="file" name="" hidden @change="changeImg">
                            </div>
                            <!-- Display name -->
                            <h5 class="my-3">{{ displayName }} </h5>
                            <input @click="keepActive" v-if="showEditDisplayName" type="text" class="form-control input-edit display-name"
                                        placeholder="Nhập tên hiển thị mới" aria-label="Username" aria-describedby="basic-addon1" v-model="displayName">
                            <div class="edit_button" @click="openEditInput(2, $event)">
                                <font-awesome-icon icon="fa-solid fa-pen" />
                            </div> 
                            <p class="text-muted mb-1">Full Stack Developer</p>
                            <p class="text-muted mb-4">Bay Area, San Francisco, CA</p>
                            <div class="d-flex justify-content-center mb-2">
                                <button type="button" class="btn btn-primary">Follow</button>
                                <button type="button" class="btn btn-outline-primary ms-1">Message</button>
                            </div>
                        </div>
                    </div>
                    <div class="card mb-4 mb-lg-0">
                        <div class="card-body p-0">
                            <ul class="list-group list-group-flush rounded-3">
                                <li class="list-group-item d-flex justify-content-between align-items-center p-3">
                                    <i class="fas fa-globe fa-lg text-warning"></i>
                                    <p class="mb-0">https://mdbootstrap.com</p>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center p-3">
                                    <i class="fab fa-github fa-lg" style="color: #333333;"></i>
                                    <p class="mb-0">mdbootstrap</p>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center p-3">
                                    <i class="fab fa-twitter fa-lg" style="color: #55acee;"></i>
                                    <p class="mb-0">@mdbootstrap</p>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center p-3">
                                    <i class="fab fa-instagram fa-lg" style="color: #ac2bac;"></i>
                                    <p class="mb-0">mdbootstrap</p>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center p-3">
                                    <i class="fab fa-facebook-f fa-lg" style="color: #3b5998;"></i>
                                    <p class="mb-0">mdbootstrap</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-lg-8">
                    <div class="card mb-4">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-sm-3 flex editable">
                                    <p class="mb-0">Họ </p>
                                </div>
                                <div class="col-sm-9 flex editable">
                                    <p class="text-muted mb-0">{{ v_lname }}</p>
                                    <input @click="keepActive" v-if="showEditLastName" type="text" class="form-control input-edit"
                                        placeholder="Nhập họ" aria-label="Username" aria-describedby="basic-addon1" v-model="v_lname">
                                    <div class="edit_button" @click="openEditInput(0, $event)">
                                        <font-awesome-icon icon="fa-solid fa-pen" />
                                    </div>
                                </div>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-sm-3 flex editable">
                                    <p class="mb-0">Tên</p>
                                </div>
                                <div class="col-sm-9 flex editable">
                                    <p class="text-muted mb-0">{{ v_fname }}</p>
                                    <input @click="keepActive" v-if="showEditFirstName" type="text" class="form-control input-edit"
                                        placeholder="Nhập tên" aria-label="Username" aria-describedby="basic-addon1" v-model="v_fname">
                                    <div class="edit_button" @click="openEditInput(1, $event)">
                                        <font-awesome-icon icon="fa-solid fa-pen" />
                                    </div>
                                </div>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-sm-3">
                                    <p class="mb-0">Email</p>
                                </div>
                                <div class="col-sm-9 flex editable">
                                    <p class="text-muted mb-0">{{ v_email }}</p>
                                    <!-- <input @click="keepActive" v-if="showEditDisplayName" type="text" class="form-control input-edit"
                                        placeholder="Nhập email" aria-label="Username" aria-describedby="basic-addon1" v-model="v_email"> -->
                                    <div class="edit_button" @click="verifyEmail" v-if="!isVerified">
                                        <font-awesome-icon class="exclamation" icon="fa-solid fa-triangle-exclamation" />
                                    </div>
                                    <div v-else>
                                        <font-awesome-icon class="checked" :icon="['fas', 'circle-check']"/>
                                    </div>
                                </div>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-sm-3">
                                    <p class="mb-0">Di động</p>
                                </div>
                                <div class="col-sm-9 flex editable">
                                    <p class="text-muted mb-0">{{ v_phone }}</p>
                                    <input @click="keepActive" v-if="showEditPhone" type="text" class="form-control input-edit"
                                        placeholder="Nhập số điện thoại" aria-label="Username"
                                        aria-describedby="basic-addon1" v-model="v_phone" maxlength="10" @keydown="validate('phone')">
                                    <div class="edit_button" @click="openEditInput(3, $event)">
                                        <font-awesome-icon icon="fa-solid fa-pen" />
                                    </div>
                                </div>
                                <p class="error text-danger m-0" v-if="error['phone']">SĐT không hợp lệ</p>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-sm-12">
                                    <button class="btn btn-primary" type="button" @click="update_profile">Cập nhật thông tin</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="card mb-4 mb-md-0">
                                <div class="card-body">
                                    <p class="mb-4"><span class="text-primary font-italic me-1">assigment</span> Project
                                        Status
                                    </p>
                                    <p class="mb-1" style="font-size: .77rem;">Web Design</p>
                                    <div class="progress rounded" style="height: 5px;">
                                        <div class="progress-bar" role="progressbar" style="width: 80%" aria-valuenow="80"
                                            aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    <p class="mt-4 mb-1" style="font-size: .77rem;">Website Markup</p>
                                    <div class="progress rounded" style="height: 5px;">
                                        <div class="progress-bar" role="progressbar" style="width: 72%" aria-valuenow="72"
                                            aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    <p class="mt-4 mb-1" style="font-size: .77rem;">One Page</p>
                                    <div class="progress rounded" style="height: 5px;">
                                        <div class="progress-bar" role="progressbar" style="width: 89%" aria-valuenow="89"
                                            aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    <p class="mt-4 mb-1" style="font-size: .77rem;">Mobile Template</p>
                                    <div class="progress rounded" style="height: 5px;">
                                        <div class="progress-bar" role="progressbar" style="width: 55%" aria-valuenow="55"
                                            aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    <p class="mt-4 mb-1" style="font-size: .77rem;">Backend API</p>
                                    <div class="progress rounded mb-2" style="height: 5px;">
                                        <div class="progress-bar" role="progressbar" style="width: 66%" aria-valuenow="66"
                                            aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="card mb-4 mb-md-0">
                                <div class="card-body">
                                    <p class="mb-4"><span class="text-primary font-italic me-1">assigment</span> Project
                                        Status
                                    </p>
                                    <p class="mb-1" style="font-size: .77rem;">Web Design</p>
                                    <div class="progress rounded" style="height: 5px;">
                                        <div class="progress-bar" role="progressbar" style="width: 80%" aria-valuenow="80"
                                            aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    <p class="mt-4 mb-1" style="font-size: .77rem;">Website Markup</p>
                                    <div class="progress rounded" style="height: 5px;">
                                        <div class="progress-bar" role="progressbar" style="width: 72%" aria-valuenow="72"
                                            aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    <p class="mt-4 mb-1" style="font-size: .77rem;">One Page</p>
                                    <div class="progress rounded" style="height: 5px;">
                                        <div class="progress-bar" role="progressbar" style="width: 89%" aria-valuenow="89"
                                            aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    <p class="mt-4 mb-1" style="font-size: .77rem;">Mobile Template</p>
                                    <div class="progress rounded" style="height: 5px;">
                                        <div class="progress-bar" role="progressbar" style="width: 55%" aria-valuenow="55"
                                            aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    <p class="mt-4 mb-1" style="font-size: .77rem;">Backend API</p>
                                    <div class="progress rounded mb-2" style="height: 5px;">
                                        <div class="progress-bar" role="progressbar" style="width: 66%" aria-valuenow="66"
                                            aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<style lang="scss" scoped>
@use '../temp/css/abstracts/' as ab;
.exclamation {
    color: ab.$danger-color;
}
.checked {
    color: ab.$success-color;
}
.flex {
    display: flex;
}
.edit_button {
    &:hover {
        cursor: pointer;
        opacity: 0.6;
    }
}
.editable {
    justify-content: space-between;
    position: relative;
}

.input-edit {
    position: absolute;
    top: -0.4em;
    max-width: 85%;
    &.display-name {
        top: 47%;
        left: 10%;
    }
}

.img-fluid {
    height: 150px;
}

.user-avatar {
    display: inline-block;
    position: relative;
    min-width: 150px;
}

.user-avatar:hover::after {
    content: "Đổi ảnh";
    background-color: #000;
    position: absolute;
    width: 100%;
    left: 0;
    height: 100%;
    opacity: 0.5;
    border-radius: 50%;
    cursor: pointer;
    color: #fff;
    line-height: 150px;
    cursor: pointer;
}
</style>
<script setup>
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import { RouterLink, useRoute } from 'vue-router';
import { updateProfile, sendEmailVerification } from "firebase/auth";
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, uploadBytes, getStorage, ref as storageReference } from "firebase/storage";
import { ref, onMounted, watchEffect, reactive } from 'vue';
import { db, auth } from '../firebase';
import regex from '../js/regex';
import 'vue3-toastify/dist/index.css';
import store from '../store/store';

const route = useRoute();
const uid = ref(route.params.id);
const showEditDisplayName = ref(false), showEditFirstName = ref(false), showEditPhone = ref(false), showEditLastName = ref(false);
const v_email = ref(''), v_fname = ref(''), v_lname = ref(''), v_phone = ref(''), photo_link = ref(''), displayName = ref('');
const {regexNumberOnly, regexVietNamePhoneNumber} = regex(); 
const error = reactive({});
const isVerified = ref(false);

watchEffect(() => {
    try {
        if (v_phone.value) {
            if(!regexNumberOnly.test(v_phone.value)) {
                v_phone.value = v_phone.value.replace(/[a-zA-Z]/g, '');
            }
        }
    } catch (error) {
        console.log(error);
    }
})
const verifyEmail = async () => {
    try {
        await sendEmailVerification(auth.currentUser);
        store.dispatch('notify', 'Đã gửi email xác nhận thành công, vui lòng kiểm tra email', 'success', 3000);
    } catch (error) {
        store.dispatch('notify', 'Có lỗi xảy ra', 'error', 3000);
        console.log(error);
    }
}
const validate = (key) => {
    if(!regexVietNamePhoneNumber.test(v_phone.value)) {
        error[key] = 'Số đt không hợp lệ'
    }
    else {
        error[key] = ''
    }
};
const keepActive = (event) => {
    event.stopPropagation();
} 
const openEditInput = (type, event) => {
    switch (type) {
        case 0: // Họ
            event.stopPropagation();
            showEditLastName.value = true;
            showEditDisplayName.value = false;
            showEditPhone.value = false;
            showEditFirstName.value = false;
            break;
        case 1:
            event.stopPropagation();
            showEditFirstName.value = true;
            showEditLastName.value = false;
            showEditDisplayName.value = false;
            showEditPhone.value = false;
            break;
        case 2:
            event.stopPropagation();
            showEditFirstName.value = false;
            showEditLastName.value = false;
            showEditDisplayName.value = true;
            showEditPhone.value = false;
            break;
        case 3:
            event.stopPropagation();
            showEditFirstName.value = false;
            showEditLastName.value = false;
            showEditDisplayName.value = false;
            showEditPhone.value = true;
            break;
        default:
            break;
    }
}
const selectImg = () => {
    try {
        const inputFile = document.getElementById('inputFile');
        inputFile.click();
    } catch (error) {
        console.log(error);
    }
}
const changeImg = async (e) => {
    const storage = getStorage();
    // const files = document.getElementById('inputFile');
    let file = e.target.files[0];
    const storageRef = storageReference(storage, `${uid.value}/avatar/${file.name}`);
    const res = uploadBytes(storageRef, file);
    res.then(result => {
        return result.ref;
    })
        .then(resultRef => {
            return getDownloadURL(resultRef);
        })
        .then(link => {
            const docRef = doc(db, 'users', uid.value)
            const db_res = updateDoc(docRef, {
                photoURL: link
            });
            const server_res = updateProfile(auth.currentUser, {
                photoURL: link
            });
            return [db_res, server_res];
        })
        .then(async update_res => {
            console.log(await Promise.all(update_res));
        })
        .catch(error => {
            console.log(error);
        })
    // console.log(e.target.files[0]);

    // const link = await getDownloadURL(storageRef)
    // console.log(link);
}
onMounted(async () => {
    try {
        const docRef = doc(db, "users", uid.value);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            // user_profile.value = docSnap.data();
            v_email.value = docSnap.data().email;
            v_lname.value = docSnap.data().lastName;
            v_fname.value = docSnap.data().firstName;
            v_phone.value = docSnap.data().phoneNumber;
            photo_link.value = docSnap.data().photoURL;
            displayName.value = docSnap.data().displayName;
            isVerified.value = docSnap.data().emailVerified;

        } else {
            console.log("No such document!");
        }
        document.getElementById('app').addEventListener('click', () => {
            showEditDisplayName.value = false;
            showEditFirstName.value = false;
            showEditLastName.value = false;
            showEditPhone.value = false;
        });
    } catch (error) {
        console.log(error);
    }
    
});
const update_profile = async () => {
    try {
        await updateDoc(doc(db, "users", uid.value), {
            firstName: v_fname.value,
            lastName: v_lname.value,
            // email: v_email.value,
            phoneNumber: v_phone.value,
            displayName: displayName.value
        });
        await updateProfile(auth.currentUser, {
            displayName: displayName.value
        });
        store.dispatch('notify', 'Cập nhật thông tin cá nhân thành công', 'success', 3000);
    } catch (error) {
        console.log(error);
    }
}


</script>