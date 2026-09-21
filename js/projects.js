document.addEventListener("DOMContentLoaded", () => {

    const search = document.getElementById("projectSearch");
    const tabs = document.querySelectorAll(".project-tab");
    const cards = document.querySelectorAll(".premium-project-card");
    const empty = document.getElementById("projectsEmpty");

    const panel = document.getElementById("projectDetailPanel");
    const overlay = document.getElementById("projectPanelOverlay");
    const closePanelButton = document.getElementById("closeProjectPanel");

    const panelProjectName = document.getElementById("panelProjectName");
    const panelClientName = document.getElementById("panelClientName");

    let currentFilter = "all";


    /* ==========================================
       FILTER + SEARCH
    ========================================== */

    function filterProjects() {

        const query =
            search?.value.toLowerCase().trim() || "";

        let visible = 0;


        cards.forEach(card => {

            const status =
                card.dataset.status;

            const searchableText =
                card.textContent.toLowerCase();

            const matchesStatus =
                currentFilter === "all" ||
                status === currentFilter;

            const matchesSearch =
                searchableText.includes(query);


            const shouldShow =
                matchesStatus && matchesSearch;


            card.style.display =
                shouldShow ? "" : "none";


            if (shouldShow) {
                visible++;
            }

        });


        if (empty) {

            empty.style.display =
                visible === 0
                    ? "block"
                    : "none";

        }

    }


    if (search) {

        search.addEventListener(
            "input",
            filterProjects
        );

    }


    tabs.forEach(tab => {

        tab.addEventListener("click", () => {

            tabs.forEach(button =>
                button.classList.remove("active")
            );


            tab.classList.add("active");

            currentFilter =
                tab.dataset.filter;

            filterProjects();

        });

    });


    /* ==========================================
       PROJECT PANEL
    ========================================== */

    function openProjectPanel(card) {

        if (!panel || !overlay) {
            return;
        }


        const project =
            card.dataset.name || "Website Project";

        const client =
            card.dataset.client || "Client";


        panelProjectName.textContent =
            project;

        panelClientName.textContent =
            client;


        /*
           Later this entire panel will load
           the project's real Supabase data.
        */


        panel.classList.add("open");
        overlay.classList.add("open");

        document.body.classList.add(
            "panel-open"
        );

    }


    function closeProjectPanel() {

        panel?.classList.remove("open");
        overlay?.classList.remove("open");

        document.body.classList.remove(
            "panel-open"
        );

    }


    document
        .querySelectorAll(".review-project")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const card =
                        button.closest(
                            ".premium-project-card"
                        );

                    if (card) {
                        openProjectPanel(card);
                    }

                }
            );

        });


    closePanelButton?.addEventListener(
        "click",
        closeProjectPanel
    );


    overlay?.addEventListener(
        "click",
        closeProjectPanel
    );


    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {
                closeProjectPanel();
            }

        }
    );


    /* ==========================================
       MESSAGE CLIENT
    ========================================== */

    document
        .querySelectorAll(".message-client")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const card =
                        button.closest(
                            ".premium-project-card"
                        );

                    const client =
                        card?.dataset.client ||
                        "client";


                    showProjectToast(
                        `Opening conversation with ${client}.`
                    );

                }
            );

        });


    document
        .getElementById("panelMessageClient")
        ?.addEventListener(
            "click",
            () => {

                showProjectToast(
                    "Client messaging will be connected to Nexora Support."
                );

            }
        );


    /* ==========================================
       SEND QUOTE
    ========================================== */

    const sendQuote =
        document.getElementById(
            "sendQuoteButton"
        );

    const quoteAmount =
        document.getElementById(
            "quoteAmount"
        );


    sendQuote?.addEventListener(
        "click",
        () => {

            const amount =
                Number(quoteAmount?.value);


            if (!amount || amount <= 0) {

                showProjectToast(
                    "Enter a project price first."
                );

                quoteAmount?.focus();

                return;

            }


            sendQuote.disabled = true;

            sendQuote.textContent =
                "Sending...";


            setTimeout(() => {

                showProjectToast(
                    `Quote for ${formatMoney(amount)} created.`
                );


                sendQuote.disabled = false;

                sendQuote.textContent =
                    "Send Quote →";


                /*
                   DEMO ONLY.

                   Later:
                   1. Save quote to Supabase
                   2. Change project status
                   3. Notify client
                   4. Show quote in client portal
                */

            }, 700);

        }
    );


    /* ==========================================
       URL PROJECT
    ========================================== */

    const params =
        new URLSearchParams(
            window.location.search
        );

    const requestedProject =
        params.get("project");


    if (requestedProject) {

        const matchingCard =
            [...cards].find(
                card =>
                    card.dataset.name ===
                    requestedProject
            );


        if (matchingCard) {

            setTimeout(
                () =>
                    openProjectPanel(
                        matchingCard
                    ),
                150
            );

        }

    }


    /* ==========================================
       TOAST
    ========================================== */

    function showProjectToast(message) {

        let toast =
            document.getElementById(
                "projectToast"
            );


        if (!toast) {

            toast =
                document.createElement("div");

            toast.id =
                "projectToast";

            toast.className =
                "admin-toast";

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

            }, 3000);

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


    filterProjects();

});