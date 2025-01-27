$(document).ready(function() {
    // Función para manejar el menú móvil
    function handleMobileMenu() {
        var nav = $('#m5000');
        
        // Si estamos en móvil y el menú no está inicializado
        if (window.innerWidth <= 767 && !nav.hasClass('mobile-initialized')) {
            nav.addClass('mobile-initialized');
            
            // Click en el botón de menú
            nav.find('.menuToggle').on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                nav.toggleClass('opened-menu');
                var isOpen = nav.hasClass('opened-menu');
                
                $(this).attr('aria-expanded', isOpen);
                
                // Mostrar/ocultar el menú con animación
                if (isOpen) {
                    nav.find('.navContainer').slideDown(300);
                } else {
                    nav.find('.navContainer').slideUp(300);
                }
            });
            
            // Click fuera del menú para cerrarlo
            $(document).on('click', function(e) {
                if (!$(e.target).closest('#m5000').length && nav.hasClass('opened-menu')) {
                    nav.removeClass('opened-menu');
                    nav.find('.navContainer').slideUp(300);
                    nav.find('.menuToggle').attr('aria-expanded', false);
                }
            });
            
            // Prevenir que los clicks dentro del menú lo cierren
            nav.find('.navContainer').on('click', function(e) {
                e.stopPropagation();
            });
            
            // Manejar submenús
            nav.find('li:has(ul)').each(function() {
                var $li = $(this);
                var $a = $li.children('a');
                
                // Agregar indicador de submenú
                $a.append('<span class="submenu-indicator">+</span>');
                
                // Click en enlaces con submenú
                $a.on('click', function(e) {
                    if (window.innerWidth <= 767) {
                        e.preventDefault();
                        $li.toggleClass('submenu-open');
                        $li.children('ul').slideToggle(300);
                        
                        var $indicator = $(this).find('.submenu-indicator');
                        $indicator.text($li.hasClass('submenu-open') ? '-' : '+');
                    }
                });
            });
        }
    }
    
    // Inicializar
    handleMobileMenu();
    
    // Reconfigurar en resize
    $(window).on('resize', function() {
        handleMobileMenu();
    });
}); 