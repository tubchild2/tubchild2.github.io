"use strict";

// PLAYER STRUCT
//      Name
//      Picture
//      Species
//      Class
//      Background
//      Overview
//      Goal
//      Theme/Playlist


const players = [
    [
        "(Robert) Tinkle Winkler I ",
        "../../media/Party/Tinkle Winkler pfp.jpg",
        "Human",
        "Paladin",
        "Soldier",
        "A goodhearted man with a mind for business. He was a valuable strategist before a sailing accident damaged his skull and gave him severe brain damage. The trauma forced him to develop comfortable delusions of grandeur, in which he's a rich philanthropic noble named Tinkle Winkler. Now, he's relatively unintelligent, but he still has the political skill needed to further his new goal: recover Winkler Nation, which was \"lost,\" and grow in power as a businessman and leader. He has been in the army for 7 years now. He hasn't been fully diagnosed by any doctors due to his insistence that he doesn't need a doctor. Even though he's not the same man he used to be, he's still a valued member of the team.",
        "Find / form his lost kingdom.",
        "https://open.spotify.com/playlist/6XSy29V7E8BgHBnlO6uAjn?si=36c18704abf741ee&pt=21682874ddf9d491af2bbfac5b0b9c8f"
    ],
    [
        "\"Old Man\" Olaf",
        "../../media/Party/Olaf pfp.png",
        "Halfling",
        "Rogue",
        "Criminal",
        "Olaf is a mixed bag. On one hand, he loves animals, simple games, and vodka martinis. On the other, he is a compulsive liar, kleptomaniac, and murderer, with an extensive and horrible criminal record dating back very far before his induction into the military. He was raised to be a monk in a monastery in Kessek, but he was kicked out for repeated counts of theft, assault, and for chasing and terrorizing an Irish (?) boy and his family. After decades as a vagrant and wanted man, he was given the choice of life in prison or conscription. He chose to join the military, and his success as a killer and spy earned him a spot on the Wolves of Arcohaem. Recently, his old age has prompted severe cognitive decline. He lacks almost all morals, and is obsessed with his goal of finding and befriending a sentient animal. Nobody knows for sure who he is or what he's done. We don't even know if his name is even Olaf. What we do know is that he's one of the most dangerous men in the Republic. ",
        "Steal from people, and find / train a sentient animal friend.",
        "https://open.spotify.com/playlist/12R7BnURKrBCVV0fI3mHE9?si=d4010a7cb2514143&pt=a55c60a4fbe4cee8381daf2d399f051e"
    ],
    [
        "Ostos \"Ron\" Bjornson",
        "../../media/Party/Ron Bjornson pfp.png",
        "Storm Goliath",
        "Cleric",
        "Noble",
        "Ron was raised by a blunt and practical family of Goliaths in Hathor. They instilled in Ron a deep desire to provide practical care for others, and to strive to maintain strong relationships with friends and family. When his brother was involved in a lumber accident, Ron developed his abilities as a cleric and prevented him from losing his arm. That began a long medical career, which ultimately led to him joining the Republic military to protect people and contribute to stopping the cruelty of the Frigoshians. He was placed into the Wolves of Arcohaem as their primary medic, and has developed a close friendship with them since. Ron has an insatiable appetite, and will eat anything and everything, with the sole exception of tomatoes. Over time in the military, his altruism has degraded a little; he'll hurt people if he has to, and he's developed a deep hatred for elves. If not for Ron, however, the Wolves likely would've died countless times by now. ",
        "Help people -> get money -> acquire food.",
        "https://open.spotify.com/playlist/6C7ENBaxqqyiNIDNbA9WBk?si=2da598542470480b&pt=a7e3e76a7e7bd7273b8ec0e34a5205c0"
    ],
    [
        "Iona Kunetzova",
        "../../media/Party/Iona pfp.png",
        "Human",
        "Vettilurgist Conduit",
        "Criminal",
        "Iona was abandoned, and grew up stealing food on the streets of SOMEWHERE. A year after the civil war began, when he was 15, he was caught and placed in government housing under the care of Kezlov. He named him, valued him, and introduced him to letter writing as a form of therapy. Iona knew that when he was 18, he would be conscripted as a punishment for his criminal record, which left a constant feeling of dread throughout his childhood. Once that day came, he said goodbye to Kezlov, and was taken to Hephaestus to begin his training. He developed Vettilurgic abilities, which made him uniquely adaptable to the arctic environment, and earned him a spot on the Wolves of Arcohaem. He didn't choose most things about his life, so he hates when things are out of control. He still writes letters to nobody to vent how he truly feels without confronting people about it. He's naturally shy, but he's since warmed up to the Wolves, especially to Lukas Havran, who are like family to him. ",
        "Fight so that everyone has the choice not to.",
        "https://open.spotify.com/playlist/5byqEklw4f4n0kW02hkTnl?si=7ddc1b249aec4bd1&pt=532c5a2d36c11bbb769b7d1a41209dbc"
    ],
    [
        "Lukas Havran",
        "../../media/Party/Lukas pfp.png",
        "Human",
        "Conduit",
        "Noble",
        "Lukas was raised in a high-status household. He doesn't like to talk about his childhood. He left home to prove himself in the military. He lied about his age, and during his first battle, his entire battalion was wiped out by the Wraith. He barely managed to escape. He took the dagger the Wraith wielded to kill his commander, and finally developed his ether abilities. Over the next 5 years, he learned to control his powers and became one of the strongest funnelers in his entire bloodline. Now 25 years old, he's a member of the Wolves of Arcohaem, especially Iona. He's arrogant over his success, but composed on the battlefield. He's extremely loyal to the Wolves. He wants to prove himself to everyone, but probably most of all to himself. ",
        "Prove his value beyond just his relation to his family, if not to anyone else, than to himself.",
        "https://open.spotify.com/playlist/4XGEIy2yRNIRRzcGEj6ox8?si=73538989a1b6429f&pt=db503374a4a7c5e64e7b8b83b8f8483a"
    ],
    [
        "Rorik Valgok",
        "../../media/Party/Rorik pfp.png",
        "Dwarf",
        "Scholar",
        "Sage",
        "Rorik was born in the mountains of Sindri. Early on, he developed a reputation as an ether user, and made a career of it. He married his beloved Elanor, and had a comfortable life... until the war started. The entire fortress was awakened by a thunderous mechanical call followed by blood-curdling screaming. Several Sindri nobles were killed in the attack, including Elanor. She was pierced through the stomach with something that must've been burning hotter than Sindri's greatest furnaces. The attack was blamed on Frigoshian spies, and from that day on, Rorik vowed to get his revenge. He joined the Republic military, and his calculated ferocity and years of experience as a funneler allowed him to quickly rise through the ranks. He then met Thoren Kragknull, and contributed to founding the Wolves of Arcohaem. He went missing a little under a year ago. Unfortunately, he was hit by a shell and blasted into a pit. A squadron of ambushing Frigoshian troops forced the Wolves to leave him behind, where he most likely died.",
        "Avenge Elanor at all costs.",
        "https://open.spotify.com/playlist/4cMLgBgfHCAVRqgiB35XIU?si=38e949c545f1475c&pt=e2ff0763c2c5037aa44aa086e738b88e"
    ]
];


var current_player = 0;

const pc_name = document.getElementById("fullname");
const pc_thumbnail = document.getElementById("thumbnail");
const pc_species = document.getElementById("species");
const pc_class = document.getElementById("pc_class");
const pc_background = document.getElementById("background");
const pc_overview = document.getElementById("overview");
const pc_goal = document.getElementById("goal");
const pc_theme = document.getElementById("theme");

const prev_button = document.getElementById("prev");
const next_button = document.getElementById("next");

prev_button.addEventListener('click', () => { prev(); });
next_button.addEventListener('click', () => { next(); });

function prev(){
    current_player -= 1;
    if (current_player < 0) current_player = 0;
    update_player_display();
}
function next(){
    current_player += 1;
    if (current_player > players.length - 1) current_player = players.length - 1;
    update_player_display();
}

function update_player_display(){
    var player = players[current_player];
    pc_name.textContent = player[0];
    pc_thumbnail.src = player[1];
    pc_species.textContent = player[2];
    pc_class.textContent = player[3];
    pc_background.textContent = player[4];
    pc_overview.textContent = player[5];
    pc_goal.textContent = player[6];
    pc_theme.href = player[7];
}

document.addEventListener("DOMContentLoaded", () => {
    update_player_display();
});