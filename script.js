const headerContainer = document.getElementById('header-container');


window.addEventListener('scroll', () => {
    if (window.scrollY < 100) {
        headerContainer.style.color = '#000'
        return headerContainer.style.background = 'rgba(255,0,0,0)'
    };
    headerContainer.style.color = '#fff'
    return headerContainer.style.background = 'rgba(0,0,0,.7)'
})