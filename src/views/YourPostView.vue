<template>
    <div v-if="listPost.length <= 0" class="text-center">
        Bạn chưa đăng bài viết nào
    </div>
    <div class="status-field-container write-post-container" v-else v-for="(post, index) in listPost" :key="post.id">
        <div class="user-profile-box">
            <div class="user-profile">
                <img :src="getImageUrl(post.photoURL)" alt="">
                <div>
                    <p> {{ post.displayName}}</p>
                    <small>{{ post.created_date.toDate() }}</small>
                </div>
            </div>
            <div>
                <a href="#"><i class="fas fa-ellipsis-v"></i></a>
            </div>
        </div>
        <div class="status-field">
            <p>{{ post['content'] }}</p>

            <div class="sub-blog__post" v-if="post['images'].length > 0">
                <div class="sub-blog__post-slider">
                    <Slider :post="post['images']"/>
                </div>
            </div>
        </div>
        <div class="post-reaction">
            <div class="activity-icons">
                <div @click="toggleReaction(post.id, index)">
                    <img src="../temp/css/assets/images/user_img/like-blue.png" alt="" v-if="setLikeButton(post['reactions'])">
                    <img src="../temp/css/assets/images/user_img/like.png" alt="" v-else>
                    {{ post['reactions'].length }}
                </div>
                <div @click="toggleCommentBlock(post['comments'], commentArray.includes(post['comments']))">
                    <img src="../temp/css/assets/images/user_img/comments.png" alt="">
                    {{ post['comments'].length }}
                </div>
                <div><img src="../temp/css/assets/images/user_img/share.png" alt="">35</div>
            </div>
            <div class="post-profile-picture">
                <img src="../temp/css/assets/images/user_img/profile-pic.png " alt=""> <i class=" fas fa-caret-down"></i>
            </div>
        </div>
        <!-- <div class="post-list-comment border-secondary-subtle" v-if="commentArray.includes(post['comments'])"> -->
        <div class="post-list-comment border-secondary-subtle">

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
</template>
<script>
import { onMounted, ref} from 'vue';
import CommentBlock from '../components/CommentBlock.vue';
import Slider from '../components/Slider.vue';
import { collection, doc, getDoc, getDocs, updateDoc, arrayUnion, query, where } from "firebase/firestore";
import { onAuthStateChanged } from '@firebase/auth';
import { db, auth } from '../firebase/index';
import store from '../store/store';
import { uuid } from 'vue3-uuid';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    name: 'LatestView',
    components: { CommentBlock, Slider},
    setup() {
        const comment = ref('');
        const listPost = ref([]);
        const currentSlide = ref(0);
        const uid = ref(null);
        const commentArray = ref([]);
        const isShowPostOptions = ref(false);

        // router.addRoute({ path: '/location', component: () => import('./LocationView.vue'), })
        // router.replace(router.currentRoute.value.fullPath);

        const openPostOptions = (event) => {
            event.stopPropagation();
            isShowPostOptions.value = true;
        };
        const deletePost = (post_id) => {
            const docRef = doc(db, 'news', post_id);
            deleteDoc(docRef)
            .then(() => notify('Xóa post thành công', 'success'))
            .catch((error) => notify('Có lỗi xảy ra', 'error'))
            .finally(console.log('Xóa thành công'))
        };
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
        const slideTo = (val) => {
            currentSlide.value = val
        };
        const toggleReaction = async (id, index) => {
            try {
                const reaction_obj = { uid: await getCurrentUserId() };
                const promises = [reaction_obj];
                Promise.all(promises)
                    .then(async() => {
                        const result = listPost.value[index]['reactions'].some(elem => { return elem.uid === reaction_obj.uid });
                        if (!result) {
                            listPost.value[index]['reactions'].push(reaction_obj);
                            const update = await updateDoc(doc(db, "news", id), {
                                reactions: listPost.value[index]['reactions'],
                            });
                        }
                        else {
                            listPost.value[index]['reactions'] = listPost.value[index]['reactions'].filter(elem => elem.uid !== reaction_obj.uid)
                            const update = await updateDoc(doc(db, "news", id), {
                                reactions: listPost.value[index]['reactions'],
                            });
                        }
                    })
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
            } catch (error) {
                console.log(error);
            }
        }
        const getCurrentUserId = async () => {
            await store.dispatch('setUser');
            return await store.getters.getUser.uid;
        };
        
        onMounted(() => {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    uid.value = user.uid;
                }
            });
            document.getElementById("app").addEventListener('click', () => {
                isShowPostOptions.value = false
            })
        })

        const editComment = async (id, index) => {
            const edit_obj = store.getters.getEdit;
            const t = listPost.value[index]['comments'];

            for (const iterator of t) {
                if (iterator.id === edit_obj.id) {
                    iterator.text = edit_obj.text;
                }
            }
            try {
                await updateDoc(doc(db, "news", id), {
                    comments: t,
                });
            } catch (error) {
                console.log(error);
            }
            notify('Chỉnh sửa comment thành công', 'success');
        };
        const addReplyComment = async (id, index) => {
            try {
                await updateDoc(doc(db, "news", id), {
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
                await updateDoc(doc(db, "news", id), {
                    comments: filtered_children,
                });
            } catch (error) {
                console.log(error);
            }
            notify('Xóa comment thành công', 'success');
        };

        const postComment = async (post_id, index) => {
            const generated_id = uuid.v4();
            await updateDoc(doc(db, "news", post_id), {
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
        const fetchPost = onMounted(async () => {
            try {
                await store.dispatch('setUser');
                const uid = store.getters.getUser.uid;
                const q = query(collection(db, "news"), where("isApproved", "==", true), where("user_id", "==", uid));
                const querySnapshot = await getDocs(q);
                let i = 0;
                querySnapshot.forEach((doc) => {
                    const id = doc.data().user_id;
                    let res = getPostInfo(id);
                    res.then(result => {return result})
                    .then(obj => {
                        listPost.value[i] = { id: doc.id, ...obj ,...doc.data()};
                        i++;
                    }) 
                });
            } catch (error) {
                console.log(error);
            }
        })

        return {
            slideTo, currentSlide, comment, postComment,
            listPost, getImageUrl,
            fetchPost, addReplyComment, deleteComment, editComment,
            toggleReaction, setLikeButton, commentArray, toggleCommentBlock, getPostInfo
        };
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

.mySlides img {
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

#gallery .carousel__track li {
    padding: 0;
}

#gallery .carousel__track li:hover,
#thumbnails .carousel__track li:hover {
    cursor: pointer;
}

</style>