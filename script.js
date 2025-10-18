// script.js - Cross-browser compatible version
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu functionality
    function initMobileMenu() {
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                this.classList.toggle('active');
                navMenu.classList.toggle('active');
                
                // Toggle body scroll
                if (navMenu.classList.contains('active')) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            });
            
            // Close menu when clicking on links
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                });
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
            
            // Close menu on escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }
    }

    // Video Controls
    function initVideoControls() {
        const video = document.getElementById('hero-video');
        const playBtn = document.getElementById('video-play');
        const muteBtn = document.getElementById('video-mute');
        const fullscreenBtn = document.getElementById('video-fullscreen');
        
        if (video && playBtn && muteBtn && fullscreenBtn) {
            // Play/Pause functionality
            playBtn.addEventListener('click', function() {
                if (video.paused) {
                    video.play();
                    this.innerHTML = '<i class="fas fa-pause"></i>';
                } else {
                    video.pause();
                    this.innerHTML = '<i class="fas fa-play"></i>';
                }
            });
            
            // Mute/Unmute functionality
            muteBtn.addEventListener('click', function() {
                if (video.muted) {
                    video.muted = false;
                    this.innerHTML = '<i class="fas fa-volume-up"></i>';
                } else {
                    video.muted = true;
                    this.innerHTML = '<i class="fas fa-volume-mute"></i>';
                }
            });
            
            // Fullscreen functionality
            fullscreenBtn.addEventListener('click', function() {
                if (video.requestFullscreen) {
                    video.requestFullscreen();
                } else if (video.webkitRequestFullscreen) {
                    video.webkitRequestFullscreen();
                } else if (video.msRequestFullscreen) {
                    video.msRequestFullscreen();
                }
            });
            
            // Update play button when video ends
            video.addEventListener('ended', function() {
                playBtn.innerHTML = '<i class="fas fa-play"></i>';
            });
            
            // Video autoplay with fallback
            const playPromise = video.play();
            
            if (playPromise !== undefined) {
                playPromise.catch(function(error) {
                    console.log('Autoplay prevented, showing fallback image');
                    // Create fallback image
                    const fallbackImage = document.createElement('div');
                    fallbackImage.style.cssText = `
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: linear-gradient(135deg, #1d3557 0%, #14213d 100%);
                        z-index: 1;
                    `;
                    video.parentNode.insertBefore(fallbackImage, video);
                    
                    // Add play button
                    const playButton = document.createElement('button');
                    playButton.innerHTML = '<i class="fas fa-play"></i>';
                    playButton.style.cssText = `
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        width: 80px;
                        height: 80px;
                        background: var(--primary-color);
                        color: white;
                        border: none;
                        border-radius: 50%;
                        font-size: 2rem;
                        cursor: pointer;
                        z-index: 2;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        transition: all 0.3s ease;
                    `;
                    playButton.addEventListener('mouseenter', function() {
                        this.style.transform = 'translate(-50%, -50%) scale(1.1)';
                    });
                    playButton.addEventListener('mouseleave', function() {
                        this.style.transform = 'translate(-50%, -50%) scale(1)';
                    });
                    playButton.addEventListener('click', function() {
                        video.play().then(() => {
                            fallbackImage.remove();
                            this.remove();
                        }).catch(() => {
                            console.log('Still cannot play video');
                        });
                    });
                    video.parentNode.appendChild(playButton);
                });
            }
        }
    }

    // Navbar scroll effect
    function initNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            window.addEventListener('scroll', function() {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                if (scrollTop > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            });
        }
    }

    // Navbar active link - IMPROVED VERSION
    function initNavbarActiveLinks() {
        const sections = document.querySelectorAll('section[id], footer[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        function updateActiveLink() {
            const scrollY = window.pageYOffset;
            const windowHeight = window.innerHeight;

            // Jika di atas, aktifkan "Beranda"
            if (scrollY < 100) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#Beranda') {
                        link.classList.add('active');
                    }
                });
                return;
            }

            // Cek setiap section
            sections.forEach(section => {
                const sectionHeight = section.offsetHeight;
                const sectionTop = section.offsetTop - 100;
                const sectionId = section.getAttribute('id');
                const sectionBottom = sectionTop + sectionHeight;

                // Jika scroll position berada dalam section ini
                if (scrollY >= sectionTop && scrollY < sectionBottom) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === '#' + sectionId) {
                            link.classList.add('active');
                        }
                    });
                }
            });

            // Special case untuk footer/kontak
            const footer = document.querySelector('footer[id="kontak"]');
            if (footer) {
                const footerTop = footer.offsetTop - 100;
                if (scrollY >= footerTop) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === '#kontak') {
                            link.classList.add('active');
                        }
                    });
                }
            }
        }

        window.addEventListener('scroll', updateActiveLink);
        updateActiveLink(); // panggil pertama kali
    }

    // Scroll to section
    function initScrollToSection() {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;

        // Tambah event untuk semua link di navbar
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                
                if (targetId === 'Beranda') {
                    // Scroll ke paling atas kalau klik Beranda
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                } else {
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                        const targetPosition = targetElement.offsetTop - navbarHeight;
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });

        // Scroll indicator functionality
        const scrollIndicator = document.getElementById('scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', function() {
                const productsSection = document.getElementById('produk');
                if (productsSection) {
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const sectionPosition = productsSection.offsetTop - navbarHeight;
                    window.scrollTo({
                        top: sectionPosition,
                        behavior: 'smooth'
                    });
                }
            });
        }
    }

    // Counter Animation System - IMPROVED
    function initCounterAnimation() {
        // Hero counters - langsung jalan tanpa nunggu scroll
        const heroCounters = document.querySelectorAll('.hero-stats .stat-number');
        if (heroCounters.length > 0) {
            animateCounters(heroCounters, 2000);
        }

        // About counters - jalan ketika section about terlihat
        const aboutSection = document.querySelector('.about-section');
        const aboutCounters = document.querySelectorAll('.about-stats .stat-number');
        let aboutCountersAnimated = false;

        if (aboutSection && aboutCounters.length > 0) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !aboutCountersAnimated) {
                        aboutCountersAnimated = true;
                        animateCounters(aboutCounters, 2500);
                    }
                });
            }, { threshold: 0.3 });

            observer.observe(aboutSection);
        }
    }

    // Universal counter animation function
    function animateCounters(counters, duration = 2000) {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-count');
            const start = 0;
            const increment = target / (duration / 16); // 60fps
            let current = start;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            updateCounter();
        });
    }

    // Product Filtering
    function initProductFiltering() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const productGrid = document.getElementById('product-grid');
        const sortSelect = document.getElementById('sort-products');
        const productCards = document.querySelectorAll('.product-card');
        
        if (!filterButtons.length || !productGrid || !sortSelect) return;
        
        // Filter products function
        function filterProducts() {
            const activeFilter = document.querySelector('.filter-btn.active')?.getAttribute('data-filter') || 'all';
            const sortValue = sortSelect.value;
            
            let filteredProducts = Array.from(productCards);
            
            // Filter by category
            if (activeFilter !== 'all') {
                filteredProducts = filteredProducts.filter(card => 
                    card.getAttribute('data-category') === activeFilter
                );
            }
            
            // Sort products
            filteredProducts = sortProducts(filteredProducts, sortValue);
            
            // Clear and re-append filtered products
            productGrid.innerHTML = '';
            filteredProducts.forEach(card => {
                productGrid.appendChild(card);
            });
            
            // Re-initialize event listeners for new buttons
            addProductEventListeners();
        }
        
        // Sort products function
        function sortProducts(productsArray, sortBy) {
            switch(sortBy) {
                case 'zeneos':
                    return productsArray.filter(product => product.getAttribute('data-brand') === 'zeneos');
                case 'gtradial':
                    return productsArray.filter(product => product.getAttribute('data-brand') === 'gtradial');
                case 'gt-tires':
                    return productsArray.filter(product => product.getAttribute('data-brand') === 'gt-tires');
                case 'giti':
                    return productsArray.filter(product => product.getAttribute('data-brand') === 'giti');
                case 'irc':
                    return productsArray.filter(product => product.getAttribute('data-brand') === 'irc');
                default:
                    return productsArray;
            }
        }
        
        // Filter buttons
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                filterProducts();
            });
        });
        
        // Sort select
        sortSelect.addEventListener('change', filterProducts);
        
        // Initial filter
        filterProducts();
    }

    // Product event listeners
    function addProductEventListeners() {
        // Quick View Buttons
        const quickViewButtons = document.querySelectorAll('.btn-quick-view');
        quickViewButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productId = this.getAttribute('data-id');
                openQuickView(productId);
            });
        });
        
        // Add to Cart Buttons
        const addToCartButtons = document.querySelectorAll('.btn-beli');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productId = this.getAttribute('data-id');
                addToCart(productId);
            });
        });
    }

    // Quick View Modal
    function initQuickViewModal() {
        const quickViewModal = document.getElementById('quickViewModal');
        const closeModal = document.querySelector('.close-modal');
        const modalBody = document.getElementById('modal-body');
        
        if (!quickViewModal || !closeModal || !modalBody) return;
        
        function openQuickView(productId) {
            const productCard = document.querySelector(`.product-card[data-id="${productId}"]`);
            
            if (productCard) {
                const productImage = productCard.querySelector('.product-image img').src;
                const productTitle = productCard.querySelector('.product-title').textContent;
                const productDescription = productCard.querySelector('.product-description').textContent;
                const productPrice = productCard.querySelector('.price').textContent;
                const productOldPrice = productCard.querySelector('.price-old')?.textContent || '';
                
                // Get specs from product card
                const specsItems = productCard.querySelectorAll('.spec-item');
                const specsHTML = Array.from(specsItems).map(spec => {
                    const icon = spec.querySelector('i').className;
                    const text = spec.querySelector('span').textContent;
                    return `
                        <div class="spec-item">
                            <i class="${icon}"></i>
                            <span>${text}</span>
                        </div>
                    `;
                }).join('');
                
                modalBody.innerHTML = `
                    <div class="modal-product-image">
                        <img src="${productImage}" alt="${productTitle}" loading="lazy">
                    </div>
                    <div class="modal-product-info">
                        <h3 class="modal-product-title">${productTitle}</h3>
                        <div class="modal-product-price">
                            <span class="price">${productPrice}</span>
                            ${productOldPrice ? `<span class="price-old">${productOldPrice}</span>` : ''}
                        </div>
                        <p class="modal-product-description">${productDescription}</p>
                        <div class="modal-product-specs">
                            ${specsHTML}
                        </div>
                        <ul class="tech-features">
                            <li><i class="fas fa-check"></i> <span>Premium Quality Materials</span></li>
                            <li><i class="fas fa-check"></i> <span>Extended Warranty</span></li>
                            <li><i class="fas fa-check"></i> <span>Free Installation Service</span></li>
                        </ul>
                        <div class="modal-product-actions">
                            <button class="btn-beli" data-id="${productId}">Beli Sekarang</button>
                        </div>
                    </div>
                `;
                
                quickViewModal.classList.add('active');
                document.body.style.overflow = 'hidden';
                
                // Add event listeners to modal buttons
                const modalAddToCart = modalBody.querySelector('.btn-beli');
                if (modalAddToCart) {
                    modalAddToCart.addEventListener('click', function() {
                        addToCart(productId);
                        closeQuickViewModal();
                    });
                }
            }
        }
        
        function closeQuickViewModal() {
            quickViewModal.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        // Close modal events
        closeModal.addEventListener('click', closeQuickViewModal);
        
        // Close modal when clicking outside
        quickViewModal.addEventListener('click', function(e) {
            if (e.target === quickViewModal) {
                closeQuickViewModal();
            }
        });
        
        // Close modal with escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && quickViewModal.classList.contains('active')) {
                closeQuickViewModal();
            }
        });
        
        // Expose function globally
        window.openQuickView = openQuickView;
    }

    // Add to cart function
    function addToCart(productId) {
        showNotification('Produk berhasil ditambahkan ke keranjang!');
    }

    // Load More Products
    function initLoadMore() {
        const btnLoadMore = document.getElementById('btn-load-more');
        
        if (btnLoadMore) {
            btnLoadMore.addEventListener('click', function() {
                // In a real application, you would fetch more products from a server
                showNotification('Tidak ada produk tambahan untuk saat ini.');
                
                // Simulate loading
                const originalHTML = this.innerHTML;
                this.innerHTML = '<span>Memuat...</span>';
                this.disabled = true;
                
                setTimeout(() => {
                    this.innerHTML = originalHTML;
                    this.disabled = false;
                }, 1500);
            });
        }
    }

    // Testimonials Slider
    function initTestimonialsSlider() {
        const sliderElement = document.getElementById('testimonials-slider');
        
        if (sliderElement && typeof Swiper !== 'undefined') {
            const testimonialsSlider = new Swiper('#testimonials-slider', {
                slidesPerView: 1,
                spaceBetween: 30,
                loop: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                breakpoints: {
                    768: {
                        slidesPerView: 2,
                    },
                    992: {
                        slidesPerView: 3,
                    }
                },
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                }
            });
        }
    }

    // Back to Top Button
    function initBackToTop() {
        const backToTop = document.getElementById('back-to-top');
        
        if (backToTop) {
            window.addEventListener('scroll', function() {
                if (window.pageYOffset > 300) {
                    backToTop.classList.add('show');
                } else {
                    backToTop.classList.remove('show');
                }
            });
            
            backToTop.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    // Scroll Progress Indicator
    function initScrollProgress() {
        const scrollProgress = document.querySelector('.scroll-progress');
        
        if (scrollProgress) {
            window.addEventListener('scroll', function() {
                const windowHeight = window.innerHeight;
                const documentHeight = document.documentElement.scrollHeight;
                const scrollTop = window.pageYOffset;
                const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
                
                scrollProgress.style.height = `${scrollPercent}%`;
            });
        }
    }

    // Notification Function
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background-color: var(--secondary-color);
            color: white;
            padding: 12px 24px;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow-lg);
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
            max-width: 90%;
            text-align: center;
            font-weight: 500;
        `;
        
        document.body.appendChild(notification);
        
        // Fade in
        setTimeout(() => {
            notification.style.opacity = '1';
        }, 10);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Animate elements on scroll
    function initScrollAnimations() {
        const elements = document.querySelectorAll('.product-card, .tech-item, .testimonial-card, .about-stat');
        let animatedElements = new Set();
        
        function animateOnScroll() {
            elements.forEach(element => {
                if (animatedElements.has(element)) return;
                
                const elementPosition = element.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.2;
                
                if (elementPosition < screenPosition) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                    animatedElements.add(element);
                }
            });
        }
        
        // Set initial state for animation
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
        
        window.addEventListener('scroll', animateOnScroll);
        // Trigger once on load
        setTimeout(animateOnScroll, 100);
    }

    // Newsletter Functionality
    function initNewsletter() {
        const newsletterBtn = document.querySelector('.newsletter-btn');
        const newsletterInput = document.querySelector('.newsletter-input');
        
        if (newsletterBtn && newsletterInput) {
            newsletterBtn.addEventListener('click', function() {
                const email = newsletterInput.value.trim();
                
                if (!email) {
                    showNotification('Mohon masukkan alamat email Anda');
                    return;
                }
                
                if (!isValidEmail(email)) {
                    showNotification('Mohon masukkan alamat email yang valid');
                    return;
                }
                
                // Simulate newsletter subscription
                const originalHTML = this.innerHTML;
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                this.disabled = true;
                
                setTimeout(() => {
                    showNotification('Terima kasih! Anda telah berlangganan newsletter kami.');
                    newsletterInput.value = '';
                    this.innerHTML = originalHTML;
                    this.disabled = false;
                }, 1500);
            });

            // Enter key support for newsletter
            newsletterInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    newsletterBtn.click();
                }
            });
        }
    }

    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // CTA Functionality
    function initCTAFunctionality() {
        // WhatsApp Button functionality can be added here if needed
        console.log('CTA functionality initialized');
    }

    // Language System - NEW FEATURE
    function initLanguageSystem() {
        const languageToggle = document.getElementById('language-toggle');
        const languageMenu = document.getElementById('language-menu');
        const currentLanguage = document.getElementById('current-language');
        const languageOptions = document.querySelectorAll('.language-option');
        
        // Language data
        const translations = {
            id: {
                // Navigation
                'nav.home': 'Beranda',
                'nav.products': 'Produk',
                'nav.technology': 'Teknologi',
                'nav.testimonials': 'Testimoni',
                'nav.about': 'Tentang',
                'nav.contact': 'Kontak',
                
                // Hero Section
                'hero.title1': 'Cengkeraman Kuat',
                'hero.title2': 'Seperti Gajah',
                'hero.subtitle': 'Teknologi ban terdepan dengan performa maksimal di segala medan.',
                'hero.subtitle2': 'Keamanan dan kenyamanan dalam genggaman Anda.',
                'hero.stat1': 'Kepuasan Pelanggan',
                'hero.stat2': 'Tahun Garansi',
                'hero.stat3': 'Ribuan Pelanggan',
                'hero.scroll': 'Scroll untuk Menjelajahi',
                
                // Products Section
                'products.title': 'Produk Unggulan Kami',
                'products.subtitle': 'Temukan ban terbaik untuk kendaraan Anda dengan teknologi terkini dari GajahGrip',
                'products.filter.all': 'Semua Produk',
                'products.filter.passenger': 'Penumpang',
                'products.filter.suv': 'SUV & MPV',
                'products.filter.truck': 'Truk & Bus',
                'products.filter.performance': 'Performance',
                'products.sort.default': 'Urutkan: Default',
                'products.badge.bestseller': 'Best Seller',
                'products.badge.comfort': 'Nyaman',
                'products.badge.new': 'New',
                'products.badge.performance': 'Performance',
                'products.badge.durable': 'Tahan Lama',
                'products.quickview': 'Quick View',
                'products.buy': 'Beli Sekarang',
                'products.loadmore': 'Muat Lebih Banyak',
                
                // Product Descriptions
                'products.description.1': 'Ban berperforma sangat tinggi memberikan pengendaraan yang nyaman dan senyap.',
                'products.description.2': 'CHAMPIRO SX-R adalah generasinya selanjutnya dari ban sport ultra high performance yang dirancang untuk memberikan traksi dan stabilitas maksimal di berbagai kondisi jalan.',
                'products.description.3': 'Desain ban yang memadukan penampilan yang sporty dengan performa yang maksimal',
                'products.description.4': 'Ban penumpang dengan keseimbangan sempurna antara kenyamanan, keamanan, dan keawetan. Cocok untuk penggunaan sehari-hari di perkotaan.',
                'products.description.5': 'Ban hemat bahan bakar dengan kenyamanan berkendara maksimal dan umur panjang. Menggunakan kompon khusus untuk mengurangi rolling resistance.',
                'products.description.6': 'Ban highway-terrain untuk SUV dengan performa optimal di jalan raya dan kenyamanan maksimal. Desain tread yang seimbang untuk kenyamanan dan performa.',
                'products.description.7': 'Ban khusus performa tinggi dengan traksi superior di kondisi basah dan kering. Dilengkapi teknologi khusus untuk meningkatkan grip di segala kondisi.',
                'products.description.8': 'Peningkatan daya cengkeram dan kestabilan dengan tread compound & konstruksi terbaru bagi pengendara motor sport yang menginginkan pengalaman berkendara',
                'products.description.9': 'Ban balap dengan pola slick dipadu dengan konstruksi ARAMID / Kevlar yang menjamin kestabilan performa untuk kondisi kering pada saat kompetisi.',
                
                // Product Specs
                'products.specs.allseason': 'All Season',
                'products.specs.quiet': 'Rendah Bising',
                'products.specs.allterrain': 'All Terrain',
                'products.specs.durable': 'Tahan Lama',
                'products.specs.highspeed': 'High Speed',
                'products.specs.highgrip': 'Grip Tinggi',
                'products.specs.responsive': 'Responsif',
                'products.specs.comfort': 'Nyaman',
                'products.specs.eco': 'Ramah Lingkungan',
                'products.specs.highway': 'Highway',
                'products.specs.heavyduty': 'Heavy Duty',
                'products.specs.safety': 'Safety',
                
                // Technology Section
                'technology.title': 'Teknologi GajahGrip',
                'technology.subtitle': 'Inovasi terdepan dalam teknologi ban untuk performa maksimal di segala kondisi',
                'technology.tech1.title': 'Dual Compound Technology',
                'technology.tech1.description': 'Teknologi kompon ganda yang memberikan keseimbangan sempurna antara daya cengkeram dan keawetan. Bagian luar menggunakan kompon lembut untuk traksi maksimal, sementara bagian dalam menggunakan kompon keras untuk ketahanan jarak tempuh yang lebih panjang.',
                'technology.tech1.feature1': 'Traksi 30% lebih baik di kondisi basah',
                'technology.tech1.feature2': 'Keawetan meningkat 25%',
                'technology.tech1.feature3': 'Penghematan bahan bakar hingga 5%',
                'technology.tech2.title': 'Silica-Enhanced Tread',
                'technology.tech2.description': 'Polimer silica dalam kompon karet meningkatkan fleksibilitas pada suhu rendah, memberikan traksi superior di kondisi basah dan bersalju. Teknologi ini mengurangi jarak pengereman hingga 10% dibandingkan ban konvensional.',
                'technology.tech2.feature1': 'Jarak pengereman lebih pendek 10%',
                'technology.tech2.feature2': 'Performa optimal di kondisi basah',
                'technology.tech2.feature3': 'Stabilitas tinggi pada kecepatan tinggi',
                'technology.tech3.title': 'Stabilizing Ribs Technology',
                'technology.tech3.description': 'Desain rusuk penstabil pada dinding samping ban meningkatkan stabilitas berkendara dan responsivitas kemudi. Teknologi ini mengurangi gaya samping saat menikung, memberikan kontrol yang lebih presisi dan rasa aman yang lebih tinggi.',
                'technology.tech3.feature1': 'Stabilitas meningkat 20%',
                'technology.tech3.feature2': 'Respons kemudi lebih langsung',
                'technology.tech3.feature3': 'Kenyamanan berkendara lebih baik',
                
                // Testimonials Section
                'testimonials.title': 'Apa Kata Pelanggan Kami?',
                'testimonials.subtitle': 'Testimoni jujur dari pengguna GajahGrip di seluruh Indonesia',
                'testimonials.testimonial1': '"Ban GajahGrip GitiControl P10 sangat nyaman dan hemat bahan bakar. Sudah 2 tahun digunakan dan masih bagus. Pelayanannya juga sangat memuaskan!"',
                'testimonials.testimonial2': '"GajahGrip CHAMPIRO SX-R sangat tangguh di medan off-road. Cocok untuk adventure ke daerah terpencil. Traksinya mantap di segala medan. Recommended!"',
                'testimonials.testimonial3': '"Ban GajahGrip untuk truk saya sangat awet dan tahan lama. Sudah 3 tahun dipakai setiap hari dengan beban berat, masih bagus dan aman."',
                'testimonials.location1': 'Jakarta',
                'testimonials.location2': 'Bandung',
                'testimonials.location3': 'Surabaya',
                
                // About Section
                'about.title': 'Tentang GajahGrip',
                'about.description1': 'GajahGrip didirikan pada tahun 2005 dengan misi menyediakan ban berkualitas tinggi dengan harga terjangkau untuk masyarakat Indonesia. Dengan pengalaman lebih dari 15 tahun dalam industri ban, kami telah berkembang menjadi salah satu merek ban terpercaya di tanah air.',
                'about.description2': 'Komitmen kami terhadap inovasi dan kualitas telah menghasilkan berbagai penghargaan industri, termasuk "Best Tire Brand" pada Indonesia Automotive Awards 2022. Setiap produk GajahGrip dirancang dengan mempertimbangkan kondisi jalan Indonesia yang beragam, dari jalan perkotaan hingga medan terpencil.',
                'about.stat1': 'Tahun Pengalaman',
                'about.stat2': 'Ribuan Pelanggan',
                'about.stat3': 'Penghargaan',
                'about.stat4': 'Kota Terjangkau',
                'about.badge': 'Tahun Pengalaman',
                
                // Footer Section
                'footer.description': 'Penyedia ban berkualitas tinggi dengan teknologi terdepan untuk semua jenis kendaraan. Keamanan dan kenyamanan Anda adalah prioritas kami.',
                'footer.newsletter.title': 'Berlangganan Newsletter',
                'footer.newsletter.subtitle': 'Dapatkan info promo dan tips perawatan ban',
                'footer.newsletter.placeholder': 'Email Anda',
                'footer.products.title': 'Produk Kami',
                'footer.products.link1': 'Ban Penumpang',
                'footer.products.link2': 'Ban SUV & MPV',
                'footer.products.link3': 'Ban Truk & Bus',
                'footer.products.link4': 'Ban Performance',
                'footer.products.link5': 'Ban All-Terrain',
                'footer.services.title': 'Layanan',
                'footer.services.link1': 'Pemasangan Ban',
                'footer.services.link2': 'Spooring & Balancing',
                'footer.services.link3': 'Konsultasi Ban',
                'footer.services.link4': 'Servis Kendaraan',
                'footer.services.link5': 'Emergency Service',
                'footer.help.title': 'Bantuan',
                'footer.help.link1': 'FAQ',
                'footer.help.link2': 'Panduan Ukuran Ban',
                'footer.help.link3': 'Tips Perawatan Ban',
                'footer.help.link4': 'Syarat & Ketentuan',
                'footer.help.link5': 'Kebijakan Privasi',
                'footer.contact.title': 'Kontak Kami',
                'footer.contact.address': 'Jakarta Barat 11630',
                'footer.contact.hours.title': 'Senin - Minggu',
                'footer.contact.hours.time': '08.00 - 22.00 WIB',
                'footer.payment.title': 'Metode Pembayaran',
                'footer.bottom': 'Developed with',
                'footer.bottom2': 'for Better Driving Experience',
                'footer.bottomlink1': 'Sitemap',
                'footer.bottomlink2': 'Privacy Policy',
                'footer.bottomlink3': 'Terms of Service'
            },
            en: {
                // Navigation
                'nav.home': 'Home',
                'nav.products': 'Products',
                'nav.technology': 'Technology',
                'nav.testimonials': 'Testimonials',
                'nav.about': 'About',
                'nav.contact': 'Contact',
                
                // Hero Section
                'hero.title1': 'Strong Grip',
                'hero.title2': 'Like an Elephant',
                'hero.subtitle': 'Leading tire technology with maximum performance on all terrains.',
                'hero.subtitle2': 'Safety and comfort in your hands.',
                'hero.stat1': 'Customer Satisfaction',
                'hero.stat2': 'Years Warranty',
                'hero.stat3': 'Thousands of Customers',
                'hero.scroll': 'Scroll to Explore',
                
                // Products Section
                'products.title': 'Our Featured Products',
                'products.subtitle': 'Find the best tires for your vehicle with the latest technology from GajahGrip',
                'products.filter.all': 'All Products',
                'products.filter.passenger': 'Passenger',
                'products.filter.suv': 'SUV & MPV',
                'products.filter.truck': 'Truck & Bus',
                'products.filter.performance': 'Performance',
                'products.sort.default': 'Sort: Default',
                'products.badge.bestseller': 'Best Seller',
                'products.badge.comfort': 'Comfort',
                'products.badge.new': 'New',
                'products.badge.performance': 'Performance',
                'products.badge.durable': 'Durable',
                'products.quickview': 'Quick View',
                'products.buy': 'Buy Now',
                'products.loadmore': 'Load More',
                
                // Product Descriptions
                'products.description.1': 'Very high performance tires providing comfortable and quiet driving.',
                'products.description.2': 'CHAMPIRO SX-R is the next generation of ultra high performance sport tires designed to provide maximum traction and stability in various road conditions.',
                'products.description.3': 'Tire design that combines sporty appearance with maximum performance',
                'products.description.4': 'Passenger tires with perfect balance between comfort, safety, and durability. Suitable for daily use in urban areas.',
                'products.description.5': 'Fuel-efficient tires with maximum driving comfort and long life. Using special compound to reduce rolling resistance.',
                'products.description.6': 'Highway-terrain tires for SUVs with optimal performance on highways and maximum comfort. Balanced tread design for comfort and performance.',
                'products.description.7': 'High performance tires with superior traction in wet and dry conditions. Equipped with special technology to improve grip in all conditions.',
                'products.description.8': 'Improved grip and stability with the latest tread compound & construction for sport motorcycle riders who want a superior riding experience',
                'products.description.9': 'Racing tires with slick pattern combined with ARAMID / Kevlar construction that guarantees stable performance for dry conditions during competitions.',
                
                // Product Specs
                'products.specs.allseason': 'All Season',
                'products.specs.quiet': 'Low Noise',
                'products.specs.allterrain': 'All Terrain',
                'products.specs.durable': 'Durable',
                'products.specs.highspeed': 'High Speed',
                'products.specs.highgrip': 'High Grip',
                'products.specs.responsive': 'Responsive',
                'products.specs.comfort': 'Comfort',
                'products.specs.eco': 'Eco-Friendly',
                'products.specs.highway': 'Highway',
                'products.specs.heavyduty': 'Heavy Duty',
                'products.specs.safety': 'Safety',
                
                // Technology Section
                'technology.title': 'GajahGrip Technology',
                'technology.subtitle': 'Leading innovations in tire technology for maximum performance in all conditions',
                'technology.tech1.title': 'Dual Compound Technology',
                'technology.tech1.description': 'Dual compound technology that provides perfect balance between grip and durability. The outer part uses soft compound for maximum traction, while the inner part uses hard compound for longer mileage.',
                'technology.tech1.feature1': '30% better traction in wet conditions',
                'technology.tech1.feature2': '25% increased durability',
                'technology.tech1.feature3': 'Up to 5% fuel savings',
                'technology.tech2.title': 'Silica-Enhanced Tread',
                'technology.tech2.description': 'Silica polymer in rubber compound improves flexibility at low temperatures, providing superior traction in wet and snowy conditions. This technology reduces braking distance by up to 10% compared to conventional tires.',
                'technology.tech2.feature1': '10% shorter braking distance',
                'technology.tech2.feature2': 'Optimal performance in wet conditions',
                'technology.tech2.feature3': 'High stability at high speeds',
                'technology.tech3.title': 'Stabilizing Ribs Technology',
                'technology.tech3.description': 'Stabilizing ribs design on tire sidewalls improves driving stability and steering responsiveness. This technology reduces lateral force when cornering, providing more precise control and higher sense of safety.',
                'technology.tech3.feature1': '20% improved stability',
                'technology.tech3.feature2': 'More direct steering response',
                'technology.tech3.feature3': 'Better driving comfort',
                
                // Testimonials Section
                'testimonials.title': 'What Our Customers Say?',
                'testimonials.subtitle': 'Honest testimonials from GajahGrip users across Indonesia',
                'testimonials.testimonial1': '"GajahGrip GitiControl P10 tires are very comfortable and fuel efficient. Been using them for 2 years and still in good condition. The service is also very satisfying!"',
                'testimonials.testimonial2': '"GajahGrip CHAMPIRO SX-R is very tough in off-road terrain. Perfect for adventure to remote areas. The traction is solid in all terrains. Recommended!"',
                'testimonials.testimonial3': '"GajahGrip tires for my truck are very durable and long-lasting. Been used daily for 3 years with heavy loads, still in good condition and safe."',
                'testimonials.location1': 'Jakarta',
                'testimonials.location2': 'Bandung',
                'testimonials.location3': 'Surabaya',
                
                // About Section
                'about.title': 'About GajahGrip',
                'about.description1': 'GajahGrip was founded in 2005 with the mission to provide high-quality tires at affordable prices for Indonesian people. With over 15 years of experience in the tire industry, we have grown into one of the most trusted tire brands in the country.',
                'about.description2': 'Our commitment to innovation and quality has resulted in various industry awards, including "Best Tire Brand" at the Indonesia Automotive Awards 2022. Every GajahGrip product is designed considering the diverse road conditions in Indonesia, from urban roads to remote terrain.',
                'about.stat1': 'Years of Experience',
                'about.stat2': 'Thousands of Customers',
                'about.stat3': 'Awards',
                'about.stat4': 'Cities Covered',
                'about.badge': 'Years Experience',
                
                // Footer Section
                'footer.description': 'Provider of high-quality tires with cutting-edge technology for all types of vehicles. Your safety and comfort are our priority.',
                'footer.newsletter.title': 'Subscribe to Newsletter',
                'footer.newsletter.subtitle': 'Get promo info and tire maintenance tips',
                'footer.newsletter.placeholder': 'Your Email',
                'footer.products.title': 'Our Products',
                'footer.products.link1': 'Passenger Tires',
                'footer.products.link2': 'SUV & MPV Tires',
                'footer.products.link3': 'Truck & Bus Tires',
                'footer.products.link4': 'Performance Tires',
                'footer.products.link5': 'All-Terrain Tires',
                'footer.services.title': 'Services',
                'footer.services.link1': 'Tire Installation',
                'footer.services.link2': 'Spooring & Balancing',
                'footer.services.link3': 'Tire Consultation',
                'footer.services.link4': 'Vehicle Service',
                'footer.services.link5': 'Emergency Service',
                'footer.help.title': 'Help',
                'footer.help.link1': 'FAQ',
                'footer.help.link2': 'Tire Size Guide',
                'footer.help.link3': 'Tire Maintenance Tips',
                'footer.help.link4': 'Terms & Conditions',
                'footer.help.link5': 'Privacy Policy',
                'footer.contact.title': 'Contact Us',
                'footer.contact.address': 'West Jakarta 11630',
                'footer.contact.hours.title': 'Monday - Sunday',
                'footer.contact.hours.time': '08.00 - 22.00 WIB',
                'footer.payment.title': 'Payment Methods',
                'footer.bottom': 'Developed with',
                'footer.bottom2': 'for Better Driving Experience',
                'footer.bottomlink1': 'Sitemap',
                'footer.bottomlink2': 'Privacy Policy',
                'footer.bottomlink3': 'Terms of Service'
            }
        };

        // Function to change language
        function changeLanguage(lang) {
            // Update current language display
            if (currentLanguage) {
                currentLanguage.textContent = lang.toUpperCase();
            }

            // Update all translatable elements
            document.querySelectorAll('[data-i18n]').forEach(element => {
                const key = element.getAttribute('data-i18n');
                if (translations[lang] && translations[lang][key]) {
                    element.textContent = translations[lang][key];
                }
            });

            // Update placeholder attributes
            document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
                const key = element.getAttribute('data-i18n-placeholder');
                if (translations[lang] && translations[lang][key]) {
                    element.setAttribute('placeholder', translations[lang][key]);
                }
            });

            // Save language preference
            localStorage.setItem('preferred-language', lang);
            
            // Update HTML lang attribute
            document.documentElement.setAttribute('lang', lang);
        }

        // Language toggle functionality
        if (languageToggle && languageMenu) {
            languageToggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const parent = this.closest('.language-dropdown');
                parent.classList.toggle('active');
            });

            // Close language menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!languageToggle.contains(e.target) && !languageMenu.contains(e.target)) {
                    languageMenu.closest('.language-dropdown').classList.remove('active');
                }
            });

            // Language option selection
            languageOptions.forEach(option => {
                option.addEventListener('click', function() {
                    const lang = this.getAttribute('data-lang');
                    changeLanguage(lang);
                    
                    // Close menu
                    languageMenu.closest('.language-dropdown').classList.remove('active');
                    
                    // Show language change notification
                    const message = lang === 'id' ? 'Bahasa berhasil diubah ke Indonesia' : 'Language successfully changed to English';
                    showNotification(message);
                });
            });
        }

        // Auto-detect browser language and set initial language
        function initializeLanguage() {
            // Check for saved preference first
            const savedLanguage = localStorage.getItem('preferred-language');
            
            if (savedLanguage) {
                changeLanguage(savedLanguage);
                return;
            }

            // Auto-detect browser language
            const browserLang = navigator.language || navigator.userLanguage;
            let detectedLang = 'id'; // Default to Indonesian
            
            if (browserLang.startsWith('en')) {
                detectedLang = 'en';
            }
            
            changeLanguage(detectedLang);
        }

        // Initialize language on page load
        initializeLanguage();
    }

    // Performance optimizations
    function initPerformanceOptimizations() {
        // Lazy load images
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[loading="lazy"]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    // Initialize all functions
    function initializeAll() {
        try {
            initMobileMenu();
            initVideoControls();
            initNavbarScroll();
            initNavbarActiveLinks();
            initScrollToSection();
            initCounterAnimation();
            initProductFiltering();
            addProductEventListeners();
            initQuickViewModal();
            initLoadMore();
            initTestimonialsSlider();
            initBackToTop();
            initScrollProgress();
            initScrollAnimations();
            initNewsletter();
            initCTAFunctionality();
            initLanguageSystem();
            initPerformanceOptimizations();
            
            console.log('All features initialized successfully');
        } catch (error) {
            console.error('Error initializing features:', error);
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeAll);
    } else {
        initializeAll();
    }

    // Error handling for missing elements
    window.addEventListener('error', function(e) {
        console.warn('Script error occurred:', e.error);
    });
});