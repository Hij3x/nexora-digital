/* =========================================================
   NEXORA ADMIN — CLIENTS
   Front-end demo
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const search = document.getElementById("clientSearch");
    const filter = document.getElementById("clientStatusFilter");
    const tbody = document.getElementById("clientTableBody");
    const empty = document.getElementById("clientsEmpty");

    const panel = document.getElementById("clientDetailsPanel");
    const overlay = document.getElementById("clientPanelOverlay");
    const closePanel = document.getElementById("closeClientPanel");

    const addButton = document.getElementById("addClientButton");
    const modal = document.getElementById("addClientModal");
    const closeModal = document.getElementById("closeAddClientModal");
    const cancelModal = document.getElementById("cancelAddClient");
    const addForm = document.getElementById("addClientForm");


    /* =====================================================
       FILTER CLIENTS
    ====================================================== */

    function filterClients() {

        const query =
            (search?.value || "").toLowerCase().trim();

        const status =
            filter?.value || "all";

        const rows =
            tbody?.querySelectorAll(".client-row") || [];

        let visible = 0;

        rows.forEach(row => {

            const searchable =
                `${row.dataset.client} ${row.dataset.email}`
                    .toLowerCase();

            const matchesSearch =
                searchable.includes(query);

            const matchesStatus =
                status === "all" ||
                row.dataset.status === status;

            const show =
                matchesSearch && matchesStatus;

            row.style.display =
                show ? "" : "none";

            if (show) visible++;

        });

        if (empty) {
            empty.hidden = visible !== 0;
        }
    }

    search?.addEventListener("input", filterClients);
    filter?.addEventListener("change", filterClients);


    /* =====================================================
       CLIENT DETAILS
    ====================================================== */

    function initials(name) {

        return name
            .split(" ")
            .map(word => word[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();
    }


    function openClient(row) {

        const name = row.dataset.client;
        const email = row.dataset.email;
        const phone = row.dataset.phone || "Not provided";
        const websites = row.dataset.websites || "0";
        const plan = row.dataset.plan || "No Active Plan";
        const joined = row.dataset.joined || "—";
        const status = row.dataset.status || "inactive";


        document.getElementById("panelClientName").textContent =
            name;

        document.getElementById("panelClientNameSmall").textContent =
            name;

        document.getElementById("panelClientAvatar").textContent =
            initials(name);

        const emailElement =
            document.getElementById("panelClientEmail");

        emailElement.textContent = email;
        emailElement.href = `mailto:${email}`;

        document.getElementById("panelClientPhone").textContent =
            phone;

        document.getElementById("panelClientWebsites").textContent =
            websites;

        document.getElementById("panelClientJoined").textContent =
            joined;

        document.getElementById("panelClientPlan").textContent =
            plan;

        document.getElementById("panelClientStatus").textContent =
            `${capitalize(status)} Client`;


        panel?.classList.add("open");
        overlay?.classList.add("open");
    }


    function closeClient() {
        panel?.classList.remove("open");
        overlay?.classList.remove("open");
    }


    function attachViewButtons() {

        document
            .querySelectorAll(".client-view-button")
            .forEach(button => {

                button.onclick = () => {

                    const row =
                        button.closest(".client-row");

                    if (row) openClient(row);
                };

            });
    }


    attachViewButtons();

    closePanel?.addEventListener("click", closeClient);
    overlay?.addEventListener("click", closeClient);


    /* =====================================================
       ADD CLIENT MODAL
    ====================================================== */

    function openAddModal() {
        modal?.classList.add("open");
    }

    function closeAddModal() {
        modal?.classList.remove("open");
    }


    addButton?.addEventListener("click", openAddModal);
    closeModal?.addEventListener("click", closeAddModal);
    cancelModal?.addEventListener("click", closeAddModal);


    modal?.addEventListener("click", event => {

        if (event.target === modal) {
            closeAddModal();
        }

    });


    /* =====================================================
       ADD CLIENT — DEMO
    ====================================================== */

    addForm?.addEventListener("submit", event => {

        event.preventDefault();

        if (!addForm.checkValidity()) {
            addForm.reportValidity();
            return;
        }


        const first =
            document.getElementById("newFirstName").value.trim();

        const last =
            document.getElementById("newLastName").value.trim();

        const email =
            document.getElementById("newClientEmail").value.trim();

        const phone =
            document.getElementById("newClientPhone").value.trim();

        const plan =
            document.getElementById("newClientPlan").value;

        const status =
            document.getElementById("newClientStatus").value;


        const fullName =
            `${first} ${last}`;


        const today =
            new Date().toLocaleDateString(
                "en-CA",
                {
                    month: "short",
                    day: "2-digit",
                    year: "numeric"
                }
            );


        const row =
            document.createElement("tr");

        row.className =
            "client-row";

        row.dataset.status = status;
        row.dataset.client = fullName;
        row.dataset.email = email;
        row.dataset.phone = phone;
        row.dataset.websites = "0";
        row.dataset.plan = plan;
        row.dataset.joined = today;


        row.innerHTML = `
            <td>
                <div class="client-identity">

                    <div class="client-avatar">
                        ${escapeHTML(initials(fullName))}
                    </div>

                    <div>
                        <strong>
                            ${escapeHTML(fullName)}
                        </strong>

                        <span>
                            ${escapeHTML(email)}
                        </span>
                    </div>

                </div>
            </td>

            <td>0</td>

            <td>
                ${escapeHTML(plan)}
            </td>

            <td>
                <span class="client-status ${status}">
                    ${capitalize(status)}
                </span>
            </td>

            <td>
                ${escapeHTML(today)}
            </td>

            <td>
                <button class="client-view-button">
                    View →
                </button>
            </td>
        `;


        tbody?.prepend(row);

        attachViewButtons();

        addForm.reset();

        closeAddModal();

        updateDemoStats();

        showClientToast(
            `${fullName} added successfully.`
        );

    });


    /* =====================================================
       PANEL ACTIONS
    ====================================================== */

    document
        .getElementById("messageClientButton")
        ?.addEventListener("click", () => {

            showClientToast(
                "Client messaging will connect to Support."
            );

        });


    document
        .getElementById("editClientButton")
        ?.addEventListener("click", () => {

            showClientToast(
                "Client editing will be added with the backend."
            );

        });


    /* =====================================================
       STATS
    ====================================================== */

    function updateDemoStats() {

        const rows =
            [...document.querySelectorAll(".client-row")];

        const active =
            rows.filter(
                row => row.dataset.status === "active"
            ).length;

        document.getElementById("totalClients").textContent =
            rows.length;

        document.getElementById("activeClients").textContent =
            active;

    }


    /* =====================================================
       ESCAPE KEY
    ====================================================== */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            closeClient();
            closeAddModal();

        }

    });


    /* =====================================================
       HELPERS
    ====================================================== */

    function capitalize(value) {

        return value
            ? value.charAt(0).toUpperCase() +
              value.slice(1)
            : "";
    }


    function escapeHTML(value) {

        const div =
            document.createElement("div");

        div.textContent =
            value || "";

        return div.innerHTML;
    }


    function showClientToast(message) {

        let toast =
            document.getElementById("adminClientToast");

        if (!toast) {

            toast =
                document.createElement("div");

            toast.id =
                "adminClientToast";

            toast.className =
                "site-toast";

            document.body.appendChild(toast);

        }

        toast.textContent = message;

        toast.classList.add("show");

        clearTimeout(toast.timer);

        toast.timer =
            setTimeout(() => {
                toast.classList.remove("show");
            }, 3000);

    }


    /* =====================================================
       ?action=add SUPPORT
    ====================================================== */

    const params =
        new URLSearchParams(
            window.location.search
        );

    if (params.get("action") === "add") {
        openAddModal();
    }

});