/* =========================================
   NEXORA - MAIN JAVASCRIPT
========================================= */


/* =========================================
   MOBILE MENU
========================================= */

const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");

if (menuButton && navLinks) {

    menuButton.addEventListener("click", () => {

        navLinks.classList.toggle("active");

        if (navLinks.classList.contains("active")) {
            menuButton.textContent = "✕";
        } else {
            menuButton.textContent = "☰";
        }

    });

}


/* =========================================
   CLOSE MOBILE MENU AFTER CLICK
========================================= */

const navItems = document.querySelectorAll(".nav-links a");

navItems.forEach((item) => {

    item.addEventListener("click", () => {

        navLinks.classList.remove("active");

        if (menuButton) {
            menuButton.textContent = "☰";
        }

    });

});


/* =========================================
   NAVBAR BACKGROUND ON SCROLL
========================================= */

const navbar = document.querySelector(".navbar");

function updateNavbar() {

    if (window.scrollY > 30) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

}

window.addEventListener("scroll", updateNavbar);

updateNavbar();


/* =========================================
   SCROLL REVEAL ANIMATIONS
========================================= */

const revealElements = document.querySelectorAll(
    ".service-card, " +
    ".benefit, " +
    ".portfolio-card, " +
    ".price-card, " +
    ".section-heading, " +
    ".contact-form"
);

revealElements.forEach((element) => {

    element.classList.add("reveal");

});


const revealObserver = new IntersectionObserver(

    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");

                revealObserver.unobserve(entry.target);

            }

        });

    },

    {
        threshold: 0.12
    }

);


revealElements.forEach((element) => {

    revealObserver.observe(element);

});


/* =========================================
   HERO WEBSITE MOUSE EFFECT
========================================= */

const browserWindow =
    document.querySelector(".browser-window");

const heroPreview =
    document.querySelector(".hero-preview");


if (browserWindow && heroPreview) {

    heroPreview.addEventListener(
        "mousemove",
        (event) => {

            /*
            Disable the effect on smaller screens.
            */

            if (window.innerWidth <= 1000) {
                return;
            }

            const rect =
                heroPreview.getBoundingClientRect();

            const mouseX =
                event.clientX - rect.left;

            const mouseY =
                event.clientY - rect.top;

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            const rotateY =
                ((mouseX - centerX) / centerX) * 4;

            const rotateX =
                ((centerY - mouseY) / centerY) * 4;


            browserWindow.style.transform =
                `
                rotateY(${rotateY}deg)
                rotateX(${rotateX}deg)
                translateY(-5px)
                `;

        }
    );


    heroPreview.addEventListener(
        "mouseleave",
        () => {

            if (window.innerWidth <= 1000) {

                browserWindow.style.transform =
                    "none";

            } else {

                browserWindow.style.transform =
                    "rotateY(-5deg) rotateX(2deg)";

            }

        }
    );

}


/* =========================================
   CONTACT FORM
========================================= */

const contactForm =
    document.getElementById("contactForm");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        (event) => {

            /*
            Prevent the browser from refreshing.

            Later we'll replace this with the
            REAL Nexora email/backend system.
            */

            event.preventDefault();


            const submitButton =
                contactForm.querySelector(
                    ".submit-button"
                );


            const originalText =
                submitButton.textContent;


            submitButton.textContent =
                "Sending...";


            submitButton.disabled = true;


            /*
            Fake delay for now.
            */

            setTimeout(() => {

                submitButton.textContent =
                    "✓ Request Sent";


                submitButton.style.background =
                    "linear-gradient(135deg, #00a8ff, #006eff)";


                contactForm.reset();


                setTimeout(() => {

                    submitButton.textContent =
                        originalText;

                    submitButton.disabled =
                        false;

                }, 2500);


            }, 800);

        }
    );

}


/* =========================================
   SMOOTH SCROLL
========================================= */

document.querySelectorAll(
    'a[href^="#"]'
).forEach((link) => {

    link.addEventListener(
        "click",
        function (event) {

            const targetID =
                this.getAttribute("href");


            if (targetID === "#") {
                return;
            }


            const target =
                document.querySelector(
                    targetID
                );


            if (target) {

                event.preventDefault();


                target.scrollIntoView({

                    behavior: "smooth",

                    block: "start"

                });

            }

        }
    );

});


/* =========================================
   COPYRIGHT YEAR
========================================= */

const footerCopyright =
    document.querySelector(
        ".footer-bottom p"
    );


if (footerCopyright) {

    const year =
        new Date().getFullYear();


    footerCopyright.textContent =
        `© ${year} Nexora. All rights reserved.`;

}
