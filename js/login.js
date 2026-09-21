/* =========================================================
   NEXORA — LOGIN
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    async () => {


        /* =================================================
           ELEMENTS
        ================================================= */

        const form =
            document.getElementById(
                "loginForm"
            );

        const emailInput =
            document.getElementById(
                "loginEmail"
            );

        const passwordInput =
            document.getElementById(
                "loginPassword"
            );

        const errorBox =
            document.getElementById(
                "loginError"
            );

        const loginButton =
            document.getElementById(
                "loginButton"
            );

        const loginButtonText =
            document.getElementById(
                "loginButtonText"
            );



        /* =================================================
           MAKE SURE SUPABASE EXISTS
        ================================================= */

        if (
            typeof nexoraSupabase ===
            "undefined"
        ) {

            console.error(
                "Nexora: Supabase client was not loaded."
            );


            showMessage(
                "Unable to connect to Nexora. Please try again later.",
                "error"
            );


            return;
        }



        /* =================================================
           CHECK EXISTING LOGIN
        ================================================= */

        try {

            const {
                data,
                error
            } =
                await nexoraSupabase
                    .auth
                    .getSession();


            if (error) {

                console.error(
                    "Session error:",
                    error
                );

            }


            if (
                data &&
                data.session &&
                data.session.user
            ) {

                console.log(
                    "Nexora: Existing session found."
                );


                await redirectUser(
                    data.session.user
                );


                return;
            }


        } catch (error) {

            console.error(
                "Nexora session check failed:",
                error
            );

        }



        /* =================================================
           LOGIN FORM
        ================================================= */

        if (!form) {

            console.error(
                "Nexora: loginForm was not found."
            );

            return;

        }



        form.addEventListener(
            "submit",
            async event => {

                event.preventDefault();


                clearMessage();



                /* =========================================
                   VALUES
                ========================================= */

                const email =
                    emailInput
                        ?.value
                        .trim();

                const password =
                    passwordInput
                        ?.value;



                /* =========================================
                   VALIDATION
                ========================================= */

                if (!email) {

                    showMessage(
                        "Please enter your email address.",
                        "error"
                    );

                    emailInput?.focus();

                    return;

                }


                if (!password) {

                    showMessage(
                        "Please enter your password.",
                        "error"
                    );

                    passwordInput?.focus();

                    return;

                }



                /* =========================================
                   LOGIN
                ========================================= */

                setLoading(true);


                try {

                    const {
                        data,
                        error
                    } =
                        await nexoraSupabase
                            .auth
                            .signInWithPassword({

                                email:
                                    email,

                                password:
                                    password

                            });



                    /* =====================================
                       LOGIN FAILED
                    ===================================== */

                    if (error) {

                        console.error(
                            "Nexora login:",
                            error
                        );


                        showMessage(
                            getFriendlyError(
                                error.message
                            ),
                            "error"
                        );


                        return;

                    }



                    /* =====================================
                       NO USER
                    ===================================== */

                    if (
                        !data ||
                        !data.user
                    ) {

                        showMessage(
                            "Unable to sign in. Please try again.",
                            "error"
                        );


                        return;

                    }



                    /* =====================================
                       SUCCESS
                    ===================================== */

                    console.log(
                        "Nexora: Login successful."
                    );


                    if (loginButtonText) {

                        loginButtonText.textContent =
                            "Welcome Back";

                    }


                    await redirectUser(
                        data.user
                    );


                } catch (error) {

                    console.error(
                        "Nexora authentication error:",
                        error
                    );


                    showMessage(
                        "Something went wrong. Please try again.",
                        "error"
                    );


                } finally {

                    setLoading(false);

                }

            }
        );



        /* =================================================
           REDIRECT USER
        ================================================= */

        async function redirectUser(user) {

    if (!user) {
        return;
    }


    try {

        const {
            data: profile,
            error
        } =
            await nexoraSupabase
                .from("profiles")
                .select(
                    "id, full_name, role"
                )
                .eq(
                    "id",
                    user.id
                )
                .single();


        if (error) {

            console.error(
                "Profile lookup error:",
                error
            );


            showMessage(
                "Your account was signed in, but your Nexora profile could not be loaded.",
                "error"
            );


            return;
        }



        /* =========================================
           ADMIN
        ========================================= */

        if (
            profile.role === "admin"
        ) {

            window.location.replace(
                "admin/dashboard.html"
            );

            return;

        }



        /* =========================================
           CLIENT
        ========================================= */

        window.location.replace(
            "client/my-websites.html"
        );


    } catch (error) {

        console.error(
            "Nexora redirect error:",
            error
        );


        showMessage(
            "Unable to load your Nexora account.",
            "error"
        );

    }

}



        /* =================================================
           LOADING STATE
        ================================================= */

        function setLoading(loading) {

            if (!loginButton) {
                return;
            }


            loginButton.disabled =
                loading;


            if (loginButtonText) {

                loginButtonText.textContent =
                    loading
                        ? "Signing In..."
                        : "Sign In";

            }

        }



        /* =================================================
           MESSAGE
        ================================================= */

        function showMessage(
            message,
            type = "error"
        ) {

            if (!errorBox) {

                console.error(message);

                return;

            }


            errorBox.textContent =
                message;


            errorBox.hidden =
                false;


            errorBox.classList.remove(
                "success"
            );


            if (type === "success") {

                errorBox.classList.add(
                    "success"
                );

            }

        }



        function clearMessage() {

            if (!errorBox) return;


            errorBox.hidden =
                true;


            errorBox.textContent =
                "";


            errorBox.classList.remove(
                "success"
            );

        }



        /* =================================================
           FRIENDLY AUTH ERRORS
        ================================================= */

        function getFriendlyError(message) {

            const error =
                String(
                    message || ""
                ).toLowerCase();


            if (
                error.includes(
                    "invalid login credentials"
                )
            ) {

                return (
                    "Incorrect email or password."
                );

            }


            if (
                error.includes(
                    "email not confirmed"
                )
            ) {

                return (
                    "Please confirm your email before signing in."
                );

            }


            if (
                error.includes(
                    "too many requests"
                )
            ) {

                return (
                    "Too many login attempts. Please wait and try again."
                );

            }


            return (
                "Unable to sign in. Please check your details and try again."
            );

        }

    }
);