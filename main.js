document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. HERO SLIDER CAROUSEL
  // ==========================================
  const sliderContainer = document.getElementById('slider-container');
  const slides = document.querySelectorAll('.slide');
  const btnPrev = document.getElementById('slide-prev');
  const btnNext = document.getElementById('slide-next');
  
  let currentSlide = 0;
  const slideCount = slides.length;
  let autoplayTimer;

  function updateSlider() {
    sliderContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slideCount;
    updateSlider();
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slideCount) % slideCount;
    updateSlider();
  }

  function resetAutoplay() {
    clearInterval(autoplayTimer);
    autoplayTimer = setInterval(nextSlide, 5000);
  }

  if (btnNext && btnPrev && sliderContainer) {
    btnNext.addEventListener('click', () => {
      nextSlide();
      resetAutoplay();
    });

    btnPrev.addEventListener('click', () => {
      prevSlide();
      resetAutoplay();
    });

    // Start autoplay
    resetAutoplay();
  }

  // ==========================================
  // 2. DYNAMIC VIDEO INTERACTION
  // ==========================================
  const videoPlayBtn = document.getElementById('video-play-btn');
  const videoContainer = document.getElementById('video-container');

  if (videoPlayBtn && videoContainer) {
    videoPlayBtn.addEventListener('click', () => {
      // Replace thumbnail with a responsive, high-definition stock/promo video player
      videoContainer.innerHTML = `
        <iframe 
          width="100%" 
          height="100%" 
          src="https://www.youtube.com/embed/g20t_K9PrcY?autoplay=1" 
          title="Naturals Ice Cream Promo" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowfullscreen
          style="border: none; position: absolute; top:0; left:0; width:100%; height:100%;"
        ></iframe>`;
    });
  }

  // ==========================================
  // 3. CART INTERACTIONS & TOAST NOTIFICATION
  // ==========================================
  const buyButtons = document.querySelectorAll('.btn-buy');
  const orderBtn = document.getElementById('order-btn');
  let cartCount = 0;

  // Setup visual toast container
  const toastContainer = document.createElement('div');
  toastContainer.style.position = 'fixed';
  toastContainer.style.bottom = '30px';
  toastContainer.style.right = '30px';
  toastContainer.style.zIndex = '1000';
  toastContainer.style.display = 'flex';
  toastContainer.style.flexDirection = 'column';
  toastContainer.style.gap = '10px';
  document.body.appendChild(toastContainer);

  function showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.backgroundColor = '#095c2f';
    toast.style.color = '#faf9f5';
    toast.style.padding = '16px 28px';
    toast.style.borderRadius = '8px';
    toast.style.fontSize = '0.9rem';
    toast.style.fontWeight = '700';
    toast.style.boxShadow = '0 10px 25px rgba(9, 92, 47, 0.2)';
    toast.style.border = '1px solid #0ebd62';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    toast.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    
    toastContainer.appendChild(toast);
    
    // Trigger animation reflow
    setTimeout(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateY(0)';
    }, 10);

    // Auto remove after 3.5 seconds
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-20px)';
      setTimeout(() => {
        toast.remove();
      }, 400);
    }, 3500);
  }

  buyButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const card = e.target.closest('.product-card');
      const title = card.querySelector('.product-title').textContent;
      
      cartCount++;
      if (orderBtn) {
        orderBtn.textContent = `Order Now (${cartCount})`;
        orderBtn.style.backgroundColor = '#0ebd62';
        orderBtn.style.boxShadow = '0 6px 20px rgba(14, 189, 98, 0.4)';
      }
      
      showToast(`Added ${title} Ice Cream to your order! 🍦`);
    });
  });

  // ==========================================
  // 4. MOBILE NAVIGATION DRAWER TOGGLE
  // ==========================================
  const menuToggle = document.getElementById('menu-toggle');
  const mainNav = document.getElementById('main-nav');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      // Toggle menu classes
      mainNav.classList.toggle('active');
      menuToggle.classList.toggle('open');
      
      // Basic inline toggle if menu active
      if (mainNav.classList.contains('active')) {
        mainNav.style.display = 'block';
        mainNav.style.position = 'absolute';
        mainNav.style.top = '80px';
        mainNav.style.left = '0';
        mainNav.style.width = '100%';
        mainNav.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        mainNav.style.borderBottom = '1px solid rgba(9, 92, 47, 0.1)';
        mainNav.style.padding = '20px';
        
        const menuList = mainNav.querySelector('.nav-menu');
        menuList.style.flexDirection = 'column';
        menuList.style.gap = '16px';
        menuList.style.display = 'flex';
      } else {
        mainNav.style.display = '';
        const menuList = mainNav.querySelector('.nav-menu');
        menuList.style.flexDirection = '';
        menuList.style.gap = '';
        menuList.style.display = '';
      }
    });
  }

  // ==========================================
  // 5. SCROLL SMOOTH EFFECTS
  // ==========================================
  const header = document.getElementById('main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.boxShadow = '0 8px 30px rgba(9, 92, 47, 0.08)';
      header.style.padding = '5px 0';
    } else {
      header.style.boxShadow = '0 2px 8px rgba(9, 92, 47, 0.04)';
      header.style.padding = '';
    }
  });

});
