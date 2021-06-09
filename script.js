const headerContainer = document.getElementById('header-container');
const headerLogoText = document.getElementById('header-logoText');
const hamburger = document.getElementById('hamburger');
const hiddenBlock1 = document.getElementById('hidden-block1');
const hiddenBlock2 = document.getElementById('hidden-block2');


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
