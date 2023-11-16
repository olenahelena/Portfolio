"use strict";


// Button animation

window.addEventListener('load', windowLoad);

function windowLoad() {
    if (document.querySelector('[data-glow]')) {
        document.documentElement.addEventListener('mouseover', buttonActions);
        document.documentElement.addEventListener('mouseout', buttonActions);
        document.documentElement.addEventListener('mousemove', buttonActions);

        let bGlow, bGlowColor, bGlowSize;

        function buttonActions(e) {
            const button = e.target.closest('[data-glow]');
            if (!button) return;

            if (e.type === "mouseover") {
                button.insertAdjacentHTML("beforeend", `
                <span class="button__glow">
                    <span class="button__color"></span>
                </span>
                `);

                bGlow = button.querySelector('.button__glow');
                bGlowColor = button.querySelector('.button__color');

                bGlowSize = Math.min(button.offsetWidth, button.offsetHeight);
                bGlow.style.width = bGlow.style.height = `${bGlowSize}px`;

                bGlowColor.style.width = `${button.offsetWidth}px`;
                bGlowColor.style.height = `${button.offsetHeight}px`;
            }

            if (e.type === 'mouseout') {
                button.querySelector('.button__glow').remove();
            }

            if (e.type === 'mousemove') {
                const posX = e.pageX - (button.getBoundingClientRect().left + window.scrollX);
                const posY = e.pageY - (button.getBoundingClientRect().top + window.scrollY);

                bGlow.style.left = `${posX - bGlowSize / 2}px`;
                bGlow.style.top = `${posY - bGlowSize / 2}px`;

                bGlowColor.style.transform = `
                translate(${posX - (button.offsetWidth - bGlowSize / 2)}px,
                          ${posY - (button.offsetHeight - bGlowSize / 2)}px)`;
            }
        }
    }
}


// Header

document.addEventListener("click", documentActions);

function documentActions(e) {
   const targetElement = e.target;

   if (targetElement.closest('.icon-menu')) {
       document.documentElement.classList.toggle('menu-open');
    }

   if (targetElement.closest('[data-goto]')) {
    document.documentElement.classList.contains('menu-open') ?
        document.documentElement.classList.remove('menu-open') : null;

       const goTo = targetElement.closest('[data-goto]').dataset.goto;
       const goToElement = document.querySelector(goTo);
       const headerHeight = document.querySelector('.header').offsetHeight;

       if (goToElement) {
        window.scrollTo({
            top: goToElement.offsetTop - (headerHeight + 15),
            behavior: "smooth"
        });
       }
       e.preventDefault();
   }
}

// Download CV

// Form

// Footer