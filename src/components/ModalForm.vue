<template>
    <div class="modal-custom">
        <div class="sub-blog">
            <div class="sub-blog__title flex">
                <div tool>
                    <el-tooltip class="box-item" effect="dark" content="Bấm chọn số sao để đánh giá địa điểm này"
                        placement="top-start">
                    <el-rate 
                        v-model="rate" 
                        :texts="['Rất tệ', 'Kém', 'Bình thường', 'Tốt', 'Rất hài lòng']" 
                        @change="updateStar"
                        :colors="['#dc3545', '#F7BA2A', '#db9f12']"
                        show-text/>
                    </el-tooltip>
                </div>
                <div class="title">{{ modal_content.name }}</div>
                <div class="sub-blog__icon--exit" @click="sendEventClose">
                    <font-awesome-icon icon="fa-solid fa-xmark" class="xmark-icon"/>
                </div>
            </div>
            <div class="scrollable">
                <div>{{ modal_content.content }}</div>
                <div class="sub-blog__post" v-if="image_length > 0">
                    <div class="sub-blog__post-slider">
                        <Slider :post="modal_content.images"/>
                    </div>
                </div>
                
                <div class="sub-blog__features flex">
                    <div class="sub-blog__features-thumbs-up feature">
                        <div @click="toggleReaction(modal_content.id, '', $event, 0, 'Thích')">
                            <!-- <font-awesome-icon icon="fa-solid fa-thumbs-up" :class="setLikeButton(modal_content['reactions']) ? 'reacted' : ''"/> -->
                            <img v-if="emoji_type === 'like'" @click="toggleReaction(modal_content.id, 'like', $event, 0, 'Thích')" class="dynamic-emoji" src="../temp/css/assets/images/icons/like.svg" alt="Thích">
                            <img v-else-if="emoji_type === 'love'" @click="toggleReaction(modal_content.id, 'love', $event, 0, 'Yêu thương')" class="love dynamic-emoji" src="../temp/css/assets/images/icons/love.svg" alt="Yêu thích">
                            <img v-else-if="emoji_type === 'care'" @click="toggleReaction(modal_content.id, 'care', $event, 0, 'Thương thương')" class="care dynamic-emoji" src="../temp/css/assets/images/icons/care.svg" alt="Thương thương">
                            <img v-else-if="emoji_type === 'haha'" @click="toggleReaction(modal_content.id, 'haha', $event, 0, 'Haha')" class="haha dynamic-emoji" src="../temp/css/assets/images/icons/haha.svg" alt="Haha">
                            <img v-else-if="emoji_type === 'wow'" @click="toggleReaction(modal_content.id, 'wow', $event, 0, 'Wow')" class="wow dynamic-emoji" src="../temp/css/assets/images/icons/wow.svg" alt="Wow">
                            <img v-else-if="emoji_type === 'sad'" @click="toggleReaction(modal_content.id, 'sad', $event, 0, 'Buồn')" class="sad dynamic-emoji" src="../temp/css/assets/images/icons/sad.svg" alt="Buồn">
                            <img v-else-if="emoji_type === 'angry'" @click="toggleReaction(modal_content.id, 'angry', $event, 0, 'Phẫn nộ')" class="angry dynamic-emoji" src="../temp/css/assets/images/icons/angry.svg" alt="Phẫn nộ">
                            <span> {{ reaction_title }}</span>
                            <div class="icon-container">
                                <img @click="toggleReaction(modal_content.id, 'like', $event, 1, 'Thích')" class="like emoji" src="../temp/css/assets/images/icons/like.svg" alt="Thích">
                                <img @click="toggleReaction(modal_content.id, 'love', $event, 1, 'Yêu thích')" class="love emoji" src="../temp/css/assets/images/icons/love.svg" alt="Yêu thích">
                                <img @click="toggleReaction(modal_content.id, 'care', $event, 1, 'Thương thương')" class="care emoji" src="../temp/css/assets/images/icons/care.svg" alt="Thương thương">
                                <img @click="toggleReaction(modal_content.id, 'haha', $event, 1, 'Haha')" class="haha emoji" src="../temp/css/assets/images/icons/haha.svg" alt="Haha">
                                <img @click="toggleReaction(modal_content.id, 'wow', $event, 1, 'Wow')" class="wow emoji" src="../temp/css/assets/images/icons/wow.svg" alt="Wow">
                                <img @click="toggleReaction(modal_content.id, 'sad', $event, 1, 'Buồn')" class="sad emoji" src="../temp/css/assets/images/icons/sad.svg" alt="Buồn">
                                <img @click="toggleReaction(modal_content.id, 'angry', $event, 1, 'Phẫn nộ')" class="angry emoji" src="../temp/css/assets/images/icons/angry.svg" alt="Phẫn nộ">
                            </div>
                        </div>
                    </div>
                    <div class="sub-blog__features-comments feature">
                        <div>
                            <font-awesome-icon icon="fa-solid fa-comment" />
                            Bình luận
                        </div>
                    </div>
                    <div class="sub-blog__features-share feature">
                        <div>
                            <font-awesome-icon icon="fa-solid fa-share" />
                            Chia sẻ
                        </div>
                    </div>
                </div>
                
                
                <CommentBlock :commentList="commentList"
                @addReplyComment="addReplyComment(modal_content.id)"
                @deleteComment="deleteComment(modal_content.id)" 
                @editComment="editComment(modal_content.id)" />

                <div class="post-comment-input border-secondary-subtle">
                    <div class="comment__input">
                        <textarea v-model="comment" style="resize: none;" class="form-control" id="exampleFormControlTextarea1"
                            rows="3" placeholder="Viết bình luận công khai" @keyup.enter="postComment(modal_content.id)"></textarea>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import {ref, onMounted} from 'vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import 'vue3-carousel/dist/carousel.css'
import '@fortawesome/vue-fontawesome';
import store from '../store/store';
import Slider from './Slider.vue';
import CommentBlock from './CommentBlock.vue';
import resource from '../js/resource';
import { uuid } from 'vue3-uuid';
import {db, auth} from '../firebase';
import { updateDoc, doc, arrayUnion } from 'firebase/firestore';
import { ElRate, ElTooltip } from "element-plus";
import 'element-plus/dist/index.css';

// export default {
//     components: { Carousel, Slide, Navigation, Slider, CommentBlock },
//     props: ['des'],
//     setup(props, {emit}) {
//         let currentSlide = ref(0);
//         const modal_content = ref({});
//         const image_length = ref(0);
//         const comment = ref('');
//         const {POSTS, DESTINATIONS, USERS} = resource();
//         const uid = ref('');
//         const commentList = ref([]);
//         onMounted(() => {
//             modal_content.value = store.getters.getModal;
//             image_length.value = store.getters.getModal.images.length;
//             uid.value = auth.currentUser.uid;
//             commentList.value = modal_content.value.comments;
//         });
//         watch(store.getters.getModal, (newValue, oldVal) => {
//             // modal_content.value = newValue;
//         });
//         console.log(props.des);
//         const slideTo = (val) => {
//             currentSlide.value = val
//         };
//         const getImageUrl = (name) => {
//             return new URL(name, import.meta.url).href
//         }
//         const sendEventClose = () => {
//             emit('closeModal', false);
//         };
//         const postComment = async (post_id) => {
//             const generated_id = uuid.v4();
//             const current_time = Date.now();
//             await updateDoc(doc(db, DESTINATIONS, post_id), {
//                 comments: arrayUnion({ user_id: uid.value, id: generated_id, text: comment.value, created_date: current_time })
//             });
//             commentList.value.push({ user_id: uid.value, id: generated_id, text: comment.value, created_date: current_time })
//             comment.value = '';
//         };
//         const editComment = async (id, index) => {
//             const edit_obj = store.getters.getEdit;
//             const t = modal_content.value['comments'];

//             for (const iterator of t) {
//                 if (iterator.id === edit_obj.id) {
//                     iterator.text = edit_obj.text;
//                 }
//             }
//             try {
//                 await updateDoc(doc(db, DESTINATIONS, id), {
//                     comments: t,
//                 });
//             } catch (error) {
//                 console.log(error);
//             }
//             notify('Chỉnh sửa comment thành công', 'success');
//         };
//         const addReplyComment = async (id, index) => {
//             try {
//                 await updateDoc(doc(db, DESTINATIONS, id), {
//                     comments: arrayUnion(store.getters.getReply)
//                 });
//             } catch (error) {
//                 console.log(error);
//             }

//             modal_content.value['comments'].push(store.getters.getReply);
//         };

//         const deleteComment = async (id, index) => {
//             const delete_id = store.getters.getDelete;
//             const filtered_comment = modal_content.value['comments'].filter(comment => comment.id !== delete_id);
//             const filtered_children = filtered_comment.filter(comment => comment.pID !== delete_id);
//             try {
//                 await updateDoc(doc(db, DESTINATIONS, id), {
//                     comments: filtered_children,
//                 });
//                 notify('Xóa comment thành công', 'success');
//                 modal_content.value['comments'] = filtered_children;
//             } catch (error) {
//                 notify('Xóa comment thất bại', 'error');
//                 console.log(error);
//             }
//         };
//         const notify = (message, type) => {
//             toast(message, {
//                 autoClose: 3000,
//                 type: type
//             });
//         }
//         return {slideTo, currentSlide, getImageUrl, sendEventClose, modal_content, 
//             image_length, postComment, comment, addReplyComment, editComment, deleteComment,
//             commentList
//         };
//     }
// }
const emit = defineEmits(['closeModal', 'reFetchData']);
const props = defineProps(['data']);
const modal_content = ref({});
const image_length = ref(0);
const comment = ref('');
const {DESTINATIONS} = resource();
const uid = ref('');
const commentList = ref([]);
const emoji_type = ref('');
const reaction_title = ref('Thích');
const rate = ref(0), rate_array = ref([]);


onMounted(() => {
    try {
        modal_content.value = store.getters.getModal;
        image_length.value = store.getters.getModal.images.length;
        uid.value = auth.currentUser.uid;
        commentList.value = modal_content.value.comments;
        getRate();
        setDefaultReaction();
    } catch (error) {
        console.log(error);
    }
});

const updateStar = async () => {
    try {
        let temp = [], count = 0;
        modal_content.value['rate'] = rate_array.value.filter(item => {
            if(item.uid === uid.value) {
                item.stars = rate.value;
                temp.push(item);
                count++;
            }
            return temp;
        })
    
        if(count) {
            await updateDoc(doc(db, DESTINATIONS, modal_content.value.id) , {
                rate: modal_content.value['rate'],
            });
        }
        else {
            modal_content.value['rate'].push({uid: uid.value, stars: rate.value});
            await updateDoc(doc(db, DESTINATIONS, modal_content.value.id) , {
                rate: modal_content.value['rate'],
            });
        }
        notify('Đánh giá địa điểm thành công', 'success', 2000);
    } catch (error) {
        console.log(error);
        notify('Có lỗi xảy ra', 'error', 2000);
    }
    // temp = [];
}

const getRate = () => {
    rate_array.value = modal_content.value.rate;
    let found = rate_array.value.find(item => item.uid === uid.value);
    if(found) {
        rate.value = found.stars;
    }
    else {
        rate.value = 0;
    }
}

const sendEventClose = () => {
    emit('closeModal', false);
};
const postComment = async (post_id) => {
    const generated_id = uuid.v4();
    const current_time = Date.now();
    await updateDoc(doc(db, DESTINATIONS, post_id), {
        comments: arrayUnion({ user_id: uid.value, id: generated_id, text: comment.value, created_date: current_time })
    });
    commentList.value.push({ user_id: uid.value, id: generated_id, text: comment.value, created_date: current_time })
    comment.value = '';
};
const editComment = async (id) => {
    const edit_obj = store.getters.getEdit;
    const t = modal_content.value['comments'];

    for (const iterator of t) {
        if (iterator.id === edit_obj.id) {
            iterator.text = edit_obj.text;
        }
    }
    try {
        await updateDoc(doc(db, DESTINATIONS, id), {
            comments: t,
        });
    } catch (error) {
        console.log(error);
    }
    notify('Chỉnh sửa comment thành công', 'success');
};
const addReplyComment = async (id) => {
    try {
        await updateDoc(doc(db, DESTINATIONS, id), {
            comments: arrayUnion(store.getters.getReply)
        });
    } catch (error) {
        console.log(error);
    }

    modal_content.value['comments'].push(store.getters.getReply);
};

const deleteComment = async (id) => {
    const delete_id = store.getters.getDelete;
    const filtered_comment = modal_content.value['comments'].filter(comment => comment.id !== delete_id);
    const filtered_children = filtered_comment.filter(comment => comment.pID !== delete_id);
    try {
        await updateDoc(doc(db, DESTINATIONS, id), {
            comments: filtered_children,
        });
        notify('Xóa comment thành công', 'success');
        modal_content.value['comments'] = filtered_children;
    } catch (error) {
        notify('Xóa comment thất bại', 'error');
        console.log(error);
    }
};
/**
 * Nút thả cảm xúc
 * @param {id comment} id 
 * @param {loại emoji} type 
 * @param {event} event 
 * @param {loại chức năng} t 
 */
const toggleReaction = async (id, type, event, t, title) => {
    try {
        event.stopPropagation();
        const reaction_obj = { uid: auth.currentUser.uid, type: type, title:title };
        const promises = [reaction_obj];
        await Promise.all(promises)
        const result = modal_content.value['reactions'].some(elem => { return elem.uid === reaction_obj.uid });
        emoji_type.value = type;
        reaction_title.value = title;
        let temp_arr = [];
        if (!result) {
            modal_content.value['reactions'].push(reaction_obj);
            await updateDoc(doc(db, DESTINATIONS, id), {
                reactions: modal_content.value['reactions'],
            });
        }
        else {
            if(t === 0) { // Nếu là bỏ cảm xúc
                modal_content.value['reactions'] = modal_content.value['reactions'].filter(elem => elem.uid !== reaction_obj.uid)
                await updateDoc(doc(db, DESTINATIONS, id), {
                    reactions: modal_content.value['reactions'],
                });
            }
            else if (t === 1) { // Nếu là thay đổi cảm xúc
                modal_content.value['reactions'] = modal_content.value['reactions'].filter(elem => {
                    if(elem.uid === reaction_obj.uid) {
                        elem.title = title;
                        elem.type = type;
                        temp_arr.push(elem);
                    }
                    return temp_arr;
                });
                await updateDoc(doc(db, DESTINATIONS, id), {
                    reactions: modal_content.value['reactions'],
                });
            }
        }
    } catch (error) {
        console.log(error);
    } finally {
        console.log('React thành công');
    }
}
const setDefaultReaction = () => {
    try {
        const array_reaction = modal_content.value['reactions'];
        let result = array_reaction.some(item => {
            return item.uid === uid.value
        })
        if(!result) {
            reaction_title.value = 'Thích';
            emoji_type.value = '';
        }
        else {
            let temp_arr = [];
            array_reaction.forEach(item => {
                if(item.uid === uid.value) {
                    reaction_title.value = item.title;
                    emoji_type.value = item.type;
                }
            });
            // modal_content.value['reactions'] = modal_content.value['reactions'].filter(item => {
            //     if(item.uid === uid.value) {
            //         item.title = reaction_title.value;
            //         item.type = emoji_type.value;
            //         temp_arr.push(item)
            //     }
            //     else {
            //         temp_arr.push(item);
            //     }
            //     return temp_arr;
            // });
            // console.log(modal_content.value);
            // store.dispatch('setModal', )
        }
    } catch (error) {
        console.log(error);
    }
}
const notify = (message, type) => {
    toast(message, {
        autoClose: 3000,
        type: type
    });
}
</script>
<style lang="scss" scoped>
@use '../temp/css/abstracts' as ab;
@use '../temp/css/layouts/admin/subBlog';
@use '../temp/css/layouts/admin/test';
@use '../temp/css/components/scrollbar';

.demo-rate-block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  display: inline-block;
  width: 49%;
  box-sizing: border-box;
}
.demo-rate-block:last-child {
  border-right: none;
}
.demo-rate-block .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}


.dynamic-emoji {
    width: 1.5em;
}
.sub-blog__features-thumbs-up:hover {
    .icon-container {
        display: flex;
        position: absolute;
        left: 0;
        top: 2.8em;
        transition: background ease-in-out 1s;
        .like, .love, .care, .haha, .wow, .sad, .angry {
            &:hover {
                box-shadow: 0px 0px 7px grey;
            }
        }
    }
}
.icon-container {
    background-color: #fff;
    z-index: 9;
    padding: 0.25em;
    border-radius: 1.25em;
    box-shadow: 0px 0px 7px grey;
    display: none;
    .emoji {
        width: 2em;
        border-radius: 50%;
        &:not(:first-child) {
            margin-left: 0.5em;
        }
    }
}
.reacted {
    color: #1786f2;
}
.sub-blog {
    &__features {
        position: sticky;
        width: 100%;
        background-color: #fff;
        bottom: -20.4em;
    }
}
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