const logOut = document.getElementById('adminLogout__button');

logOut.addEventListener('click', () => {
    document.cookie = '';
    let Url = `${window.location.origin}/admin/logout`
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", Url, true );
    xmlHttp.send();
    window.location.replace(window.location.origin)
})