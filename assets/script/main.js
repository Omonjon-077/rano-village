/*=============== Header fixed ===============*/
if ($("#header-menu ").length) {
    window.onscroll = function () {
        myFunction()
    };

    let header = document.getElementById("header-menu");
    let sticky = header.offsetTop;

    function myFunction() {
        if (window.pageYOffset > sticky) {
            header.classList.add("sticky");
        } else {
            header.classList.remove("sticky");
        }
    }
}

/*=============== Show scroll up ===============*/
if ($("#scroll-up").length) {
    const scrollUp = () => {
        const scrollUp = document.getElementById('scroll-up')
        // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scroll up class
        this.scrollY >= 300 ? scrollUp.classList.add('show-scroll')
            : scrollUp.classList.remove('show-scroll')
    }
    window.addEventListener('scroll', scrollUp);
}