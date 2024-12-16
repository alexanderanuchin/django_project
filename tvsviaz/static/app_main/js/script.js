// Общие переменные
let navbar, sliderSection, navbarToggler, sliderBgColor, floatImage, customSection, mainImage, footer;
let overlayBaium, imageContainerBaium, descriptionBaium, toggleTextBtnBaium, titleBaium;
let currentImageIndexBaium = 0, imageSwitchIntervalBaium, currentCardIndexBaium = 0;


// SVG данные
const textColor = "#8891ae";
const svgData = [
  [
    { src: "/static/app_main/img/section_5/Бизнес by iconSvg.co.svg", text: "Служба поддержки" },
    { src: "/static/app_main/img/section_5/Открыто 24_7 by iconSvg.co.svg", text: "Работаем 24/7" },
  ],
  [
    { src: "/static/app_main/img/section_5/Доставка by iconSvg.co.svg", text: "Доставка по России" },
    { src: "/static/app_main/img/section_5/Направления by iconSvg.co.svg", text: "Доставим в срок" },
  ],
  [
    { src: "/static/app_main/img/section_5/Бизнес by iconSvg.co.svg", text: "Инженерия, проекты" },
    { src: "/static/app_main/img/section_5/Бизнес by iconSvg.co (1).svg", text: "Собственное СРО" },
  ],
  [
    { src: "/static/app_main/img/section_5/Гарантия by iconSvg.co.svg", text: "Гарантия производства" },
    { src: "/static/app_main/img/section_5/Защита от by iconSvg.co.svg", text: "Защитим от рисков" },
  ],
];

// Данные карточек Baium
const cardsDataBaium = [
  {
    id: 1,
    title: 'История компании',
    description: 'История нашей компании насчитывает уже 30 лет. ...',
    images: [
      '/static/app_main/img/image/lc_desktop_992px_r16x9_pd20_2.webp',
      '/static/app_main/img/image/lc_desktop_992px_r16x9_pd20_3.webp',
      '/static/app_main/img/image/lc_desktop_992px_r16x9_pd20_4.webp',
    ]
  },
  {
    id: 2,
    title: 'Лицензии, свидетельства, сертификаты',
    description: 'На весь перечень работ ...',
    images: [
      '/static/app_main/img/image/lc_desktop_992px_r16x9_pd20_4.webp',
      '/static/app_main/img/image/lc_desktop_992px_r16x9_pd20.png',
      '/static/app_main/img/image/lc_desktop_992px_r16x9_pd20_4.webp',
    ]
  },
  {
    id: 3,
    title: 'Карточка 3',
    description: 'Описание карточки 3',
    images: [
      '/static/app_main/img/image/lc_desktop_992px_r16x9_pd20.png',
      '/static/app_main/img/image/lc_desktop_992px_r16x9_pd20_3.webp',
      '/static/app_main/img/image/lc_desktop_992px_r16x9_pd20_2.webp',
      '/static/app_main/img/image/lc_desktop_992px_r16x9_pd2.png',
      '/static/app_main/img/image/lc_desktop_992px_r16x9_pd20_3.png',
    ]
  },
  {
    id: 4,
    title: 'Карточка 4',
    description: 'Описание карточки 4',
    images: [
      '/static/app_main/img/image/lc_desktop_992px_r16x9_pd20_3.webp',
      '/static/app_main/img/image/lc_desktop_992px_r16x9_pd2.png',
      '/static/app_main/img/image/lc_desktop_992px_r16x9_pd20_3.png',
      '/static/app_main/img/image/lc_desktop_992px_r16x9_pd20_3.webp',
      '/static/app_main/img/image/lc_desktop_992px_r16x9_pd20_4.webp',
    ]
  },
  {
    id: 5,
    title: 'Карточка 5',
    description: 'Описание карточки 5',
    images: [
      '/static/app_main/img/image/lc_desktop_992px_r16x9_pd2.png',
      '/static/app_main/img/image/lc_desktop_992px_r16x9_pd20_3.png',
      '/static/app_main/img/image/lc_desktop_992px_r16x9_pd20.png',
      '/static/app_main/img/image/lc_desktop_992px_r16x9_pd20_4.webp',
    ]
  },
  {
    id: 6,
    title: 'Карточка 6',
    description: 'Описание карточки 6',
    images: [
      '/static/app_main/img/image/lc_desktop_992px_r16x9_pd20_3.png',
      '/static/app_main/img/image/lc_desktop_992px_r16x9_pd20_4.webp',
      '/static/app_main/img/image/lc_desktop_992px_r16x9_pd20.png',
      '/static/app_main/img/image/lc_desktop_992px_r16x9_pd20_4.webp',
    ]
  }
];

// Троттлинг
function throttle(func, limit) {
  let lastFunc;
  let lastRan;
  return function (...args) {
    const context = this;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function () {
        if (Date.now() - lastRan >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}

function scrollHandler() {
  const scrolled = window.scrollY > 50;
  navbar.classList.toggle("scrolled", scrolled);
  if (scrolled) {
    navbar.style.backgroundColor = "white";
    if (navbarToggler) {
      navbarToggler.querySelector(".navbar-toggler-icon").style.filter = "invert(0.5)";
    }
  } else {
    navbar.style.backgroundColor = sliderBgColor;
    if (navbarToggler) {
      navbarToggler.querySelector(".navbar-toggler-icon").style.filter = "invert(1)";
    }
  }
  updateImagePosition();
}

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return rect.top <= window.innerHeight && rect.bottom >= 0;
}

function updateImagePosition() {
  if (isInViewport(customSection)) {
    const rect = customSection.getBoundingClientRect();
    const sectionTop = rect.top;
    const sectionBottom = rect.bottom;
    const scrollY = window.scrollY;
    const offset = (scrollY - sectionTop) * 0.1;
    const minOffset = 10;
    const maxOffset = sectionBottom - mainImage.offsetHeight - floatImage.offsetHeight;
    const limitedOffset = Math.max(minOffset, Math.min(maxOffset, offset));
    floatImage.style.transform = `translateY(${limitedOffset - 50}px)`;
  }
}

function cycleImages(container, caption, images) {
  container.style.transition = "all 3s ease";
  container.style.opacity = "0";
  container.style.filter = "blur(10px)";
  container.style.transform = "scale(0.8) rotate(-15deg)";
  caption.style.opacity = "0";
  caption.style.transform = "scale(0.8)";

  setTimeout(() => {
    const nextIndex = (parseInt(container.getAttribute("data-index"),10) + 1) % images.length;
    container.setAttribute("data-index", nextIndex);
    const nextData = images[nextIndex];
    container.innerHTML = `<img src="${nextData.src}" class="w-100 h-100" alt="SVG">`;
    container.style.filter = "blur(0)";
    container.style.transform = "scale(1) rotate(0)";
    container.style.opacity = "1";
    container.style.left = "50%";
    container.classList.add("highlight");
    setTimeout(() => container.classList.remove("highlight"), 500);
    caption.textContent = nextData.text;
    caption.style.color = textColor;
    caption.style.opacity = "1";
    caption.style.transform = "scale(0.8)";
    setTimeout(() => (caption.style.transform = "scale(1)"), 1000);
  }, 1500);
}

function displayCardDetailsBaium(cardBaium) {
  titleBaium.textContent = cardBaium.title;
  descriptionBaium.textContent = cardBaium.description;
  toggleTextBtnBaium.style.display = 'block';
  descriptionBaium.style.maxHeight = '50px';

  if (imageSwitchIntervalBaium) clearInterval(imageSwitchIntervalBaium);
  currentImageIndexBaium = 0;
  updateBackgroundImage(cardBaium.images[currentImageIndexBaium], imageContainerBaium);
  imageSwitchIntervalBaium = setInterval(() => {
    currentImageIndexBaium = (currentImageIndexBaium + 1) % cardBaium.images.length;
    updateBackgroundImage(cardBaium.images[currentImageIndexBaium], imageContainerBaium);
  }, 3000);

  currentCardIndexBaium = cardsDataBaium.findIndex((c) => c.id === cardBaium.id);
}

function switchCard(direction) {
  currentCardIndexBaium = (currentCardIndexBaium + direction + cardsDataBaium.length) % cardsDataBaium.length;
  const newCard = cardsDataBaium[currentCardIndexBaium];
  displayCardDetailsBaium(newCard);
}

function updateBackgroundImage(imageUrl, container) {
  container.style.backgroundImage = `url(${imageUrl})`;
}

function initializeHandlersBaium(context = document) {
  const toggleBtn = context.querySelector("#toggleTextBtnBaium");
  const desc = context.querySelector("#descriptionBaium");
  let isExpanded = false;
  if (toggleBtn && desc) {
    toggleBtn.addEventListener("click", () => {
      isExpanded = !isExpanded;
      desc.style.maxHeight = isExpanded ? "none" : "50px";
      const imgSrc = toggleBtn.getAttribute("data-img-src");
      toggleBtn.innerHTML = isExpanded
      ? "Скрыть"
      : `<img src="${imgSrc}" width="40" alt="clickMenu">`;
    });
  }
  const closeBtn = context.querySelector(".close-buttonBaium");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      const overlay = document.querySelector(".overlayBaium");
      if (overlay) overlay.remove();
    });
  }
}

function closeOverlayBaium() {
  if (overlayBaium) {
    overlayBaium.remove();
    overlayBaium = null;
  }
}

function initializeMetalloScroll(scrollWidth) {
  gsap.to(".metallo-scroll", {
      x: scrollWidth,
      ease: "none",
      scrollTrigger: {
          trigger: ".metallo-magic",
          start: "top top",
          end: "bottom top",
          scrub: true,
          pin: ".metallo-magic",
      },
  });
}

function setupResponsiveMetalloScroll() {
  if (window.innerWidth >= 320 ) {
      initializeMetalloScroll("-55%");
  }
}

// Более продвинутая функция скрытия прелоадера с использованием requestAnimationFrame
function hidePreloader() {
  const preloader = document.getElementById('preloader');
  const content = document.getElementById('content');
  let opacity = 1;
  function fadeOut() {
    if (opacity > 0) {
      opacity -= 0.05;
      preloader.style.opacity = opacity;
      requestAnimationFrame(fadeOut);
    } else {
      preloader.style.visibility = 'hidden';
      content.style.visibility = 'visible';
      gsap.to(content, { duration: 0.5, opacity: 1 });
    }
  }
  fadeOut();
}

document.addEventListener("DOMContentLoaded", () => {
  navbar = document.querySelector(".navbar");
  sliderSection = document.querySelector(".slider-section");
  navbarToggler = document.querySelector(".navbar-toggler");
  if (sliderSection) {
    sliderBgColor = window.getComputedStyle(sliderSection).backgroundColor;
  }

  floatImage = document.querySelector(".float-image");
  customSection = document.querySelector(".container");
  mainImage = document.querySelector(".main-image");

  window.addEventListener("scroll", throttle(scrollHandler, 100));
  updateImagePosition();

  document.querySelectorAll(".card-custom").forEach((card) => {
    const blurEffect = card.querySelector(".blur-effect");
    card.addEventListener("mouseenter", () => { blurEffect.style.opacity = 1; });
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - blurEffect.offsetWidth / 2;
      const y = e.clientY - rect.top - blurEffect.offsetHeight / 2;
      blurEffect.style.transform = `translate(${x}px, ${y}px)`;
    });
    card.addEventListener("mouseleave", () => { blurEffect.style.opacity = 0; });
  });

  const rectangles = document.querySelectorAll(".rectangle");
  rectangles.forEach((rectangle, index) => {
    const container = rectangle.querySelector(".svg-container");
    const caption = rectangle.querySelector(".caption");
    const images = svgData[index];
    container.setAttribute("data-index", 0);
    container.innerHTML = `<img src="${images[0].src}" class="w-100 h-100" alt="SVG">`;
    caption.textContent = images[0].text;
    caption.style.color = textColor;
    let delay = index * 1000;
    setTimeout(() => setInterval(() => cycleImages(container, caption, images), 17000), delay);
  });

  const reviews = document.querySelectorAll(".review-item");
  const indicators = document.querySelectorAll(".indicator");
  const nextButton = document.querySelector(".arrow-right");
  const prevButton = document.querySelector(".arrow-left");
  let currentReview = 0;
  function updateReviews() {
    reviews.forEach((review, index) => {
      review.classList.remove("active", "prev", "next");
      if (index === currentReview) {
        review.classList.add("active");
      } else if (index === (currentReview - 1 + reviews.length) % reviews.length) {
        review.classList.add("prev");
      } else if (index === (currentReview + 1) % reviews.length) {
        review.classList.add("next");
      }
    });
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle("active", index === currentReview);
    });
  }
  function nextReview() {
    currentReview = (currentReview + 1) % reviews.length;
    updateReviews();
  }
  function prevReview() {
    currentReview = (currentReview - 1 + reviews.length) % reviews.length;
    updateReviews();
  }
  nextButton.addEventListener("click", nextReview);
  prevButton.addEventListener("click", prevReview);
  setInterval(nextReview, 8500);
  updateReviews();

  const leftButton = document.querySelector(".arrow-left");
  const rightButton = document.querySelector(".arrow-right");
  function handleButtonClick(button) {
    button.classList.add("clicked");
    setTimeout(() => { button.classList.remove("clicked"); }, 800);
  }
  leftButton.addEventListener("click", () => { handleButtonClick(leftButton); console.log("Левая кнопка нажата"); });
  rightButton.addEventListener("click", () => { handleButtonClick(rightButton); console.log("Правая кнопка нажата"); });
  [leftButton, rightButton].forEach((button) => {
    button.addEventListener("mouseenter", () => { button.style.boxShadow = "0 0 15px rgba(230, 57, 70, 0.9)"; });
    button.addEventListener("mouseleave", () => { button.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.3)"; });
  });

  const blocks = document.querySelectorAll(".left-block, .menu-block, .right-block");
  blocks.forEach((block) => {
    block.addEventListener("mouseenter", () => { block.style.transform = "translateY(-10px)"; });
    block.addEventListener("mouseleave", () => { block.style.transform = "translateY(0)"; });
  });

  footer = document.querySelector(".footer");
  if (footer) {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        footer.classList.add("visible");
      }
    }, { threshold: 0.5 });
    footer.classList.add("hidden");
    observer.observe(footer);
  }

  const cardContainerBaium = document.querySelector('.card-containerBaium');
  cardsDataBaium.forEach((cardBaium) => {
    const backgroundImage = (cardBaium.images && cardBaium.images.length > 0) ? `url('${cardBaium.images[0]}')` : 'url("img/image/svarka_zavod.gif")';
    const cardElementBaium = document.createElement('div');
    cardElementBaium.classList.add('col');
    cardElementBaium.innerHTML = `
      <div class="cardBaium" style="background-image: ${backgroundImage};">
          <div class="card-contentBaium">
              <h5 class="card-titleBaium">${cardBaium.title}</h5>
              <p class="card-descriptionBaium mt-1">${cardBaium.description}</p>
          </div>
      </div>
    `;
    cardElementBaium.querySelector('.cardBaium').addEventListener('click', () => displayCardDetailsBaium(cardBaium));
    cardContainerBaium.appendChild(cardElementBaium);
  });

  imageContainerBaium = document.querySelector('.image-containerBaium');
  descriptionBaium = document.querySelector('#descriptionBaium');
  toggleTextBtnBaium = document.querySelector('#toggleTextBtnBaium');
  titleBaium = document.querySelector('.image-titleBaium');

  const controlsContainer = document.createElement('div');
  controlsContainer.classList.add('card-controls');
  controlsContainer.innerHTML = `
  <div class="d-flex justify-content-between">
    <button class="leftArrowBlock">↶</button>
    <button class="rightArrowBlock">↷</button>
  </div>
  `;
  const leftBlockBaium = document.querySelector('.left-blockBaium');
  if (leftBlockBaium) {
    leftBlockBaium.appendChild(controlsContainer);
  }
  const leftArrowBlock = document.querySelector('.leftArrowBlock');
  const rightArrowBlock = document.querySelector('.rightArrowBlock');
  if (leftArrowBlock && rightArrowBlock) {
    leftArrowBlock.addEventListener('click', () => switchCard(-1));
    rightArrowBlock.addEventListener('click', () => switchCard(1));
  }

  let isExpandedBaium = false;
  const toggleBtnMain = document.querySelector('#toggleTextBtnBaium');
  if (toggleBtnMain) {
    toggleBtnMain.addEventListener('click', () => {
      isExpandedBaium = !isExpandedBaium;
      descriptionBaium.style.maxHeight = isExpandedBaium ? 'none' : '50px';
      const toggleBtn = document.getElementById("toggleTextBtnBaium");

      const imgSrc = toggleBtn.getAttribute("data-img-src");
      toggleBtnMain.innerHTML = isExpandedBaium
        ? 'Скрыть'
        : `<img src="${imgSrc}" width="40" alt="clickMenu">`;
    });
  }

  if (imageContainerBaium) {
    imageContainerBaium.addEventListener("click", () => {
      if (!overlayBaium) {
        overlayBaium = document.createElement("div");
        overlayBaium.classList.add("overlayBaium");
        document.body.appendChild(overlayBaium);
        const leftBlockBaiumClone = leftBlockBaium.cloneNode(true);
        leftBlockBaiumClone.classList.add("enlargedBaium");
        leftBlockBaiumClone.querySelectorAll(".leftArrowBlock, .rightArrowBlock").forEach((btn) => btn.remove());
        overlayBaium.appendChild(leftBlockBaiumClone);

        const prevButton = document.createElement("button");
        const nextButton = document.createElement("button");
        prevButton.innerHTML = "⟨";
        nextButton.innerHTML = "⟩";
        prevButton.classList.add("prev-buttonBaium");
        nextButton.classList.add("next-buttonBaium");
        leftBlockBaiumClone.appendChild(prevButton);
        leftBlockBaiumClone.appendChild(nextButton);

        const closeButtonBaium = document.createElement("button");
        const staticPath = document.getElementById('staticPath').dataset.staticUrl;
        closeButtonBaium.innerHTML = `<img src="${staticPath}FreeSample-X.svg" width="40" alt="clickMenu">`;
        closeButtonBaium.classList.add("close-buttonBaium");
        leftBlockBaiumClone.appendChild(closeButtonBaium);

        const cardTitle = leftBlockBaiumClone.querySelector(".image-titleBaium").textContent;
        const cardData = cardsDataBaium.find((card) => card.title === cardTitle);

        if (!cardData || !cardData.images || cardData.images.length === 0) {
          console.error("Данные для карточки не найдены или отсутствуют изображения.");
          closeOverlayBaium();
          return;
        }

        let currentImageIndex = 0;
        function updateImage() {
          const newImage = cardData.images[currentImageIndex];
          if (newImage) {
            const imgElement = leftBlockBaiumClone.querySelector(".image-containerBaium");
            imgElement.style.backgroundImage = `url(${newImage})`;
          }
        }

        prevButton.addEventListener("click", () => {
          currentImageIndex = (currentImageIndex - 1 + cardData.images.length) % cardData.images.length;
          updateImage();
        });

        nextButton.addEventListener("click", () => {
          currentImageIndex = (currentImageIndex + 1) % cardData.images.length;
          updateImage();
        });

        updateImage();
        initializeHandlersBaium(leftBlockBaiumClone);
        closeButtonBaium.addEventListener("click", closeOverlayBaium);
        overlayBaium.addEventListener("click", (e) => { if (e.target === overlayBaium) closeOverlayBaium(); });
      }
    });
  }

  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
  setupResponsiveMetalloScroll();
  
  // Инициализация EmailJS
  emailjs.init({ publicKey: "g93Fpx6b31GM-rhdR" });

  const formContact = document.getElementById("formContact");
  const inputName = document.getElementById("inputName");
  const inputEmail = document.getElementById("inputEmail");
  const inputMessage = document.getElementById("inputMessage");
  const feedbackMessage = document.getElementById("feedbackMessage");
  const btnCalculate = document.getElementById("btnCalculate");
  const btnInvite = document.getElementById("btnInvite");
  const greenBtn = document.getElementById("greenBtn");
  const universalModal = document.getElementById("universalModal");
  let modal;
  if (universalModal) modal = new bootstrap.Modal(universalModal);

  if (formContact) {
    formContact.addEventListener("submit", (event) => {
      event.preventDefault();
      const name = inputName.value.trim();
      const email = inputEmail.value.trim();
      const message = inputMessage.value.trim();
      if (!name || !email || !message) {
        displayFeedback("All fields are required.", "danger");
        return;
      }
      if (!validateEmail(email)) {
        displayFeedback("Please enter a valid email address.", "danger");
        return;
      }
      sendEmail(name, email, message);
    });

    function displayFeedback(message, type) {
      feedbackMessage.textContent = message;
      feedbackMessage.className = `alert alert-${type} mt-3`;
      feedbackMessage.classList.remove("d-none");
      setTimeout(() => { feedbackMessage.classList.add("d-none"); }, 4000);
    }

    function validateEmail(email) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
    }

    function sendEmail(name, email, message) {
      emailjs.send("service_wreecri", "template_syzkmnp", {
        name: name,
        email: email,
        message: message,
      }).then(
        () => {
          displayFeedback("Thank you! Your message has been sent.", "success");
          formContact.reset();
        },
        (error) => {
          displayFeedback("An error occurred. Please try again.", "danger");
          console.error("EmailJS error:", error);
        }
      );
    }

    if (btnCalculate) btnCalculate.addEventListener("click", (e) => { e.preventDefault(); modal && modal.show(); });
    if (btnInvite) btnInvite.addEventListener("click", (e) => { e.preventDefault(); modal && modal.show(); });
    if (greenBtn) greenBtn.addEventListener("click", (e) => { e.preventDefault(); modal && modal.show(); });
  }
});

window.addEventListener('load', () => {
  hidePreloader();
});


gsap.registerPlugin(ScrollTrigger);
gsap.from(".container h1", {
  scrollTrigger: {
    trigger: ".container",
    start: "top center",
    end: "bottom top",
    scrub: true,
  },
  opacity: 0,
  y: 50,
  duration: 1
});