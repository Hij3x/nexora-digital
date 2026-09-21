/* =========================================================
   NEXORA WEBSITE REQUEST BUILDER
========================================================= */

const steps =
    document.querySelectorAll(".builder-step");

const nextButton =
    document.getElementById("nextButton");

const backButton =
    document.getElementById("backButton");

const submitButton =
    document.getElementById("submitButton");

const progressFill =
    document.getElementById("progressFill");

const stepText =
    document.getElementById("stepText");

const stepTitle =
    document.getElementById("stepTitle");

const form =
    document.getElementById("websiteBuilderForm");


let currentStep = 1;

const totalSteps = steps.length;


const titles = [
    "Website Type",
    "Project Details",
    "Design & Style",
    "Pages & Features",
    "Review"
];


/* =========================================================
   SHOW STEP
========================================================= */

function showStep(step) {

    steps.forEach(section => {

        section.classList.remove("active");

    });


    const current =
        document.querySelector(
            `.builder-step[data-step="${step}"]`
        );


    if (current) {
        current.classList.add("active");
    }


    stepText.textContent =
        `Step ${step} of ${totalSteps}`;

    stepTitle.textContent =
        titles[step - 1];


    progressFill.style.width =
        `${(step / totalSteps) * 100}%`;


    backButton.style.visibility =
        step === 1
            ? "hidden"
            : "visible";


    if (step === totalSteps) {

        nextButton.style.display = "none";
        submitButton.style.display = "inline-flex";

        updateReview();

    } else {

        nextButton.style.display = "inline-flex";
        submitButton.style.display = "none";

    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   CONTINUE
========================================================= */

nextButton.addEventListener("click", () => {

    if (!validateStep()) {
        return;
    }


    if (currentStep < totalSteps) {

        currentStep++;

        showStep(currentStep);

    }

});


/* =========================================================
   BACK
========================================================= */

backButton.addEventListener("click", () => {

    if (currentStep > 1) {

        currentStep--;

        showStep(currentStep);

    }

});


/* =========================================================
   VALIDATION
========================================================= */

function validateStep() {

    if (currentStep === 1) {

        const type =
            document.querySelector(
                'input[name="websiteType"]:checked'
            );


        if (!type) {

            alert(
                "Please choose what type of website you're creating."
            );

            return false;

        }

    }


    if (currentStep === 2) {

        const name =
            document
                .getElementById("projectName")
                .value
                .trim();


        if (!name) {

            alert(
                "Please enter a name for your website or project."
            );

            return false;

        }

    }


    return true;

}


/* =========================================================
   SELECTED CARD EFFECT
========================================================= */

document
    .querySelectorAll(
        ".website-type-option input"
    )
    .forEach(input => {

        input.addEventListener(
            "change",
            () => {

                document
                    .querySelectorAll(
                        ".website-type-option"
                    )
                    .forEach(card => {

                        card.classList.remove(
                            "selected"
                        );

                    });


                input
                    .closest(
                        ".website-type-option"
                    )
                    .classList.add(
                        "selected"
                    );

            }
        );

    });


/* =========================================================
   STYLE SELECTION
========================================================= */

document
    .querySelectorAll(
        ".style-option input"
    )
    .forEach(input => {

        input.addEventListener(
            "change",
            () => {

                input
                    .closest(".style-option")
                    .classList.toggle(
                        "selected",
                        input.checked
                    );

            }
        );

    });


/* =========================================================
   FEATURE SELECTION
========================================================= */

document
    .querySelectorAll(
        ".feature-option input"
    )
    .forEach(input => {

        input.addEventListener(
            "change",
            () => {

                input
                    .closest(".feature-option")
                    .classList.toggle(
                        "selected",
                        input.checked
                    );

            }
        );

    });


/* =========================================================
   DOMAIN FIELD
========================================================= */

const domainChoices =
    document.querySelectorAll(
        'input[name="hasDomain"]'
    );

const domainField =
    document.getElementById("domainField");


domainChoices.forEach(choice => {

    choice.addEventListener("change", () => {

        if (choice.value === "Yes") {

            domainField.style.display =
                "block";

        } else {

            domainField.style.display =
                "none";

        }

    });

});


domainField.style.display = "none";


/* =========================================================
   REVIEW
========================================================= */

function updateReview() {

    const type =
        document.querySelector(
            'input[name="websiteType"]:checked'
        );


    const name =
        document.getElementById(
            "projectName"
        ).value.trim();


    const domainChoice =
        document.querySelector(
            'input[name="hasDomain"]:checked'
        );


    const domain =
        document.getElementById(
            "domainName"
        ).value.trim();


    const styles = [
        ...document.querySelectorAll(
            ".style-option input:checked"
        )
    ].map(input => input.value);


    const features = [
        ...document.querySelectorAll(
            ".feature-option input:checked"
        )
    ].map(input => input.value);


    document.getElementById(
        "reviewType"
    ).textContent =
        type ? type.value : "—";


    document.getElementById(
        "reviewName"
    ).textContent =
        name || "—";


    let domainText = "Not provided";


    if (
        domainChoice &&
        domainChoice.value === "Yes"
    ) {

        domainText =
            domain || "Domain not entered";

    }

    else if (domainChoice) {

        domainText =
            domainChoice.value;

    }


    document.getElementById(
        "reviewDomain"
    ).textContent =
        domainText;


    document.getElementById(
        "reviewStyle"
    ).textContent =
        styles.length
            ? styles.join(", ")
            : "No preference";


    document.getElementById(
        "reviewFeatures"
    ).textContent =
        features.length
            ? features.join(", ")
            : "To be discussed";

}


/* =========================================================
   SUBMIT
========================================================= */

form.addEventListener("submit", event => {

    event.preventDefault();


    /*
       DEMO ONLY.

       Later we'll save the project
       to Supabase instead.
    */


    submitButton.disabled = true;

    submitButton.textContent =
        "Sending Request...";


    setTimeout(() => {

        alert(
            "Your website request has been sent to Nexora!"
        );


        window.location.href =
            "my-websites.html";

    }, 900);

});


/* =========================================================
   START
========================================================= */

showStep(currentStep);