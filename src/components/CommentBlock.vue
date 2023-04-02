<template>
    <div>
        <div v-for="(item, index) in list" :key="item.id" class="user__comment d-flex align-item-start" >
            <div class="user-profile avatar">
                <img src="../temp/css/assets/images/user_img/profile-pic.png" alt="">
            </div>
            <div class="comment__block">
                <h6 class="username m-0">{{item['username']}}</h6>
                <div class="comment">
                    {{item['text']}}
                    
                </div>
                <div class="response-features d-flex">
                    <p>Thích</p>
                    <p class="ms-2" @click="toggleCommentBlock(item, itemArray.includes(item))">Phản hồi</p>
                    <textarea class="form-control edit-text" id="exampleFormControlTextarea1"
                        v-if="editCommentArray.includes(item) ? true : false" 
                        @keyup.enter="editComment(item)"
                        v-model="edit_comment">

                    </textarea>
                    <div class="ms-2 created-date">10 giờ trước</div>
                </div>
                <textarea v-model="comment" class="form-control" id="exampleFormControlTextarea1" rows="3"
                        placeholder="Viết bình luận công khai" @keyup.enter="postReplyComment(item)" 
                        v-if="itemArray.includes(item) ? true : false"></textarea>
                <CommentBlock v-if="item['comments']" :commentList="item['comments']"/>
            </div>
            <div class="options">
                <div class="edit__button" @click="toggleEditComment(item, editCommentArray.includes(item))">
                    <font-awesome-icon icon="fa-solid fa-pen" />
                </div>
                <div class="delete__button">
                    <font-awesome-icon icon="fa-solid fa-xmark" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {ref} from 'vue';
export default {
    props: ['commentList'],
    setup(props, {emit}) {
        const list = ref(props.commentList);
        let comment = ref(null);
        const edit_comment = ref(null);
        let itemArray = ref([]);
        const total = ref(0);
        const editCommentArray = ref([]);
        
        const editComment = (item) => {
            item['text'] = edit_comment;
        };
        const toggleEditComment = (item, isInclude = false) => {
            (!isInclude) ? editCommentArray.value.push(item) : editCommentArray.value = editCommentArray.value.filter(i => i !== item)
        };
        
        const toggleCommentBlock = (item, isInclude = false) => {
            (!isInclude) ? itemArray.value.push(item) : itemArray.value = itemArray.value.filter(i => i !== item)
        }

        const postReplyComment = (item) => {
            if (item['comments'] === null) {
                item['comments'] = [];
                item['comments'].push({
                        id: 9, 
                        username: 'Inuyasha', 
                        text: comment.value, 
                        id_parent: item['id'],
                        comments: null
                    });
                itemArray.value = itemArray.value.filter(i => i !== item)
            }
            else {
                item['comments'].push({
                        id: 9, 
                        username: 'Inuyasha', 
                        text: comment.value, 
                        id_parent: item['id'],
                        comments: null
                    });
                itemArray.value = itemArray.value.filter(i => i !== item)
            }
        }
        // const forceRerender = () => {
        //     componentKey.value += 1;
        // };
        const deleteComment = (item) => {
            const temp = list.value.filter(i => i.id !== item.id);
            list.value = temp;
        }
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
        return {list, toggleCommentBlock, itemArray, comment, 
            postReplyComment, deleteComment, total, toggleEditComment, 
            editCommentArray, editComment, edit_comment};
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
.edit__button:hover, .delete__button:hover {
    opacity: 0.5;
    cursor: pointer;
}
</style>