/* =========================================================
   NEXORA CLIENT WEBSITE DASHBOARD
   js/dashboard.js
========================================================= */


/* =========================================================
   WEBSITE DATA
   DEMO DATA FOR NOW
   Later this will come from Supabase.
========================================================= */

const website = {
    name: "John's Landscaping",
    domain: "johnslandscaping.ca",
    url: "https://johnslandscaping.ca",

    status: "ONLINE",

    uptime: "99.99%",
    response: "124ms",
    views: "8,421",
    visitors: "2,104",

    traffic7: "1,284",
    traffic30: "5,942",

    growth7: "↑ 12%",
    growth30: "↑ 18%",

    plan: "Nexora Hosting",
    price: "$14.99",
    nextPayment: "October 31, 2026",

    lastUpdated: "Updated 2 hours ago",

    chart7: [
        28,
        50,
        38,
        70,
        60,
        92,
        73
    ],

    chart30: [
        45,
        62,
        53,
        77,
        68,
        88,
        81
    ]
};


/* =========================================================
   ELEMENTS
========================================================= */

const websiteName =
    document.getElementById("websiteName");

const websiteStatus =
    document.getElementById("websiteStatus");

const mainWebsiteDomain =
    document.getElementById("mainWebsiteDomain");

const visitWebsite =
    document.getElementById("visitWebsite");


/* METRICS */

const uptimeValue =
    document.getElementById("uptimeValue");

const responseValue =
    document.getElementById("responseValue");

const viewsValue =
    document.getElementById("viewsValue");

const visitorsValue =
    document.getElementById("visitorsValue");


/* ANALYTICS */

const analyticsRange =
    document.getElementById("analyticsRange");

const trafficValue =
    document.getElementById("trafficValue");

const trafficGrowth =
    document.getElementById("trafficGrowth");

const chartBars =
    document.querySelectorAll(
        "#analyticsChart .chart-bar"
    );


/* BILLING */

const planName =
    document.getElementById("planName");

const planPrice =
    document.getElementById("planPrice");

const nextPayment =
    document.getElementById("nextPayment");


/* WEBSITE HEALTH */

const lastUpdated =
    document.getElementById("lastUpdated");


/* QUICK ACTIONS */

const requestChange =
    document.getElementById("requestChange");

const manageBilling =
    document.querySelector(".manage-billing");

const notificationButton =
    document.getElementById("notificationButton");


/* =========================================================
   LOAD WEBSITE DATA
========================================================= */

function loadWebsite() {

    if (websiteName) {
        websiteName.textContent =
            website.name;
    }


    if (websiteStatus) {

        websiteStatus.innerHTML =
            `<i></i> ${website.status}`;

    }


    if (mainWebsiteDomain) {

        mainWebsiteDomain.textContent =
            `${website.domain} ↗`;

        mainWebsiteDomain.href =
            website.url;

        mainWebsiteDomain.target =
            "_blank";

        mainWebsiteDomain.rel =
            "noopener noreferrer";

    }


    if (uptimeValue) {

        uptimeValue.textContent =
            website.uptime;

    }


    if (responseValue) {

        responseValue.textContent =
            website.response;

    }


    if (viewsValue) {

        viewsValue.textContent =
            website.views;

    }


    if (visitorsValue) {

        visitorsValue.textContent =
            website.visitors;

    }


    if (planName) {

        planName.textContent =
            website.plan;

    }


    if (planPrice) {

        planPrice.textContent =
            website.price;

    }


    if (nextPayment) {

        nextPayment.textContent =
            website.nextPayment;

    }


    if (lastUpdated) {

        lastUpdated.textContent =
            website.lastUpdated;

    }


    updateAnalytics();

}


/* =========================================================
   VISIT WEBSITE
========================================================= */

if (visitWebsite) {

    visitWebsite.addEventListener(
        "click",
        () => {

            window.open(
                website.url,
                "_blank",
                "noopener,noreferrer"
            );

        }
    );

}


/* =========================================================
   ANALYTICS
========================================================= */

function updateAnalytics() {

    if (!analyticsRange) {
        return;
    }


    const range =
        analyticsRange.value;


    let traffic;
    let growth;
    let chart;


    if (range === "30") {

        traffic =
            website.traffic30;

        growth =
            website.growth30;

        chart =
            website.chart30;

    } else {

        traffic =
            website.traffic7;

        growth =
            website.growth7;

        chart =
            website.chart7;

    }


    if (trafficValue) {

        trafficValue.textContent =
            traffic;

    }


    if (trafficGrowth) {

        trafficGrowth.textContent =
            growth;

    }


    chartBars.forEach(
        (bar, index) => {

            if (
                chart[index] !== undefined
            ) {

                bar.style.height =
                    `${chart[index]}%`;

            }

        }
    );

}


if (analyticsRange) {

    analyticsRange.addEventListener(
        "change",
        updateAnalytics
    );

}


/* =========================================================
   REQUEST WEBSITE CHANGE
========================================================= */

if (requestChange) {

    requestChange.addEventListener(
        "click",
        () => {

            openChat();


            setTimeout(() => {

                if (!chatInput) {
                    return;
                }


                chatInput.value =
                    "Hi Nexora, I'd like to request a change to my website: ";


                resizeChatInput();


                chatInput.focus();

            }, 200);

        }
    );

}


/* =========================================================
   BILLING BUTTON
========================================================= */

if (manageBilling) {

    manageBilling.addEventListener(
        "click",
        () => {

            /*
             Later this will open the
             client's real billing portal.
            */

            alert(
                "Billing management will be connected to your payment system."
            );

        }
    );

}


/* =========================================================
   NOTIFICATIONS
========================================================= */

if (notificationButton) {

    notificationButton.addEventListener(
        "click",
        () => {

            alert(
                "You have no new notifications."
            );

        }
    );

}


/* =========================================================
   SUPPORT CHAT
========================================================= */

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

const quickChat =
    document.getElementById("quickChat");

const sendMessage =
    document.getElementById("sendMessage");

const chatInput =
    document.getElementById("chatInput");

const chatMessages =
    document.getElementById("chatMessages");

const attachmentButton =
    document.getElementById(
        "attachmentButton"
    );


/* =========================================================
   OPEN CHAT
========================================================= */

function openChat() {

    if (!chatWindow) {
        return;
    }


    chatWindow.classList.add("open");


    if (chatLauncher) {

        chatLauncher.classList.add(
            "hidden"
        );

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

    }, 150);


    scrollChat();

}


/* =========================================================
   CLOSE CHAT
========================================================= */

function closeChatWindow() {

    if (!chatWindow) {
        return;
    }


    chatWindow.classList.remove(
        "open"
    );


    if (chatLauncher) {

        chatLauncher.classList.remove(
            "hidden"
        );

    }

}


/* CHAT OPEN BUTTONS */

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


if (quickChat) {

    quickChat.addEventListener(
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
   SEND CHAT MESSAGE
========================================================= */

function sendChatMessage() {

    if (
        !chatInput ||
        !chatMessages
    ) {

        return;

    }


    const message =
        chatInput.value.trim();


    if (!message) {

        return;

    }


    /* CLIENT MESSAGE */

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

    /*
       textContent prevents the user
       from injecting HTML into chat.
    */

    bubble.textContent =
        message;


    const time =
        document.createElement("small");

    time.textContent =
        `${getCurrentTime()} ✓`;


    content.appendChild(bubble);
    content.appendChild(time);

    wrapper.appendChild(content);

    chatMessages.appendChild(wrapper);


    /* CLEAR */

    chatInput.value = "";

    chatInput.style.height =
        "auto";


    scrollChat();


    /* DEMO SUPPORT RESPONSE */

    showTypingIndicator();


    setTimeout(() => {

        removeTypingIndicator();


        addSupportMessage(
            "Thanks! We received your message. A Nexora team member will get back to you shortly."
        );

    }, 1200);

}


/* =========================================================
   SUPPORT MESSAGE
========================================================= */

function addSupportMessage(message) {

    if (!chatMessages) {
        return;
    }


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
   TYPING INDICATOR
========================================================= */

function showTypingIndicator() {

    if (!chatMessages) {
        return;
    }


    removeTypingIndicator();


    const typing =
        document.createElement("div");

    typing.className =
        "message support-message typing-message";

    typing.id =
        "typingIndicator";


    const avatar =
        document.createElement("div");

    avatar.className =
        "message-avatar";

    avatar.textContent =
        "N";


    const bubble =
        document.createElement("div");

    bubble.className =
        "message-bubble typing-bubble";


    bubble.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;


    typing.appendChild(avatar);
    typing.appendChild(bubble);

    chatMessages.appendChild(typing);


    scrollChat();

}


function removeTypingIndicator() {

    const typing =
        document.getElementById(
            "typingIndicator"
        );


    if (typing) {

        typing.remove();

    }

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


    chatInput.addEventListener(
        "input",
        resizeChatInput
    );

}


/* =========================================================
   CHAT INPUT RESIZE
========================================================= */

function resizeChatInput() {

    if (!chatInput) {
        return;
    }


    chatInput.style.height =
        "auto";


    chatInput.style.height =
        Math.min(
            chatInput.scrollHeight,
            110
        ) + "px";

}


/* =========================================================
   ATTACHMENT
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
   CURRENT TIME
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
   SCROLL CHAT
========================================================= */

function scrollChat() {

    if (!chatMessages) {
        return;
    }


    chatMessages.scrollTop =
        chatMessages.scrollHeight;

}


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            closeChatWindow();

        }

    }
);


/* =========================================================
   START DASHBOARD
========================================================= */

loadWebsite();