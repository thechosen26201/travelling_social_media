<template lang="">
    <div v-for="(item, index) in list" :key="index" class="user__comment d-flex align-item-start">
        <div class="user-profile avatar">
            <img src="../temp/css/assets/images/user_img/profile-pic.png" alt="">
        </div>
        <div class="comment__block">
            <h6 class="username m-0">{{item['username']}}</h6>
            <div class="comment">
                {{item['comment']}}
                
            </div>
            <div class="response-features d-flex">
                <p>Thích</p>
                <p class="ms-2">Phản hồi</p>
                <div class="ms-2 created-date">10 giờ trước</div>
            </div>
            
        </div>
    </div>
</template>
<script>
import {computed, onMounted, onBeforeMount, ref} from 'vue';
export default {
    props: ['commentList'],
    setup(props) {
        let list = props.commentList;
        let filtered = ref([]);
        let parent_comment = () => {
            filtered.value = list.filter((item) => {
                return item['id_parent'] !== null;
            });
            console.log(filtered.value);
            return filtered;
        };
        onBeforeMount(() => {
            parent_comment();
        })
        return {list, parent_comment};
    }
}
</script>
<style scoped>
@import url('../temp/css/user.css');
    
</style>