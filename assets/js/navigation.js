// Al inicio del archivo
console.log('Navigation script loaded');
$(document).ready(function() {
    // Debug
    console.log('Navigation script loaded');

    // Elementos del menú
    var $nav = $('#m5000');
    var $menuToggle = $nav.find('.menuToggle');
    var $navContainer = $nav.find('.navContainer');
    var $subMenus = $nav.find('li:has(ul)');

    // Toggle del menú principal
    $menuToggle.on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Forzar cálculo de layout antes de animar
        $navContainer.css('display', 'block');
        const height = $navContainer.outerHeight();
        $navContainer.css('display', '').css('height', 0);
        
        $nav.toggleClass('opened-menu');
        
        if($nav.hasClass('opened-menu')) {
            $navContainer.stop(true).animate({
                height: 160
            }, 300);
        } else {
            $navContainer.stop(true).animate({
                height: 0
            }, 300);
        }
        
        $(this).attr('aria-expanded', $nav.hasClass('opened-menu'));
    });

    // Click fuera para cerrar
    $(document).on('click', function(e) {
        if (!$(e.target).closest('#m5000').length && $nav.hasClass('opened-menu')) {
            $nav.removeClass('opened-menu');
            $navContainer.stop(true).animate({height: 0}, 300);
            $menuToggle.attr('aria-expanded', false);
        }
    });

    // Prevenir cierre al hacer click dentro del menú
    $navContainer.on('click', function(e) {
        e.stopPropagation();
    });

    // Toggle de submenús en móvil
    $subMenus.children('a').on('click', function(e) {
        if (window.innerWidth <= 767) {
            // En móvil, permitir que el enlace funcione normalmente
            if ($(this).parent().hasClass('submenu-serveis')) {
                return true;
            }
        }
        // En desktop o para otros submenús
        if ($(this).siblings('ul').length) {
            e.preventDefault();
            $(this).siblings('ul').slideToggle(300);
        }
    });

    // Funcionalidad de la galería
    $('.gallery').each(function() {
        const $gallery = $(this);
        const $slides = $gallery.find('.slide');
        let currentSlide = 0;
        
        // Agregar flechas de navegación
        $gallery.append(`
            <div class="nav-arrows">
                <span class="arrow prev">❮</span>
                <span class="arrow next">❯</span>
            </div>
        `);
        
        // Mostrar primera diapositiva
        $slides.eq(currentSlide).addClass('active');
        
        // Click en flecha siguiente
        $gallery.find('.next').click(function() {
            $slides.eq(currentSlide).removeClass('active');
            currentSlide = (currentSlide + 1) % $slides.length;
            $slides.eq(currentSlide).addClass('active');
        });
        
        // Click en flecha anterior
        $gallery.find('.prev').click(function() {
            $slides.eq(currentSlide).removeClass('active');
            currentSlide = (currentSlide - 1 + $slides.length) % slides.length;
            $slides.eq(currentSlide).addClass('active');
        });
    });

    // Slider functionality
    const sliders = document.querySelectorAll('.slider');
    
    sliders.forEach(slider => {
        const slides = slider.querySelectorAll('.slide');
        const prevButton = slider.nextElementSibling.querySelector('.prev');
        const nextButton = slider.nextElementSibling.querySelector('.next');
        
        let currentSlide = 0;
        
        // Mostrar primera diapositiva
        slides[0].classList.add('active');
        
        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            slides[index].classList.add('active');
        }
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }
        
        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        }
        
        // Event listeners
        prevButton.addEventListener('click', prevSlide);
        nextButton.addEventListener('click', nextSlide);
        
        // Auto advance slides every 5 seconds
        setInterval(nextSlide, 5000);
    });
});
