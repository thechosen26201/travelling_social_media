<template>
    <div>
        <div v-for="(item, index) in top_level_comment" :key="item.id" class="user__comment d-flex align-item-start">
            <div class="user-profile avatar">
                <img :src="item.photoURL" alt="">
            </div>
            <div class="comment__block">
                <h6 class="username m-0">{{item['displayName']}}</h6>
                <div class="comment">
                    {{ item['text'] }}
                </div>
                <div class="response-features d-flex">
                    <p>Thích</p>
                    <p class="ms-2" @click="toggleCommentBlock(item, itemArray.includes(item))">Phản hồi</p>
                    <textarea class="form-control edit-text" id="exampleFormControlTextarea1"
                        v-if="editCommentArray.includes(item) ? true : false" 
                        @keyup.enter="editComment(item)"
                        v-model="edit_comment">

                    </textarea>
                    <div class="ms-2 created-date">{{ timeSince(item.created_date) }}</div>
                </div>
                <textarea v-model="comment" class="form-control" id="exampleFormControlTextarea1" rows="3"
                    placeholder="Viết bình luận công khai" @keyup.enter="postReplyComment(item, item.id)"
                    v-if="itemArray.includes(item) ? true : false"></textarea>

                <!-- Reply -->
                <div v-for="reply in comment_replies" :key="reply.id">
                    <div v-if="reply.top_id === item.id" class="user__comment d-flex align-item-start">
                        <div class="user-profile avatar">
                            <img :src="reply.photoURL" alt="">
                        </div>
                        <div class="comment__block">
                            <h6 class="username m-0">{{reply.displayName}}</h6>
                            <div class="comment" v-if="reply.top_id === item.id">
                                {{ reply['text'] }}
                            </div>
                            <div class="response-features d-flex">
                                <p>Thích</p>
                                <p class="ms-2" @click="toggleCommentBlock(reply, itemArray.includes(reply))">Phản hồi</p>
                                <textarea class="form-control edit-text" id="exampleFormControlTextarea1"
                                    v-if="editCommentArray.includes(reply) ? true : false" @keyup.lazy.enter="editComment(reply)"
                                    v-model="edit_comment">

                                        </textarea>
                                <div class="ms-2 created-date">{{ timeSince(reply.created_date) }}</div>
                            </div>
                            <textarea v-model="comment" class="form-control" id="exampleFormControlTextarea1" rows="3"
                                placeholder="Viết bình luận công khai" @keyup.enter="postReplyComment(reply, item.id)"
                                v-if="itemArray.includes(reply) ? true : false"></textarea>

                        </div>
                        <div class="options" v-if="reply.user_id === current_uid">
                            <div class="edit__button" @click="toggleEditComment(reply, editCommentArray.includes(reply))">
                                <font-awesome-icon icon="fa-solid fa-pen" />
                            </div>
                            <div class="delete__button" @click="deleteComment(reply.id)">
                                <font-awesome-icon icon="fa-solid fa-xmark" />
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <CommentBlock v-if="item['pID']" :commentList="list.filter(reply => reply.pID === item.id)"/> -->
                <!-- End reply -->
            </div>
            <div class="options" v-if="item.user_id === current_uid">
                <div class="edit__button" @click="toggleEditComment(item, editCommentArray.includes(item))">
                    <font-awesome-icon icon="fa-solid fa-pen" />
                </div>
                <div class="delete__button" @click="deleteComment(item.id)">
                    <font-awesome-icon icon="fa-solid fa-xmark" />
                </div>
            </div>
        </div>
    </div>
    <DialogMessage v-if="isShowDialog" @closeDialog="closeDialog" @confirmDialog="confirmDialog"/>
</template>
<script>
import { ref, onMounted, toRefs, watch, watchEffect, computed } from 'vue';
import store from '../store/store';
import {uuid} from 'vue3-uuid';
import { doc, getDoc } from '@firebase/firestore';
import { db } from '../firebase';
import useValidators from '../js/validators'
import DialogMessage from './DialogMessage.vue';

export default {
    props: {
        commentList: {
            type: Array
        },
    },
    components: {DialogMessage},
    emits:['editComment', 'addReplyComment', 'deleteComment'],
    setup(props, {emit}) {
        // const list = ref(props.commentList);
        const { commentList: list } = toRefs(props);
        let comment = ref(null);
        const edit_comment = ref(null);
        const itemArray = ref([]);
        const total = ref(0);
        const editCommentArray = ref([]);
        const comment_replies = ref([]);
        const top_level_comment = ref([]);
        const current_uid = ref(null);
        const isShowDialog = ref(false);

        onMounted(async () => {
            store.commit('SET_CURRENT_USER');
            current_uid.value = await store.getters.getUser.uid;
            list.value.filter(item => {
                (item.pID) ? comment_replies.value.push(item) : top_level_comment.value.push(item);
            });
            
            top_level_comment.value = await mixData(top_level_comment.value);
            comment_replies.value = await mixData(comment_replies.value);
            
        });

        const closeDialog = (closeDialog) => {
            isShowDialog.value = closeDialog;
        };
        const getFirestoreDoc = cmt_uid => {
            const docRef = doc(db, "users", cmt_uid);
            const docSnap = getDoc(docRef);
            return docSnap;
        } 
        const mixData = async (list_cmt) => {
            const promises = [];
            list_cmt.forEach( (element, index) => {
                const result = getFirestoreDoc(element.user_id);
                promises.push(result);
            });
            const cmt_rep = await Promise.all(promises);
            list_cmt = cmt_rep.map((element, index) => {
                return {...element.data(), ...list_cmt[index]}
            });
            return list_cmt;
        }
        // Promise.all(arr.value).then(result => {console.log(result);})
        const checkChildrenComment = () => {
            let c;
            for (let i = 0; i < comment_replies.value.length; i++) {
                c = comment_replies.value.some(item => {
                    return comment_replies.value[i].id === item.pID
                })
                
                if(c) {
                    return c;
                }
            }
            return c;
        }
        watch(list.value, async () => {
            comment_replies.value.length = 0;
            top_level_comment.value.length = 0;
            list.value.filter(item => {
                (item.pID) ? comment_replies.value.push(item) : top_level_comment.value.push(item);
            });
            top_level_comment.value = await mixData(top_level_comment.value);
            comment_replies.value = await mixData(comment_replies.value);
            
        })
        const editComment = (item) => {
            item['text'] = edit_comment.value;
            store.commit('SET_EDIT', item);
            emit('editComment');
        };
        const toggleEditComment = (item, isInclude = false) => {
            (!isInclude) ? editCommentArray.value.push(item) : editCommentArray.value = editCommentArray.value.filter(i => i !== item)
        };

        const toggleCommentBlock = (item, isInclude = false) => {
            (!isInclude) ? itemArray.value.push(item) : itemArray.value = itemArray.value.filter(i => i !== item)
        }

        const postReplyComment = async (item, topID) => {
            const generated_id = uuid.v4();
            await store.dispatch('setUser');
            const uid = await store.getters.getUser.uid; // Lấy id user hiện tại
            // const docRef = doc(db, "users", uid);
            // const docSnap = await getDoc(docRef);
            // console.log(docSnap.data());
            store.commit('SET_REPLY', { user_id: uid, id: generated_id, text: comment.value, pID: item.id , top_id: topID, created_date: Date.now()});
            emit('addReplyComment');
            comment.value = '';
            toggleCommentBlock(item, true);
        }

        const deleteComment = (delete_id) => {
            
            store.commit('SET_DELETE', delete_id);
            // emit('deleteComment');
            isShowDialog.value = true;
        }
        const confirmDialog = () => { emit('deleteComment');}
        const recursiveComment = (commentArray) => {
            if (commentArray) {
                for (const iterator of commentArray) {
                    if (iterator['comments'] !== [] || iterator['comments']) {
                        total.value += 1;
                        recursiveComment(iterator['comments']);
                    }
                }
            }
            return total.value;
        };
        const {timeSince} = useValidators();

        return {
            list, toggleCommentBlock, itemArray, comment, current_uid,
            postReplyComment, deleteComment, total, toggleEditComment,
            editCommentArray, editComment, edit_comment, comment_replies, 
            top_level_comment, checkChildrenComment, timeSince, isShowDialog, closeDialog, confirmDialog
        };
    }
}
</script>
<style scoped>
@import url('../temp/css/user.css');

textarea {
    resize: none;
}

.edit-text {
    position: absolute;
    left: 10%;
    top: 10%;
    z-index: 1;
    width: 50%;
}

.user__comment {
    position: relative;
}

.edit__button:hover,
.delete__button:hover {
    opacity: 0.5;
    cursor: pointer;
}
</style>