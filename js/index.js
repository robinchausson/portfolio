$(document).ready(function() {

    // Variables
    var wHeight = $(window).innerHeight()
    var wWidth = $(window).innerWidth()
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
            }, 650);
        }, transitionTime);
    }
    function closeMenu() {
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
            }, 100);
        }, 650);
    }

    $('a').hover(function() {
        $('#mouse-circle').css({'height':'2vw','width':'2vw'}) 
    },
    function() {
        $('#mouse-circle').css({'height':'2.5vw','width':'2.5vw'})
    })

    // Effet de transition sur click de href
    $(document).on('click', 'a[href^="#"]', function (event) {
        event.preventDefault();

        var href = $(this).attr('href')
        var coord = $(href).offset().top
        // Pour scroller vraiment jusqu'en haut.
        if (href == '#home') {
            coord = 0
        }
        // Transition
        if (isMenuOpen) {
            closeMenu()
        }
        else {
            startTransition()
            setTimeout(() => {
                endTransition()
            }, transitionTime);
        }

        // Scroll
        setTimeout(() => {
            $('html, body').animate({
                scrollTop: coord
            }, 500);
        }, 700);
        
        
        
    });

    // Effet sur le header lorsque l'on scroll (pour mieux le voir)
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 20 && !onTransition) {
            $('header').css('box-shadow', 'rgba(0, 0, 0, 0.24) 0px 3px 8px')
        }
        else {
            $('header').css('box-shadow', 'none')
        }

        if ($(window).scrollTop() >= $('#about').offset().top) {
            $('header li a').removeClass('on-text-link')
            $('.link-about').addClass('on-text-link')
        }
        else {
            $('header li a').removeClass('on-text-link')
            $('.link-home').addClass('on-text-link')
        }
    })

    // Effet sur la souris
    var mouseX, mouseY;
    var following = false
    $(document).mousemove(function(e) {
        mouseX = e.pageX;
        mouseY = e.pageY;
        if (!following && mouseX < wWidth-40) {
            
            $('#mouse-circle').css({'transform':'translate3d(calc('+mouseX+'px - 50%) ,calc('+mouseY+'px - 50%),0)'})
            following = true
            setTimeout(() => {
                following = false
            }, 5);
        }
        
    }).mouseover(); // call the handler immediately

    // Set la hauteur de la première section
    var headerHeight = $('header').innerHeight()
    $('section:nth-of-type(1)').css('height',wHeight-headerHeight+'px')

    // Gérer les animations des titres de la première section
    $('section:nth-of-type(1) h1').hover(function() {
        $(this).removeClass('font-size-h2').addClass('font-size-h1');
        $('section:nth-of-type(1) h2').removeClass('font-size-h1').addClass('font-size-h2')
    })
    $('section:nth-of-type(1) h2').hover(function() {
        $(this).removeClass('font-size-h2').addClass('font-size-h1');
        $('section:nth-of-type(1) h1').removeClass('font-size-h1').addClass('font-size-h2')
    })
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
        if (!onMenuTransition) {
            if (!isMenuOpen) {
                openMenu()
                onMenuTransition = true
                setTimeout(() => {
                    isMenuOpen = true
                    onMenuTransition = false
                }, 1300);
            }
            else {
                closeMenu()
                onMenuTransition = true
                setTimeout(() => {
                    isMenuOpen = false
                    onMenuTransition = false
                }, 1300);
            }
        }
    })
    

})