AOS.init();

$(document).ready(function() {
    // Fonctions 
    function navOnBarreSwitch(element) {
        /* Permet de bouger la barre sous la barre de navigation */
        let newWidth = element.width()*0.5+'px'
        let left = element.position().left+'px'
        let leftMid = element.position().left/2+'px'
        $('#barre').css({'width':'7vw','left':leftMid})
        setTimeout(() => {
            $('#barre').css({'width':newWidth,'left':left})
        }, 100);
        
        // On change la section actuelle
        $('nav .onSection').removeClass('onSection')
        element.addClass('onSection')
    }
    function switchPosNav(nb) {
        if ($('#posNav').html()) {
            $('#posNav > div').css('transform','translateY(-'+1.646*(nb-1)+'rem)')
        }
    }
    function openNav() {
        $('html,body').css({'overflow':'hidden'})
        $('nav').css({'width':'50%','border-color':'white'})
        $('header').css('border-color','transparent')
        $('header .opener-bar1').css({'transform':'rotate(-45deg)','top':'.43rem'})
        $('header .opener-bar2').css({'opacity':'0'})
        $('header .opener-bar3').css({'transform':'rotate(45deg)','top':'-.43rem'})
    }
    function closeNav() {
        $('html,body').css({'overflow':'visible'})
        $('nav').css({'width':'0%','border-color':'transparent'})
        $('header').css('border-color','white')
        $('header .opener-bar1').css({'transform':'rotate(0deg)','top':'0'})
        $('header .opener-bar2').css({'opacity':'1'})
        $('header .opener-bar3').css({'transform':'rotate(0deg)','top':'0'})
    }
    function isOpenNav() {
        if ($('nav').width() > 0){
            return true
        }
        return false
    }

    // Variables
    let headerHeight = $('body > header').innerHeight()
    let screenHeight = $(window).height();
    let screenWidth = $(window).width();
    $('#sect1').css('height',screenHeight+'px')

    let heightFromTopSect2 = $("#sect2").position().top
    let heightFromTopSect3 = $("#sect3").position().top
    let heightFromTopSect4 = $("#sect4").position().top

    // Code principal
    // Click en dehors
    $(document).click(function() {
        if (isOpenNav()) {
            closeNav()
        }
    })
    // Ouvrir le header
    $('#opener').click(function() {
        if (isOpenNav()) {
            closeNav()
        }
        else {
            openNav()
        }
    })
    // Permet de ne pas afficher les ancres
    $("a[href*='#']:not([href='#'])").click(function(event) {
        if(location.hostname == this.hostname && this.pathname.replace(/^\//,"") == location.pathname.replace(/^\//,"")) {
            var anchor = $(this.hash);
            anchor = anchor.length ? anchor : $("[name=" + this.hash.slice(1) +"]");
            if( anchor.length ) {
                var pos = anchor.offset().top-$('body > header').innerHeight();
                $("html, body").animate( { scrollTop:  pos}, 600);
            }
        }
        event.preventDefault();
    });

    // Mouvement du scroll
    var lastScrollTop = 0;
    $(window).scroll(function(){
        
        var st = $(this).scrollTop();
        // Lancer les animations des titres
        if (st == 0) {
            $('body > header').css({'border-color':'transparent'})
        }
        // titre section 1
        else if (st > heightFromTopSect2-screenHeight/1.15 && st < heightFromTopSect3-screenHeight/1.15) {
            $('#sect2 header .fond').css('animation','fullHeight .4s .3s forwards')
            $('#sect2 header h1').css('animation','titleToLeft .5s 1s forwards')
        }
        // titre section 2
        else if (st > heightFromTopSect3-screenHeight/1.15 && st < heightFromTopSect4-screenHeight/1.15) {
            $('#sect3 header .fond').css('animation','fullHeight .4s .3s forwards')
            $('#sect3 header h1').css('animation','titleToLeft .5s 1s forwards')
        }
        // titre section 3
        else if (st > heightFromTopSect4-screenHeight/1.15) {
            $('#sect4 header .fond').css('animation','fullHeight .4s .3s forwards')
            $('#sect4 header h1').css('animation','titleToLeft .5s 1s forwards')
        }
        

        // Section 1 -> changer la navbar + animation de la section
        if (st < heightFromTopSect2-headerHeight-50) {
            navOnBarreSwitch($('nav li:nth-of-type(1)'))
            switchPosNav(1)
            $('#posNav > div').css('transform','translateY(0)')
        }
        // Section 2 -> animation des qualités
        else if (st >= heightFromTopSect2-headerHeight-50 && st < heightFromTopSect3-headerHeight-50) {
            navOnBarreSwitch($('nav li:nth-of-type(2)'))
            switchPosNav(2)
        }
        else if (st >= heightFromTopSect3-headerHeight-50 && st < heightFromTopSect4-headerHeight-50) {
            navOnBarreSwitch($('nav li:nth-of-type(3)'))
            switchPosNav(3)
        }
        else if (st >= heightFromTopSect4-headerHeight-50) {
            navOnBarreSwitch($('nav li:nth-of-type(4)'))
            switchPosNav(4)
        }

        if (st > lastScrollTop){
            // on scroll vers le bas
            $('body > header').css({'border-color':'white'})

        }
        lastScrollTop = st;
    });

    // Version téléphone 
    if (window.matchMedia('(max-width: 800px) and (min-width: 200px)').matches)
    {
        
    }
    // Page qui change de taille
    $(window).resize(function() {
        let screenHeightnewRes = $(window).height();
        let screenWidthnewRes = $(window).width();
        if (Math.abs(screenHeight*screenWidth - screenHeightnewRes*screenWidthnewRes) > 200000) {
            location.reload()
        }
    })
});