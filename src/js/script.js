window.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.menu'),
    menuItem = document.querySelectorAll('.menu_item'),
    hamburger = document.querySelector('.hamburger');

    const toggleMenu = () => {
        hamburger.classList.toggle('hamburger_active');
        menu.classList.toggle('menu_active');
        console.log('Menu toggled. Active state:', menu.classList.contains('menu_active'));
    };

    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
        console.log('Hamburger clicked.');
    });

    menuItem.forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
            console.log('Menu item clicked.');
        });
    });

    document.addEventListener('click', (e) => {
        const target = e.target;
        const isClickInsideMenu = menu.contains(target);
        const isClickInsideHamburger = hamburger.contains(target);

        console.log('Document clicked. Is inside menu:', isClickInsideMenu, 'Is inside hamburger:', isClickInsideHamburger);

        if (!isClickInsideMenu && !isClickInsideHamburger) {
            if (menu.classList.contains('menu_active')) {
                toggleMenu();
                console.log('Menu closed.');
            }
        }
    });

    menu.addEventListener('click', (e) => {
        e.stopPropagation();
        console.log('Menu clicked.');
    });
});
