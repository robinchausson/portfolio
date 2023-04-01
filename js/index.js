$(document).ready(function() {

    // Variables
    var wHeight = $(window).innerHeight()
    var wWidth = $(window).innerWidth()
    var headerHeight = $('header').innerHeight()
    var transitionTime = 650
    var onTransition = false
    var onMenuTransition = false
    var isMenuOpen = false

    // Fonctions 
    function startTransition() {
        $('#transition').css({'width':wWidth+'px','height':wHeight+'px'})
        $('#transition div').css({'opacity': '1','transform': 'translate(-50%, -50%)'})
        onTransition = true
    }
    function endTransition() {
        $('#transition div').css({'opacity': '1','transform': 'translate(-150%, -150%)'})
        setTimeout(() => {
            $('#transition').css({'width':'0','height':'0','z-index':'100'})
            onTransition = false
        }, transitionTime);
    }
    function openMenu() {
        if (!isMenuOpen && !onMenuTransition) {
            onMenuTransition = true

            // On affiche la banniere de transition
            $('header').css({'background-color':'transparent','box-shadow':'none'})
            $('#transition').css({'z-index':'9'})
            startTransition()

            // On anime les barre du menu burger
            $('#header-menu > div:nth-of-type(2)').css({'width':'0'})
            setTimeout(() => {
                $('#header-menu > div:nth-of-type(1)').css({'width':'80%','transform':'translateY(5.9px)rotate(-45deg)'})
                $('#header-menu > div:nth-of-type(3)').css({'width':'80%','transform':'translateY(-5.9px)rotate(45deg)'})
            }, 300);

            setTimeout(() => {
                $('header ul').css({'height': wHeight+'px'})
                $('header ul li:nth-of-type(1)').css('animation','fadeDown .2s forwards')
                $('header ul li:nth-of-type(2)').css('animation','fadeDown .2s .15s forwards')
                $('header ul li:nth-of-type(4)').css('animation','fadeDown .2s .3s forwards')
                $('header ul li:nth-of-type(5)').css('animation','fadeDown .2s .45s forwards')
            
                setTimeout(() => {
                    $('header ul li').css({'visibility':'visible','animation':'none'})
                    isMenuOpen = true
                onMenuTransition = false

                }, 650);
            }, transitionTime);
        }   
    }
    function closeMenu() {
        if (isMenuOpen && !onMenuTransition) {
            onMenuTransition = true

            // On anime les barres du menu burger
            $('header ul li:nth-of-type(5)').css('animation','fadeDown .2s reverse forwards')
            $('header ul li:nth-of-type(4)').css('animation','fadeDown .2s .15s reverse forwards')
            $('header ul li:nth-of-type(2)').css('animation','fadeDown .2s .3s reverse forwards')
            $('header ul li:nth-of-type(1)').css('animation','fadeDown .2s .45s reverse forwards')

            $('#header-menu > div:nth-of-type(1)').css({'width':'100%','transform':'rotate(0deg)'})
            $('#header-menu > div:nth-of-type(3)').css({'width':'100%','transform':'rotate(0deg)'})
            setTimeout(() => {
                $('#header-menu > div:nth-of-type(2)').css({'width':'100%'})
            }, 300);

            setTimeout(() => {
                $('header ul li').css({'visibility':'hidden'})
            
                // On retire la banniere de transition
                $('header ul').css({'height': '0'})
                endTransition()
                setTimeout(() => {
                    $('header').css({'background-color':'inherit'})
                    $('#transition').css({'z-index':'100'})
                    $('header ul li').css('animation','none')

                    isMenuOpen = false
                    onMenuTransition = false

                }, 100);
            }, 650);
        }
        
    }

    // Effet de transition sur click de href
    $(document).on('click', 'a[href^="#"]', function (event) {
        event.preventDefault();

        var href = $(this).attr('href')
        var coord = $(href).position().top-headerHeight+$(href).children('.top-wave').height()
        // Pour scroller vraiment jusqu'en haut.
        if (href == '#home') {
            coord = 0
        }
        // Transition
        if (isMenuOpen && !onMenuTransition) {
            closeMenu()

            // Scroll
            setTimeout(() => {
                $('html, body').animate({
                    scrollTop: coord
                }, 1000);
            }, 800);
        }
        else {
            $('html, body').animate({
                scrollTop: coord
            }, 1000);
        }
    });

   
    // Effet sur le header lorsque l'on scroll (pour mieux le voir)
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 20 && !onTransition) {
            $('header').css('box-shadow', 'rgba(0, 0, 0, 0.24) 0px 3px 8px')
        }
        else {
            $('header').css('box-shadow', 'none')
        }

        // Changer le topic du menu
        var scrollTopAdjusted = $(window).scrollTop()+headerHeight+wHeight/3
        
        // Home
        if (scrollTopAdjusted < $('#about').offset().top) {
            if (!$('.home-about').hasClass('on-text-link')) {
                $('header li a').removeClass('on-text-link')
                $('.link-home').addClass('on-text-link')
            }
        }
        // About
        if (scrollTopAdjusted >= $('#about').offset().top && scrollTopAdjusted < $('#work').offset().top) {
            if (!$('.link-about').hasClass('on-text-link')) {
                $('header li a').removeClass('on-text-link')
                $('.link-about').addClass('on-text-link')

                $('.img-pp').css({'max-height':'23vw','max-width':'23vw'})
                $('.img-pp img').css({'border-color':'inherit'})
                $('.cercle-int, .cercle-ext').css({'opacity':'.6'})
            }
        }
        else {
            if ($('.img-pp').css('max-height') != '0') {
                $('.img-pp').css({'max-height':'0','max-width':'0'})
                $('.img-pp img').css({'border-color':'transparent'})
                $('.cercle-ext, .cercle-int').css({'opacity':'0'})
            }
        }
        // Work
        if (scrollTopAdjusted >= $('#work').offset().top) {
            if (!$('.link-work').hasClass('on-text-link')) {
                $('header li a').removeClass('on-text-link')
                $('.link-work').addClass('on-text-link')
            }
        }
    })

    // Set la hauteur de la première section
    $('section:nth-of-type(1)').css('height',wHeight-headerHeight+'px')

    // Gérer les animations des titres de la première section
    setTimeout(() => {
        $('section:nth-of-type(1) h1').addClass('font-size-h2').css('animation','none');
        $('section:nth-of-type(1) h2').addClass('font-size-h1').css('animation','none');
        setTimeout(() => {
            $('section:nth-of-type(1) h1').addClass('font-size-h1').removeClass('font-size-h2');
            $('section:nth-of-type(1) h2').addClass('font-size-h2').removeClass('font-size-h1');
        }, 10);
    }, 4500);

    // Téléphone //

    // Gérer l'animation du menu sur téléphone
    $('#header-menu').click(function() {
        if (!isMenuOpen) {
            openMenu()
        }
        else {
            closeMenu()
        }
    })
    

})