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


// On scroll

document.addEventListener("click", documentActions);

function documentActions(e) {
   const targetElement = e.target;

   if (targetElement.closest('.icon-menu')) {
       document.documentElement.classList.toggle('menu-open');
   }

   if (targetElement.closest('[data-goto]')) {
       document.documentElement.classList.remove('menu-open');

       const goTo = targetElement.closest('[data-goto]').dataset.goto;
       const goToElement = document.querySelector(goTo);
       const headerHeight = document.querySelector('.header').offsetHeight;

       if (goToElement) {
           window.scrollTo({
               top: goToElement.offsetTop - headerHeight,
               behavior: "smooth"
           });
           e.preventDefault();
       }
   }
}

// Download CV

 document.getElementById('cv__button').addEventListener('click', function() {
      // Assuming 'your_pdf.pdf' is the name of your PDF file
      const pdfUrl = 'assets/pdf/cv.pdf';

      // Create an anchor element
      const link = document.createElement('a');

      // Set the href attribute to the PDF file's URL
      link.href = pdfUrl;

      // Set the download attribute to prompt the user for download
      link.download = 'cv.pdf';

      // Append the link to the body
      document.body.appendChild(link);

      // Trigger the click event on the link
      link.click();

      // Remove the link from the DOM
      document.body.removeChild(link);
    });



// Form

// const forms = document.forms;
// if (forms.length) {
//     for (const form of forms) {
//         form.addEventListener('submit', formSubmitAction);
//     }
// }
// async function formSubmitAction(e) {
//     e.preventDefault();
//     const form = e.target;
//     const formAction = form.getAttribute('action') ? form.getAttribute('action').trim() : "#";
//     const formMethod = form.getAttribute('method') ? form.getAttribute('method').trim() : "GET";
//     const formData = new FormData(form);

//     form.classList.add('form-sending');

//     const response = await fetch(formAction, {
//         method: formMethod,
//         body: formData
//     })
//     if (response.ok) {
//         alert('Form sent!');
//         form.classList.remove('form-sending');
//         form.reset();
//     } else {
//         alert('Error');
//         form.classList.remove('form-sending');
//     }
// }