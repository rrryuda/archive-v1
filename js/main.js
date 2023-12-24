// Update Korea Time
function updateKoreaTime() {
    const koreaTimeElement = document.getElementById("time");
    const now = new Date();
    const koreaTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Seoul" }));
    const hour = koreaTime.getHours();
    const period = hour >= 12 ? "PM" : "AM";

    const options = { hour: "numeric", minute: "numeric" };
    const formattedTime = koreaTime.toLocaleTimeString("en-US", options);
    koreaTimeElement.textContent = `Seoul, ${formattedTime}`;
}

// Update Activity
function updateActivity() {
    const activityElement = document.querySelector("#activity");
    const now = new Date();
    const dayOfWeek = now.getDay();
    const hour = now.getHours();
    let activityText = "";
    let emoji = "";

    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
        if (hour >= 0 && hour < 8) {
            activityText = "Sleeping well";
            emoji = "😴";
        } else if (hour >= 9 && hour < 10) {
            activityText = "Tea time";
            emoji = "🫖";
        } else if (hour >= 9 && hour < 18) {
            activityText = "Working hard";
            emoji = "🔥";
        } else if (hour >= 20 && hour < 21) {
            activityText = "Learning Jiu-Jitsu";
            emoji = "🥋";
        } else {
            activityText = "Private time";
            emoji = "😎";
        }
    } else if ((dayOfWeek === 2 || dayOfWeek === 4) && hour >= 20 && hour < 21) {
        activityText = "Walking with my dogs";
        emoji = "🐕";
    } else if (hour >= 12 && hour < 13) {
        activityText = "Lunch time";
        emoji = "🍔";
    } else if (hour >= 18 && hour < 19) {
        activityText = "Dinner time";
        emoji = "🥘";
    } else if (dayOfWeek === 6 || dayOfWeek === 0) {
        activityText = "Watching Netflix";
        emoji = "📺";
    } else {
        activityText = "Private time";
        emoji = "😎";
    }

    activityElement.innerHTML = `${emoji}  ${activityText}`;
}

// Update time and activity every 1 second
setInterval(function () {
    updateKoreaTime();
    updateActivity();

    // Check if all resources are loaded
    if (document.readyState === "complete") {
        // Remove loading class and add loaded class to body*/
        document.body.classList.remove("loading");
        document.body.classList.add("loaded");
    }
}, 1000);

// Image Popup
document.addEventListener("DOMContentLoaded", function () {
    if (window.innerWidth >= 1440) {
        const triggers = document.querySelectorAll(".trigger");

        triggers.forEach((trigger) => {
            const popupId = `#${trigger.id}Popup`;
            const popup = document.querySelector(popupId);

            trigger.addEventListener("mouseover", function () {
                popup.style.display = "block";
                updatePopupPosition(popup);
            });

            trigger.addEventListener("mouseout", function () {
                popup.style.display = "none";
            });

            document.addEventListener("mousemove", function (event) {
                if (trigger.matches(":hover")) {
                    updatePopupPosition(popup, event.clientX, event.clientY);
                }
            });
        });
    }
});

function updatePopupPosition(popup, x, y) {
    const mouseX = x || event.clientX;
    const mouseY = y || event.clientY;
    const triggerWidth = 20; // Adjust this value based on the trigger width

    popup.style.top = `${mouseY}px`;
    popup.style.left = `${mouseX + triggerWidth}px`;
}