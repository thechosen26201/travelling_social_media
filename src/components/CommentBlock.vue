<template>
    <div v-for="(item, index) in list" :key="index" class="user__comment d-flex align-item-start">
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
                <div class="ms-2 created-date">10 giờ trước</div>
            </div>
            <textarea v-model="comment" class="form-control" id="exampleFormControlTextarea1" rows="3"
                    placeholder="Viết bình luận công khai" @keyup.enter="postComment(item)" 
                    v-if="itemArray.includes(item) ? true : false"></textarea>
            <CommentBlock v-if="item['comments']" :commentList="item['comments']"/>
        </div>
    </div>
</template>
<script>
import {computed, onMounted, onBeforeMount, ref} from 'vue';
export default {
    props: ['commentList'],
    setup(props) {
        let list = props.commentList;
        let comment = ref(null);
        let itemArray = ref([]);
        
        const toggleCommentBlock = (item, isInclude = false) => {
            (!isInclude) ? itemArray.value.push(item) : itemArray.value = itemArray.value.filter(i => i !== item)
        }

        const postComment = (item) => {
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
        return {list, toggleCommentBlock, itemArray, comment, postComment};
    }
}
</script>
<style scoped>
@import url('../temp/css/user.css');
textarea {
    resize: none;
}
</style>