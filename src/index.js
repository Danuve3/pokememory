// Deshabilitar clic derecho
document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
});

// Deshabilitar recarga de página al arrastrar hacia abajo en móvil
let startY;
document.addEventListener('touchstart', function (e) {
    startY = e.touches[0].clientY;
}, { passive: false });

document.addEventListener('touchmove', function (e) {
    const deltaY = e.touches[0].clientY - startY;

    // Si la posición Y del movimiento táctil es mayor que la inicial, prevenir recarga
    if (deltaY > 0) {
        e.preventDefault();
    }
}, { passive: false });