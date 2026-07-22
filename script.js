// ======================================
// Mobile Navigation
// ======================================

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });

    document.querySelectorAll(".nav-menu a").forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
        });
    });
}

// ======================================
// Sticky Navbar
// ======================================

const header = document.getElementById("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 60) {

        header.style.padding = "10px 0";
        header.classList.add("scrolled");

    } else {

        header.style.padding = "18px 0";
        header.classList.remove("scrolled");

    }

});

// ======================================
// Active Navigation
// ======================================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-menu a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});
// ======================================
// Scroll To Top Button
// ======================================

const scrollBtn = document.getElementById("scrollTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {

        scrollBtn.classList.add("show");

    } else {

        scrollBtn.classList.remove("show");

    }

});

scrollBtn.addEventListener("click", () => {

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});

// ======================================
// Scroll Reveal
// ======================================

const reveals = document.querySelectorAll(".reveal");

function revealSections(){

    reveals.forEach(section => {

        const windowHeight = window.innerHeight;

        const revealTop = section.getBoundingClientRect().top;

        const revealPoint = 120;

        if(revealTop < windowHeight - revealPoint){

            section.classList.add("active");

        }

    });

}

window.addEventListener("scroll", revealSections);

revealSections();

// ======================================
// Dark Mode
// ======================================

const themeBtn = document.getElementById("themeToggle");

if(themeBtn){

    themeBtn.addEventListener("click",()=>{

        document.body.classList.toggle("dark");

        const icon = themeBtn.querySelector("i");

        if(document.body.classList.contains("dark")){

            icon.classList.replace("fa-moon","fa-sun");

        }else{

            icon.classList.replace("fa-sun","fa-moon");

        }

    });

}

// ======================================
// Preloader
// ======================================

window.addEventListener("load", () => {

    const preloader = document.getElementById("preloader");

    preloader.classList.add("hide");

});

// ================================
// Menu Search
// ================================

const searchBtn = document.getElementById("searchToggle");
const searchBox = document.querySelector(".search-box");
const searchInput = document.getElementById("menuSearch");

searchBtn.addEventListener("click", () => {

    searchBox.classList.toggle("active");

    searchInput.focus();

    document.querySelector("#menu").scrollIntoView({
        behavior:"smooth"
    });

});

searchInput.addEventListener("keyup", () => {

    const value = searchInput.value.toLowerCase();

    const cards = document.querySelectorAll(".menu-card");

    cards.forEach(card => {

        const title = card.querySelector("h3").textContent.toLowerCase();

        if(title.includes(value)){

            card.style.display="block";

        }else{

            card.style.display="none";

        }

    });

});

// ===============================
// ADVANCED SHOPPING CART
// ===============================

const cartSidebar = document.getElementById("cartSidebar");
const cartBtn = document.getElementById("cartBtn");
const closeCart = document.getElementById("closeCart");
const cartItemsContainer = document.querySelector(".cart-items");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

let cart = JSON.parse(localStorage.getItem("coffeeCart")) || [];

// Open Cart
cartBtn.onclick = () => cartSidebar.classList.add("active");

// Close Cart
closeCart.onclick = () => cartSidebar.classList.remove("active");

// Add to Cart
document.querySelectorAll(".add-cart").forEach(btn => {

    btn.onclick = () => {

        const name = btn.dataset.name;
        const price = Number(btn.dataset.price);

        const existing = cart.find(item => item.name === name);

        if(existing){

            existing.quantity++;

        }else{

            cart.push({
                name,
                price,
                quantity:1
            });

        }

        saveCart();
        renderCart();

    };

});

function saveCart(){

    localStorage.setItem("coffeeCart",JSON.stringify(cart));

}

function renderCart(){

    cartItemsContainer.innerHTML="";

    let total=0;
    let count=0;

    cart.forEach((item,index)=>{

        const subtotal=item.price*item.quantity;

        total+=subtotal;

        count+=item.quantity;

        cartItemsContainer.innerHTML+=`

        <div class="cart-item">

            <div class="cart-info">

                <h4>${item.name}</h4>

                <p>₹${item.price}</p>

                <div class="qty-controls">

                    <button class="minus" data-index="${index}">-</button>

                    <span>${item.quantity}</span>

                    <button class="plus" data-index="${index}">+</button>

                </div>

                <strong>Subtotal : ₹${subtotal}</strong>

            </div>

            <button class="delete-item" data-index="${index}">
                🗑
            </button>

        </div>

        `;

    });

    cartCount.textContent=count;
    if (count === 0) {
        cartCount.style.display = "none";
    } else {
        cartCount.style.display = "flex";
    }

    cartTotal.textContent = total;
    

    saveCart();

    attachEvents();

}

function attachEvents(){

    document.querySelectorAll(".plus").forEach(btn=>{

        btn.onclick=()=>{

            cart[btn.dataset.index].quantity++;

            renderCart();

        };

    });

    document.querySelectorAll(".minus").forEach(btn=>{

        btn.onclick=()=>{

            const item=cart[btn.dataset.index];

            item.quantity--;

            if(item.quantity<=0){

                cart.splice(btn.dataset.index,1);

            }

            renderCart();

        };

    });

    document.querySelectorAll(".delete-item").forEach(btn=>{

        btn.onclick=()=>{

            cart.splice(btn.dataset.index,1);

            renderCart();

        };

    });

}

document.getElementById("checkoutBtn").onclick=()=>{

    if(cart.length===0){

        alert("Your cart is empty!");

        return;

    }

    window.location.href="checkout.html";

};

renderCart();


// ===========================
// PRODUCT MODAL
// ===========================

const productModal=document.getElementById("productModal");

const modalTitle=document.getElementById("modalTitle");
const modalDescription=document.getElementById("modalDescription");
const modalPrice=document.getElementById("modalPrice");
const modalImage=document.getElementById("modalImage");
const modalIngredients=document.getElementById("modalIngredients");
const modalCalories=document.getElementById("modalCalories");

const modalAddCart=document.getElementById("modalAddCart");

let selectedProduct=null;

const products={

"Classic Espresso":{

image:"assets/images/coffee1.jpg",

description:"A bold espresso made using premium Arabica beans.",

ingredients:"Arabica Beans, Water",

calories:"15 kcal",

price:199

},

"Cappuccino":{

image:"assets/images/coffee2.png",

description:"Creamy milk foam blended with rich espresso.",

ingredients:"Espresso, Milk Foam",

calories:"120 kcal",

price:249

},

"Café Latte":{

image:"assets/images/coffee3.png",

description:"Silky steamed milk with espresso.",

ingredients:"Espresso, Milk",

calories:"180 kcal",

price:279

},

"Mocha":{

image:"assets/images/coffee4.png",

description:"Chocolate meets premium espresso.",

ingredients:"Chocolate, Espresso, Milk",

calories:"250 kcal",

price:299

},

"Cold Brew":{

image:"assets/images/coffee5.png",

description:"Smooth slow-brewed coffee served chilled.",

ingredients:"Cold Brew Coffee",

calories:"25 kcal",

price:329

},

"Caramel Macchiato":{

image:"assets/images/coffee6.png",

description:"Rich caramel layered over espresso.",

ingredients:"Espresso, Milk, Caramel",

calories:"220 kcal",

price:349

},

"Vanilla Latte":{

image:"assets/images/coffee7.png",

description:"Creamy vanilla flavored latte.",

ingredients:"Milk, Espresso, Vanilla",

calories:"210 kcal",

price:319

},

"Hazelnut Cappuccino":{

image:"assets/images/coffee8.png",

description:"Hazelnut flavored creamy cappuccino.",

ingredients:"Espresso, Hazelnut, Milk",

calories:"205 kcal",

price:339

}

};

document.querySelectorAll(".menu-card").forEach(card=>{

card.style.cursor="pointer";

card.onclick=()=>{

const name=card.querySelector("h3").textContent;

selectedProduct=products[name];

modalTitle.textContent=name;
modalDescription.textContent=selectedProduct.description;
modalPrice.textContent=selectedProduct.price;
modalImage.src=selectedProduct.image;
modalIngredients.textContent=selectedProduct.ingredients;
modalCalories.textContent=selectedProduct.calories;

productModal.classList.add("active");

};

});

document.getElementById("closeModal").onclick=()=>{

productModal.classList.remove("active");

};

productModal.onclick=(e)=>{

if(e.target===productModal){

productModal.classList.remove("active");

}

};

modalAddCart.onclick=()=>{

const existing=cart.find(item=>item.name===modalTitle.textContent);

if(existing){

existing.quantity++;

}else{

cart.push({

name:modalTitle.textContent,

price:selectedProduct.price,

quantity:1

});

}

renderCart();

productModal.classList.remove("active");

};

// ======================
// WISHLIST
// ======================

let wishlist =
JSON.parse(localStorage.getItem("wishlist")) || [];

document.querySelectorAll(".wishlist-btn").forEach((button,index)=>{

    if(wishlist.includes(index)){

        button.classList.add("active");

        button.innerHTML='<i class="fa-solid fa-heart"></i>';

    }

    button.addEventListener("click",(e)=>{

        e.stopPropagation();

        if(wishlist.includes(index)){

            wishlist=wishlist.filter(i=>i!==index);

            button.classList.remove("active");

            button.innerHTML='<i class="fa-regular fa-heart"></i>';

        }else{

            wishlist.push(index);

            button.classList.add("active");

            button.innerHTML='<i class="fa-solid fa-heart"></i>';

        }

        localStorage.setItem(
            "wishlist",
            JSON.stringify(wishlist)
        );

    });

});

// =======================
// FILTER MENU
// =======================

const filterBtns =
document.querySelectorAll(".filter-btn");

const cards =
document.querySelectorAll(".menu-card");

filterBtns.forEach(btn=>{

btn.onclick=()=>{

filterBtns.forEach(b=>

b.classList.remove("active"));

btn.classList.add("active");

const category=btn.dataset.filter;

cards.forEach(card=>{

if(

category==="all" ||

card.dataset.category===category

){

card.style.display="block";

}else{

card.style.display="none";

}

});

};

});

const progressBar = document.getElementById("progressBar");

if (progressBar) {
    window.addEventListener("scroll", () => {
        const totalHeight =
            document.documentElement.scrollHeight - window.innerHeight;

        const progress =
            (window.scrollY / totalHeight) * 100;

        progressBar.style.width = progress + "%";
    });
}

// ======================================
// 3D TILT MENU CARDS
// ======================================

document.querySelectorAll(".menu-card").forEach(card => {

    card.addEventListener("mousemove", (e) => {

        console.log("Moving");

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateY = (x / rect.width - 0.5) * 20;
        const rotateX = -(y / rect.height - 0.5) * 20;

        card.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            scale(1.05)
        `;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform =
            "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
    });

});

// ======================================
// ANIMATED COUNTERS
// ======================================

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const counter = entry.target;
        const target = +counter.dataset.target;

        let current = 0;
        const increment = Math.max(1, Math.ceil(target / 100));

        const updateCounter = () => {

            current += increment;

            if (current >= target) {

                if (target === 15000) {
                    counter.innerText = "15K+";
                }
                else if (target === 49) {
                    counter.innerText = "4.9★";
                }
                else {
                    counter.innerText = target + "+";
                }

                return;
            }

            counter.innerText = current;

            requestAnimationFrame(updateCounter);
        };

        updateCounter();

        counterObserver.unobserve(counter);

    });

}, {
    threshold: 0.5
});

counters.forEach(counter => counterObserver.observe(counter));

// ======================================
// HERO PARALLAX EFFECT
// ======================================

const heroImage = document.querySelector(".hero-image img");

if (heroImage) {

    document.addEventListener("mousemove", (e) => {

        const x = (window.innerWidth / 2 - e.clientX) / 40;
        const y = (window.innerHeight / 2 - e.clientY) / 40;

        heroImage.style.transform =
            `translate(${x}px, ${y}px)`;

    });

}

// ======================================
// GALLERY LIGHTBOX
// ======================================

const galleryImages = document.querySelectorAll(".gallery-item img");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");

const closeLightbox = document.querySelector(".close-lightbox");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let currentImage = 0;

galleryImages.forEach((image,index)=>{

    image.addEventListener("click",()=>{

        currentImage=index;

        showImage();

        lightbox.classList.add("active");

        document.body.style.overflow="hidden";

    });

});

function showImage(){

    lightboxImage.src=galleryImages[currentImage].src;

}

nextBtn.onclick=()=>{

    currentImage++;

    if(currentImage>=galleryImages.length){

        currentImage=0;

    }

    showImage();

};

prevBtn.onclick=()=>{

    currentImage--;

    if(currentImage<0){

        currentImage=galleryImages.length-1;

    }

    showImage();

};

closeLightbox.onclick=closeGallery;

lightbox.onclick=(e)=>{

    if(e.target===lightbox){

        closeGallery();

    }

};

document.addEventListener("keydown",(e)=>{

    if(!lightbox.classList.contains("active")) return;

    if(e.key==="Escape"){

        closeGallery();

    }

    if(e.key==="ArrowRight"){

        nextBtn.click();

    }

    if(e.key==="ArrowLeft"){

        prevBtn.click();

    }

});

function closeGallery(){

    lightbox.classList.remove("active");

    document.body.style.overflow="auto";

}

