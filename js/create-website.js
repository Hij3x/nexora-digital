/* =========================================================
   NEXORA - CREATE WEBSITE
   js/create-website.js
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ====================================================== */

    const form = document.getElementById("websiteBuilderForm");

    const steps = document.querySelectorAll(".builder-step");

    const nextButton = document.getElementById("nextButton");
    const backButton = document.getElementById("backButton");
    const submitButton = document.getElementById("submitButton");

    const stepText = document.getElementById("stepText");
    const stepTitle = document.getElementById("stepTitle");
    const progressFill = document.getElementById("progressFill");

    const projectName = document.getElementById("projectName");
    const domainName = document.getElementById("domainName");
    const domainField = document.getElementById("domainField");
    const projectDescription = document.getElementById("projectDescription");

    const inspiration = document.getElementById("inspiration");
    const preferredColors = document.getElementById("preferredColors");
    const additionalFeatures = document.getElementById("additionalFeatures");

    const reviewType = document.getElementById("reviewType");
    const reviewName = document.getElementById("reviewName");
    const reviewDomain = document.getElementById("reviewDomain");
    const reviewStyle = document.getElementById("reviewStyle");
    const reviewFeatures = document.getElementById("reviewFeatures");

    const saveExitButton = document.querySelector(".exit-builder");


    /* =====================================================
       SETTINGS
    ====================================================== */

    const totalSteps = 5;

    let currentStep = 1;

    const stepTitles = {
        1: "Website Type",
        2: "Project Details",
        3: "Design & Style",
        4: "Website Features",
        5: "Review Request"
    };


    /* =====================================================
       SHOW STEP
    ====================================================== */

    function showStep(stepNumber) {

        currentStep = stepNumber;

        steps.forEach(step => {

            const number = Number(step.dataset.step);

            step.classList.toggle(
                "active",
                number === currentStep
            );

        });


        if (stepText) {
            stepText.textContent =
                `Step ${currentStep} of ${totalSteps}`;
        }


        if (stepTitle) {
            stepTitle.textContent =
                stepTitles[currentStep];
        }


        if (progressFill) {

            const progress =
                (currentStep / totalSteps) * 100;

            progressFill.style.width =
                `${progress}%`;
        }


        /* BACK BUTTON */

        if (backButton) {

            backButton.style.visibility =
                currentStep === 1
                    ? "hidden"
                    : "visible";
        }


        /* CONTINUE BUTTON */

        if (nextButton) {

            nextButton.style.display =
                currentStep === totalSteps
                    ? "none"
                    : "inline-flex";
        }


        /* SUBMIT BUTTON */

        if (submitButton) {

            submitButton.style.display =
                currentStep === totalSteps
                    ? "inline-flex"
                    : "none";
        }


        if (currentStep === 5) {
            buildReview();
        }


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }


    /* =====================================================
       WEBSITE TYPE CARDS
    ====================================================== */

    const websiteTypeInputs =
        document.querySelectorAll(
            'input[name="websiteType"]'
        );


    websiteTypeInputs.forEach(input => {

        input.addEventListener("change", () => {

            document
                .querySelectorAll(".website-type-option")
                .forEach(card => {
                    card.classList.remove("selected");
                });


            const card =
                input.closest(".website-type-option");

            if (card) {
                card.classList.add("selected");
            }


            saveDraft();

        });

    });


    /* =====================================================
       DOMAIN OPTIONS
    ====================================================== */

    const domainInputs =
        document.querySelectorAll(
            'input[name="hasDomain"]'
        );


    domainInputs.forEach(input => {

        input.addEventListener("change", () => {

            updateDomainField();

            saveDraft();

        });

    });


    function updateDomainField() {

        const selected =
            document.querySelector(
                'input[name="hasDomain"]:checked'
            );


        if (!domainField) {
            return;
        }


        if (
            selected &&
            selected.value === "Yes"
        ) {

            domainField.style.display = "block";

        } else {

            domainField.style.display = "none";

            if (domainName) {
                domainName.value = "";
            }

        }

    }


    /* =====================================================
       STYLE CARDS
    ====================================================== */

    const styleInputs =
        document.querySelectorAll(
            ".style-option input"
        );


    styleInputs.forEach(input => {

        input.addEventListener("change", () => {

            const card =
                input.closest(".style-option");


            if (card) {

                card.classList.toggle(
                    "selected",
                    input.checked
                );

            }


            /*
               If "I'm Not Sure" is selected,
               clear the other style choices.
            */

            if (
                input.value === "Not Sure" &&
                input.checked
            ) {

                styleInputs.forEach(other => {

                    if (other !== input) {

                        other.checked = false;

                        const otherCard =
                            other.closest(".style-option");

                        if (otherCard) {
                            otherCard.classList.remove(
                                "selected"
                            );
                        }

                    }

                });

            } else if (input.checked) {

                const unsure =
                    [...styleInputs].find(
                        item =>
                            item.value === "Not Sure"
                    );


                if (unsure) {

                    unsure.checked = false;

                    const unsureCard =
                        unsure.closest(".style-option");

                    if (unsureCard) {
                        unsureCard.classList.remove(
                            "selected"
                        );
                    }

                }

            }


            saveDraft();

        });

    });


    /* =====================================================
       FEATURE CARDS
    ====================================================== */

    const featureInputs =
        document.querySelectorAll(
            ".feature-option input"
        );


    featureInputs.forEach(input => {

        input.addEventListener("change", () => {

            const card =
                input.closest(".feature-option");


            if (card) {

                card.classList.toggle(
                    "selected",
                    input.checked
                );

            }


            /*
               Handle "I'm Not Sure Yet"
            */

            if (
                input.value === "Not Sure" &&
                input.checked
            ) {

                featureInputs.forEach(other => {

                    if (other !== input) {

                        other.checked = false;

                        const otherCard =
                            other.closest(
                                ".feature-option"
                            );

                        if (otherCard) {
                            otherCard.classList.remove(
                                "selected"
                            );
                        }

                    }

                });

            } else if (input.checked) {

                const unsure =
                    [...featureInputs].find(
                        item =>
                            item.value === "Not Sure"
                    );


                if (unsure) {

                    unsure.checked = false;

                    const unsureCard =
                        unsure.closest(
                            ".feature-option"
                        );

                    if (unsureCard) {
                        unsureCard.classList.remove(
                            "selected"
                        );
                    }

                }

            }


            saveDraft();

        });

    });


    /* =====================================================
       VALIDATION
    ====================================================== */

    function validateStep() {

        clearErrors();


        /* STEP 1 */

        if (currentStep === 1) {

            const websiteType =
                document.querySelector(
                    'input[name="websiteType"]:checked'
                );


            if (!websiteType) {

                showMessage(
                    "Please choose what type of website you want to create."
                );

                return false;
            }

        }


        /* STEP 2 */

        if (currentStep === 2) {

            if (
                !projectName ||
                !projectName.value.trim()
            ) {

                markError(projectName);

                showMessage(
                    "Please enter a name for your website or project."
                );

                projectName?.focus();

                return false;
            }


            const domainChoice =
                document.querySelector(
                    'input[name="hasDomain"]:checked'
                );


            if (!domainChoice) {

                showMessage(
                    "Please tell us if you already have a domain."
                );

                return false;
            }


            if (
                domainChoice.value === "Yes" &&
                (
                    !domainName ||
                    !domainName.value.trim()
                )
            ) {

                markError(domainName);

                showMessage(
                    "Please enter your domain name."
                );

                domainName?.focus();

                return false;
            }


            if (
                !projectDescription ||
                !projectDescription.value.trim()
            ) {

                markError(projectDescription);

                showMessage(
                    "Please tell us a little about your website."
                );

                projectDescription?.focus();

                return false;
            }

        }


        return true;

    }


    /* =====================================================
       ERROR HELPERS
    ====================================================== */

    function markError(element) {

        if (!element) {
            return;
        }

        element.classList.add(
            "builder-input-error"
        );

    }


    function clearErrors() {

        document
            .querySelectorAll(
                ".builder-input-error"
            )
            .forEach(element => {

                element.classList.remove(
                    "builder-input-error"
                );

            });

    }


    function showMessage(message) {

        let box =
            document.getElementById(
                "builderMessage"
            );


        if (!box) {

            box =
                document.createElement("div");

            box.id =
                "builderMessage";

            box.className =
                "builder-message";

            form.prepend(box);

        }


        box.textContent = message;

        box.classList.add("show");


        setTimeout(() => {

            box.classList.remove("show");

        }, 3500);

    }


    /* =====================================================
       NEXT BUTTON
    ====================================================== */

    if (nextButton) {

        nextButton.addEventListener(
            "click",
            () => {

                if (!validateStep()) {
                    return;
                }


                saveDraft();


                if (currentStep < totalSteps) {

                    showStep(
                        currentStep + 1
                    );

                }

            }
        );

    }


    /* =====================================================
       BACK BUTTON
    ====================================================== */

    if (backButton) {

        backButton.addEventListener(
            "click",
            () => {

                saveDraft();


                if (currentStep > 1) {

                    showStep(
                        currentStep - 1
                    );

                }

            }
        );

    }


    /* =====================================================
       BUILD REVIEW
    ====================================================== */

    function buildReview() {

        const websiteType =
            document.querySelector(
                'input[name="websiteType"]:checked'
            );


        const domainChoice =
            document.querySelector(
                'input[name="hasDomain"]:checked'
            );


        const selectedStyles =
            [...styleInputs]
                .filter(input => input.checked)
                .map(input => input.value);


        const selectedFeatures =
            [...featureInputs]
                .filter(input => input.checked)
                .map(input => input.value);


        if (reviewType) {

            reviewType.textContent =
                websiteType
                    ? websiteType.value
                    : "—";

        }


        if (reviewName) {

            reviewName.textContent =
                projectName?.value.trim() ||
                "—";

        }


        if (reviewDomain) {

            if (
                domainChoice?.value === "Yes"
            ) {

                reviewDomain.textContent =
                    domainName?.value.trim() ||
                    "Domain provided";

            } else if (domainChoice) {

                reviewDomain.textContent =
                    domainChoice.value;

            } else {

                reviewDomain.textContent =
                    "—";

            }

        }


        if (reviewStyle) {

            reviewStyle.textContent =
                selectedStyles.length
                    ? selectedStyles.join(", ")
                    : "No preference";

        }


        if (reviewFeatures) {

            reviewFeatures.textContent =
                selectedFeatures.length
                    ? selectedFeatures.join(", ")
                    : "None selected";

        }

    }


    /* =====================================================
       GET CURRENT FORM DATA
    ====================================================== */

    function getFormData() {

        const websiteType =
            document.querySelector(
                'input[name="websiteType"]:checked'
            );


        const domainChoice =
            document.querySelector(
                'input[name="hasDomain"]:checked'
            );


        const selectedStyles =
            [...styleInputs]
                .filter(input => input.checked)
                .map(input => input.value);


        const selectedFeatures =
            [...featureInputs]
                .filter(input => input.checked)
                .map(input => input.value);


        return {

            websiteType:
                websiteType?.value || "",

            projectName:
                projectName?.value.trim() || "",

            hasDomain:
                domainChoice?.value || "",

            domainName:
                domainName?.value.trim() || "",

            description:
                projectDescription?.value.trim() || "",

            styles:
                selectedStyles,

            inspiration:
                inspiration?.value.trim() || "",

            preferredColors:
                preferredColors?.value.trim() || "",

            features:
                selectedFeatures,

            additionalFeatures:
                additionalFeatures?.value.trim() || "",

            savedAt:
                new Date().toISOString()

        };

    }


    /* =====================================================
       SAVE DRAFT
    ====================================================== */

    function saveDraft() {

        const data =
            getFormData();


        localStorage.setItem(
            "nexoraWebsiteDraft",
            JSON.stringify(data)
        );

    }


    /* =====================================================
       RESTORE DRAFT
    ====================================================== */

    function restoreDraft() {

        const saved =
            localStorage.getItem(
                "nexoraWebsiteDraft"
            );


        if (!saved) {
            return;
        }


        let data;


        try {

            data = JSON.parse(saved);

        } catch {

            return;

        }


        /* WEBSITE TYPE */

        if (data.websiteType) {

            const input =
                [...websiteTypeInputs].find(
                    item =>
                        item.value ===
                        data.websiteType
                );


            if (input) {

                input.checked = true;

                input.closest(
                    ".website-type-option"
                )?.classList.add(
                    "selected"
                );

            }

        }


        /* PROJECT */

        if (projectName) {
            projectName.value =
                data.projectName || "";
        }


        if (projectDescription) {
            projectDescription.value =
                data.description || "";
        }


        /* DOMAIN */

        if (data.hasDomain) {

            const input =
                [...domainInputs].find(
                    item =>
                        item.value ===
                        data.hasDomain
                );


            if (input) {
                input.checked = true;
            }

        }


        if (domainName) {
            domainName.value =
                data.domainName || "";
        }


        /* STYLE */

        if (
            Array.isArray(data.styles)
        ) {

            styleInputs.forEach(input => {

                input.checked =
                    data.styles.includes(
                        input.value
                    );


                input.closest(
                    ".style-option"
                )?.classList.toggle(
                    "selected",
                    input.checked
                );

            });

        }


        /* INSPIRATION */

        if (inspiration) {
            inspiration.value =
                data.inspiration || "";
        }


        if (preferredColors) {
            preferredColors.value =
                data.preferredColors || "";
        }


        /* FEATURES */

        if (
            Array.isArray(data.features)
        ) {

            featureInputs.forEach(input => {

                input.checked =
                    data.features.includes(
                        input.value
                    );


                input.closest(
                    ".feature-option"
                )?.classList.toggle(
                    "selected",
                    input.checked
                );

            });

        }


        if (additionalFeatures) {

            additionalFeatures.value =
                data.additionalFeatures || "";

        }


        updateDomainField();

    }


    /* =====================================================
       AUTO SAVE WHILE TYPING
    ====================================================== */

    const textFields = [
        projectName,
        domainName,
        projectDescription,
        inspiration,
        preferredColors,
        additionalFeatures
    ];


    textFields.forEach(field => {

        if (!field) {
            return;
        }


        field.addEventListener(
            "input",
            saveDraft
        );

    });


    /* =====================================================
       SAVE & EXIT
    ====================================================== */

    if (saveExitButton) {

        saveExitButton.addEventListener(
            "click",
            () => {

                saveDraft();

            }
        );

    }


    /* =====================================================
       SUBMIT WEBSITE REQUEST
    ====================================================== */

    if (form) {

        form.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const request =
                    getFormData();


                /*
                   DEMO ONLY

                   Later we'll replace this
                   with Supabase so the request
                   appears automatically in the
                   Nexora admin dashboard.
                */

                console.log(
                    "Nexora Website Request:",
                    request
                );


                if (submitButton) {

                    submitButton.disabled = true;

                    submitButton.textContent =
                        "Sending Request...";

                }


                setTimeout(() => {

                    localStorage.removeItem(
                        "nexoraWebsiteDraft"
                    );


                    showSuccessScreen();

                }, 900);

            }
        );

    }


    /* =====================================================
       SUCCESS SCREEN
    ====================================================== */

    function showSuccessScreen() {

        const main =
            document.querySelector(
                ".create-project-main"
            );


        if (!main) {

            window.location.href =
                "my-websites.html";

            return;

        }


        main.innerHTML = `

            <section class="builder-success">

                <div class="success-icon">
                    ✓
                </div>

                <span class="dashboard-eyebrow">
                    REQUEST SENT
                </span>

                <h1>
                    Your website request is in!
                </h1>

                <p>
                    Nexora has received your project
                    details. We'll review your request
                    before pricing and project approval.
                </p>

                <div class="success-actions">

                    <a
                        href="my-websites.html"
                        class="builder-next"
                    >
                        Back to My Websites →
                    </a>

                </div>

            </section>

        `;

    }


    /* =====================================================
       START
    ====================================================== */

    restoreDraft();

    updateDomainField();

    showStep(1);

});