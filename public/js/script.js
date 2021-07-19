const headerContainer = document.getElementById('header-container');
const headerLogoText = document.getElementById('header-logoText');
const hamburger = document.getElementById('hamburger');
const hiddenBlock1 = document.getElementById('hidden-block1');
const hiddenBlock2 = document.getElementById('hidden-block2');

const galleryImages = document.getElementsByClassName('galleryImage__holder');


window.onload = async () => {
    let Url = `${window.location.origin}/getGalleryImages`;
    const images = await fetch(Url);
    const {filesContent} = await images.json();
    for (let i = 0; i < 12; i++) {
        galleryImages[i].src = filesContent[i];
    }
}


window.addEventListener('scroll', () => {
    if (window.scrollY < window.innerHeight/10) {
        headerContainer.style.color = '#000'
        headerContainer.style.background = 'rgba(255,0,0,0)'
        
    } else {
        headerContainer.style.color = '#fff'
        headerContainer.style.background = 'rgba(0,0,0,.7)';
    }
})

function closeMenu() {
    hiddenBlock1.classList.toggle('hidden');
    hiddenBlock2.classList.toggle('hidden');
}

hamburger.addEventListener('click', closeMenu)
