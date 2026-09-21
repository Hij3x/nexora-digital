/* =========================================================
   NEXORA — REPORT ABUSE
   Front-end version
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const form =
        document.getElementById("abuseForm");

    const success =
        document.getElementById("abuseSuccess");

    const reference =
        document.getElementById("abuseReference");


    if (!form) return;


    form.addEventListener("submit", event => {

        event.preventDefault();


        /* Browser validation */

        if (!form.checkValidity()) {

            form.reportValidity();

            return;

        }


        const submitButton =
            form.querySelector(".abuse-submit");


        if (submitButton) {

            submitButton.disabled = true;

            submitButton.innerHTML =
                "<span>Submitting...</span>";

        }


        /*
           TEMPORARY FRONT-END DEMO

           Later:
           - Save report to database
           - Create admin Trust & Safety ticket
           - Generate server-side reference number
           - Optionally send email confirmation

           Do NOT treat this front-end reference number
           as a secure database ID.
        */


        setTimeout(() => {

            const referenceNumber =
                createTemporaryReference();


            if (reference) {
                reference.textContent =
                    referenceNumber;
            }


            form.hidden = true;

            const formHeader =
                document.querySelector(
                    ".abuse-form-header"
                );

            if (formHeader) {
                formHeader.hidden = true;
            }


            if (success) {
                success.hidden = false;
            }


            window.scrollTo({
                top:
                    document.querySelector(
                        ".abuse-form-card"
                    ).offsetTop - 40,

                behavior: "smooth"
            });

        }, 700);

    });



    function createTemporaryReference() {

        const number =
            Math.floor(
                100000 +
                Math.random() * 900000
            );

        return `NXR-${number}`;

    }

});