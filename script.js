'use strict';

//Media Queries:

const tablet = window.matchMedia('(max-width: 850px) and (min-width: 500px');
const smartphone = window.matchMedia(' (max-width: 450px)');

// nav menu for smartphones

const navMenuBtn = document.querySelector('.nav__menu--btn');
const navExitBtn = document.querySelector('.nav__exit--btn');
const smartphoneNav = document.querySelector('.smartphones__nav');



navMenuBtn.addEventListener('click', function () {
	navMenuBtn.style.display = `none`;
	navExitBtn.style.display = `inline-block`;
	smartphoneNav.style.marginLeft = '0';
})

navExitBtn.addEventListener('click', function () {
	navExitBtn.style.display = `none`;
	navMenuBtn.style.display = `inline-block`;
	smartphoneNav.style.marginLeft = '-30rem';
})

// STICKY NAV (Intersection Observer API)
const headerSlider = document.querySelector('.header__slider');
const navMenu = document.querySelector('.nav__bar');
const headerSliderHeight = function () {
	if (smartphone.matches) return headerSlider.getBoundingClientRect().height;
	else if (tablet.matches) return headerSlider.getBoundingClientRect().height;
	else return headerSlider.getBoundingClientRect().height;

}
const obsCallBack = function (entries) {
	const [entry] = entries;
	if (!entry.isIntersecting) navMenu.classList.add('sticky__nav');
	else navMenu.classList.remove('sticky__nav');
}

const obsOptions = {
	root: null,
	threshold: 0.1,
	rootMargin: `${headerSliderHeight()}px`
}

const observerHeader = new IntersectionObserver(obsCallBack, obsOptions);
observerHeader.observe(navMenu)



// sliders functions.

const activateDot = function (dots, curDot) {
	dots.forEach(dot => {
		dot.classList.remove('dot__btn--active');
		dot.getAttribute('data-slide') == curDot % 5 && dot.classList.add('dot__btn--active');
	})
}

const goToSlide = function (slideInfo) {
	const slides = slideInfo.slider.querySelectorAll('.slide');
	if (slideInfo.slide === slides.length) slideInfo.slide = 0;
	if (slideInfo.slide < 0) slideInfo.slide = slides.length - 1;
	slides.forEach((sld, i) => {
		sld.style.transform = `translateX(${(i - slideInfo.slide) * 100}%)`;
	})
	const dots = slideInfo.slider.querySelectorAll('.dot__btn');
	activateDot(dots, slideInfo.slide);
	slideInfo.timer = 1;
}

const nextSlide = function (slideInfo) {
	slideInfo.slide++;
	goToSlide(slideInfo);
}

const previousSlide = function (slideInfo) {
	slideInfo.slide--;
	goToSlide(slideInfo);
}

const autoSlide = function (slideInfo) {
	setInterval(() => {
		slideInfo.timer++;
		if (slideInfo.timer === 10) {
			nextSlide(slideInfo);
		}
	}, 1000);
}

// header slider
const headerSlides = headerSlider.querySelectorAll('.header__slide');
const headerDotsContainer = headerSlider.querySelector('.dots__btn--container');

const headerSliderInfo = {
	slider: headerSlider,
	slide: 0,
	timer: 0
}

headerSlides.forEach((slide, i) => {
	slide.style.transform = `translateX(${100 * i}%)`;
	headerDotsContainer.insertAdjacentHTML('beforeend', `<button class = "dot__btn ${i === 0 ? 'dot__btn--active' : ''}" data-slide="${i}"></button>`);
})

autoSlide(headerSliderInfo);
const headerNextBtn = document.querySelector('.header__btn--right');
const headerPreviousBtn = document.querySelector('.header__btn--left');

headerNextBtn.addEventListener('click', function () {
	nextSlide(headerSliderInfo);
})

headerPreviousBtn.addEventListener('click', function () {
	previousSlide(headerSliderInfo);
})

headerDotsContainer.addEventListener('click', function (e) {
	e.preventDefault();
	headerSliderInfo.slide = + e.target.getAttribute('data-slide');
	if (e.target.classList.contains('dot__btn')) goToSlide(headerSliderInfo);
})

// Implementing sliding on section 6 (testimonies)

const section6 = document.querySelector('.section__6');
const section6DotsContainer = section6.querySelector('.dots__btn--container');
const section6Slides = section6.querySelectorAll('.slide');

const section6LeftBtn = section6.querySelector('.section6__btn--left');
const section6RightBtn = section6.querySelector('.section6__btn--right');

const section6SlideInfo = {
	slider: section6,
	slide: 0,
	timer: 0
}

section6DotsContainer.addEventListener('click', function (e) {
	e.preventDefault();
	if (e.target.classList.contains('dot__btn')) {
		section6SlideInfo.slide = + e.target.getAttribute('data-slide');
		goToSlide(section6SlideInfo);
	}
})

section6Slides.forEach((slide, i) => {
	slide.style.transform = `translate(${(i * 100)}%)`;
	section6DotsContainer.insertAdjacentHTML('beforeend', `<button class = "dot__btn ${i === 0 ? 'dot__btn--active' : ''}" data-slide="${i}"></button>`)
})
autoSlide(section6SlideInfo);

section6LeftBtn.addEventListener('click', function () {
	previousSlide(section6SlideInfo);
})
section6RightBtn.addEventListener('click', function () {
	nextSlide(section6SlideInfo);
})

// NAVLINKS EVENT LISTENERS.
const navLinks = document.querySelector('.nav__ul')

navLinks.addEventListener('click', function (e) {
	e.preventDefault();
	let section;
	if (e.target.classList.contains('nav__link')) section = e.target.getAttribute('href');
	document.querySelector(section).scrollIntoView({ behavior: 'smooth' });
})

const navPC = document.querySelector('.nav__pc');
navPC.addEventListener('mouseover', function (e) {
	e.preventDefault();
	const linkOver = (e.target.classList.contains('nav__link'));
	if (!linkOver) return;
	navPC.querySelectorAll('.nav__link').forEach(link => link.style.opacity = '0.5');
	e.target.style.opacity = '1';
})
navPC.addEventListener('mouseout', function () {
	navPC.querySelectorAll('.nav__link').forEach(link => link.style.opacity = '1');
})

//Section 4

const section4Containt = document.querySelector('.section__4--containt');
console.log(section4Containt);

const youtubeLink = section4Containt.querySelector('.youtube__link');
const youtubeIcon = section4Containt.querySelector('.youtube__icon');

let backgroundSection4 = 0;
const changeBackground = function () {
	backgroundSection4++;
	if (backgroundSection4 > 5) backgroundSection4 = 1;
	section4Containt.style.backgroundImage = ` url(./thumbnails/infrastructure-${backgroundSection4}.jpg)`;
}

setInterval(changeBackground, 10000);


youtubeLink.addEventListener('mouseover', function () {
	setTimeout(
		function () {
			youtubeIcon.src = `icons/youtube-2.png`
		}, 1000)
	youtubeLink.style.backgroundColor = `rgba(255, 0, 0, 0.3)`;
})

youtubeLink.addEventListener('mouseout', function () {
	youtubeLink.style.backgroundColor = `rgba(255, 0, 0, 0)`;
	setTimeout(
		function () {
			youtubeIcon.src = `icons/youtube-1.png`
		}, 1000)
})

//Footer
const footerUl = document.querySelector('.footer__ul');
footerUl.addEventListener('click', function (e) {
	e.preventDefault();
	let section;
	if (e.target.classList.contains('footer__link')) section = e.target.getAttribute('href');
	document.querySelector(section).scrollIntoView({ behavior: 'smooth' });
})


