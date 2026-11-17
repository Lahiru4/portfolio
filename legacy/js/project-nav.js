fetch('components/navigation.html')
    .then((response) => {
        if (!response.ok) throw new Error(`Navigation failed to load: ${response.status}`);
        return response.text();
    })
    .then((markup) => {
        const navRoot = document.getElementById('site-nav');
        navRoot.innerHTML = markup;
        navRoot.querySelector('.site-navigation > div > a').href = 'index.html';
        navRoot.querySelectorAll('a[href^="#"]').forEach((link) => {
            link.href = `index.html${link.getAttribute('href')}`;
        });

        const menuButton = navRoot.querySelector('#mobile-menu-btn');
        const menu = navRoot.querySelector('#mobile-menu');
        const menuIcon = navRoot.querySelector('#mobile-menu-icon');
        menuButton.addEventListener('click', () => {
            const opening = menu.classList.contains('hidden');
            menu.classList.toggle('hidden', !opening);
            menuIcon.className = opening ? 'ph ph-x text-2xl' : 'ph ph-list text-2xl';
        });
        navRoot.querySelectorAll('.mobile-nav-link').forEach((link) => {
            link.addEventListener('click', () => {
                menu.classList.add('hidden');
                menuIcon.className = 'ph ph-list text-2xl';
            });
        });
    })
    .catch((error) => console.error(error));
