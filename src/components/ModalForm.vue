<template lang="">
    <div class="modal">
        <div class="sub-blog">
            <div class="sub-blog__title flex">
                <div></div>
                <div class="title">Bài viết của khanhnguyen</div>
                <div class="sub-blog__icon--exit" @click="sendEventClose">
                    <font-awesome-icon icon="fa-solid fa-xmark" class="xmark-icon"/>
                </div>
            </div>
            <div class="scrollable">
                <div class="sub-blog__header flex">
                    <div class="sub-blog__header--left flex">
                        <div class="sub-blog__header-avatar"></div>
    
                        <div class="sub-blog__header-info">
                            <div class="sub-blog__header-username">Khánh Nguyễn</div>
                            <div class="sub-blog__header-created-date">1 giờ trước</div>
                        </div>
                    </div>
    
                    <div class="sub-blog__header--right flex">
                        <div class="sub-blog__icon--option">
                            <i class="fa-solid fa-ellipsis"></i>
                        </div>
                    </div>
                </div>
                <div class="sub-blog__post">
                    <!-- <div class="sub-blog__post-slider flex"> -->
                    <div class="sub-blog__post-slider">
                        
                        <div class="mySlides" ref="mySlides">
                            <div class="numbertext">1 / 6</div>
                            <img src="../temp/css/assets/images/places/newyork.jpg" style="width:100%">
                        </div>
    
                        <div class="mySlides" ref="mySlides">
                            <div class="numbertext">2 / 6</div>
                            <img src="../temp/css/assets/images/places/sanfran.jpg" style="width:100%">
                        </div>
    
                        
    
                        <a class="prev" @click="plusSlides(-1)">❮</a>
                        <a class="next" @click="plusSlides(1)">❯</a>
                        
                        <div class="row">
                            <div class="column">
                                <img ref="demo" class="demo cursor" src="../temp/css/assets/images/places/sanfran.jpg" style="width:100%"
                                    @click="currentSlide(1)" alt="The Woods">
                            </div>
                            <div class="column">
                                <img ref="demo" class="demo cursor" src="../temp/css/assets/images/places/sanfran.jpg" style="width:100%"
                                    @click="currentSlide(2)" alt="Cinque Terre">
                            </div>
                            <div class="column">
                                <img ref="demo" class="demo cursor" src="../temp/css/assets/images/places/sanfran.jpg" style="width:100%"
                                    @click="currentSlide(3)" alt="Cinque Terre">
                            </div>
                            <div class="column">
                                <img ref="demo" class="demo cursor" src="../temp/css/assets/images/places/sanfran.jpg" style="width:100%"
                                    @click="currentSlide(4)" alt="Cinque Terre">
                            </div>
                            <div class="column">
                                <img ref="demo" class="demo cursor" src="../temp/css/assets/images/places/sanfran.jpg" style="width:100%"
                                    @click="currentSlide(5)" alt="Cinque Terre">
                            </div>
                            <div class="column">
                                <img ref="demo" class="demo cursor" src="../temp/css/assets/images/places/sanfran.jpg" style="width:100%"
                                    @click="currentSlide(6)" alt="Cinque Terre">
                            </div>
                            <div class="column">
                                <img ref="demo" class="demo cursor" src="../temp/css/assets/images/places/sanfran.jpg" style="width:100%"
                                    @click="currentSlide(7)" alt="Cinque Terre">
                            </div>
                            <div class="column">
                                <img ref="demo" class="demo cursor" src="../temp/css/assets/images/places/sanfran.jpg" style="width:100%"
                                    @click="currentSlide(8)" alt="Cinque Terre">
                            </div>
                            <div class="column">
                                <img ref="demo" class="demo cursor" src="../temp/css/assets/images/places/sanfran.jpg" style="width:100%"
                                    @click="currentSlide(9)" alt="Cinque Terre">
                            </div>
                            <div class="column">
                                <img ref="demo" class="demo cursor" src="../temp/css/assets/images/places/sanfran.jpg" style="width:100%"
                                    @click="currentSlide(10)" alt="Cinque Terre">
                            </div>
                            <div class="column">
                                <img ref="demo" class="demo cursor" src="../temp/css/assets/images/places/sanfran.jpg" style="width:100%"
                                    @click="currentSlide(11)" alt="Cinque Terre">
                            </div>
                            <div class="column">
                                <img ref="demo" class="demo cursor" src="../temp/css/assets/images/places/sanfran.jpg" style="width:100%"
                                    @click="currentSlide(12)" alt="Cinque Terre">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="sub-blog__reaction flex">
                    <div class="sub-blog__reaction--left flex">
                        <div class="sub-blog-reaction-icon flex">
                            <div class="like"></div>
                            <div class="love"></div>
                        </div>
                        <div class="reaction__quantity">12K</div>
                    </div>
                    <div class="sub-blog__reaction--right flex">
                        <div class="comment__quantity">30 comments</div>
                        <div class="shares__quantity">10 shares</div>
                    </div>
                </div>
                <div class="sub-blog__features flex">
                    <div class="sub-blog__features-thumbs-up feature">
                        <div>
                            <font-awesome-icon icon="fa-solid fa-thumbs-up" />
                            Like
                        </div>
                    </div>
                    <div class="sub-blog__features-comments feature">
                        <div>
                            <font-awesome-icon icon="fa-solid fa-comment" />
                            Comment
                        </div>
                    </div>
                    <div class="sub-blog__features-share feature">
                        <div>
                            <font-awesome-icon icon="fa-solid fa-share" />
                            Share
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {ref, onMounted} from 'vue';
import '@fortawesome/vue-fontawesome';
export default {
    // props: ['showModal'],
    // data() {
    //     return {
    //         slideIndex: 1,    
    //     }
    // },
    // methods: {

    //     plusSlides(n) {
    //         this.showSlides(this.slideIndex += n);
    //     },
        
    //     currentSlide(n) {
    //         this.showSlides(this.slideIndex = n);
    //     },
        
    //     showSlides(n) {
    //         let i;
    //         let slides = document.getElementsByClassName("mySlides");
    //         let dots = document.getElementsByClassName("demo");
    //         if (n > slides.length) {this.slideIndex = 1}
    //         if (n < 1) {this.slideIndex = slides.length}
    //         for (i = 0; i < slides.length; i++) {
    //         slides[i].style.display = "none";
    //         }
    //         for (i = 0; i < dots.length; i++) {
    //         dots[i].className = dots[i].className.replace(" active", "");
    //         }
    //         slides[this.slideIndex-1].style.display = "block";
    //         dots[this.slideIndex-1].className += " active";
    //     }
    // },
    // mounted() {
    //     this.showSlides(this.slideIndex);
    // },
    setup(props, {emit}) {
        let slideIndex = 1;
        let isClose = ref(false);
        let i;
        onMounted(() => {
            showSlides(slideIndex);
        })
        const plusSlides = (n) => {
            showSlides(slideIndex += n);
        };
        
        const currentSlide = (n) => {
            showSlides(slideIndex = n);
        };
        
        const showSlides = (n) => {
            let i;
            let slides = document.getElementsByClassName("mySlides");
            let dots = document.getElementsByClassName("demo");
            if (n > slides.length) {slideIndex = 1}
            if (n < 1) {slideIndex = slides.length}
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }
            for (i = 0; i < dots.length; i++) {
                dots[i].className = dots[i].className.replace(" active", "");
            }
            slides[slideIndex-1].style.display = "block";
            dots[slideIndex-1].className += " active";
        };

        const sendEventClose = () => {
            emit('closeModal', isClose.value);
        };
        return {slideIndex, i, plusSlides, currentSlide, showSlides, sendEventClose, isClose};
    }
}
</script>
<style lang="scss" scoped>
    @use '../temp/css/abstracts' as ab;
    @use '../temp/css/layouts/admin/subBlog';
    @use '../temp/css/layouts/admin/test';
    @use '../temp/css/components/scrollbar';
    *.flex {
        @include ab.flex;
    }

</style>