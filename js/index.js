const form = document.querySelector('#form'),
    formEmail = document.querySelector('#email'),
    formBtn = document.querySelector('#form-btn');

setInterval(updateClock, 1000);

function updateClock() {
    const clock = document.querySelector('.clock');
    clock.innerText = new Date().toLocaleTimeString();
}

function validateEmail(email) {
    if (email.endsWith('@gmail.com') || email.endsWith('@ukr.net')) {
        email = email.replace('@gmail.com', '');
        email = email.replace('@ukr.net', '');

        const re = /^([a-zA-Z\-0-9]{3,})$/i;
        if (re.test(String(email).toLowerCase())) {
            return true;
        }
    }
}

function checkValidate() {
    if (validateEmail(formEmail.value)) {
        formBtn.removeAttribute("disabled");
    } else {
        formBtn.setAttribute("disabled", "true");
    }
}

class Carousel {
    constructor(images) {
        this.images = images;
        this.currIdx = 0;
        this.showCurrentImage();
        document.querySelector('.prev').addEventListener('click', 
             () => this.prevImage() );
        document.querySelector('.next').addEventListener('click', 
            () => this.nextImage() );
        setInterval(() => this.nextImage(), 3000);
    }
    showCurrentImage() {
        document.querySelector('.current').src = this.images[this.currIdx];
    }
    nextImage() {
        if (++this.currIdx >= this.images.length) this.currIdx = 0;
        this.showCurrentImage();
    }
    prevImage() {
        if (--this.currIdx < 0) this.currIdx = this.images.length - 1;
        this.showCurrentImage();
    }
}

new Carousel([
    'img/Genesisexit.jpg',
    'img/Genesisreception.jpg',
    'img/Genesiscrystalprive.jpg',
    'img/Genesisin.jpg',
    'img/Genesiscrystal.jpg'
]);

if (localStorage.getItem('name') !== null) {
    form.querySelector('#name').value = localStorage.getItem('name');
    form.querySelector('#number').value = localStorage.getItem('number');
    form.querySelector('#email').value = localStorage.getItem('email');
}

formBtn.addEventListener("click", () => {
    const formData = new FormData(form);

    localStorage.setItem('name', formData.get('name'));
    localStorage.setItem('number', formData.get('number'));
    localStorage.setItem('email', formData.get('email'));
});

formEmail.addEventListener("input", () => {
    checkValidate();
});

checkValidate();
