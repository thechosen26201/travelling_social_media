<template>
    <div class="status-field-container write-post-container" v-for="(post, index) in listPost" :key="post.id">
        <div class="user-profile-box">
            <div class="user-profile">
                <img :src="getImageUrl(post.photoURL)" alt="">
                <div>
                    <p> {{ post.displayName}}</p>
                    <small>{{ convertTimestampToDate(post.created_date) }}</small>
                </div>
            </div>
            <div class="options" @click="openPostOptions($event)" v-if="post.user_id === uid">
                <font-awesome-icon icon="fa-solid fa-ellipsis" />
                <div class="options-dropdown" v-if="isShowPostOptions">
                    <div class="options--item">Chỉnh sửa</div>
                    <div class="options--item text-danger" @click="deletePost(post.id)">Xóa bài viết</div>
                </div>
            </div>
        </div>
        <div class="status-field">
            <p>{{ post['content'] }}</p>

            <div class="sub-blog__post" v-if="post['images'].length > 0">
                <div class="sub-blog__post-slider">
                    <Slider :post="post['images']" />
                </div>
            </div>
        </div>
        <div class="post-reaction">
            <div class="activity-icons">
                <div @click="toggleReaction(post.id, index)" class="thumb-ups-btn">
                    <img src="../temp/css/assets/images/user_img/like-blue.png" alt="" v-if="setLikeButton(post['reactions'])">
                    <img src="../temp/css/assets/images/user_img/like.png" alt="" v-else>
                    {{ post['reactions'].length }}
                    <div class="icon-container">
                        <img class="like emoji" src="../temp/css/assets/images/icons/like.svg" alt="Thích">
                        <img class="love emoji" src="../temp/css/assets/images/icons/love.svg" alt="Yêu thích">
                        <img class="care emoji" src="../temp/css/assets/images/icons/care.svg" alt="Thương thương">
                        <img class="haha emoji" src="../temp/css/assets/images/icons/haha.svg" alt="Haha">
                        <img class="wow emoji" src="../temp/css/assets/images/icons/wow.svg" alt="Wow">
                        <img class="sad emoji" src="../temp/css/assets/images/icons/sad.svg" alt="Buồn">
                        <img class="angry emoji" src="../temp/css/assets/images/icons/angry.svg" alt="Phẫn nộ">
                    </div>
                </div>
                <div @click="toggleCommentBlock(post['comments'], commentArray.includes(post['comments']))">
                    <img src="../temp/css/assets/images/user_img/comments.png" alt="">
                    {{ post['comments'].length }}
                </div>
                <!-- <div><img src="../temp/css/assets/images/user_img/share.png" alt="">35</div> -->
                
                <div>
                    
                    <!-- <img v-if="emoji_type[index] === 'like'" @click="toggleReaction(post.id, 'like', $event, 0, 'Thích', index)" class="dynamic-emoji" src="../temp/css/assets/images/icons/like.svg" alt="Thích">
                    <img v-else-if="emoji_type[index] === 'love'" @click="toggleReaction(post.id, 'love', $event, 0, 'Yêu thương', index)" class="love dynamic-emoji" src="../temp/css/assets/images/icons/love.svg" alt="Yêu thích">
                    <img v-else-if="emoji_type[index] === 'care'" @click="toggleReaction(post.id, 'care', $event, 0, 'Thương thương', index)" class="care dynamic-emoji" src="../temp/css/assets/images/icons/care.svg" alt="Thương thương">
                    <img v-else-if="emoji_type[index] === 'haha'" @click="toggleReaction(post.id, 'haha', $event, 0, 'Haha', index)" class="haha dynamic-emoji" src="../temp/css/assets/images/icons/haha.svg" alt="Haha">
                    <img v-else-if="emoji_type[index] === 'wow'" @click="toggleReaction(post.id, 'wow', $event, 0, 'Wow', index)" class="wow dynamic-emoji" src="../temp/css/assets/images/icons/wow.svg" alt="Wow">
                    <img v-else-if="emoji_type[index] === 'sad'" @click="toggleReaction(post.id, 'sad', $event, 0, 'Buồn', index)" class="sad dynamic-emoji" src="../temp/css/assets/images/icons/sad.svg" alt="Buồn">
                    <img v-else-if="emoji_type[index] === 'angry'" @click="toggleReaction(post.id, 'angry', $event, 0, 'Phẫn nộ', index)" class="angry dynamic-emoji" src="../temp/css/assets/images/icons/angry.svg" alt="Phẫn nộ">
                    <span> {{ setLikeButton(post['reactions']) }}</span>  -->
                    
                </div>
            </div>
        </div>
        
        <div class="post-list-comment border-secondary-subtle" v-if="commentArray.includes(post['comments'])">
        <!-- <div class="post-list-comment border-secondary-subtle"> -->

            <CommentBlock :commentList="post['comments']"
                @addReplyComment="addReplyComment(post.id, index)"
                @deleteComment="deleteComment(post.id, index)" 
                @editComment="editComment(post.id, index)" />

        </div>
        <div class="post-comment-input border-secondary-subtle">
            <div class="comment__input">
                <textarea v-model="comment" style="resize: none;" class="form-control" id="exampleFormControlTextarea1"
                    rows="3" placeholder="Viết bình luận công khai" @keyup.enter="postComment(post.id, index)"></textarea>
            </div>
        </div>
    </div>
    <DialogMessage v-if="isShowDialog" 
        @closeDialog="closeDialog" :content="'Bạn có muốn xóa bài viết này?'" 
        @confirmDialog="confirmDialog"/>
</template>
<script setup>
import { onMounted, ref, watchEffect } from 'vue';
import CommentBlock from '../components/CommentBlock.vue';
import Slider from '../components/Slider.vue';
import { collection, doc, getDoc, getDocs, updateDoc, arrayUnion, query, where, deleteDoc, orderBy} from "firebase/firestore";
import { onAuthStateChanged } from '@firebase/auth';
import { db, auth } from '../firebase/index';
import store from '../store/store';
import { uuid } from 'vue3-uuid';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import DialogMessage from '../components/DialogMessage.vue';
import resource from '../js/resource';

// export default {
//     name: 'LatestView',
//     components: { CommentBlock, Slider, DialogMessage },
//     setup(props, {emit}) {
//         const comment = ref('');
//         const listPost = ref([]);
//         const uid = ref(null);
//         const commentArray = ref([]);
//         const isShowPostOptions = ref(false);
//         const isShowDialog = ref(false);
//         const postID = ref(''); 
//         const {POSTS} = resource();
//         const reaction_title = ref('Thích');

//         onMounted(() => {
//             fetchPost();
//             onAuthStateChanged(auth, (user) => {
//                 if (user) {
//                     uid.value = user.uid;
//                 }
//             });
//             document.getElementById("app").addEventListener('click', () => {
//                 isShowPostOptions.value = false
//             })
//         });
//         watchEffect(() => {
//             if(store.state.isFetch) {fetchPost(); store.dispatch('setFetchFlag', false); console.log('ok');}

//         })
//         const openPostOptions = (event) => {
//             event.stopPropagation();
//             isShowPostOptions.value = true;
//         };
//         const deletePost = (post_id) => {
//             postID.value = post_id;
//             isShowDialog.value = true;
//         };
//         const confirmDialog = async () => {
//             try {
//                 const docRef = doc(db, POSTS, postID.value);
//                 await deleteDoc(docRef);
//                 listPost.value = listPost.value.filter(post => post.id !== postID.value);
//                 notify('Xóa post thành công', 'success')
//             } catch (error) {
//                 console.log(error);
//                 notify('Có lỗi xảy ra', 'error')
//             } 
//             finally {
//                 postID.value = '';
//                 console.log('Completed');
//             }
//         }
//         const closeDialog = (closeDialog) => {isShowDialog.value = closeDialog};
//         const convertTimestampToDate = (time) => {
//             //time should be server timestamp seconds only
//             let date = time.toDate();
//             let mm = date.getMonth();
//             let dd = date.getDate();
//             let yyyy = date.getFullYear();

//             date = dd + '/' + mm + '/' + yyyy + ' ' + date.toLocaleTimeString();
//             return date;
//         }
//         const toggleCommentBlock = (array_comment, isInclude) => {
//             if(isInclude) {
//                 commentArray.value = commentArray.value.filter(item => item !== array_comment)
//             }
//             else {
//                 commentArray.value.push(array_comment);
//             }
//         };
//         const notify = (message, type) => {
//             toast(message, {
//                 autoClose: 3000,
//                 type: type
//             });
//         }
//         const toggleReaction = async (id, index) => {
//             try {
//                 const reaction_obj = { uid: await getCurrentUserId() };
//                 const promises = [reaction_obj];
//                 Promise.all(promises)
//                     .then(async() => {
//                         const result = listPost.value[index]['reactions'].some(elem => { return elem.uid === reaction_obj.uid });
//                         if (!result) {
//                             listPost.value[index]['reactions'].push(reaction_obj);
//                             const update = await updateDoc(doc(db, POSTS, id), {
//                                 reactions: listPost.value[index]['reactions'],
//                             });
//                         }
//                         else {
//                             listPost.value[index]['reactions'] = listPost.value[index]['reactions'].filter(elem => elem.uid !== reaction_obj.uid)
//                             const update = await updateDoc(doc(db, POSTS, id), {
//                                 reactions: listPost.value[index]['reactions'],
//                             });
//                         }
//                     })
//             } catch (error) {
//                 console.log(error);
//             } finally {
//                 console.log('React thành công');
//             }
//         };

//         const setLikeButton = (array_reaction) => {
//             try {
//                 let result = array_reaction.some(item => {
//                     return item.uid === uid.value
//                 })
//                 return result;
//             } catch (error) {
//                 console.log(error);
//             }
//         }
//         const getCurrentUserId = async () => {
//             await store.dispatch('setUser');
//             return await store.getters.getUser.uid;
//         };
        
        

//         const editComment = async (id, index) => {
//             const edit_obj = store.getters.getEdit;
//             const t = listPost.value[index]['comments'];

//             for (const iterator of t) {
//                 if (iterator.id === edit_obj.id) {
//                     iterator.text = edit_obj.text;
//                 }
//             }
//             try {
//                 await updateDoc(doc(db, POSTS, id), {
//                     comments: t,
//                 });
//             } catch (error) {
//                 console.log(error);
//             }
//             notify('Chỉnh sửa comment thành công', 'success');
//         };
//         const addReplyComment = async (id, index) => {
//             try {
//                 await updateDoc(doc(db, POSTS, id), {
//                     comments: arrayUnion(store.getters.getReply)
//                 });
//             } catch (error) {
//                 console.log(error);
//             }

//             listPost.value[index]['comments'].push(store.getters.getReply);
//         };

//         const deleteComment = async (id, index) => {
//             const delete_id = store.getters.getDelete;
//             const filtered_comment = listPost.value[index]['comments'].filter(comment => comment.id !== delete_id);
//             const filtered_children = filtered_comment.filter(comment => comment.pID !== delete_id);
//             try {
//                 await updateDoc(doc(db, POSTS, id), {
//                     comments: filtered_children,
//                 });
//                 notify('Xóa comment thành công', 'success');
//                 listPost.value[index]['comments'] = filtered_children;
//             } catch (error) {
//                 notify('Xóa comment thất bại', 'error');
//                 console.log(error);
//             }
//         };

//         const postComment = async (post_id, index) => {
//             const generated_id = uuid.v4();
//             await updateDoc(doc(db, POSTS, post_id), {
//                 comments: arrayUnion({ user_id: uid.value, id: generated_id, text: comment.value, created_date: Date.now() })
//             });
//             listPost.value[index]['comments'].push({ user_id: uid.value, id: generated_id, text: comment.value, created_date: Date.now() })
//             comment.value = '';
//         };

//         const getImageUrl = (name) => {
//             return new URL(name, import.meta.url).href
//         }
//         const getPostInfo = async (user_id) => {
//             const docRef = doc(db, "users", user_id);
//             const docSnap = await getDoc(docRef);
//             return docSnap.data();
//         };
//         const fetchPost = async (number = 1) => {
//             const q = query(collection(db, POSTS), where("isApproved", "==", true), orderBy('created_date', 'desc'));
//             const querySnapshot = await getDocs(q);
//             let i = 0;
//             querySnapshot.forEach((doc) => {
//                 const id = doc.data().user_id;
//                 let res = getPostInfo(id);
//                 res.then(result => {return result})
//                 .then(obj => {
//                     listPost.value.push({ id: doc.id, ...obj ,...doc.data()});
//                     // i++;
//                 })
//             });
//         }
        
//         return {
//             comment, postComment,
//             listPost, getImageUrl, fetchPost, addReplyComment, deleteComment, editComment,
//             toggleReaction, setLikeButton, commentArray, toggleCommentBlock, getPostInfo, 
//             convertTimestampToDate, openPostOptions, isShowPostOptions, deletePost, uid, isShowDialog,
//             closeDialog, confirmDialog
//         };
//     }
// }

const comment = ref('');
const listPost = ref([]);
const uid = ref(null);
const commentArray = ref([]);
const isShowPostOptions = ref(false);
const isShowDialog = ref(false);
const postID = ref(''); 
const {POSTS} = resource();
const emoji_type = ref([]);
const reaction_title = ref([]);

onMounted(() => {
    fetchPost();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            uid.value = user.uid;
        }
    });
    document.getElementById("app").addEventListener('click', () => {
        isShowPostOptions.value = false
    })
});
watchEffect(() => {
    if(store.state.isFetch) {fetchPost(); store.dispatch('setFetchFlag', false); console.log('ok');}

})
const openPostOptions = (event) => {
    event.stopPropagation();
    isShowPostOptions.value = true;
};
const deletePost = (post_id) => {
    postID.value = post_id;
    isShowDialog.value = true;
};
const confirmDialog = async () => {
    try {
        const docRef = doc(db, POSTS, postID.value);
        await deleteDoc(docRef);
        listPost.value = listPost.value.filter(post => post.id !== postID.value);
        notify('Xóa post thành công', 'success')
    } catch (error) {
        console.log(error);
        notify('Có lỗi xảy ra', 'error')
    } 
    finally {
        postID.value = '';
        console.log('Completed');
    }
}
const closeDialog = (closeDialog) => {isShowDialog.value = closeDialog};
const convertTimestampToDate = (time) => {
    //time should be server timestamp seconds only
    let date = time.toDate();
    let mm = date.getMonth();
    let dd = date.getDate();
    let yyyy = date.getFullYear();

    date = dd + '/' + mm + '/' + yyyy + ' ' + date.toLocaleTimeString();
    return date;
}
const toggleCommentBlock = (array_comment, isInclude) => {
    if(isInclude) {
        commentArray.value = commentArray.value.filter(item => item !== array_comment)
    }
    else {
        commentArray.value.push(array_comment);
    }
};
const notify = (message, type) => {
    toast(message, {
        autoClose: 3000,
        type: type
    });
}
const toggleReaction = async (id, index) => {
    try {
        const reaction_obj = { uid: await getCurrentUserId() };
        const promises = [reaction_obj];
        await Promise.all(promises)
        const result = listPost.value[index]['reactions'].some(elem => { return elem.uid === reaction_obj.uid });
        if (!result) {
            listPost.value[index]['reactions'].push(reaction_obj);
            await updateDoc(doc(db, POSTS, id), {
                reactions: listPost.value[index]['reactions'],
            });
        }
        else {
            listPost.value[index]['reactions'] = listPost.value[index]['reactions'].filter(elem => elem.uid !== reaction_obj.uid)
            await updateDoc(doc(db, POSTS, id), {
                reactions: listPost.value[index]['reactions'],
            });
            // if(t === 0) { // Nếu là bỏ cảm xúc
            //     listPost.value[index]['reactions'] = listPost.value[index]['reactions'].filter(elem => elem.uid !== reaction_obj.uid)
            //     await updateDoc(doc(db, POSTS, id), {
            //         reactions: listPost.value[index]['reactions'],
            //     });
            // }
            // else if (t === 1) { // Nếu là thay đổi cảm xúc
            //     listPost.value[index]['reactions'] = listPost.value[index]['reactions'].filter(elem => {
            //         if(elem.uid === reaction_obj.uid) {
            //             elem.title = title;
            //             elem.type = type;
            //             temp_arr.push(elem);
            //         }
            //         return temp_arr;
            //     });
            //     await updateDoc(doc(db, POSTS, id), {
            //         reactions: listPost.value[index]['reactions'],
            //     });
            // }
        }
    } catch (error) {
        console.log(error);
    } finally {
        console.log('React thành công');
    }
};

const setLikeButton = (array_reaction) => {
    try {
        let result = array_reaction.some(item => {
            return item.uid === uid.value
        })
        return result;
        // let result = array_reaction.some(item => {
        //     return item.uid === uid.value
        // })
        // if(!result) {
        //     reaction_title.value[index] = 'Thích';
        //     emoji_type.value[index] = '';
        // }
        // else {
        //     array_reaction.forEach(item => {
        //         if(item.uid === uid.value) {
        //             reaction_title.value[index] = item.title;
        //             emoji_type.value[index] = item.type;
        //         }
        //     });
        // }
    } catch (error) {
        console.log(error);
    }
}
const getCurrentUserId = async () => {
    await store.dispatch('setUser');
    return await store.getters.getUser.uid;
};



const editComment = async (id, index) => {
    const edit_obj = store.getters.getEdit;
    const t = listPost.value[index]['comments'];

    for (const iterator of t) {
        if (iterator.id === edit_obj.id) {
            iterator.text = edit_obj.text;
        }
    }
    try {
        await updateDoc(doc(db, POSTS, id), {
            comments: t,
        });
    } catch (error) {
        console.log(error);
    }
    notify('Chỉnh sửa comment thành công', 'success');
};
const addReplyComment = async (id, index) => {
    try {
        await updateDoc(doc(db, POSTS, id), {
            comments: arrayUnion(store.getters.getReply)
        });
    } catch (error) {
        console.log(error);
    }

    listPost.value[index]['comments'].push(store.getters.getReply);
};

const deleteComment = async (id, index) => {
    const delete_id = store.getters.getDelete;
    const filtered_comment = listPost.value[index]['comments'].filter(comment => comment.id !== delete_id);
    const filtered_children = filtered_comment.filter(comment => comment.pID !== delete_id);
    try {
        await updateDoc(doc(db, POSTS, id), {
            comments: filtered_children,
        });
        notify('Xóa comment thành công', 'success');
        listPost.value[index]['comments'] = filtered_children;
    } catch (error) {
        notify('Xóa comment thất bại', 'error');
        console.log(error);
    }
};

const postComment = async (post_id, index) => {
    const generated_id = uuid.v4();
    await updateDoc(doc(db, POSTS, post_id), {
        comments: arrayUnion({ user_id: uid.value, id: generated_id, text: comment.value, created_date: Date.now() })
    });
    listPost.value[index]['comments'].push({ user_id: uid.value, id: generated_id, text: comment.value, created_date: Date.now() })
    comment.value = '';
};

const getImageUrl = (name) => {
    return new URL(name, import.meta.url).href
}
const getPostInfo = async (user_id) => {
    const docRef = doc(db, "users", user_id);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
};
const fetchPost = async (number = 1) => {
    const q = query(collection(db, POSTS), where("isApproved", "==", true), orderBy('created_date', 'desc'));
    const querySnapshot = await getDocs(q);
    let i = 0;
    querySnapshot.forEach((doc) => {
        const id = doc.data().user_id;
        let res = getPostInfo(id);
        res.then(result => {return result})
        .then(obj => {
            listPost.value.push({ id: doc.id, ...obj ,...doc.data()});
            // i++;
        })
    });
}
        
        
</script>
<style lang="scss" scoped>
// @import url('../temp/css/user.css');
@use '../temp/css/user.scss';
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
.thumb-ups-btn:hover {
    position: relative;
    .icon-container {
        display: flex;
        position: absolute;
        left: 0;
        top: 1.5em;
        .like, .love, .care, .haha, .wow, .sad, .angry {
            &:hover {
                box-shadow: 0px 0px 7px grey;
            }
        }
    }
}
.options {
    position: relative;
    &:hover {
        cursor: pointer;
    }
}
.options-dropdown {
    background-color: #fff;
    position: absolute;
    right: 0;
    z-index: 10;
    min-width: 9em;
    box-shadow: 1px 1px 7px gray;
    border-radius: 0.5em;
}
.options--item {
    padding: 0 0.5em;
}
.options--item:hover {
    background-color: #ccc;
    cursor: pointer;
}

</style>