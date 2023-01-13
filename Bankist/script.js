'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal'); //Node list: Not an array but still has forEach
const btnScrollTo = document.querySelector('.btn--scroll-to');
//When we want to use an href in the query Selector we have to use the hash (#) symbol
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const container = document.querySelector('.operations__tab-container');
const content = document.querySelectorAll('.operations__content');
//Parent element: used to handle the event that bubbles up from the target
const nav = document.querySelector('.nav');
//We want to see the navigation whenever the header moves completely out of view.
const header = document.querySelector('.header');

const openModal = function (e) {
  e.preventDefault(); //access event; is used to prevent the default action of jumping to the top.
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

//We want to add an event listener to all of the Open account modal object.
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//Page Navigation
btnScrollTo.addEventListener('click', function (e) {
  //Getting the coordinates of the Learn More button
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords, 's1coords');
  //Rectangle for the button (Learn More)
  //getBoundingClientRect() relative to the visible viewport
  console.log(e.target.getBoundingClientRect());
  //pageYOffset: Current position of the viewport and top of the page
  console.log('Current scroll (X/Y) ', window.pageXOffset, window.pageYOffset);
  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );
  section1.scrollIntoView({ behavior: 'smooth' });
});

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     console.log('LINK');
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

//1): Add event listener to common parent element.
//2): Determine what element created that event
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  console.log(e.target);

  //Matching Strategy: check if the element you clicked on exists in the nav__links class
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    console.log(id);
    console.log('LINK');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});
/* --------------------------------------------------------------------------------------------------------------------------------------------------------------- */
// //Selecting, Creating, and Deleting Elements
// //Selecting Elements
//Just document is not enough to select entire document because this is not a real DOM element. If you want to apply CSS styles you need to use document.documentElement
// console.log(document.documentElement); //Selecting the document element (the entire HTML page).
// console.log(document.head); //selecting head
// console.log(document.body); //selecting body

// const header = document.querySelector('.header'); //returns the first element that matches the header type
const allSections = document.querySelectorAll('.section'); //returns a node list of all the elements that have the class name of section. A node list does not
// //automatically update like the HTML collections. If I delete an HTML element then the node list will not automatically update. This is because the allSections
// //variable was already created by the time the section still existed and it didn't update as I deleted one of its elements.
// console.log(allSections);

document.getElementById('section--1');
const allBtns = document.getElementsByTagName('button'); //returns all the elements with the name of button
// console.log(allBtns); //This method returns an HTML Collections. An HTML Collection is a live collection. If DOM changes then the HTML collection is immediately
// //updated automatically.

// console.log(document.getElementsByClassName('btn')); //Will return a HTML live collection

// //Creating and inserting elements
// // .insertAdjacentHTML

const message = document.createElement('div'); //creates a new DOM element with the specified HTML element in the parenthesis and stores it in message.
// //At this point the message object isn't in the DOM itself nowhere to be found on HTML page.
//If we want to see the message in the DOM we need to manually add it
message.classList.add('cookie-message'); //adding classes
message.textContent =
  'We use cookies for improved functionality and analytics.'; //simply inserts text.
//We can use innerHTML to read and set content
//This is setting the content of the message object. We have created a new button and created a new class for it. We have not yet added the button to the DOM which
//is why we don't see the message object on the page.
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class = "btn btn--close-cookie"> Got it! </button>';
// //Prepending adds the message element as the first child element.

// header.prepend(message);
header.append(message); //adds the last child message to the end of the parent element.
// //message is a live element living in DOM below. Cannot appear in two places at once so JS moved the message so it is the last element instead of the first one.
// //JS didn't insert a new element at the end of the parent element since it was already inserted at the beginning of the parent element.

// //What if we wanted to have the message at both places at once
// //We need to first clone the message
// header.append(message.cloneNode(true)) //cloneNode = true means all child elements will be copied.

// header.before(message); //Will insert the message before the header element as a sibling
// header.after(message); //Will insert the message after the header element as a sibling

// //Delete Elements
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    //Newer method
    message.remove(); //deletes cookie message off of HTML page
    //First access the parent element then remove the child element. DOM Traversing
    // message.parentElement.removeChild(message); //Moving up and down DOM tree is called, DOM Traversing. Old Method
  });
//   window.scrollTo(
//     //current position + current scroll
//     s1coords.left + window.pageXOffset,
//     s1coords.top + window.pageYOffset
//   );
// });

//Implement smooth scrolling
//Use an object: left, top, and behaviour
//   window.scrollTo({
//     left: s1coords.left + window.pageXOffset,
//     top: s1coords.top + window.pageYOffset,
//     behavior: 'smooth',
//   });
// });

//Modern

// /* --------------------------------------------------------------------------------------------------------------------------------------------------------------- */
// //Styles, Attributes, and Classes
// //Styles
//Inline styles: Styles set directly into the DOM
// message.style.backgroundColor = '#37383d';
// message.style.width = '120%';

// console.log(message.style.height); //we get nothing; only works for inline styles that we manually set
// // console.log(message.style.backgroundColor); // = rgb(55,56,61); property that is an inline style so it will work
// // console.log(message.style.color); //still nothing;

// //If we wanted to get the style from the CSS sheet we need to use the getComputedStyle method.
// // //Computed Style
// console.log(getComputedStyle(message)); //huge message;
// console.log(getComputedStyle(message).color); //outputs the colour of the message
// console.log(getComputedStyle(message).height); //outputs height in string with the px unit;
// //Increase the height of the cookie banner by 40px
// // message.style.height = getComputedStyle(message).height + 40 + 'px'; //There is a problem; the height value is in string with the units; we need to somehow remove
// //the unit and convert the string to a number

// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px'; //parseInt removes unit and converts to a number

// // //CSS Style properties: CSS Variables
// document.documentElement.style.setProperty('--color-primary', 'orangered');

// // //Attributes
// // //Each element is an attribute. For example, in the JS code the
// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log(logo.src);
// //Non-standard
// console.log(logo.designer); //undefined since designer isn't a standard property in HTML
// console.log(logo.getAttribute.designer); //how to properly read non-standard attributes of HTML.
// // //Absolute URL:
// // //http://127.0.0.1:8080/starter/img/logo.png
// // console.log(logo.className);

// // //Setting properties
// logo.alt = 'Beautiful minimalist logo';
// // //Proper way of reading a non-standard attribute
// // //getters: Getting attributes
// console.log(logo.getAttribute('designer'));
// logo.setAttribute('company', 'Bankist');

// console.log(logo.src); //Absolute URL of logo (the file path of the logo)
// console.log(logo.getAttribute('src')); //Relative URL of logo (the file path of the logo from the current folder that we are in)

// // const link = document.querySelector('.twitter--link');
// // console.log(link.href);
// // console.log(link.getAttribute('href'));

// const link = document.querySelector('.nav__link--btn');
// console.log(link.href); //Absolute value of the hyperlink
// console.log(link.getAttribute('href')); //Relative URL of the hyperlink

// // //Data Attributes
// console.log(logo.dataset.versionNumber);

// //Classes
// //Better because it won't interfere with existing classes and allows to add more attributes
//Adding multiple classes by passing in multiple values;
// logo.classList.add('c', 'j');
// logo.classList.remove('c', 'j');
// logo.classList.toggle('c', 'j');
// logo.classList.contains('c', 'j'); //not includes

// //DO NOT USE: Override all existing classes and only allow to put one class on existing object.
// logo.className = 'manasvi';
/* --------------------------------------------------------------------------------------------------------------------------------------------------------------- */
//Smooth scrolling
// const btnScrollTo = document.querySelector('.btn--scroll-to');
// //When we want to use an href in the query Selector we have to use the hash (#) symbol
// const section1 = document.querySelector('#section--1');

// btnScrollTo.addEventListener('click', function (e) {
//   //Getting the coordinates of the Learn More button
//   const s1coords = section1.getBoundingClientRect();
//   console.log(s1coords, 's1coords');
//   //Rectangle for the button (Learn More)
//   //getBoundingClientRect() relative to the visible viewport
//   console.log(e.target.getBoundingClientRect());
//   //pageYOffset: Current position of the viewport and top of the page
//   console.log('Current scroll (X/Y) ', window.pageXOffset, window.pageYOffset);
//   console.log(
//     'height/width viewport',
//     document.documentElement.clientHeight,
//     document.documentElement.clientWidth
//   );

//   /*
//   Scrolling to:
//     We need to find the position of section 1. We use section1 coords variable
//     top in the clientRect: distance from the top of the viewport
//     left in the clientRect: distance from the left side of the viewport
//     The top and left are relative to the current viewport so, if you aren't at the top then where the button will jump to will be skewed.
//     Solving this issue: add the current scroll position to the top value of the clientRect. Determine the position of section1 relative to the top of the page.
//     current scroll position is from the top of the viewport to the top of the page.
//     pageYOffset gets the current scroll position (distance from the top of the page to the top of the viewport)
//    */

//   //   window.scrollTo(
//   //     //current position + current scroll
//   //     s1coords.left + window.pageXOffset,
//   //     s1coords.top + window.pageYOffset
//   //   );
//   // });

//   //Implement smooth scrolling
//   //Use an object: left, top, and behaviour
//   //   window.scrollTo({
//   //     left: s1coords.left + window.pageXOffset,
//   //     top: s1coords.top + window.pageYOffset,
//   //     behavior: 'smooth',
//   //   });
//   // });

//   //Modern
//   section1.scrollIntoView({ behavior: 'smooth' });
// });
/* --------------------------------------------------------------------------------------------------------------------------------------------------------------- */
//Types of Events and Event Handlers
//An event is a signal that is generated by a certain DOM node. A signal means that something has happened.
//New and better way: 1) Allows us to attach multiple events onto one addEventListener. 2) Remove an event handler if we don't need it anymore
// const h1 = document.querySelector('h1');

//Like the hover event in CSS. When the mouse enters a certain area

// h1.addEventListener('mouseenter', function (e) {
//   alert('addEventListener: Great you are reading the heading');
// });

//mouseenter signal is like the hover element in CSS. It fires whenever the mouse enters an element like a div or a header, etc.
//Old method; usually use addEventListener
//Why use addEventListener?
//1: It is better because it allows us to attach multiple listeners to one event
//2: We can remove an event handler in case we don't need it anymore

// h1.onmouseenter = function (e) {
//   alert('onmouseenter: Great you are reading the heading');
// };

//In order to delete the event we need to export it into another function

// const alertH1 = function (e) {
//   alert('addEventListener: Great you are reading the heading!');
//   //If you want to use the removeEventListener then you have to export the function into a seperate function and use it as a function value in the addEventListener
//   //on line 200
//   //You can add it anywhere in the code
//   // h1.removeEventListener('mouseenter', alertH1); //Makes the event run once
// };
// h1.addEventListener('mouseenter', alertH1);

// setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

/* --------------------------------------------------------------------------------------------------------------------------------------------------------------- */
//Event propogation in Practice
//rgb(255,255,255);
// //min = 0; max = 255
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);

// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
// console.log(randomColor());
// //Child element
// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   //this keyword refers to the element on which the event listener is attached to.
//   this.style.backgroundColor = randomColor();
//   //target where the event originated. So where the event first happened. Not the element where the handler is attached to. Where the click happened
//   console.log('LINK: ', e.target, e.currentTarget);
//   //e.currentTarget is the element on which the event handler is attached to.

//   //the current target and the this keyword will always be the same
//   console.log(e.currentTarget === this);

//   //Stop propogation
//   // e.stopPropagation(); //only the nav__link color changed; the event never reached its parent elements
// });

// //Parent element of the nav__link element but child element of nav element
// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('CONTAINER: ', e.target, e.currentTarget);
//   /*
//   Before the event happens at the document root and from there it travels down to the target element and then from there it travels up (bubbles up) and its like
//   the event happened in all of its parent elements. That is the reason why this event is also handled by the event listener on line 264 (on nav__links). Both
//   of these events are handling the same event which happened here on the nav__link.
//    */

//   //If we click on the parent element (.nav__links) the child element (nav__link) remains unchanged because the element bubbles up from the parent element and not
//   //the child element.
// });

// document.querySelector('.nav').addEventListener(
//   'click',
//   function (e) {
//     //The parent element
//     this.style.backgroundColor = randomColor();
//     console.log('NAV: ', e.target, e.currentTarget);
//   },
//   true
// );
/**
 * Target of the three elements (nav__link, nav__links, and nav) are always the same. They all have the same class (nav__link) because that is where the event
 originated from, the click happened in the nav__link element because all of them are handling the same event. The event (e) that each handler recieves 
 is the same event and is handling the same event because of event bubbling. The event originates in the nav__link element then bubbles up to its parent element
 (nav__links) from there to its parent element (nav) and from there it will travel further up the DOM Tree. We can handle that event in all of the parent elements.
 */
//true will make it listen to events in the capturing phase.

//The addEventListener isn't listening to the event in the capturing phase but it is listening in the bubbling phase. Bubbling phase is useful for event delegation
/* --------------------------------------------------------------------------------------------------------------------------------------------------------------- */
// const h1 = document.querySelector('h1');

// //Going downwards: child
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes);
// //Only works for direct children
// console.log(h1.children);
// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'orangered';

// //Going upwards: Parents
// console.log(h1.parentNode);
// console.log(h1.parentElement);

// h1.closest('.header').style.background = 'var(--gradient-secondary)';
// //Selected the closes header to h1 element. Closest parent element that has the (.header) class and then applied the style to that element

// h1.closest('h1').style.background = 'var(--gradient-primary)';

// //Going sideways: Siblings
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// console.log(h1.previousSibling);
// console.log(h1.nextSibling);

// console.log(h1.parentElement.children);
// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) {
//     el.style.transform = 'scale(0.5)';
//   }
// });
/* --------------------------------------------------------------------------------------------------------------------------------------------------------------- */

container.addEventListener('click', function (e) {
  //Matching Strategy
  //We know that we are interested in the buttons and we have to figure out which button was clicked

  const clicked = e.target.closest('.operations__tab');
  // console.log(clicked);
  //Ignores clicks in the tabs container because otherwise it will give an error because it is trying to read a null property
  //Guard Clause
  if (!clicked) return;
  //Putting the other tabs down; Deactivating other tabs
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  //Putting the current tab up; Activating current tab
  clicked.classList.add('operations__tab--active');
  //Deactivating other content
  content.forEach(c => c.classList.remove('operations__content--active'));
  const data = document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
  //We have to use active class because the active class in CSS has the display property set to something other than none.
});
/* --------------------------------------------------------------------------------------------------------------------------------------------------------------- */
//Menu fade animations
//mouseover: event occurs when a mouse is moved onto an element, or onto its children; mouseover and mouseenter are similar but mouseeenter does not bubble and
//mouseup does
//mouseout and mouseenter are opposite events and are used to undo what we do on the hover.
//If we only have mouseover event listener then when we stop hovering over an element it doesn't change the opacity back to 1. We need to have mouseout to revert
//to original.

//Refactoring code to make it more D.R.Y
const handleHover = function (e, opacity) {
  //By default the this keyword is the same as the currentTarget so the element on which the event listener is attached to
  // console.log(this, e.currentTarget);
  //Checking if the element exists in the navigation bar
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if (el != link) {
        el.style.opacity = this;
      }
      logo.style.opacity = this;
    });
  }
};

//Version 2:
//addEventListener expects a function; so we need to pass a function but if we call the function then handleHover(e,0.5) will become some other value (undefined)
//because we don't return any value
// nav.addEventListener('mouseover', function (e) {
//   //This works because we are calling the function manually. We are calling the function as soon as the event occurs
//   handleHover(e, 0.5);
// });

// nav.addEventListener('mouseout', function (e) {
//   handleHover(e, 1);
// });

//Version 3:
//Bind returns a new function by copying the original function and using it as a callback function in the event handler.
//Passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

//Sticky Navigation:
// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords);
// window.addEventListener('scroll', function () {
//   console.log(window.scrollY);
//   if (window.scrollY > initialCoords.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });
/* --------------------------------------------------------------------------------------------------------------------------------------------------------------- */
//Sticky Navigation: The Intersection Observer API
//The intersection observer API allows our code to observe changes to the way that a certain target element intersects another element or the way it intersects the
//viewport

const navHeight = nav.getBoundingClientRect().height;
// console.log(navHeight);
const obsCallback = function (entries, observer) {
  //Whenever the target element (section1) intersects the viewport (root) at 10% (threshold) then the callBack function will get called no matter if we keep
  //scrolling
  entries.forEach(entry => {
    // console.log(entry);
  });
};
const obsOptions = {
  //element that the target is intersecting
  root: null,
  //0 means that the callback will be triggered whenever the target element moves completely out of view and as soon as it enters the view
  threshold: [0, 0.2],
  rootMargin: `-${navHeight}px`,
};
const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(section1);

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
  console.log(entry);
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  //When 0% of the header is visible we want an event to happen
  threshold: 0,
});

headerObserver.observe(header);

/* --------------------------------------------------------------------------------------------------------------------------------------------------------------- */
//We have to reveal elements as we approach them on the page
//Reveal sections
const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  //We need to figure out what target element actually intersected the viewport which is why we need the className in the target element in the Observer
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

//Lazy loading images
const imgTarget = document.querySelectorAll('img[data-src]');
const loadImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  //Replace src with data-src
  //each img is at the target (element under mouse)
  entry.target.src = entry.target.dataset.src;
  /**
 *   Remove the class that has the blurred filter; the lazy image class. How do we do that?
  Replacing of the source attribute happens behind the scenes. JavaScript finds the new image that it should load and displays it behind the scenes. Once its
  finished loading that image it will emit the load event. The load event is like any other event which means that we can listen for it. We can remove the 
  lazy filter by removing the lazy class once the image is completely loaded.
 */
  entry.target.addEventListener('load', function (e) {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTarget.forEach(img => imgObserver.observe(img));
/* --------------------------------------------------------------------------------------------------------------------------------------------------------------- */
//Building a Slider Component: part 1
//Set the transform property to the percentages automatically and show all the slides side by side.

//Slider
function sliders() {
  const slides = document.querySelectorAll('.slide');
  const slider = document.querySelector('.slider');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  // slider.style.transform = `scale(0.2) translateX(-800px)`;
  // slider.style.overflow = 'visible';
  let currSlide = 0;
  const maxSlides = slides.length; //Node List so we can find the length property

  //Putting all slides side by side
  //First slide: 0%, Second: 100%, 3rd: 200%, 4th: 300%. Width of each image is 100%
  //Multiplying the index (i) so that we can programatically calculate the percentage of each image. For the first image it will be 0 * 100 = 0%, 2nd: 1 * 100 = 100%
  //etc.
  // slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`));

  //Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      ); //adding as last child
    });
  };

  const activeDots = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };
  //Number of slide that we want to go to
  const goToSlide = function (slide) {
    slides.forEach(
      //Changes the slide numbering so that the slides are translated properly
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
      //1st: currSlide = 1; 0-1 = -1; transform = -100%
      //2nd: currSlide = 1; 1-1 = 0; transform = 0%;
      //3rd: currSlide = 1; 2-1 = 1; transform = 100%
      //etc
    );
  };

  const nextSlide = function () {
    if (currSlide === maxSlides - 1) {
      //Returns the number back to original so that when we press the right button at the last slide then we can jump back to the beginning
      currSlide = 0;
    } else {
      currSlide++;
    }
    goToSlide(currSlide);
    activeDots(currSlide);
  };

  //Initializer Function
  function init() {
    goToSlide(0); //Takes care of transforming the slide from the very beginning
    createDots();
    activeDots(0);
  }
  init();
  //Next slide on right side
  //Changing the slides: First slide: -100%, Second: 0%, 3rd: 100%, 4th: 200%. Width of each image is 100%
  //Event Handlers
  btnRight.addEventListener('click', nextSlide);

  //Next Slide on left side
  //Revert the changes; make the changes on the translateX back to normal
  const prevSlide = function () {
    //currSlide is the first slide; makes sure it can't go below 0
    if (currSlide === 0) {
      currSlide = maxSlides - 1;
    } else {
      currSlide--;
    }
    goToSlide(currSlide);
    activeDots(currSlide);
  };
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    console.log(e);
    if (e.key === 'ArrowLeft') {
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
    }
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activeDots(slide);
    }
  });
}
sliders();
/* --------------------------------------------------------------------------------------------------------------------------------------------------------------- */
//Lifecycle DOM Events
//Looking at different events that happen in the DOM during a webpage's lifecycle
//Webpage Lifecycle: Right from the moment that the user accesses the webpage to the momement that the user leaves it
/*
DOM Content Loaded: This event is fired off by the document as soon as the HTML is completely parsed which means whenever the HTML has been downloaded and 
converted to the DOM Tree. All scripts must be downloaded and executed before the DOM Content Loaded event can happen. Does not wait for images and other external
sources to load, so just HTML and JavaScript need to be loaded. We want our code to be executed only after the DOM is ready. Does that mean that we should wrap
our code into an event listener? No because in the HTML page we have imported the script file after the body. Last thing that will be read in the HTML. The browser
will find the script only when the entire HTML page is already parsed. When we have the script tag at the end of the HTML then we don't need to listen to the DOM
Content Loaded because the HTML is already parsed.
*/

document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parse and DOM Tree built', e);
});

//Load Event
/*
Load event is fired by the window as soon as the HTML, images, and external sources like CSS are also loaded. Basically when the complete page has finished loading
is when this event is fired.
 */

window.addEventListener('load', function (e) {
  console.log('Page fully loaded: ', e);
});

//Before Unload event
/*
Before unload event gets fired of by the window. This event is created immediately before a user is about to leave the page. We can use this to ask the users if they
are 100% sure that they want to leave the page.
 */

// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = '';
// });
