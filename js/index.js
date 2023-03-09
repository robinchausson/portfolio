$(document).ready(function() {

    var wHeight = $(window).innerHeight()
    var wWidth = $(window).innerWidth()

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

        $('#transition').css({'width':wWidth+'px','height':wHeight+'px'})
        $('#transition div').css('animation', 'transition 1.5s forwards ease-in-out')
        setTimeout(() => {
            $('html, body').animate({
                scrollTop: coord
            }, 500);
        }, 750);
        setTimeout(() => {
            $('#transition').css({'width':'0','height':'0'})
            $('#transition div').css('animation','none')
        }, 1500);
        
    });

    // Effet sur le header lorsque l'on scroll (pour mieux le voir)
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 20) {
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
    

})