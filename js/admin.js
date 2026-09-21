/* =========================================================
   NEXORA ADMIN PORTAL
   js/admin.js
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ADMIN SEARCH
    ====================================================== */

    const adminSearch =
        document.getElementById("adminSearch");

    if (adminSearch) {

        adminSearch.addEventListener("input", () => {

            const searchValue =
                adminSearch.value
                    .toLowerCase()
                    .trim();

            const requestCards =
                document.querySelectorAll(
                    ".admin-request-card"
                );

            const clientRows =
                document.querySelectorAll(
                    ".admin-client-row"
                );

            const paymentRows =
                document.querySelectorAll(
                    ".admin-payment-row"
                );


            /* SEARCH REQUESTS */

            requestCards.forEach(card => {

                const text =
                    card.textContent.toLowerCase();

                card.style.display =
                    text.includes(searchValue)
                        ? ""
                        : "none";

            });


            /* SEARCH CLIENTS */

            clientRows.forEach(row => {

                const text =
                    row.textContent.toLowerCase();

                row.style.display =
                    text.includes(searchValue)
                        ? ""
                        : "none";

            });


            /* SEARCH PAYMENTS */

            paymentRows.forEach(row => {

                const text =
                    row.textContent.toLowerCase();

                row.style.display =
                    text.includes(searchValue)
                        ? ""
                        : "none";

            });

        });

    }


    /* =====================================================
       REVIEW WEBSITE REQUEST
    ====================================================== */

    const reviewButtons =
        document.querySelectorAll(
            ".review-request-button"
        );


    reviewButtons.forEach(button => {

        button.addEventListener("click", () => {

            const requestCard =
                button.closest(
                    ".admin-request-card"
                );


            if (!requestCard) {
                return;
            }


            const projectName =
                requestCard.dataset.project || "";


            /*
               For now we send the project name
               to projects.html.

               Later Supabase will use the real
               project ID instead.
            */

            const project =
                encodeURIComponent(projectName);


            window.location.href =
                `projects.html?project=${project}`;

        });

    });


    /* =====================================================
       ADD CLIENT
    ====================================================== */

    const addClientButton =
        document.getElementById(
            "addClientButton"
        );


    if (addClientButton) {

        addClientButton.addEventListener(
            "click",
            () => {

                /*
                   Later we'll make an Add Client
                   modal.

                   For now send the admin to the
                   Clients page.
                */

                window.location.href =
                    "clients.html?action=add";

            }
        );

    }


    /* =====================================================
       NOTIFICATIONS
    ====================================================== */

    const notificationButton =
        document.getElementById(
            "adminNotifications"
        );


    if (notificationButton) {

        notificationButton.addEventListener(
            "click",
            () => {

                showAdminToast(
                    "You have 3 website requests and 2 support messages."
                );

            }
        );

    }


    /* =====================================================
       ADMIN TOAST
    ====================================================== */

    function showAdminToast(message) {

        let toast =
            document.getElementById(
                "adminToast"
            );


        if (!toast) {

            toast =
                document.createElement("div");

            toast.id =
                "adminToast";

            toast.className =
                "admin-toast";

            document.body.appendChild(
                toast
            );

        }


        toast.textContent =
            message;


        toast.classList.add(
            "show"
        );


        clearTimeout(
            toast.hideTimer
        );


        toast.hideTimer =
            setTimeout(() => {

                toast.classList.remove(
                    "show"
                );

            }, 3500);

    }


    /* =====================================================
       HIGHLIGHT CURRENT ADMIN PAGE
    ====================================================== */

    const sidebarLinks =
        document.querySelectorAll(
            ".admin-sidebar .sidebar-nav a"
        );


    const currentPage =
        window.location.pathname
            .split("/")
            .pop();


    sidebarLinks.forEach(link => {

        const linkPage =
            link
                .getAttribute("href")
                ?.split("?")[0];


        if (
            linkPage === currentPage
        ) {

            link.classList.add(
                "active"
            );

        } else {

            link.classList.remove(
                "active"
            );

        }

        /*
           IMPORTANT:
           There is NO preventDefault() here.

           That means the sidebar links
           actually work now.
        */

    });


    /* =====================================================
       ADMIN STATS
       DEMO DATA FOR NOW
    ====================================================== */

    const adminData = {

        clients: 12,

        liveWebsites: 16,

        newRequests: 3,

        monthlyRevenue: 239.84

    };


    function loadAdminStats() {

        setText(
            "totalClients",
            adminData.clients
        );


        setText(
            "liveWebsites",
            adminData.liveWebsites
        );


        setText(
            "newRequests",
            adminData.newRequests
        );


        setText(
            "monthlyRevenue",
            formatMoney(
                adminData.monthlyRevenue
            )
        );

    }


    /* =====================================================
       HELPERS
    ====================================================== */

    function setText(id, value) {

        const element =
            document.getElementById(id);


        if (element) {

            element.textContent =
                value;

        }

    }


    function formatMoney(amount) {

        return new Intl.NumberFormat(
            "en-CA",
            {
                style: "currency",
                currency: "CAD"
            }
        ).format(amount);

    }


    /* =====================================================
       START ADMIN
    ====================================================== */

    loadAdminStats();

});