const elementsToShowOnHome = [
  document.querySelector('.hero'),
  document.querySelector('.marquee-container'),
  document.querySelector('.welcome-section'),
  document.querySelector('.intro-boxes-section'),
  document.querySelector('.sdgs-gallery-section'),
  document.querySelector('.cta-section')
];

function toggleHomeElements(isVisible) {
  elementsToShowOnHome.forEach(el => {
    if (el) {
      if (el.classList.contains('welcome-section') || el.classList.contains('intro-boxes-section')) {
        el.style.display = isVisible ? 'flex' : 'none';
      } else {
        el.style.display = isVisible ? 'block' : 'none';
      }
    }
  });
}

function hideAllContent(showHome = false) {
  const subContents = document.querySelectorAll('.sub-content-section');
  subContents.forEach(section => section.classList.remove('active'));

  toggleHomeElements(showHome);

  const navLinks = document.querySelectorAll('nav ul li a');
  navLinks.forEach(link => link.classList.remove('active'));

  if (showHome) {
    const homeLink = document.querySelector('nav ul li a'); 
    if (homeLink) homeLink.classList.add('active'); 
  }
}

function showContent(id) {
  hideAllContent(false);
  const targetSection = document.getElementById(id);
  if (targetSection) {
    targetSection.classList.add('active'); 
    let headerHeight = document.querySelector('header').offsetHeight; 
    setTimeout(() => {
      window.scrollTo({
        top: targetSection.offsetTop - headerHeight - 10, 
        behavior: 'smooth'
      });
    }, 50); 
  }
}

function toggleSDGsDetail() {
  const detailBox = document.getElementById('sdgs-detail-container');
  const button = document.getElementById('showSDGsDetailButton');
  if (!detailBox || !button) return;

  if (detailBox.style.display === 'none' || detailBox.style.display === '') {
    detailBox.style.display = 'block';
    button.textContent = 'Sembunyikan Detail 17 Tujuan Kami 👆';
    setTimeout(() => {
      detailBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  } else {
    detailBox.style.display = 'none';
    button.textContent = 'Lihat Penjelasan Detail 17 Tujuan Kami';
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const dropdownMenus = document.querySelectorAll('.dropdown-menu');

  dropdownMenus.forEach(menu => {
    const mainLink = menu.querySelector('a');
    const dropdownContent = menu.querySelector('.dropdown-content');

    mainLink.addEventListener('click', function() {
      dropdownMenus.forEach(otherMenu => {
        if (otherMenu !== menu) {
          const otherDropdown = otherMenu.querySelector('.dropdown-content');
          if (otherDropdown) otherDropdown.style.display = 'none';
        }
      });
      const isVisible = dropdownContent.style.display === 'block';
      dropdownContent.style.display = isVisible ? 'none' : 'block';
    });

    document.addEventListener('click', function(e) {
      if (!menu.contains(e.target) && !e.target.closest('.dropdown-content')) {
        dropdownContent.style.display = 'none';
      }
    });

    const subLinks = dropdownContent.querySelectorAll('a');
    subLinks.forEach(link => {
      link.addEventListener('click', function() {
        dropdownContent.style.display = 'none';
      });
    });
  });

  hideAllContent(true); 
});

function showReflectionPopup() {
  const pertanyaan = [
    "Apa menurutmu Kualitas Pendidikan yang baik itu penting?",
    "Siapakah nama guru yang menginspirasi kamu?",
    "Maukah kamu menjadi seseorang yang berkontribusi untuk Negaranya sendiri?",
    "Kalau suatu hari Indonesia berhasil meresmikan SDGs 4, apa yang akan kamu lakukan untuk mempertahankannya?",
  ];
  const random = pertanyaan[Math.floor(Math.random() * pertanyaan.length)];
  alert("Refleksi Pribadi:\n\n" + random);
}

const quotes = [
  '"Pendidikan adalah senjata paling ampuh untuk mengubah dunia." – Nelson Mandela',
  '"Ing ngarso sung tulodo, ing madyo mangun karso, tut wuri handayani." – Ki Hajar Dewantara',
  '"Education is the most powerful weapon which you can use to change the world." – Nelson Mandela',
  '"Belajar bukan untuk sekolah, tetapi untuk hidup." – Seneca'
];

let currentQuote = 0;
function rotateQuotes() {
  const quoteText = document.getElementById("quote-text");
  if (!quoteText) return;
  quoteText.style.opacity = 0;
  setTimeout(() => {
    currentQuote = (currentQuote + 1) % quotes.length;
    quoteText.textContent = quotes[currentQuote];
    quoteText.style.opacity = 1;
  }, 500);
}
setInterval(rotateQuotes, 5000);

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  document.getElementById("progress-bar").style.width = scrollPercent + "%";
});