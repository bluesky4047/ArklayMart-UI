
        // Global Variables
        let cartCount = 0;
        let countdownTime = 19395; // 5:23:15 in seconds

        // Initialize App
        document.addEventListener('DOMContentLoaded', function() {
            updateCountdown();
            setInterval(updateCountdown, 1000);
            initializeSearchFunctionality();
        });

        // Countdown Timer
        function updateCountdown() {
            const hours = Math.floor(countdownTime / 3600);
            const minutes = Math.floor((countdownTime % 3600) / 60);
            const seconds = countdownTime % 60;
            
            document.getElementById('countdown').textContent = 
                `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            if (countdownTime > 0) {
                countdownTime--;
            } else {
                countdownTime = 86400; // Reset to 24 hours
            }
        }

        // Cart Functionality
        function addToCart(productName = 'Item') {
            cartCount++;
            document.getElementById('cart-count').textContent = cartCount;
            showToast(`${productName} berhasil ditambahkan ke keranjang!`);
        }

        // Toast Notification
        function showToast(message) {
            const toast = document.getElementById('toast');
            const toastMessage = document.getElementById('toast-message');
            toastMessage.textContent = message;
            toast.classList.add('show');
            
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }

        // Category Selection
        function selectCategory(category) {
            showToast(`Menampilkan kategori: ${category}`);
            // Add loading animation
            const categoryElements = document.querySelectorAll('#kategori');
            categoryElements.forEach(el => {
                if (el.textContent.includes(category)) {
                    el.style.background = '#008ECC';
                    el.style.color = 'white';
                    setTimeout(() => {
                        el.style.background = '#F3F9FB';
                        el.style.color = 'inherit';
                    }, 2000);
                }
            });
        }

        // Product View
        function viewProduct(productName) {
            showToast(`Melihat detail: ${productName}`);
        }

        // Brand Selection
        function selectBrand(brand) {
            showToast(`Menampilkan produk dari: ${brand}`);
        }

        // Daily Needs Selection
        function selectDaily(item) {
            showToast(`Menampilkan: ${item}`);
        }

        // View All Functions
        function viewAll(section) {
            showToast(`Menampilkan semua ${section}`);
        }

        // Go to Products
        function goToProducts() {
            showToast('Mengarahkan ke halaman produk...');
            // Add loading effect
            document.body.style.cursor = 'wait';
            setTimeout(() => {
                document.body.style.cursor = 'default';
            }, 1000);
        }

        // Download App
        function downloadApp(platform) {
            const message = platform === 'android' ? 
                'Mengarahkan ke Google Play Store...' : 
                'Mengarahkan ke App Store...';
            showToast(message);
        }

        // Newsletter Subscription
        function subscribeNewsletter() {
            const email = document.getElementById('newsletter-email').value;
            if (email && email.includes('@')) {
                showToast('Terima kasih! Anda berhasil berlangganan newsletter.');
                document.getElementById('newsletter-email').value = '';
            } else {
                showToast('Masukkan email yang valid!');
            }
        }

        // Open Pages
        function openPage(page) {
            showToast(`Membuka halaman: ${page}`);
        }

        // Mobile Menu Toggle
        function toggleMobileMenu() {
            const categories = document.getElementById('categories');
            const mobileCategories = categories.querySelectorAll('.d-none');
            
            mobileCategories.forEach(cat => {
                cat.classList.toggle('d-none');
                cat.classList.toggle('d-block');
            });
        }

        // Search Functionality
        function initializeSearchFunctionality() {
            const searchInput = document.getElementById('navbar');
            
            searchInput.addEventListener('input', function(e) {
                const query = e.target.value.toLowerCase();
                if (query.length > 2) {
                    // Simulate search suggestions
                    showSearchSuggestions(query);
                }
            });

            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    performSearch(e.target.value);
                }
            });
        }

        function showSearchSuggestions(query) {
            // Simulate showing search suggestions
            console.log(`Showing suggestions for: ${query}`);
        }

        function performSearch(query) {
            if (query.trim()) {
                showToast(`Mencari: ${query}`);
                // Add search loading effect
                const searchIcon = document.querySelector('.input-group-text .material-icons');
                searchIcon.textContent = 'hourglass_empty';
                searchIcon.style.animation = 'spin 1s linear infinite';
                
                setTimeout(() => {
                    searchIcon.textContent = 'search';
                    searchIcon.style.animation = 'none';
                }, 1500);
            }
        }

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe all product cards and category items
        document.addEventListener('DOMContentLoaded', function() {
            const animatedElements = document.querySelectorAll('#product, #top_kategori, .harian, #brand');
            animatedElements.forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(el);
            });
        });

        // Performance optimization - Lazy loading images
        if ('loading' in HTMLImageElement.prototype) {
            const images = document.querySelectorAll('img[data-src]');
            images.forEach(img => {
                img.src = img.dataset.src;
            });
        } else {
            // Fallback for browsers that don't support lazy loading
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
            document.body.appendChild(script);
        }

        // Add touch gestures for mobile
        let touchStartX = 0;
        let touchEndX = 0;

        document.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        });

        document.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        function handleSwipe() {
            const swipeDistance = touchEndX - touchStartX;
            if (Math.abs(swipeDistance) > 50) {
                if (swipeDistance > 0) {
                    // Swipe right - could trigger back navigation or menu
                    console.log('Swiped right');
                } else {
                    // Swipe left - could trigger forward navigation
                    console.log('Swiped left');
                }
            }
        }

        // Add service worker for PWA capabilities (if needed)
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
                // Service worker registration would go here
                console.log('PWA ready');
            });
        }

        // Error handling for network requests
        window.addEventListener('error', function(e) {
            console.log('Error caught:', e.error);
            showToast('Terjadi kesalahan. Silakan coba lagi.');
        });

        // Performance monitoring
        window.addEventListener('load', function() {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`Page loaded in ${loadTime}ms`);
        });
