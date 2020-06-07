const track = document.querySelector('.carousel_track');
console.log(track)
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel_button--right');
const prevButton = document.querySelector('.carousel_button--left');
const dotsNav = document.querySelector('.carousel_nav');
const dots = Array.from(dotsNav.children);


const slideWidth = slides[0].getBoundingClientRect().width;

//會動
const setSlidePosition = (slide,index) => {
    slide.style.left = slideWidth * index + 'px';
};
slides.forEach(setSlidePosition)

const moveToSlide = (track, currentSlide,targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');

};

const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
};

const hsArrow = (slides, prevButton,nextButton,targetIndex) =>{
    if(targetIndex===0){
        prevButton.classList.add('is-hidden');
        nextButton.classList.remove('is-hidden');

    } else if (targetIndex===slides.length -1 ){
        prevButton.classList.remove('is-hidden')
        nextButton.classList.add('is-hidden')
    } else {
        prevButton.classList.remove('is-hidden')
        nextButton.classList.remove('is-hidden')
    }
}


//點左邊 移向左邊 右同

prevButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');
    const prevDot = currentDot.previousElementSibling;
    const prevIndex = slides.findIndex(slide => slide === prevSlide)
    //移到下一個
    moveToSlide(track, currentSlide, prevSlide);
    hsArrow(slides,prevButton,nextButton,prevIndex)
    updateDots(currentDot, prevDot);
});

nextButton.addEventListener("click", e => { 
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');
    const nextDot = currentDot.nextElementSibling;
    const nextIndex = slides.findIndex(slide => slide === nextSlide)
    //移到下一個
    moveToSlide(track, currentSlide, nextSlide);
    updateDots(currentDot, nextDot);
    hsArrow(slides,prevButton,nextButton,nextIndex)

});

//點下面圓點 移動到該圖
dotsNav.addEventListener('click', e =>{
    //是哪個點
    const targetDot = e.target.closest('button');
    if (!targetDot) return;

    const currentSlide = track.querySelector('.current-slide');
    const currentDot = dotsNav.querySelector('.current-slide');
    const targetIndex = dots.findIndex(dot => dot  === targetDot);
    const targetSlide = slides[targetIndex];

    moveToSlide(track, currentSlide,targetSlide);
    updateDots(currentDot, targetDot);
    hsArrow(slides,prevButton,nextButton,targetIndex)


});


