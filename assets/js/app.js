'use strict'

let enableWheel = true; // Controla la activación del scroll
let pantallas = 0; // Contador de pantallas

$(window).on({
    wheel: function(event) {
        if (enableWheel) {
            enableWheel = false;
            setTimeout(function() {
                enableWheel = true;
            }, 1000); // Espera 100 ms para permitir el próximo scroll

            event.stopPropagation(); // Detiene la propagación del evento
            let height_window = $(window).height(); // Altura de la ventana

            // Ajusta el contador de pantallas según el scroll
            if (event.originalEvent.deltaY > 0) { // Scroll hacia abajo
                pantallas++;
            } else if (event.originalEvent.deltaY < 0) { // Scroll hacia arriba
                if (pantallas > 0) {
                    pantallas--;
                }
            }

            // Desplaza la ventana a la pantalla correspondiente
            window.scroll({
                top: height_window * pantallas,
                behavior: 'smooth'
            });
        }
    },
    scroll: function() {
        let scroll = window.scrollY; // Posición actual del scroll
        let height_window = $(window).height(); // Altura de la ventana
        let body_height = document.body.clientHeight; // Altura total del cuerpo de la página
        let scroll_max = body_height - height_window; // Scroll máximo

        // Calcula el porcentaje de scroll y ajusta la barra de progreso
        let porcentaje = (scroll * 100) / scroll_max;
        $('.main__div-scroll').css({ 'width': porcentaje + '%' });
    }
});
