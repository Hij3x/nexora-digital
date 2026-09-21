/* =========================================================
   NEXORA ADMIN — PAYMENTS
   Front-end demo
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const search =
        document.getElementById("paymentSearch");

    const filter =
        document.getElementById("paymentStatusFilter");

    const rows =
        document.querySelectorAll(".payment-row");

    const empty =
        document.getElementById("paymentsEmpty");


    /* =====================================================
       SEARCH + FILTER
    ====================================================== */

    function filterPayments() {

        const query =
            (search?.value || "")
                .toLowerCase()
                .trim();

        const status =
            filter?.value || "all";

        let visible = 0;


        rows.forEach(row => {

            const text = `
                ${row.dataset.transaction}
                ${row.dataset.client}
                ${row.dataset.email}
                ${row.dataset.description}
                ${row.dataset.amount}
            `.toLowerCase();


            const matchesSearch =
                text.includes(query);

            const matchesStatus =
                status === "all" ||
                row.dataset.status === status;


            const show =
                matchesSearch &&
                matchesStatus;


            row.style.display =
                show ? "" : "none";


            if (show) visible++;

        });


        if (empty) {
            empty.hidden =
                visible !== 0;
        }

    }


    search?.addEventListener(
        "input",
        filterPayments
    );

    filter?.addEventListener(
        "change",
        filterPayments
    );



    /* =====================================================
       PAYMENT DETAILS
    ====================================================== */

    const panel =
        document.getElementById(
            "paymentDetailsPanel"
        );

    const overlay =
        document.getElementById(
            "paymentPanelOverlay"
        );

    const closePanel =
        document.getElementById(
            "closePaymentPanel"
        );


    document
        .querySelectorAll(
            ".payment-view-button"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const row =
                        button.closest(
                            ".payment-row"
                        );

                    openPayment(row);

                }
            );

        });


    function openPayment(row) {

        if (!row) return;


        const transaction =
            row.dataset.transaction;

        const client =
            row.dataset.client;

        const email =
            row.dataset.email;

        const description =
            row.dataset.description;

        const amount =
            row.dataset.amount;

        const status =
            row.dataset.status;

        const date =
            row.dataset.date;

        const method =
            row.dataset.method;


        setText(
            "panelTransaction",
            transaction
        );

        setText(
            "panelPaymentAmount",
            amount
        );

        setText(
            "panelPaymentClient",
            client
        );

        setText(
            "panelPaymentEmail",
            email
        );

        setText(
            "panelPaymentDescription",
            description
        );

        setText(
            "panelPaymentDate",
            date
        );

        setText(
            "panelPaymentMethod",
            method
        );

        setText(
            "panelPaymentID",
            transaction
        );

        setText(
            "panelPaymentAvatar",
            initials(client)
        );


        const invoice =
            transaction.replace(
                "NXR-",
                "INV-"
            );

        setText(
            "panelInvoiceNumber",
            invoice
        );


        const statusElement =
            document.getElementById(
                "panelPaymentStatus"
            );


        if (statusElement) {

            statusElement.className =
                `payment-status ${status}`;

            statusElement.textContent =
                capitalize(status);

        }


        panel?.classList.add("open");
        overlay?.classList.add("open");

    }


    function closePayment() {

        panel?.classList.remove("open");
        overlay?.classList.remove("open");

    }


    closePanel?.addEventListener(
        "click",
        closePayment
    );

    overlay?.addEventListener(
        "click",
        closePayment
    );



    /* =====================================================
       CREATE INVOICE
    ====================================================== */

    const invoiceModal =
        document.getElementById(
            "invoiceModal"
        );

    const createInvoiceButton =
        document.getElementById(
            "createInvoiceButton"
        );

    const closeInvoiceModal =
        document.getElementById(
            "closeInvoiceModal"
        );

    const cancelInvoice =
        document.getElementById(
            "cancelInvoice"
        );

    const invoiceForm =
        document.getElementById(
            "invoiceForm"
        );


    function openInvoiceModal() {

        invoiceModal?.classList.add(
            "open"
        );

    }


    function closeInvoice() {

        invoiceModal?.classList.remove(
            "open"
        );

    }


    createInvoiceButton?.addEventListener(
        "click",
        openInvoiceModal
    );

    closeInvoiceModal?.addEventListener(
        "click",
        closeInvoice
    );

    cancelInvoice?.addEventListener(
        "click",
        closeInvoice
    );


    invoiceModal?.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                invoiceModal
            ) {
                closeInvoice();
            }

        }
    );


    invoiceForm?.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            if (
                !invoiceForm.checkValidity()
            ) {

                invoiceForm.reportValidity();

                return;

            }


            const client =
                document.getElementById(
                    "invoiceClient"
                ).value;

            const amount =
                document.getElementById(
                    "invoiceAmount"
                ).value;


            /*
               DEMO ONLY.

               Later this will:
               1. Create invoice in database
               2. Create payment-provider invoice
               3. Save invoice ID
               4. Send secure payment link
               5. Update status using server webhook
            */


            showPaymentToast(
                `Demo invoice for ${client} — $${Number(amount).toFixed(2)}`
            );


            invoiceForm.reset();

            closeInvoice();

        }
    );



    /* =====================================================
       PAYMENT ACTIONS
    ====================================================== */

    document
        .getElementById(
            "sendReceiptButton"
        )
        ?.addEventListener(
            "click",
            () => {

                showPaymentToast(
                    "Receipt sending will be connected to the backend."
                );

            }
        );


    document
        .getElementById(
            "refundButton"
        )
        ?.addEventListener(
            "click",
            () => {

                showPaymentToast(
                    "Refunds are disabled in the demo."
                );

            }
        );


    document
        .getElementById(
            "viewInvoiceButton"
        )
        ?.addEventListener(
            "click",
            () => {

                showPaymentToast(
                    "Invoice preview will be added next."
                );

            }
        );



    /* =====================================================
       KEYBOARD
    ====================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                closePayment();
                closeInvoice();

            }

        }
    );



    /* =====================================================
       HELPERS
    ====================================================== */

    function setText(id, value) {

        const element =
            document.getElementById(id);

        if (element) {
            element.textContent =
                value || "—";
        }

    }


    function initials(name) {

        return (name || "")
            .split(" ")
            .filter(Boolean)
            .map(word => word[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();

    }


    function capitalize(value) {

        return value
            ? value.charAt(0).toUpperCase() +
              value.slice(1)
            : "";

    }


    function showPaymentToast(message) {

        let toast =
            document.getElementById(
                "paymentToast"
            );


        if (!toast) {

            toast =
                document.createElement(
                    "div"
                );

            toast.id =
                "paymentToast";

            toast.className =
                "site-toast";

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
            setTimeout(
                () => {

                    toast.classList.remove(
                        "show"
                    );

                },
                2800
            );

    }

});