'use strict'

let enableWhell = true;
// enablewheel me permite activar su función cada x tiempo para poder hacer scroll con wl weel del ratón mucho en una única vez.
// Necesito un contador de pantallas para que cuando haga scroll con el ratón y me pase del maximo/mínimo de pantallas no tenga que volver a rehacer ese scroll para empezar desde donde empecé
let pantallas = 0;
$(window).on({
    wheel:function( evento ){
        // establezco una condición para que solo se pueda hacer wheel una vez cada 100 ms
        if(enableWhell){
            // Aquí ya se ha realizado wheel una vez y se para hasta pasar la cantidad de ms establecida por la función SetTimeOut;
            enableWhell = false;
            setTimeout( function(){
                enableWhell = true;
            }, 100 );
            console.log ( evento);
            // paro la posibilidad de hacer scroll para definir cuando sí puedo hacerlo
            evento.stopPropagation();
            // calculo la altura de la pantalla para saber a que altura me tiene que hacer scroll cada vez que realice wheel
            let height_window = $( window ).height();
            // defino con una condición que quiero que ocurra si hago scroll 
            // evento.originalEvent.deltaY accede con JQuery a sus propiedades de scroll en la escala Y
            if( evento.originalEvent.deltaY > 0 ){ // Scroll hacia abajo 
                pantallas++;
                // cada vez que hago scroll el contador suma uno
        
            }
            else if( evento.originalEvent.deltaY < 0 ){
                if( pantallas> 0 ){
                    // cada vez que hago scroll el contador resto uno
                    pantallas--;
                }
                  
            }
            console.log( pantallas )
            window.scroll({
                top: height_window * pantallas,
                behavior: 'smooth'
              });
        }
      
    },
    scroll:function(){
        // Cantidad de pantalla que sale fuera al hacer scroll
        let scroll = window.scrollY; // -> Scroll top de window
        // console.log( 'scrolled', scroll)
        // Altura de la ventana:
        let height_window = $( window ).height();
        console.log( height_window );
        // Scroll maximo = 2612;
        let body_height = document.body.clientHeight;
        
        let scroll_max = body_height - height_window;
        // console.log( 'este es el scroll.max', scroll_max );
        let porcentaje = (scroll * 100) / scroll_max;
        // console.log( porcentaje );
        $('.main__div-scroll').css({ 'width': porcentaje + '%' });

        // let porcentaje = ( height_window / scroll ) * 100;  
        // console.log( porcentaje );

        // console.log( $( window ).scrollTop() );
        // if(  )

        // SCROLL MAXIMO = ALTURA DEL BODY - ALTURA DE A PANTALLA
        // 2612 + 1306 = altura body;
    }
})
