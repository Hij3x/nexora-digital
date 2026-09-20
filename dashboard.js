/* =========================================
   NEXORA DASHBOARD
========================================= */

const chatLauncher =
    document.getElementById("chatLauncher");

const chatWindow =
    document.getElementById("chatWindow");

const closeChat =
    document.getElementById("closeChat");

const sidebarChat =
    document.getElementById("sidebarChat");

const quickChat =
    document.getElementById("quickChat");

const supportNav =
    document.getElementById("supportNav");

const sendMessage =
    document.getElementById("sendMessage");

const chatInput =
    document.getElementById("chatInput");

const chatMessages =
    document.getElementById("chatMessages");


/* =========================================
   OPEN CHAT
========================================= */

function openChat() {

    chatWindow.classList.add("open");

    chatLauncher.classList.add("hidden");

    chatInput.focus();

}


function closeChatWindow() {

    chatWindow.classList.remove("open");

    chatLauncher.classList.remove("hidden");

}


chatLauncher.addEventListener(
    "click",
    openChat
);


closeChat.addEventListener(
    "click",
    closeChatWindow
);


if (sidebarChat) {

    sidebarChat.addEventListener(
        "click",
        openChat
    );

}


if (quickChat) {

    quickChat.addEventListener(
        "click",
        openChat
    );

}


if (supportNav) {

    supportNav.addEventListener(
        "click",
        (event) => {

            event.preventDefault();

            openChat();

        }
    );

}


/* =========================================
   SEND CHAT MESSAGE
========================================= */

function sendChatMessage() {

    const message =
        chatInput.value.trim();


    if (!message) {
        return;
    }


    const wrapper =
        document.createElement("div");


    wrapper.className =
        "message client-message";


    const messageContent =
        document.createElement("div");


    const bubble =
        document.createElement("div");


    bubble.className =
        "message-bubble";


    bubble.textContent =
        message;


    const timestamp =
        document.createElement("small");


    const currentTime =
        new Date().toLocaleTimeString(
            [],
            {
                hour: "numeric",
                minute: "2-digit"
            }
        );


    timestamp.textContent =
        `${currentTime} ✓`;


    messageContent.appendChild(
        bubble
    );


    messageContent.appendChild(
        timestamp
    );


    wrapper.appendChild(
        messageContent
    );


    chatMessages.appendChild(
        wrapper
    );


    chatInput.value = "";


    chatMessages.scrollTop =
        chatMessages.scrollHeight;


    /*
       DEMO AUTO RESPONSE

       We'll REMOVE this when Supabase
       realtime chat is connected.
    */

    setTimeout(
        () => {

            addSupportMessage(
                "Thanks! We received your message. A Nexora team member will get back to you shortly."
            );

        },
        1000
    );

}


/* =========================================
   SUPPORT RESPONSE
========================================= */

function addSupportMessage(text) {

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


    const messageContent =
        document.createElement("div");


    const bubble =
        document.createElement("div");


    bubble.className =
        "message-bubble";


    bubble.textContent =
        text;


    const timestamp =
        document.createElement("small");


    timestamp.textContent =
        new Date().toLocaleTimeString(
            [],
            {
                hour: "numeric",
                minute: "2-digit"
            }
        );


    messageContent.appendChild(
        bubble
    );


    messageContent.appendChild(
        timestamp
    );


    wrapper.appendChild(
        avatar
    );


    wrapper.appendChild(
        messageContent
    );


    chatMessages.appendChild(
        wrapper
    );


    chatMessages.scrollTop =
        chatMessages.scrollHeight;

}


/* =========================================
   SEND BUTTON
========================================= */

sendMessage.addEventListener(
    "click",
    sendChatMessage
);


/* =========================================
   ENTER TO SEND
========================================= */

chatInput.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {

            event.preventDefault();

            sendChatMessage();

        }

    }
);


/* =========================================
   AUTO RESIZE TEXTAREA
========================================= */

chatInput.addEventListener(
    "input",
    () => {

        chatInput.style.height =
            "auto";


        chatInput.style.height =
            Math.min(
                chatInput.scrollHeight,
                100
            ) + "px";

    }
);
