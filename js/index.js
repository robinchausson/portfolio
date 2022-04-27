
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
    function fixParticules() {
        // Permet de faire boguer les particules de la première section
        $("#sect1 footer").css('top',heightFromTopParticules-$(document).scrollTop()*0.15+"px")
    }
    function openNav() {
        $('nav').css({'width':'80%'})
    }

    // Variables
    let heightFromTopParticules =  $("#sect1 footer").position().top
    let heightFromTopSect2 = $("#sect2").position().top
    let heightFromTopSect3 = $("#sect3").position().top
    let heightFromTopSect4 = $("#sect4").position().top

    let leftQualite1 = $('#qualite1').position().left
    let leftQualite2 = $('#qualite2').position().left
    let leftQualite3 = $('#qualite3').position().left
    let leftQualite4 = $('#qualite4').position().left
    let distQualite12 = leftQualite2-leftQualite1 
    let distQualite23 = leftQualite3-leftQualite2
    let distQualite34 = leftQualite4-leftQualite3 
    let widthQualite = $('#qualite1').innerWidth()
    
    let headerHeight = $('body > header').innerHeight()
    let screenHeight = $(document).height();

    // Code principal
    $('#opener').click(function() {
        openNav()
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

    // Mouvement du header au scroll
    var lastScrollTop = 0;
    $(window).scroll(function(){
        fixParticules()
        var st = $(this).scrollTop();
        // Lancer les animations des titres
        if (st > heightFromTopSect2-screenHeight/4 && st < heightFromTopSect3-screenHeight/4) {
            $('#sect2 header .fond').css('animation','fullHeight .4s .3s forwards')
            $('#sect2 header h1').css('animation','titleToLeft .5s 1s forwards')
        }
        else if (st > heightFromTopSect3-screenHeight/4 && st < heightFromTopSect4-screenHeight/4) {
            $('#sect3 header .fond').css('animation','fullHeight .4s .3s forwards')
            $('#sect3 header h1').css('animation','titleToLeft .5s 1s forwards')
        }
        else if (st > heightFromTopSect4-screenHeight/4) {
            $('#sect4 header .fond').css('animation','fullHeight .4s .3s forwards')
            $('#sect4 header h1').css('animation','titleToLeft .5s 1s forwards')
        }
        else {
            $('body > header').css({'border-color':'transparent'})
            // On reset toutes les animations
            $('.section-defilement header .fond').css('animation','none')
            $('.section-defilement header h1').css('animation','none')
            $('#sect2 .qualite').css('animation','none')
            $('#sect2 .qualite-bar').css('width','0px')
        }

        // Changer la navbar + animation de la section
        if (st < heightFromTopSect2-headerHeight-50) {
            navOnBarreSwitch($('nav li:nth-of-type(1)'))
        }
        else if (st >= heightFromTopSect2-headerHeight-50 && st < heightFromTopSect3-headerHeight-50) {
            navOnBarreSwitch($('nav li:nth-of-type(2)'))
            $('#qualite1').css('animation','qualite .4s forwards')
            $('#qualite2').css('animation','qualite .4s .4s forwards')
            $('#qualite3').css('animation','qualite .4s .8s forwards')
            $('#qualite4').css('animation','qualite .4s 1.2s forwards')
            // Barre pour connecter les qualités entre elles
            setTimeout(() => {
                $('#qualite-bar1').css({'left':leftQualite1+widthQualite+'px','width':distQualite12+'px'})
            }, 400);
            setTimeout(() => {
                $('#qualite-bar2').css({'left':leftQualite2+widthQualite+'px','width':distQualite23+'px'})
            }, 800);
            setTimeout(() => {
                $('#qualite-bar3').css({'left':leftQualite3+widthQualite+'px','width':distQualite34+'px'})
            }, 1200);
        }
        else if (st >= heightFromTopSect3-headerHeight-50 && st < heightFromTopSect4-headerHeight-50) {
            navOnBarreSwitch($('nav li:nth-of-type(3)'))
        }
        else if (st >= heightFromTopSect4-headerHeight-50) {
            navOnBarreSwitch($('nav li:nth-of-type(4)'))
        }

        if (st > lastScrollTop){
            // on scroll vers le bas
            $('body > header').css({'border-color':'white'})

        }
        lastScrollTop = st;
    });

    $(window).resize(function() {
        // Barre pour connecter les qualités entre elles
        let leftQualite1 = $('#qualite1').position().left
        let leftQualite2 = $('#qualite2').position().left
        let leftQualite3 = $('#qualite3').position().left
        let leftQualite4 = $('#qualite4').position().left
        let distQualite12 = leftQualite2-leftQualite1 
        let distQualite23 = leftQualite3-leftQualite2
        let distQualite34 = leftQualite4-leftQualite3 
        let widthQualite = $('#qualite1').innerWidth()

        $('#qualite-bar1').css({'left':leftQualite1+widthQualite+'px','width':distQualite12+'px'})
        $('#qualite-bar2').css({'left':leftQualite2+widthQualite+'px','width':distQualite23+'px'})
        $('#qualite-bar3').css({'left':leftQualite3+widthQualite+'px','width':distQualite34+'px'})
    })
});