const reviewCont = document.querySelector('.review-container');
const reviewWrapper = document.querySelector('.review-wrapper');
const reviews = Array.from(document.querySelectorAll('.review'));
const prev = document.querySelector('#prev');
const next = document.querySelector('#next');
let reviewWidth = 0;
let reviewWrapperTranslateX = 0;
let maxTranslateX = 0;
let minTranslateX = 0;
let reviewPerColumn = 3;
function calculateReviewWidth() {
  if (window.innerWidth > 1200) {
    reviewPerColumn = 3;
  } else if (window.innerWidth > 576) {
    reviewPerColumn = 2;
  }
  else {
       reviewPerColumn = 1;
  }

  reviews.forEach(element => {
    reviewWidth = Math.round(reviewCont.offsetWidth / reviewPerColumn);
    element.style = `--review-width: ${reviewWidth}px`;
  });
  maxTranslateX = -Math.abs((reviews.length - reviewPerColumn) * reviewWidth);
  reviewWrapperTranslateX = 0;
  reviewWrapper.style.transform = `translateX(${reviewWrapperTranslateX}px)`;
};
calculateReviewWidth();

window.addEventListener('resize', () => {
  calculateReviewWidth();
});

prev.addEventListener('click', () => {
  if (reviewWrapperTranslateX !== minTranslateX) {
    next.classList.remove('disabled');
    reviewWrapperTranslateX = Math.round(reviewWrapperTranslateX + reviewWidth);
    reviewWrapper.style.transform = `translateX(${reviewWrapperTranslateX}px)`;
  }

  if (reviewWrapperTranslateX === minTranslateX) {
    prev.classList.add('disabled')
  }
});

next.addEventListener('click', () => {
  if (reviewWrapperTranslateX !== maxTranslateX) {
    prev.classList.remove('disabled');
    reviewWrapperTranslateX = Math.round(reviewWrapperTranslateX - reviewWidth);
    reviewWrapper.style.transform = `translateX(${reviewWrapperTranslateX}px)`;
  }


  if (reviewWrapperTranslateX === maxTranslateX) {
    next.classList.add('disabled');
  }
});