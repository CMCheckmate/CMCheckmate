// Constants
// Document elements
const TITLE_BLOCK = document.getElementById("title");
const CONTENT_BLOCK = document.getElementById("content");
const NAME_BLOCKS = document.getElementsByClassName("name");
const INFO_BLOCKS = document.getElementsByClassName("info");
const SUS = document.getElementById("sus");

// Animation positions
// Display
const TITLE_TIME = 15 * 1000;
const INFO_SCROLL = 0.1;  // Fraction of viewport height
const BACKGROUND = {
    "scroll": CONTENT_BLOCK.offsetHeight / 25,  // Height in px
    "size": [1, 0.75],  // Fraction of maximum dimension for landscape and portrait orientations
    "offset": [1, 0.5],  // Offset from left and top in percentage of dimension
    "positions": [{  // Landscape vs portrait animation positions
        1: [[Infinity, 0], [Infinity, 0], [Infinity, 0], [Infinity, 0], [Infinity, 0], [Infinity, 0], [Infinity, 0], 
        [Infinity, 0], [Infinity, 0], [0, 0]], 
        2: [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]], 
        3: [[0, 0], [-16, -2.5], [-16, -2.5], [0, -5.5], [0, -5.5], [0, -5.5], [0, -5.5], [0, -5.5], [-16, -2.5], [-16, -2.5]], 
        4: [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]], 
        5: [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [6, -3], [10.5, -5.5], [10.5, -5.5], [10.5, -5.5]], 
        6: [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, -27], [0, -27], [0, -Infinity], [0, -Infinity], [0, -Infinity]], 
        7: [[0, 0], [0, 0], [-5.5, 2.5], [-5.5, 2.5], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]], 
        8: [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]
    }, {
        1: [[Infinity, 0], [Infinity, 0], [Infinity, 0], [Infinity, 0], [Infinity, 0], [Infinity, 0], [Infinity, 0], 
        [Infinity, 0], [Infinity, 0], [0, 0]], 
        2: [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]], 
        3: [[0, 0], [-12, -2], [-12, -2], [0, -4], [0, -4], [0, -4], [0, -4], [0, -4], [-12, -2], [-12, -2]], 
        4: [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]], 
        5: [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [6, -3], [8, -4], [8, -4], [8, -4]], 
        6: [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, -20], [0, -20], [0, -Infinity], [0, -Infinity], [0, -Infinity]], 
        7: [[0, 0], [0, 0], [-4, 2], [-4, 2], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]], 
        8: [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]
    }]
}

// Variables
var backgroundSettings = {
    "unit": "vw",
    "offset": [
        BACKGROUND["offset"][0] * (window.innerWidth - (window.innerHeight * BACKGROUND["size"][0])), 
        window.innerHeight * (1 - BACKGROUND["size"][0])
    ],
    "positions": BACKGROUND["positions"][0],
}

// Functions
function toggleAnimation(element, name, duration) {
    // Initialise and prevent reanimation
    element.style.animation = "none";
    element.offsetHeight;
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
        if (window.scrollY + window.innerHeight * INFO_SCROLL > height || window.scrollY + window.innerHeight >= document.body.offsetHeight) {
            if ((section.style.animationDirection == "reverse" || section.style.animationName == "")) {
                section.style.animation = "none";
                section.offsetHeight;
                section.style.animation = "SlideIn 0.5s";
                section.style.transform = "translateX(0)";
            }
        // Information block out of view
        } else if (section.style.animationDirection != "reverse" && section.style.animationName != "") {
            section.style.animation = "none";
            section.offsetHeight;
            section.style.animation = "SlideIn 0.5s reverse";
            section.style.transform = "translateX(-110%)";
        } else if (section.style.transform != "translateX(-110%)") {
            section.style.transform = "translate(-110%)";
        }
        height += section.offsetHeight;
    }

    // Display background animation
    // Calculate animation stage
    let moveSection = (CONTENT_BLOCK.offsetHeight - window.innerHeight - BACKGROUND["scroll"]) / (backgroundSettings["positions"][1].length - 1);
    let move = Math.ceil((window.scrollY - TITLE_BLOCK.offsetHeight - BACKGROUND["scroll"]) / moveSection);
    let moveAmount = 0;
    if (move <= 0) {
        move = 1;
    } else if (move > backgroundSettings["positions"][1].length - 1) {
        move = backgroundSettings["positions"][1].length;
    } else {
        moveAmount = ((window.scrollY - TITLE_BLOCK.offsetHeight - BACKGROUND["scroll"]) % moveSection) / moveSection;
    }
    // Calculate piece positions
    var newPosition = [];
    for (let piece in backgroundSettings["positions"]) {
        currentMove = backgroundSettings["positions"][piece][Math.min(move, backgroundSettings["positions"][1].length - 1)];
        oldMove = backgroundSettings["positions"][piece][move - 1];
        newPosition.push(
            `calc(${oldMove[0] + (currentMove[0] - oldMove[0]) * moveAmount}${backgroundSettings["unit"]} + ${backgroundSettings["offset"][0]}px) 
            calc(${oldMove[1] + (currentMove[1] - oldMove[1]) * moveAmount}${backgroundSettings["unit"]} + ${backgroundSettings["offset"][1]}px)`);
    }
    // Update position
    backgroundPosition = newPosition.join(", ")
    if (CONTENT_BLOCK.style.backgroundPosition != backgroundPosition) {
        CONTENT_BLOCK.style.backgroundPosition = backgroundPosition;
    }
}

function updateSettings() {
    // Update background for portrait vs landscape page orientation
    if (window.innerHeight * BACKGROUND["size"][0] > window.innerWidth * BACKGROUND["size"][1]) {
        backgroundSettings["unit"] = "vw";
        backgroundSettings["offset"] = [
            (window.innerWidth * (1 - BACKGROUND["size"][1])), 
            BACKGROUND["offset"][1] * (window.innerHeight - (window.innerWidth * BACKGROUND["size"][1]))
        ];
        backgroundSettings["positions"] = BACKGROUND["positions"][1];
        CONTENT_BLOCK.style.backgroundSize = `${BACKGROUND["size"][1] * 100}vw ${BACKGROUND["size"][1] * 100}vw`;
    } else {
        backgroundSettings["unit"] = "vh";
        backgroundSettings["offset"] = [
            BACKGROUND["offset"][0] * (window.innerWidth - (window.innerHeight * BACKGROUND["size"][0])), 
            window.innerHeight * (1 - BACKGROUND["size"][0])
        ];
        backgroundSettings["positions"] = BACKGROUND["positions"][0];
        CONTENT_BLOCK.style.backgroundSize = `${BACKGROUND["size"][0] * 100}vh ${BACKGROUND["size"][0] * 100}vh`;
    }
    // Update amount for infinite movement
    for (let piece in backgroundSettings["positions"]) {
        for (let positionIndex = 0; positionIndex < backgroundSettings["positions"][piece].length; positionIndex++) {
            for (let direction = 0; direction < backgroundSettings["positions"][piece][positionIndex].length; direction++) {
                if (Math.abs(backgroundSettings["positions"][piece][positionIndex][direction]) == Infinity) {
                    if (backgroundSettings["unit"] == "vw") {
                        backgroundSettings["positions"][piece][positionIndex][direction] = 
                        Math.sign(backgroundSettings["positions"][piece][positionIndex][direction]) * 
                        (window.innerHeight * BACKGROUND["size"][0]) / (window.innerWidth * BACKGROUND["size"][1]) * 100;
                    } else {
                        backgroundSettings["positions"][piece][positionIndex][direction] = 
                        Math.sign(backgroundSettings["positions"][piece][positionIndex][direction]) * 
                        (window.innerWidth * BACKGROUND["size"][1]) / (window.innerHeight * BACKGROUND["size"][0]) * 100;
                    }
                }
            }
        }
    }
    // Update background sections
    toggleSections();
}

// Events
window.addEventListener("resize", updateSettings);
window.addEventListener("scroll", toggleSections);
window.onload = updateSettings;
setInterval(toggleName, TITLE_TIME);