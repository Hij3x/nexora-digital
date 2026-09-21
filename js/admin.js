/* =========================================================
   NEXORA ADMIN
========================================================= */


/* REVIEW WEBSITE REQUESTS */

const reviewButtons =
    document.querySelectorAll(".review-request");


reviewButtons.forEach(button => {

    button.addEventListener("click", () => {

        const project =
            button.dataset.project;

        alert(
            `Opening request: ${project}`
        );

        /*
        NEXT:
        window.location.href =
            "admin-project.html?id=PROJECT_ID";
        */

    });

});


/* SIDEBAR */

const adminNavLinks =
    document.querySelectorAll(
        ".admin-sidebar .sidebar-nav a"
    );


adminNavLinks.forEach(link => {

    link.addEventListener("click", event => {

        event.preventDefault();

        adminNavLinks.forEach(item => {

            item.classList.remove("active");

        });

        link.classList.add("active");

    });

});


/* ADD CLIENT */

const addClientButton =
    document.querySelector(
        ".admin-primary-button"
    );


if (addClientButton) {

    addClientButton.addEventListener(
        "click",
        () => {

            alert(
                "Add Client will be connected next."
            );

        }
    );

}