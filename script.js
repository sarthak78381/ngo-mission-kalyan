const headerContainer = document.getElementById('header-container');
const headerLogoText = document.getElementById('header-logoText');


window.addEventListener('scroll', () => {
    if (window.scrollY < window.innerHeight/10) {
        headerContainer.style.color = '#000'
        headerContainer.style.background = 'rgba(255,0,0,0)'
        
    } else {
        headerContainer.style.color = '#fff'
        headerContainer.style.background = 'rgba(0,0,0,.7)';
        
  
    }
})