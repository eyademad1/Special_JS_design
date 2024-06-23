// check if there is local storage color option
let mainColors = localStorage.getItem("color_option");

if (mainColors !== null) {
  document.documentElement.style.setProperty("--main-color", mainColors);

  // remove Active class from All colors list item
  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");

    // add active class on element with data color === local storage item
    if (element.dataset.color === mainColors) {
      // add active class
      element.classList.add("active");
    }
  });
}

// Random Background option
let backgroundOption = true;

//variable to control the Background interval
let backgroundInterval;

// check if there is local storage Random Background Item
let backgroundLocalItem = localStorage.getItem("background_option");

// check if Random background Local storage is not empty
if (backgroundLocalItem !== null) {
  if (backgroundLocalItem === "true") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }

  // remove Active class from all spans
  document.querySelectorAll(".random-backgrounds span").forEach((element) => {
    element.classList.remove("active");
  });

  if (backgroundLocalItem === "true") {
    document.querySelector(".random-backgrounds .yes").classList.add("active");
  } else {
    document.querySelector(".random-backgrounds .no").classList.add("active");
  }
}

// toggle the gear spin
document.querySelector(".toggle-settings .fa-gear").onclick = function () {
  // toggle class fa-spin for rotation on self
  this.classList.toggle("fa-spin");

  // toggle class open on main settings box
  document.querySelector(".settings-box").classList.toggle("open");
};

// switch colors
const colorsli = document.querySelectorAll(".colors-list li");

// loop on All list Item
colorsli.forEach((li) => {
  // click on every list items
  li.addEventListener("click", (e) => {
    // set color on root
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );

    // set color on local storage
    localStorage.setItem("color_option", e.target.dataset.color);

    handleActive(e);
  });
});

// switch random background option
const randomBackEl = document.querySelectorAll(".random-backgrounds span");

// loop on All spans
randomBackEl.forEach((span) => {
  // click on every span
  span.addEventListener("click", (e) => {
    
    handleActive(e);

    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randomizImgs();
      localStorage.setItem("background_option", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background_option", false);
    }
  });
});

// select landing page element
let landingPage = document.querySelector(".landing-page");

// get array of imgs
let imgsArray = [
  "landing1.jpg",
  "landing2.jpg",
  "landing3.jpg",
  "landing4.jpg",
  "landing5.jpg",
  "landing6.jpg",
  "landing7.jpg",
];

// function to Randomize imgs
function randomizImgs() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      // get random number
      let randomNumber = Math.floor(Math.random() * imgsArray.length);

      // change background image url
      landingPage.style.backgroundImage =
        'url("image/' + imgsArray[randomNumber] + '")';
    }, 10000);
  }
}

randomizImgs();

// select skills selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
  // skills offset Top
  let skillsOffsetTop = ourSkills.offsetTop;

  // skills outer height
  let skillsOuterHeight = ourSkills.offsetHeight;

  // window Height
  let windowHeight = this.innerHeight;

  // window ScrollTop
  let windowScrollTop = this.pageYOffset;

  if (windowScrollTop > skillsOffsetTop + skillsOuterHeight - windowHeight) {
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );

    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

// create popup wuth image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // create overlay Element
    let overlay = document.createElement("div");

    // Add class To Overlay
    overlay.className = "popup-overlay";

    // Append overlay To the body
    document.body.appendChild(overlay);

    // create the popup box
    let popupBox = document.createElement("div");

    // add class to the popup box
    popupBox.className = "popup-box";

    if (img.alt !== null) {
      // create Heading
      let imgHeading = document.createElement("h3");

      // create text for heading
      let imgText = document.createTextNode(img.alt);

      // append the text to the heading
      imgHeading.appendChild(imgText);

      // append the heading to the popup box
      popupBox.appendChild(imgHeading);
    }

    // create the image
    let popupImage = document.createElement("img");

    // set image source
    popupImage.src = img.src;

    // add image to popup box
    popupBox.appendChild(popupImage);

    // add popup box to body
    document.body.appendChild(popupBox);

    // create the close span
    let closeButton = document.createElement("span");

    //create the close button text
    let closeButtonText = document.createTextNode("X");

    // Append the text to the close button
    closeButton.appendChild(closeButtonText);

    // add class to close button
    closeButton.className = "close-button";

    // add close button to the popup box
    popupBox.appendChild(closeButton);
  });
});

// close popup
document.addEventListener("click", function (e) {
  if (e.target.className == "close-button") {
    // remove the current popup
    e.target.parentNode.remove();

    //remove overlay
    document.querySelector(".popup-overlay").remove();
  }
});

// Select All links
const allBullets = document.querySelectorAll(".nav-bullets .bullet");
const allLinks = document.querySelectorAll(".links a");


function scrollToSomewhere(elements){
  elements.forEach(ele =>{

  ele.addEventListener("click",(e)=>{

    e.preventDefault();

    document.querySelector(e.target.dataset.section).scrollIntoView({
      behavior : "smooth"
    });

  });

});
}

scrollToSomewhere(allBullets);
scrollToSomewhere(allLinks);

// Handle Active State
function handleActive(ev){
  

      // remove Active class from All children
      ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
        element.classList.remove("active");
      });
  
      // add active class on self
      ev.target.classList.add("active");

}

let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem("bullets_option");

if(bulletLocalItem !== null){

  bulletsSpan.forEach(span => {

    span.classList.remove("active");

  });

  if(bulletLocalItem === 'block'){

    bulletsContainer.style.display = 'block';

    document.querySelector(".bullets-option .yes").classList.add("active")

  } else {

    bulletsContainer.style.display = 'none';

    document.querySelector(".bullets-option .no").classList.add("active")

  }
  
}

bulletsSpan.forEach(span =>{

  span.addEventListener("click",(e)=>{

    if(span.dataset.display === 'show'){

      bulletsContainer.style.display = 'block';

      localStorage.setItem("bullets_option", 'block')

    }
    else{

      bulletsContainer.style.display = 'none';

      localStorage.setItem("bullets_option", 'none')

    }
    
    handleActive(e); 

  });

});


 // Reset Button
document.querySelector(".reset-options").onclick = function(){

  // localStorage.clear();
  localStorage.removeItem("color_option");
  localStorage.removeItem("background_option");
  localStorage.removeItem("bullets_option");

  // Reload Window
  window.location.reload();

}

 // toggle menu
 let toggleBtn = document.querySelector(".toggle-menu");
let tlinks = document.querySelector(".links");

toggleBtn.onclick = function(e){

  // stop propagation
  e.stopPropagation();

  // toggle class "menu-active" on button
  this.classList.toggle("menu-active");

  // toggle class "open" on links
  tlinks.classList.toggle("open")
}

 //click Anywhere Outside menu And Toggle Button
document.addEventListener("click", (e) =>{ 

  if(e.target !== toggleBtn && e.target !== tlinks){

    if(tlinks.classList.contains("open")){

  // toggle class "menu-active" on button
  toggleBtn.classList.toggle("menu-active");

  // toggle class "open" on links
  tlinks.classList.toggle("open")

    }

}
});

 // stop propagation on menu
 tlinks.onclick = function(e){
  e.stopPropagation();
 }

