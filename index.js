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
const MOVE_POSITIONS = [
    "30vw 0, 0, 0, 0, 0, 0, 0, 0",
    "30vw 0, 0, -17vw -4vh, 0, 0, 0, 0, 0",
    "30vw 0, 0, -17vw -4vh, 0, 0, 0, -6vw 3vh, 0", 
    "30vw 0, 0, 0vw -8vh, 0, 0, 0, -6vw 3vh, 0", 
    "30vw 0, 0, 0vw -8vh, 0, 0, 0, 0, 0", 
    "30vw 0, 0, 0vw -8vh, 0, 0, 0vw -40vh, 0, 0", 
    "30vw 0, 0, 0vw -8vh, 0, 11vw -8vh, 0 -80vh, 0, 0", 
    "30vw 0, 0, -17vw -4vh, 0, 11vw -8vh, 0 -80vh, 0, 0", 
    "0, 0, -17vw -4vh, 0, 11vw -8vh, 0 -80vh, 0, 0"
];
for (let pos = 0; pos < MOVE_POSITIONS.length; pos++) {
    ROOT.style.setProperty(`--Move${pos}`, MOVE_POSITIONS[pos]);
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
                section.style.animation = "SlideIn 2s";
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

    // Toggle background animations
    // Calculate background iteration
    var move = Math.max(0, Math.ceil((window.scrollY - TITLE_BLOCK.offsetHeight) / 
    ((CONTENT_BLOCK.offsetHeight - window.innerHeight) / (MOVE_POSITIONS.length))));
    
    // Reverse background iteration animation
    if (CONTENT_BLOCK.style.animationName == `Move${move + 1}`) {
        if (CONTENT_BLOCK.style.animationDirection != "reverse") {
            CONTENT_BLOCK.style.animation = 'none';
            CONTENT_BLOCK.offsetHeight;
            CONTENT_BLOCK.style.animation = `Move${move + 1} 1s reverse`;
            CONTENT_BLOCK.style.backgroundPosition = MOVE_POSITIONS[move];
        }
    // Play background iteration animation
    } else if (CONTENT_BLOCK.style.animationName != `Move${move}` || CONTENT_BLOCK.style.animationDirection == "reverse") {
        CONTENT_BLOCK.style.animation = 'none';
        CONTENT_BLOCK.offsetHeight;
        CONTENT_BLOCK.style.animation = `Move${move} 1s`;
        CONTENT_BLOCK.style.backgroundPosition = MOVE_POSITIONS[move];
    }
}

// Events
window.addEventListener("scroll", toggleSections);
window.onload = toggleSections;
setInterval(toggleName, TITLE_TIME);