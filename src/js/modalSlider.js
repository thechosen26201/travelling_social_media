export default function modalSlider() {
    let slideIndex = 1;
    let i;
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
    return {slideIndex, i, plusSlides, currentSlide, showSlides};
}