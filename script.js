gsap.registerPlugin(ScrollTrigger);
// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
    el: document.querySelector("main"),
    smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("main", {
    scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("main").style.transform ? "transform" : "fixed"
});



// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();


function page4Animation() {
    var elemC = document.querySelector("#elem-container")
    var fixed = document.querySelector("#fixed-image")
    elemC.addEventListener("mouseenter", function () {
        fixed.style.display = "block"
    })
    elemC.addEventListener("mouseleave", function () {
        fixed.style.display = "none"
    })

    var elems = document.querySelectorAll(".elem")
    elems.forEach(function (e) {
        e.addEventListener("mouseenter", function () {
            var image = e.getAttribute("data-image")
            fixed.style.backgroundImage = `url(${image})`
        })
    })
}

// function swiperAnimation() {
//     var swiper = new Swiper(".mySwiper", {
//         slidesPerView: "auto",
//         centeredSlides: true,
//         spaceBetween: 100,
//     });
// }
function menuAnimation() {

    var menu = document.querySelector("nav h3")
    var full = document.querySelector("#full-scr")
    var navimg = document.querySelector("nav img")
    var flag = 0
    menu.addEventListener("click", function () {
        if (flag == 0) {
            full.style.top = 0
            navimg.style.opacity = 0
            flag = 1
        } else {
            full.style.top = "-100%"
            navimg.style.opacity = 1
            flag = 0
        }
    })
}

// function loaderAnimation() {
//     var loader = document.querySelector("#loader")
//     setTimeout(function () {
//         loader.style.top = "-100%"
//     }, 4200)
// }

// swiperAnimation()
page4Animation()
menuAnimation()
// loaderAnimation()











// ----------------------------------

gsap.to("nav", {
    backdropFilter: `blur(10px)`,
    backgroundColor: `rgba(0,0,0,0.5)`,
    scrollTrigger: {
        trigger: "#page2",
        scroller: "main",
        start: "top 20%",
        end: "top 10%",
        scrub: 1
    }
})



let headings = document.querySelectorAll(".headings")
headings.forEach((elem, index) => {
    console.log(elem.textContent)
    let clutter = ""
    elem.textContent.split("").forEach((elem2) => {
        clutter += `<span class="anim${index}">${elem2}</span>`
    })
    elem.innerHTML = clutter;
})

let tl = gsap.timeline({
    repeat: -1
})
// tl.from(".anim0",{
//     y:`100%`,
//     stagger:0.1
// })
tl.to(".anim0", {
    delay: 0.7,
    y: `-100%`,
    stagger: 0.1,
    duration: 0.4,
}, "a")

tl.from(".anim1", {
    delay: 0.9,
    y: `100%`,
    stagger: 0.1,
    duration: 0.4
}, "a")
tl.to(".anim1", {
    delay: 0.7,
    y: `-100%`,
    stagger: 0.1,
    duration: 0.4
}, "b")
tl.from(".anim2", {
    delay: 0.9,
    y: `100%`,
    stagger: 0.1,
    duration: 0.4
}, "b")
tl.to(".anim2", {
    delay: 0.7,
    y: `-100%`,
    stagger: 0.1,
    duration: 0.4
}, "c")
tl.from(".anim3", {
    delay: 1.1,
    y: `100%`,
    stagger: 0.1,
    duration: 0.4
}, "c")
tl.to(".anim3", {
    delay: 0.7,
    y: `-100%`,
    stagger: 0.1,
    duration: 0.4
}, "d")
tl.from(".anim4", {
    delay: 0.9,
    y: `100%`,
    stagger: 0.1,
    duration: 0.4
}, "d")
// tl.to(".anim4",{
//     delay:0.7,
//     y:`-100%`,
//     stagger:0.1
// })






let images = document.querySelectorAll(".flex .img img")
images.forEach((ee)=>{
    ee.src = `https://www.shutterstock.com/image-vector/black-woman-smiling-portrait-vector-600nw-2281497689.jpg`
})

// cursor 
document.querySelector('body').addEventListener('mousemove', function (dets) {
    let i = dets.clientX
    let j = dets.clientY
    const cursor = document.querySelector('.cursor')
    cursor.style.transform = `translate(${i - 10}px , ${j - 10}px)`;
  })











// scramler homepage

class ScrambleText {
    constructor(element) {
        this.element = element;
        this.originalText = element.textContent;
        this.characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
        this.duration = 1000; // Scramble effect duration (in ms)
        this.updateInterval = 30; // Update scramble every 30ms
    }

    scramble() {
        const length = this.originalText.length;
        let scrambleTime = this.duration;
        const intervalId = setInterval(() => {
            scrambleTime -= this.updateInterval;

            if (scrambleTime <= 0) {
                clearInterval(intervalId);
                this.element.innerText = this.originalText;
                return;
            }

            let scrambledText = '';
            for (let i = 0; i < length; i++) {
                const shouldScramble = Math.random() > scrambleTime / this.duration;
                scrambledText += shouldScramble ? this.originalText[i] : this.randomCharacter();
            }
            this.element.innerText = scrambledText;
        }, this.updateInterval);
    }

    randomCharacter() {
        return this.characters[Math.floor(Math.random() * this.characters.length)];
    }

    start() {
        this.scramble();
    }
}

const scrambleElement = document.querySelector('.down');
const scrambleText = new ScrambleText(scrambleElement);


// Start the scramble effect when the page loads
scrambleText.start();





// timeline ********************************
let dots = document.querySelectorAll(".dots")

dots.forEach((dot) => {
    gsap.to(dot, {
        y: 180,
        scrollTrigger: {
            scroller: "main",
            trigger: dot,
            start: `top 60%`,
            end: `top 20%`,
            scrub: 1
        }
    })
})

gsap.to(".progress", {
    height: `100%`,
    scrollTrigger: {
        scroller:"main",
        trigger: "#timeline",
        start: "top 45%",
        end: "bottom -50%",
        scrub: 1,
    }
}
)



let cards = document.querySelectorAll(".cards")
cards.forEach((card)=>{
    gsap.from(card,{
        opacity:0,
        y:40,
        scrollTrigger:{
            start:"bottom bottom",
            end:"bottom 70%",
            scroller:"main",
            trigger:card,
            scrub:1,
        }
    })
})

// *********hero img chng****************   
function changeBg(){
    
    const images = [
    
    'url("./images/2.webp")',
    'url("./images/3.webp")',
    'url("./images/3.webp")',
    'url("./images/4.webp")',
    'url("./images/1.webp")',
    'url("./images/6.webp")',
    ]
    const section =document.querySelector('section')
    const bg = images[Math.floor(Math.random()* images.length)];
        section.style.backgroundImage = bg;
}
setInterval(changeBg,2000)
    
// loader
function loaderAnimation() {
    var loader = document.querySelector("#loader")
    setTimeout(function () {
        loader.style.top = "-100%"
    }, 4200)
}
loaderAnimation()