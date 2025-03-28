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
                $('#header-menu > div:nth-of-type(1)').css({'width':'80%','transform':'rotate(-45deg)','top':'calc(50% - 1px)'})
                $('#header-menu > div:nth-of-type(2)').css({'width':'0'})
                $('#header-menu > div:nth-of-type(3)').css({'width':'80%','transform':'rotate(45deg)','top':'calc(-50% + 0.5px)'})
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

            $('#header-menu > div:nth-of-type(1)').css({'width':'100%','transform':'rotate(0deg)','top':'0'})
            $('#header-menu > div:nth-of-type(3)').css({'width':'100%','transform':'rotate(0deg)','top':'0'})
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

   
    // Effet au scroll
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 20 && !onTransition) {
            $('header').css('box-shadow', 'rgba(0, 0, 0, 0.24) 0px 3px 8px')
        }
        else {
            $('header').css('box-shadow', 'none')
        }

        // Changer le topic du menu
        var scrollTopAdjusted = $(window).scrollTop()+2*headerHeight+wHeight/3
        
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
                $('#about .animate-h1-cache').css({'left': '130%','visibility':'hidden'})
            }
            if (scrollTopAdjusted >= $('#about-me').offset().top) {
                $('#about-me .about-icon-bar').css('max-height','100%')
                $('#about-me .about-icon-bar-icon').css({'opacity':'1','transform':'scale(1)'})
                $('#about-me h3').css({'transform':'translateX(0)','opacity':'1'})
                $('#about-me h2').css({'transform':'translateX(0)','opacity':'1'})
                $('#about-me p').css({'transform':'translateX(0)','opacity':'1'})
            }
            if (scrollTopAdjusted >= $('#about-ecoles').offset().top) {
                $('#about-ecoles .about-icon-bar').css('max-height','100%')
                $('#about-ecoles .about-icon-bar-icon').css({'opacity':'1','transform':'scale(1)'})
                $('#about-ecoles .about-desc-header').css({'transform':'translateX(0)','opacity':'1'})
                $('#about-ecoles p').css({'transform':'translateX(0)','opacity':'1'})
                $('#about-ecoles h2').css({'transform':'translateX(0)','opacity':'1'})
            }
            if (scrollTopAdjusted >= $('#about-experiences').offset().top) {
                $('#about-experiences .about-icon-bar').css('max-height','100%')
                $('#about-experiences .about-icon-bar-icon').css({'opacity':'1','transform':'scale(1)'})
                $('#about-experiences .about-desc-header').css({'transform':'translateX(0)','opacity':'1'})
                $('#about-experiences p').css({'transform':'translateX(0)','opacity':'1'})
                $('#about-experiences h2').css({'transform':'translateX(0)','opacity':'1'})
            }
            if (scrollTopAdjusted >= $('#about-competences').offset().top) {
                $('#about-competences .about-icon-bar').css('max-height','100%')
                $('#about-competences .about-icon-bar-icon').css({'opacity':'1','transform':'scale(1)'})
                $('#about-competences .about-desc-header').css({'transform':'translateX(0)','opacity':'1'})
                $('#about-competences p').css({'transform':'translateX(0)','opacity':'1'})
                $('#about-competences h2').css({'transform':'translateX(0)','opacity':'1'})
            }
        }
        else {
            $('.about-item .about-icon-bar').css('max-height','0')
            $('.about-item .about-icon-bar-icon').css({'opacity':'0','transform':'scale(.2)'})

            // Retour vers la droite
            $('#about-ecoles .about-desc-header, #about-ecoles p, #about-ecoles h2, #about-competences .about-desc-header, #about-competences p, #about-competences h2').css({'transform':'translateX(10%)','opacity':'0'})
            // Retour vers la gauche
            $('#about-experiences .about-desc-header, #about-experiences p, #about-experiences h2, #about-me p, #about-me h2').css({'transform':'translateX(-10%)','opacity':'0'})

            $('#about .animate-h1-cache').css({'left': '50%','visibility':'visible'})
        }
        // Work
        if (scrollTopAdjusted >= $('#work').offset().top) {
            if (!$('.link-work').hasClass('on-text-link')) {
                $('header li a').removeClass('on-text-link')
                $('.link-work').addClass('on-text-link')
                $('#work .animate-h1-cache').css({'left': '130%','visibility':'hidden'})
                
            }
            if (scrollTopAdjusted >= $('#projet1').offset().top) {
                $('#projet1, #projet2').css({'opacity':'1','top':'0'})
            }
            if (scrollTopAdjusted >= $('#projet3').offset().top) {
                $('#projet3, #projet4').css({'opacity':'1','top':'0'})
            }
        }
        else {
            $('#work .animate-h1-cache').css({'left': '50%','visibility':'visible'})
            $('#work .projet').css({'opacity':'0','top':'2rem'})
        }
        // Contact
        if (scrollTopAdjusted >= $('#contact').offset().top) {
            if (!$('.link-contact').hasClass('on-text-link')) {
                $('header li a').removeClass('on-text-link')
                $('.link-contact').addClass('on-text-link')
                $('#contact .animate-h1-cache').css({'left': '130%','visibility':'hidden'})

                if (scrollTopAdjusted >= $('.reseaux').offset().top*0.9) {
                    $('#twitter, #cv, #github, #linkedin').css({'transform':'translateX(0)','opacity':'1'})
                    $('#contact .reseau-bar').css({'height':'5rem','opacity':'1'})
                }
            }
        }
        else {
            $('#contact .animate-h1-cache').css({'left': '50%','visibility':'visible'})
            
            $('#contact #twitter').css({'transform':'translateX(-20%)','opacity':'0'})
            $('#contact #cv').css({'transform':'translateX(-10%)','opacity':'0'})
            $('#contact #github').css({'transform':'translateX(10%)','opacity':'0'})
            $('#contact #linkedin').css({'transform':'translateX(20%)','opacity':'0'})
            $('#contact .reseau-bar').css({'height':'0','opacity':'0'})
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
    if (window.matchMedia("(max-width: 768px)").matches) {
        // Gérer l'animation du menu
        $('#header-menu').click(function() {
            if (!isMenuOpen) {
                openMenu()
            }
            else {
                closeMenu()
            }
        })

        $(window).on('scroll', function() {
    
            // Changer le topic du menu
            var scrollTopAdjusted = $(window).scrollTop()+2*headerHeight+wHeight/3

            // About
            if (scrollTopAdjusted >= $('#about').offset().top && scrollTopAdjusted < $('#work').offset().top) {
                if (scrollTopAdjusted >= $('#about-me').offset().top) {
                    $('#about-me .about-icon-bar').css('max-width','100%')
                }
                if (scrollTopAdjusted >= $('#about-ecoles').offset().top) {
                    $('#about-ecoles .about-icon-bar').css('max-width','100%')
                }
                if (scrollTopAdjusted >= $('#about-experiences').offset().top) {
                    $('#about-experiences .about-icon-bar').css('max-width','100%')
                }
                if (scrollTopAdjusted >= $('#about-competences').offset().top) {
                    $('#about-competences .about-icon-bar').css('max-width','100%')
                }
            }
            else {
                $('.about-item .about-icon-bar').css('max-width','0')
            }
            // Contact
            if (scrollTopAdjusted >= $('#contact').offset().top) {
                if (scrollTopAdjusted >= $('.reseaux').offset().top*0.9) {
                    $('#twitter, #cv, #github, #linkedin').css({'transform':'translateX(0)','opacity':'1'})
                    $('#contact .reseau-bar').css({'width':'33vw','opacity':'1','height':'3px'})
                }
            }
            else {
                $('#contact .animate-h1-cache').css({'left': '50%','visibility':'visible'})
                
                $('#contact #twitter').css({'transform':'translateX(-20%)','opacity':'0'})
                $('#contact #cv').css({'transform':'translateX(-10%)','opacity':'0'})
                $('#contact #github').css({'transform':'translateX(10%)','opacity':'0'})
                $('#contact #linkedin').css({'transform':'translateX(20%)','opacity':'0'})
                $('#contact .reseau-bar').css({'width':'0','opacity':'0','height':'3px'})
            }
        })
    }
    
    

})