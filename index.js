// Constants
const TITLE_TIME = 15 * 1000;
// Document elements
const ROOT = document.documentElement;
const TITLE_BLOCK = document.getElementById("title");
const CONTENT_BLOCK = document.getElementById("content");
const NAME_BLOCKS = document.getElementsByClassName("name");
const INFO_BLOCKS = document.getElementsByClassName("info");
const SUS = document.getElementById("sus");
// Animation positions
const MOVE_POSITIONS = {
    1: [[30, 0], [30, 0], [30, 0], [30, 0], [30, 0], [30, 0], [30, 0], [30, 0], [30, 0], [0, 0]], 
    2: [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]], 
    3: [[0, 0], [-17, -4], [-17, -4], [0, -8], [0, -8], [0, -8], [0, -8], [0, -8], [-17, -4], [-17, -4]], 
    4: [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]], 
    5: [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [6, -4], [11, -8], [11, -8], [11, -8]], 
    6: [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, -40], [0, -40], [0, -80], [0, -80], [0, -80]], 
    7: [[0, 0], [0, 0], [-6, 3], [-6, 3], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]], 
    8: [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]
}

// Functions
function toggleAnimation(element, name, duration) {
    // Initialise and prevent reanimation
    element.style.animation = `${name} ${duration / 1000}s`;
    element.style.pointerEvents = "none";

    // Reset after complete
    setTimeout(() => {
        element.style.animation = "none";
        element.style.pointerEvents = "all";
    }, duration);
}

function toggleName() {
    // Alternate displays
    if (NAME_BLOCKS[0].style.display == "none") {
        NAME_BLOCKS[0].style.display = "flex";
        NAME_BLOCKS[1].style.display = "none";
    } else {
        NAME_BLOCKS[0].style.display = "none";
        NAME_BLOCKS[1].style.display = "flex";
    }
    if (SUS.style.display == "none") {
        SUS.style.display = "block";
        SUS.style.top = `${Math.random() * 90}vh`;
        SUS.style.left = `${Math.random() * 90}vw`;
    } else {
        SUS.style.display = "none";
    }
}

function toggleSections() {
    // Toggle information block display animations
    var height = TITLE_BLOCK.offsetHeight;
    for (let section of INFO_BLOCKS) {
        // Information block in view
        if (window.scrollY + window.innerHeight * 0.25 > height) {
            if ((section.style.animationDirection == "reverse" || section.style.animationName == "")) {
                section.style.animation = 'none';
                section.offsetHeight;
                section.style.animation = "SlideIn 0.5s";
                section.style.transform = "translateX(0)";
            }
        // Information block out of view
        } else if (section.style.animationDirection != "reverse" && section.style.animationName != "") {
            section.style.animation = 'none';
            section.offsetHeight;
            section.style.animation = "SlideIn 0.5s reverse";
            section.style.transform = "translateX(-110%)";
        }

        height += section.offsetHeight;
    }

    if (window.scrollY > TITLE_BLOCK.offsetHeight) {
        let moveSection = (CONTENT_BLOCK.offsetHeight - window.innerHeight) / (MOVE_POSITIONS[1].length - 1);
        let move = Math.ceil((window.scrollY - TITLE_BLOCK.offsetHeight) / moveSection);
        let moveAmount = ((window.scrollY - TITLE_BLOCK.offsetHeight) % moveSection) / moveSection;

        var position = [];
        for (let piece in MOVE_POSITIONS) {
            position.push(
                `${MOVE_POSITIONS[piece][move - 1][0] + (MOVE_POSITIONS[piece][move][0] - MOVE_POSITIONS[piece][move - 1][0]) * moveAmount}vw 
                ${MOVE_POSITIONS[piece][move - 1][1] + (MOVE_POSITIONS[piece][move][1] - MOVE_POSITIONS[piece][move - 1][1]) * moveAmount}vh`);
        }

        CONTENT_BLOCK.style.backgroundPosition = position.join(", ");
    }
}

// Events
window.addEventListener("scroll", toggleSections);
window.onload = toggleSections;
setInterval(toggleName, TITLE_TIME);