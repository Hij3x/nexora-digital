/* =========================================================
   NEXORA — MAIN WEBSITE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ====================================================== */

    const header = document.querySelector(".main-header");
    const menuButton = document.getElementById("mobileMenuButton");
    const navLinks = document.getElementById("navLinks");
    const navItems = document.querySelectorAll(".nav-links a");

    const contactForm = document.getElementById("contactForm");
    const currentYear = document.getElementById("currentYear");


    /* =====================================================
       CURRENT YEAR
    ====================================================== */

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    /* =====================================================
       NAVBAR SCROLL EFFECT
    ====================================================== */

    function updateNavbar() {

        if (!header) return;

        if (window.scrollY > 20) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }

    updateNavbar();

    window.addEventListener("scroll", updateNavbar);


    /* =====================================================
       MOBILE MENU
    ====================================================== */

    if (menuButton && navLinks) {

        menuButton.addEventListener("click", () => {

            navLinks.classList.toggle("open");

            const open =
                navLinks.classList.contains("open");

            menuButton.setAttribute(
                "aria-expanded",
                open ? "true" : "false"
            );

        });

    }


    /* =====================================================
       CLOSE MOBILE MENU AFTER CLICK
    ====================================================== */

    navItems.forEach(link => {

        link.addEventListener("click", () => {

            if (navLinks) {
                navLinks.classList.remove("open");
            }

            if (menuButton) {
                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }

        });

    });


    /* =====================================================
       SMOOTH SCROLL
    ====================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener("click", event => {

                const href =
                    link.getAttribute("href");

                /*
                   Ignore empty # links such as
                   WhatsApp until a real link is added.
                */

                if (!href || href === "#") {
                    return;
                }

                const target =
                    document.querySelector(href);

                if (!target) {
                    return;
                }

                event.preventDefault();

                const headerHeight =
                    header?.offsetHeight || 70;

                const position =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    headerHeight;

                window.scrollTo({
                    top: position,
                    behavior: "smooth"
                });

            });

        });


    /* =====================================================
       ACTIVE NAVIGATION SECTION
    ====================================================== */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );


    function updateActiveNavigation() {

        let currentSection = "home";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 160;

            if (window.scrollY >= sectionTop) {
                currentSection = section.id;
            }

        });


        navItems.forEach(link => {

            const href =
                link.getAttribute("href");

            link.classList.remove("active");

            if (href === `#${currentSection}`) {
                link.classList.add("active");
            }

        });

    }


    updateActiveNavigation();

    window.addEventListener(
        "scroll",
        updateActiveNavigation
    );


    /* =====================================================
       SUBTLE REVEAL ANIMATIONS
    ====================================================== */

    const revealElements =
        document.querySelectorAll(
            `
            .benefit-grid article,
            .premium-service-card,
            .work-project,
            .modern-price-card,
            .about-visual,
            .about-content
            `
        );


    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "nexora-visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(element => {

            element.classList.add(
                "nexora-reveal"
            );

            observer.observe(element);

        });

    }


    /* =====================================================
       CONTACT FORM
       FRONT-END DEMO FOR NOW
    ====================================================== */

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const submitButton =
                    contactForm.querySelector(
                        ".contact-submit"
                    );


                if (!submitButton) return;


                const originalContent =
                    submitButton.innerHTML;


                submitButton.disabled = true;

                submitButton.innerHTML =
                    "Sending Request...";


                /*
                   TEMPORARY DEMO.

                   Later this will:
                   1. Save inquiry to Supabase
                   2. Notify Nexora admin
                   3. Send confirmation to customer
                */

                setTimeout(() => {

                    submitButton.innerHTML =
                        "✓ Request Received";


                    showSiteToast(
                        "Thanks! Your project request has been received."
                    );


                    contactForm.reset();


                    setTimeout(() => {

                        submitButton.disabled = false;

                        submitButton.innerHTML =
                            originalContent;

                    }, 2200);

                }, 700);

            }
        );

    }


    /* =====================================================
       WHATSAPP
    ====================================================== */

    /*
       Put your WhatsApp number below later.

       IMPORTANT:
       Country code + number only.
       No + symbol, spaces, brackets or dashes.

       Example:
       const whatsappNumber = "14165551234";
    */

    const whatsappNumber = "";


    const whatsappLinks = [
        document.getElementById("whatsappContact"),
        document.getElementById("footerWhatsapp")
    ];


    whatsappLinks.forEach(link => {

        if (!link) return;


        link.addEventListener("click", event => {

            if (!whatsappNumber) {

                event.preventDefault();

                showSiteToast(
                    "Nexora WhatsApp is coming soon."
                );

                return;

            }


            const message =
                encodeURIComponent(
                    "Hi Nexora! I'm interested in creating a website."
                );


            link.href =
                `https://wa.me/${whatsappNumber}?text=${message}`;

        });

    });


    /* =====================================================
       SITE TOAST
    ====================================================== */

    function showSiteToast(message) {

        let toast =
            document.getElementById(
                "siteToast"
            );


        if (!toast) {

            toast =
                document.createElement("div");

            toast.id =
                "siteToast";

            toast.className =
                "site-toast";

            document.body.appendChild(toast);

        }


        toast.textContent = message;

        toast.classList.add("show");


        clearTimeout(
            toast.hideTimer
        );


        toast.hideTimer =
            setTimeout(() => {

                toast.classList.remove("show");

            }, 3500);

    }

});