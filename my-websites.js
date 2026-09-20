/* =========================================================
   NEXORA - MY WEBSITES
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const createWebsite =
    document.getElementById("createWebsite");

const websiteSearch =
    document.getElementById("websiteSearch");

const websiteCards =
    document.querySelectorAll(".client-website-card");

const noWebsitesFound =
    document.getElementById("noWebsitesFound");


/* CHAT */

const chatLauncher =
    document.getElementById("chatLauncher");

const chatWindow =
    document.getElementById("chatWindow");

const closeChat =
    document.getElementById("closeChat");

const sidebarChat =
    document.getElementById("sidebarChat");

const supportNav =
    document.getElementById("supportNav");

const sendMessage =
    document.getElementById("sendMessage");

const chatInput =
    document.getElementById("chatInput");

const chatMessages =
    document.getElementById("chatMessages");

const attachmentButton =
    document.getElementById("attachmentButton");


/* =========================================================
   CREATE WEBSITE
========================================================= */

if (createWebsite) {

    createWebsite.addEventListener("click", () => {

        /*
         * We'll create this page next.
         */

        window.location.href =
            "create-website.html";

    });

}


/* =========================================================
   SEARCH WEBSITES
========================================================= */

if (websiteSearch) {

    websiteSearch.addEventListener("input", () => {

        const search =
            websiteSearch.value
                .toLowerCase()
                .trim();

        let results = 0;


        websiteCards.forEach(card => {

            const websiteName =
                card.dataset.name
                    .toLowerCase();

            const domain =
                card.querySelector(
                    ".website-card-domain"
                )
                .textContent
                .toLowerCase();


            const matches =
                websiteName.includes(search) ||
                domain.includes(search);


            if (matches) {

                card.style.display = "";
                results++;

            } else {

                card.style.display = "none";

            }

        });


        if (noWebsitesFound) {

            noWebsitesFound.style.display =
                results === 0
                    ? "block"
                    : "none";

        }

    });

}


/* =========================================================
   OPEN CHAT
========================================================= */

function openChat() {

    if (!chatWindow) return;

    chatWindow.classList.add("open");


    if (chatLauncher) {

        chatLauncher.classList.add("hidden");

    }


    const notification =
        document.querySelector(
            ".chat-notification"
        );


    if (notification) {

        notification.style.display =
            "none";

    }


    setTimeout(() => {

        if (chatInput) {

            chatInput.focus();

        }

    }, 200);


    scrollChat();

}


/* =========================================================
   CLOSE CHAT
========================================================= */

function closeChatWindow() {

    if (!chatWindow) return;

    chatWindow.classList.remove("open");


    if (chatLauncher) {

        chatLauncher.classList.remove("hidden");

    }

}


/* =========================================================
   CHAT EVENTS
========================================================= */

if (chatLauncher) {

    chatLauncher.addEventListener(
        "click",
        openChat
    );

}


if (sidebarChat) {

    sidebarChat.addEventListener(
        "click",
        openChat
    );

}


if (supportNav) {

    supportNav.addEventListener(
        "click",
        event => {

            event.preventDefault();

            openChat();

        }
    );

}


if (closeChat) {

    closeChat.addEventListener(
        "click",
        closeChatWindow
    );

}


/* =========================================================
   SEND MESSAGE
========================================================= */

function sendChatMessage() {

    if (!chatInput || !chatMessages) {
        return;
    }


    const message =
        chatInput.value.trim();


    if (!message) {
        return;
    }


    const wrapper =
        document.createElement("div");

    wrapper.className =
        "message client-message";


    const content =
        document.createElement("div");


    const bubble =
        document.createElement("div");

    bubble.className =
        "message-bubble";

    bubble.textContent =
        message;


    const time =
        document.createElement("small");

    time.textContent =
        getCurrentTime() + " ✓";


    content.appendChild(bubble);
    content.appendChild(time);

    wrapper.appendChild(content);

    chatMessages.appendChild(wrapper);


    chatInput.value = "";
    chatInput.style.height = "auto";


    scrollChat();


    /* DEMO RESPONSE */

    setTimeout(() => {

        addSupportMessage(
            "Thanks! We received your message. A Nexora team member will get back to you shortly."
        );

    }, 900);

}


/* =========================================================
   SUPPORT MESSAGE
========================================================= */

function addSupportMessage(message) {

    const wrapper =
        document.createElement("div");

    wrapper.className =
        "message support-message";


    const avatar =
        document.createElement("div");

    avatar.className =
        "message-avatar";

    avatar.textContent =
        "N";


    const content =
        document.createElement("div");


    const bubble =
        document.createElement("div");

    bubble.className =
        "message-bubble";

    bubble.textContent =
        message;


    const time =
        document.createElement("small");

    time.textContent =
        getCurrentTime();


    content.appendChild(bubble);
    content.appendChild(time);

    wrapper.appendChild(avatar);
    wrapper.appendChild(content);

    chatMessages.appendChild(wrapper);


    scrollChat();

}


/* =========================================================
   SEND BUTTON
========================================================= */

if (sendMessage) {

    sendMessage.addEventListener(
        "click",
        sendChatMessage
    );

}


/* =========================================================
   ENTER TO SEND
========================================================= */

if (chatInput) {

    chatInput.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Enter" &&
                !event.shiftKey
            ) {

                event.preventDefault();

                sendChatMessage();

            }

        }
    );


    /* AUTO RESIZE */

    chatInput.addEventListener(
        "input",
        () => {

            chatInput.style.height =
                "auto";

            chatInput.style.height =
                Math.min(
                    chatInput.scrollHeight,
                    110
                ) + "px";

        }
    );

}


/* =========================================================
   ATTACHMENTS
========================================================= */

if (attachmentButton) {

    attachmentButton.addEventListener(
        "click",
        () => {

            alert(
                "File attachments will be available when Nexora Support is connected."
            );

        }
    );

}


/* =========================================================
   TIME
========================================================= */

function getCurrentTime() {

    return new Date()
        .toLocaleTimeString(
            [],
            {
                hour: "numeric",
                minute: "2-digit"
            }
        );

}


/* =========================================================
   CHAT SCROLL
========================================================= */

function scrollChat() {

    if (!chatMessages) return;

    chatMessages.scrollTop =
        chatMessages.scrollHeight;

}


/* =========================================================
   ESCAPE
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            closeChatWindow();

        }

    }
);