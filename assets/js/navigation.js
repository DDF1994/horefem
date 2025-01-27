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
        console.log('Menu toggle clicked');
        
        $nav.toggleClass('opened-menu');
        $navContainer.slideToggle(300);
        
        var isExpanded = $nav.hasClass('opened-menu');
        $(this).attr('aria-expanded', isExpanded);
    });

    // Click fuera para cerrar
    $(document).on('click', function(e) {
        if (!$(e.target).closest('#m5000').length && $nav.hasClass('opened-menu')) {
            $nav.removeClass('opened-menu');
            $navContainer.slideUp(300);
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
            e.preventDefault();
            var $submenu = $(this).siblings('ul');
            $submenu.slideToggle(300);
        }
    });
}); 