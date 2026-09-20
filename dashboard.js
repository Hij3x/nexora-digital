/* =========================================================
   NEXORA CLIENT DASHBOARD
   dashboard.js

   FRONT-END DEMO VERSION

   Later:
   - Website data -> Supabase
   - Authentication -> Supabase Auth
   - Live chat -> Supabase Realtime
   - Billing -> Square
   - Analytics -> Real analytics provider
   - Uptime -> Monitoring API
========================================================= */


/* =========================================================
   WEBSITE DATA
========================================================= */

const websites = {

    landscaping: {

        name: "John's Landscaping",
        shortName: "JL",

        domain: "johnslandscaping.ca",

        url: "https://johnslandscaping.ca",

        category: "PROFESSIONAL LANDSCAPING",

        heading:
            "Beautiful Lawns. Stronger Communities.",

        uptime: "99.99%",

        response: "124ms",

        views: "8,421",

        visitors: "2,104",

        traffic7: "1,284",

        traffic30: "5,942",

        growth7: "+12%",

        growth30: "+18%",

        plan: "Nexora Business",

        price: "$29.99",

        nextPayment:
            "October 20, 2026",

        status: "ONLINE",

        lastUpdated:
            "2 hours ago",

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

    },


    construction: {

        name: "John's Construction",
        shortName: "JC",

        domain: "johnsconstruction.ca",

        url: "https://johnsconstruction.ca",

        category:
            "RESIDENTIAL & COMMERCIAL CONSTRUCTION",

        heading:
            "Building Better. Building Together.",

        uptime: "99.97%",

        response: "148ms",

        views: "4,892",

        visitors: "1,347",

        traffic7: "824",

        traffic30: "3,781",

        growth7: "+8%",

        growth30: "+14%",

        plan: "Nexora Business",

        price: "$29.99",

        nextPayment:
            "October 28, 2026",

        status: "ONLINE",

        lastUpdated:
            "5 hours ago",

        chart7: [
            20,
            38,
            55,
            43,
            65,
            80,
            62
        ],

        chart30: [
            36,
            48,
            61,
            58,
            74,
            82,
            69
        ]

    }

};



/* =========================================================
   CURRENT WEBSITE
========================================================= */

let currentWebsiteID =
    "landscaping";



/* =========================================================
   HELPER
========================================================= */

function getElement(id) {

    return document.getElementById(id);

}



/* =========================================================
   WEBSITE SELECTOR ELEMENTS
========================================================= */

const websiteSelector =
    getElement("websiteSelector");

const websiteDropdown =
    getElement("websiteDropdown");

const websiteOptions =
    document.querySelectorAll(
        ".website-option"
    );

const selectedWebsiteName =
    getElement("selectedWebsiteName");

const selectedWebsiteDomain =
    getElement("selectedWebsiteDomain");



/* =========================================================
   DASHBOARD ELEMENTS
========================================================= */

const mainWebsiteDomain =
    getElement("mainWebsiteDomain");

const previewBusinessName =
    getElement("previewBusinessName");

const previewHeading =
    getElement("previewHeading");

const uptimeValue =
    getElement("uptimeValue");

const responseValue =
    getElement("responseValue");

const viewsValue =
    getElement("viewsValue");

const visitorsValue =
    getElement("visitorsValue");

const trafficValue =
    getElement("trafficValue");

const planName =
    getElement("planName");

const planPrice =
    getElement("planPrice");

const nextPayment =
    getElement("nextPayment");

const websiteStatus =
    getElement("websiteStatus");

const analyticsRange =
    getElement("analyticsRange");

const visitSiteButton =
    document.querySelector(
        ".visit-site"
    );



/* =========================================================
   WEBSITE SELECTOR
========================================================= */

if (
    websiteSelector &&
    websiteDropdown
) {

    websiteSelector.addEventListener(
        "click",
        (event) => {

            event.stopPropagation();

            websiteDropdown.classList.toggle(
                "open"
            );

            websiteSelector.classList.toggle(
                "active"
            );

        }
    );

}



/* =========================================================
   WEBSITE OPTION CLICK
========================================================= */

websiteOptions.forEach(
    option => {

        option.addEventListener(
            "click",
            () => {

                const websiteID =
                    option.dataset.site;


                if (!websites[websiteID]) {
                    return;
                }


                currentWebsiteID =
                    websiteID;


                updateDashboard(
                    websiteID
                );


                /* ACTIVE OPTION */

                websiteOptions.forEach(
                    item => {

                        item.classList.remove(
                            "active"
                        );


                        const check =
                            item.querySelector(
                                "i"
                            );


                        if (check) {

                            check.textContent =
                                "";

                        }

                    }
                );


                option.classList.add(
                    "active"
                );


                const selectedCheck =
                    option.querySelector(
                        "i"
                    );


                if (selectedCheck) {

                    selectedCheck.textContent =
                        "✓";

                }


                websiteDropdown.classList.remove(
                    "open"
                );


                websiteSelector.classList.remove(
                    "active"
                );

            }
        );

    }
);



/* =========================================================
   CLOSE WEBSITE DROPDOWN
========================================================= */

document.addEventListener(
    "click",
    (event) => {

        if (
            !event.target.closest(
                ".website-selector"
            )
        ) {

            if (websiteDropdown) {

                websiteDropdown.classList.remove(
                    "open"
                );

            }


            if (websiteSelector) {

                websiteSelector.classList.remove(
                    "active"
                );

            }

        }

    }
);



/* =========================================================
   UPDATE ENTIRE DASHBOARD
========================================================= */

function updateDashboard(
    websiteID
) {

    const website =
        websites[websiteID];


    if (!website) {
        return;
    }


    /* WEBSITE SELECTOR */

    if (selectedWebsiteName) {

        selectedWebsiteName.textContent =
            website.name;

    }


    if (selectedWebsiteDomain) {

        selectedWebsiteDomain.textContent =
            website.domain;

    }



    /* SELECTOR ICON */

    const selectorIcon =
        document.querySelector(
            ".selector-site-icon"
        );


    if (selectorIcon) {

        selectorIcon.textContent =
            website.shortName;

    }



    /* WEBSITE PREVIEW */

    if (previewBusinessName) {

        previewBusinessName.textContent =
            website.name;

    }


    if (previewHeading) {

        previewHeading.textContent =
            website.heading;

    }



    const previewCategory =
        document.querySelector(
            ".preview-content small"
        );


    if (previewCategory) {

        previewCategory.textContent =
            website.category;

    }



    /* DOMAIN */

    if (mainWebsiteDomain) {

        mainWebsiteDomain.innerHTML =
            `${website.domain} <span>↗</span>`;

    }



    /* WEBSITE STATUS */

    if (websiteStatus) {

        websiteStatus.innerHTML =
            `<i></i>${website.status}`;

    }



    /* METRICS */

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



    /* BILLING */

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



    /* ANALYTICS */

    updateAnalytics();



    /* WEBSITE HEALTH */

    updateWebsiteHealth(
        website
    );



    /* VISUAL EFFECT */

    animateDashboardUpdate();

}



/* =========================================================
   ANALYTICS
========================================================= */

function updateAnalytics() {

    const website =
        websites[currentWebsiteID];


    if (!website) {
        return;
    }


    let chartData;

    let traffic;

    let growth;


    if (
        analyticsRange &&
        analyticsRange.value ===
        "Last 30 Days"
    ) {

        chartData =
            website.chart30;

        traffic =
            website.traffic30;

        growth =
            website.growth30;

    }

    else {

        chartData =
            website.chart7;

        traffic =
            website.traffic7;

        growth =
            website.growth7;

    }



    /* TOTAL */

    if (trafficValue) {

        trafficValue.textContent =
            traffic;

    }



    /* GROWTH */

    const growthElement =
        document.querySelector(
            ".analytics-total small"
        );


    if (growthElement) {

        growthElement.textContent =
            `↑ ${growth.replace("+", "")}`;

    }



    /* CHART */

    const bars =
        document.querySelectorAll(
            ".analytics-chart i"
        );


    bars.forEach(
        (bar, index) => {

            if (
                chartData[index] !==
                undefined
            ) {

                bar.style.height =
                    chartData[index] + "%";

            }

        }
    );

}



/* =========================================================
   ANALYTICS RANGE
========================================================= */

if (analyticsRange) {

    analyticsRange.addEventListener(
        "change",
        updateAnalytics
    );

}



/* =========================================================
   WEBSITE HEALTH
========================================================= */

function updateWebsiteHealth(
    website
) {

    const healthRows =
        document.querySelectorAll(
            ".health-row"
        );


    healthRows.forEach(
        row => {

            const label =
                row.querySelector(
                    "span"
                );

            const value =
                row.querySelector(
                    "strong"
                );


            if (
                !label ||
                !value
            ) {

                return;

            }


            if (
                label.textContent
                    .trim() ===
                "Last Updated"
            ) {

                value.textContent =
                    website.lastUpdated;

            }

        }
    );

}



/* =========================================================
   WEBSITE VISIT BUTTON
========================================================= */

if (visitSiteButton) {

    visitSiteButton.addEventListener(
        "click",
        () => {

            const website =
                websites[
                    currentWebsiteID
                ];


            /*
             * Demo domains are placeholders.
             * Later this opens the real
             * client's website.
             */

            console.log(
                "Visit:",
                website.url
            );

        }
    );

}



/* =========================================================
   ADD WEBSITE BUTTON
========================================================= */

const addWebsiteButton =
    document.querySelector(
        ".add-website"
    );


if (addWebsiteButton) {

    addWebsiteButton.addEventListener(
        "click",
        () => {

            /*
             * Later this can open:
             *
             * - New website order
             * - Contact Nexora
             * - Upgrade page
             */

            alert(
                "Want another website? Contact Nexora and we'll get you started."
            );

        }
    );

}



/* =========================================================
   DASHBOARD UPDATE ANIMATION
========================================================= */

function animateDashboardUpdate() {

    const cards =
        document.querySelectorAll(
            ".main-website-card, .dash-card"
        );


    cards.forEach(
        card => {

            card.classList.remove(
                "dashboard-refresh"
            );


            void card.offsetWidth;


            card.classList.add(
                "dashboard-refresh"
            );

        }
    );

}



/* =========================================================
   LIVE CHAT ELEMENTS
========================================================= */

const chatLauncher =
    getElement("chatLauncher");

const chatWindow =
    getElement("chatWindow");

const closeChat =
    getElement("closeChat");

const sidebarChat =
    getElement("sidebarChat");

const quickChat =
    getElement("quickChat");

const supportNav =
    getElement("supportNav");

const sendMessage =
    getElement("sendMessage");

const chatInput =
    getElement("chatInput");

const chatMessages =
    getElement("chatMessages");

const attachmentButton =
    getElement("attachmentButton");



/* =========================================================
   OPEN CHAT
========================================================= */

function openChat() {

    if (!chatWindow) {
        return;
    }


    chatWindow.classList.add(
        "open"
    );


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


    setTimeout(
        () => {

            if (chatInput) {

                chatInput.focus();

            }

        },
        200
    );


    scrollChatToBottom();

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



/* =========================================================
   CHAT BUTTON EVENTS
========================================================= */

if (chatLauncher) {

    chatLauncher.addEventListener(
        "click",
        openChat
    );

}


if (closeChat) {

    closeChat.addEventListener(
        "click",
        closeChatWindow
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



/* =========================================================
   SEND CLIENT MESSAGE
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



    /* MESSAGE WRAPPER */

    const wrapper =
        document.createElement(
            "div"
        );


    wrapper.className =
        "message client-message";



    /* CONTENT */

    const content =
        document.createElement(
            "div"
        );



    /* BUBBLE */

    const bubble =
        document.createElement(
            "div"
        );


    bubble.className =
        "message-bubble";


    /*
     * textContent is intentional.
     *
     * It prevents a chat message
     * from injecting HTML.
     */

    bubble.textContent =
        message;



    /* TIME */

    const timestamp =
        document.createElement(
            "small"
        );


    timestamp.textContent =
        `${getCurrentTime()} ✓`;



    content.appendChild(
        bubble
    );


    content.appendChild(
        timestamp
    );


    wrapper.appendChild(
        content
    );


    chatMessages.appendChild(
        wrapper
    );



    /* CLEAR INPUT */

    chatInput.value =
        "";


    chatInput.style.height =
        "auto";


    scrollChatToBottom();



    /*
     * DEMO RESPONSE
     *
     * REMOVE THIS when we connect
     * Supabase Realtime.
     */

    showTypingIndicator();


    setTimeout(
        () => {

            removeTypingIndicator();


            addSupportMessage(
                "Thanks! We received your message. A Nexora team member will get back to you shortly."
            );

        },
        1200
    );

}



/* =========================================================
   SUPPORT MESSAGE
========================================================= */

function addSupportMessage(
    message
) {

    if (!chatMessages) {
        return;
    }


    const wrapper =
        document.createElement(
            "div"
        );


    wrapper.className =
        "message support-message";



    /* AVATAR */

    const avatar =
        document.createElement(
            "div"
        );


    avatar.className =
        "message-avatar";


    avatar.textContent =
        "N";



    /* CONTENT */

    const content =
        document.createElement(
            "div"
        );



    /* BUBBLE */

    const bubble =
        document.createElement(
            "div"
        );


    bubble.className =
        "message-bubble";


    bubble.textContent =
        message;



    /* TIME */

    const timestamp =
        document.createElement(
            "small"
        );


    timestamp.textContent =
        getCurrentTime();



    content.appendChild(
        bubble
    );


    content.appendChild(
        timestamp
    );


    wrapper.appendChild(
        avatar
    );


    wrapper.appendChild(
        content
    );


    chatMessages.appendChild(
        wrapper
    );


    scrollChatToBottom();

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
                event.key ===
                    "Enter" &&

                !event.shiftKey
            ) {

                event.preventDefault();

                sendChatMessage();

            }

        }
    );

}



/* =========================================================
   CHAT TEXTAREA AUTO RESIZE
========================================================= */

if (chatInput) {

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
   CURRENT TIME
========================================================= */

function getCurrentTime() {

    return new Date()
        .toLocaleTimeString(
            [],
            {

                hour:
                    "numeric",

                minute:
                    "2-digit"

            }
        );

}



/* =========================================================
   CHAT SCROLL
========================================================= */

function scrollChatToBottom() {

    if (!chatMessages) {
        return;
    }


    chatMessages.scrollTop =
        chatMessages.scrollHeight;

}



/* =========================================================
   TYPING INDICATOR
========================================================= */

function showTypingIndicator() {

    if (
        !chatMessages ||
        document.getElementById(
            "typingIndicator"
        )
    ) {

        return;

    }


    const wrapper =
        document.createElement(
            "div"
        );


    wrapper.className =
        "message support-message";


    wrapper.id =
        "typingIndicator";



    const avatar =
        document.createElement(
            "div"
        );


    avatar.className =
        "message-avatar";


    avatar.textContent =
        "N";



    const bubble =
        document.createElement(
            "div"
        );


    bubble.className =
        "message-bubble typing-bubble";


    bubble.innerHTML =
        `
        <span></span>
        <span></span>
        <span></span>
        `;



    wrapper.appendChild(
        avatar
    );


    wrapper.appendChild(
        bubble
    );


    chatMessages.appendChild(
        wrapper
    );


    scrollChatToBottom();

}



/* =========================================================
   REMOVE TYPING
========================================================= */

function removeTypingIndicator() {

    const typing =
        getElement(
            "typingIndicator"
        );


    if (typing) {

        typing.remove();

    }

}



/* =========================================================
   ATTACHMENT BUTTON
========================================================= */

if (attachmentButton) {

    attachmentButton.addEventListener(
        "click",
        () => {

            /*
             * File uploads will be connected
             * to Supabase Storage later.
             */

            alert(
                "File attachments are coming soon."
            );

        }
    );

}



/* =========================================================
   QUICK ACTION BUTTONS
========================================================= */

const quickActionButtons =
    document.querySelectorAll(
        ".quick-action-grid button"
    );


quickActionButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                /*
                 * Don't interfere with
                 * Contact Support because
                 * that already opens chat.
                 */

                if (
                    button.id ===
                    "quickChat"
                ) {

                    return;

                }


                const text =
                    button.innerText
                        .replace(
                            /\s+/g,
                            " "
                        )
                        .trim();


                console.log(
                    "Quick Action:",
                    text
                );

            }
        );

    }
);



/* =========================================================
   SIDEBAR NAVIGATION
========================================================= */

const sidebarLinks =
    document.querySelectorAll(
        ".sidebar-nav a"
    );


sidebarLinks.forEach(
    link => {

        link.addEventListener(
            "click",
            event => {

                /*
                 * Support opens the chat,
                 * so don't change the active
                 * page for that.
                 */

                if (
                    link.id ===
                    "supportNav"
                ) {

                    return;

                }


                event.preventDefault();


                sidebarLinks.forEach(
                    item => {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                link.classList.add(
                    "active"
                );

            }
        );

    }
);



/* =========================================================
   NOTIFICATION BUTTON
========================================================= */

const notificationButton =
    document.querySelector(
        ".notification-button"
    );


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
   KEYBOARD ESCAPE
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key ===
            "Escape"
        ) {

            /* CLOSE CHAT */

            if (
                chatWindow &&
                chatWindow.classList.contains(
                    "open"
                )
            ) {

                closeChatWindow();

            }


            /* CLOSE WEBSITE SELECTOR */

            if (websiteDropdown) {

                websiteDropdown.classList.remove(
                    "open"
                );

            }


            if (websiteSelector) {

                websiteSelector.classList.remove(
                    "active"
                );

            }

        }

    }
);



/* =========================================================
   MOBILE CHAT HEIGHT
========================================================= */

function updateMobileChatHeight() {

    if (!chatWindow) {
        return;
    }


    if (
        window.innerWidth <=
        600
    ) {

        chatWindow.style.setProperty(
            "--mobile-height",
            window.innerHeight +
            "px"
        );

    }

}


window.addEventListener(
    "resize",
    updateMobileChatHeight
);


updateMobileChatHeight();



/* =========================================================
   INITIALIZE DASHBOARD
========================================================= */

function initializeDashboard() {

    updateDashboard(
        currentWebsiteID
    );


    updateAnalytics();


    scrollChatToBottom();


    console.log(
        "Nexora Client Dashboard loaded."
    );

}


initializeDashboard();