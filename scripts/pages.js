"Use Strict";

// HOW TO ADD A SESSION
//   1. update session and chapter counts
//   2. input the session range for the new session
//   3. add the session's title, and the chapter titles
//   4. add each chapter's content in recaptest.html



// CONTENT
const session_titles = [
    "Here We Are",
    "The Wolves of Arcohaem",
    "Just Like the Simulations",
    "For the Republic!",
    "Enemy of My Enemy",
    "Friend of My Friend"
];
const session_ranges = [
    [0, 0],
    [1, 3],
    [4, 8],
    [9, 11],
    [12, 15],
    [16, 18]
];
const chapter_titles = [
    "Welcome to Arcohaem",
    "In Medias Res",
    "Long Live the Republic",
    "Your Mission",
    "Ammalor",
    "Freyrhage",
    "Borderlands",
    "Me? I'm Nobody",
    "Nocturne",
    "Rain Fire!",
    "Shoreline Siege",
    "We Go Way Back",
    "Now That's a Famous Hat",
    "Mr. White? He's the Devil",
    "Stranger Danger",
    "Roots",
    "Change of Plans!",
    "The Basilisk's Pass",
    "Does He Know?"
];



// VARIABLES
const session_count = 5;
const chapter_count = 18;

var current_chapter = 0; 
var current_session = 0;

const chapter_display = document.getElementById("chapter_display");
const prev_button = document.getElementById("prev");
const next_button = document.getElementById("next");


// FUNCTIONS
prev_button.addEventListener('click', () => { prev(); });
next_button.addEventListener('click', () => { next(); });

document.addEventListener("DOMContentLoaded", () => {
    update_current_session();
    update_chapter_display();
});
function prev(){
    current_chapter -= 1;
    if (current_chapter < 0) current_chapter = 0;
    update_current_session();
    update_chapter_display();
}
function next(){
    current_chapter += 1;
    if (current_chapter > chapter_count) current_chapter = chapter_count;
    update_current_session();
    update_chapter_display();
}
function update_current_session(){
    for (let i = 0; i <= session_count; i++){
        const session_range = session_ranges[i];
        const first_chapter = session_range[0]
        const last_chapter = session_range[1];
        if (current_chapter >= first_chapter & current_chapter <= last_chapter){
            current_session = i;
            break;
        }
    }
}
function update_chapter_display(){
    chapter_display.innerHTML = "";

    const session_header = document.createElement('h1');
    const chapter_header = document.createElement('h3');
    const chapter_content = document.createElement('div');

    session_header.textContent = "SESSION " + (current_session) + ": " + session_titles[current_session]; 
    chapter_header.textContent = "CHAPTER " + (current_chapter) + ": " + chapter_titles[current_chapter];

    const chapter_id = "ch" + current_chapter;
    console.log(chapter_id);
    chapter_content.innerHTML = document.getElementById(chapter_id).innerHTML;

    chapter_display.appendChild(session_header);
    chapter_display.appendChild(chapter_header);
    chapter_display.appendChild(chapter_content);

}