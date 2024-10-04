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

/*=============== Gallery images ===============*/
// Elementlarni olish
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-image');
const captionText = document.getElementById('caption');
const closeBtn = document.getElementById('close-btn');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

let currentIndex = 0; // Hozirgi rasm indeksi
let startX = 0; // Swipe boshlanish nuqtasi
let isDragging = false; // Sichqoncha bilan drag qilinganini tekshirish

// Rasmlarni bosganda katta ekranda ko'rsatish
galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        modal.style.display = 'flex';
        modalImg.src = item.src;
        captionText.textContent = item.alt;
        currentIndex = index;
        document.body.style.overflow = 'hidden';  // Scroll ni o'chirish
    });
});

// Modalni yopish
modal.addEventListener('click', (e) => {
    if (e.target === modal) {  // Faqat modalning fon qismi bosilganda
        modal.style.display = 'none';
        document.body.style.overflow = '';  // Scrollni qayta yoqish
    }
});

// Oldingi rasmga o'tish
prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex === 0) ? galleryItems.length - 1 : currentIndex - 1;
    showImage();
});

// Keyingi rasmga o'tish
nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex === galleryItems.length - 1) ? 0 : currentIndex + 1;
    showImage();
});

// Rasmni ko'rsatish funksiyasi
function showImage() {
    modalImg.src = galleryItems[currentIndex].src;
    captionText.textContent = galleryItems[currentIndex].alt;
}

// Mobile qurilmalar uchun swipe aniqlash
modal.addEventListener('touchstart', (event) => {
    startX = event.touches[0].clientX;
});

modal.addEventListener('touchend', (event) => {
    const endX = event.changedTouches[0].clientX;
    handleSwipe(startX, endX);
});

// Desktop qurilmalar uchun swipe aniqlash (sichqoncha bilan)
modal.addEventListener('mousedown', (event) => {
    isDragging = true;
    startX = event.clientX;
});

modal.addEventListener('mousemove', (event) => {
    if (!isDragging) return;
    const currentX = event.clientX;
});

modal.addEventListener('mouseup', (event) => {
    if (!isDragging) return;
    isDragging = false;
    const endX = event.clientX;
    handleSwipe(startX, endX);
});

modal.addEventListener('mouseleave', (event) => {
    if (!isDragging) return;
    isDragging = false;
    const endX = event.clientX;
    handleSwipe(startX, endX);
});

// Swipe'ni aniqlash va rasm o'tkazish
function handleSwipe(startX, endX) {
    if (startX > endX + 50) {
        // Chapga swipe qilingan - keyingi rasm
        currentIndex = (currentIndex === galleryItems.length - 1) ? 0 : currentIndex + 1;
        showImage();
    } else if (startX < endX - 50) {
        // O'ngga swipe qilingan - oldingi rasm
        currentIndex = (currentIndex === 0) ? galleryItems.length - 1 : currentIndex - 1;
        showImage();
    }
}

// Close tugmasiga bosilganda modalni yopish
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = '';  // Scrollni qayta yoqish
});

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

/*=============== FORM CONTACT ===============*/
$(document).ready(function () {
    $('#contact-form form').on('submit', function (e) {
        e.preventDefault(); // Formaning default yuborilishini oldini olamiz

        // Formadagi name va phone qiymatlarini olamiz
        const name = $('#user-name').val(),
            phone = $('#user-phone').val();

        if (!name || !phone) {
            alert('Iltimos, barcha maydonlarni to\'ldiring!'); // Xatolik haqida alert
            return; // Yuborishni to'xtatamiz
        }

        // Agar barcha maydonlar to'ldirilgan bo'lsa, AJAX so'rovini yuboramiz
        $.ajax({
            url: '/armo.php', // O'zingizning API manzilingizni qo'ying
            type: 'POST', // So'rov turini ko'rsatamiz, POST yoki GET
            data: {
                name: name,
                phone: phone
            },
            success: function (response) {
                // Agar muvaffaqiyatli bo'lsa, javobni ko'rsatamiz
                console.log('Muvaffaqiyatli yuborildi:', response);

            },
            error: function (jqXHR, textStatus, errorThrown) {
                // Xatolik bo'lsa, konsolda xatolikni ko'rsatamiz
                alert(`Serverda xatolik yuz berdi, iltimos keyinroq urinib ko'ring`);
            }
        });
    });
});