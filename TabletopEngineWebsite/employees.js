"use strict";
// I spent far too long on this. 
// This isn't even necessary but I've been working on this for like an hour and a half.


const name_prefixes = [
    "",
    "Sir",
    "Lord",
    "Knight",
    "King",
    "Darth",
    "Mr.",
    "Mrs.",
    "Ms.",
    "Rev.",
    "Lady",
    "Brother",
    "Sister",
    "Cousin",
    "Mother",
    "Father",
    "Professor",
    "Captain",
    "Colonel",
    "Dr.",
    "Saint",
    "Archduke",
    "Baron",
    "Count",
    "Countess",
    "Emperor",
    "Supreme",
    "Empress",
    "His Holiness",
    "Her Grace",
    "Almost",
    "Maybe",
    "Discount",
    "Judge"
]
const all_syllables = [
  "ing","er","a","ly","ed","i","es","re","tion","in","e","con","y","ter","ex","al",
  "de","com","o","di","en","an","ty","ry","u","ti","ri","be","per","to","pro","ac",
  "ad","ar","ers","ment","or","tions","ble","der","ma","na","si","un","at","dis",
  "ca","cal","man","ap","po","sion","vi","el","est","la","lar","pa","ture","for",
  "is","mer","pe","ra","so","ta","as","col","fi","ful","ger","low","ni","par",
  "son","tle","day","ny","pen","pre","tive","car","ci","mo","on","ous","pi","se",
  "ten","tor","ver","ber","can","dy","et","it","mu","no","ple","cu","fac","fer",
  "gen","ic","land","light","ob","of","pos","tain","den","ings","mag","ments",
  "set","some","sub","sur","ters","tu","af","au","cy","fa","im","li","lo","men",
  "min","mon","op","out","rec","ro","sen","side","tal","tic","ties","ward","age",
  "ba","but","cit","cle","co","cov","da","dif","ence","ern","eve","hap","ies",
  "ket","lec","main","mar","mis","my","nal","ness","ning","n't","nu","oc","pres",
  "sup","te","ted","tem","tin","tri","tro","up","va","ven","vis","am","bor","by",
  "cat","cent","ev","gan","gle","head","high","il","lu","me","nore","part","por",
  "read","rep","su","tend","ther","ton","try","um","uer","way","ate","bet","bles",
  "bod","cap","cial","cir","cor","coun","cus","dan","dle","ef","end","ent","ered",
  "fin","form","go","har","ish","lands","let","long","mat","meas","mem","mul",
  "ner","play","ples","ply","port","press","sat","sec","ser","south","sun","the",
  "ting","tra","tures","val","var","vid","wil","win","won","work","act","ag",
  "air","als","bat","bi","cate","cen","char","come","cul","ders","east","fect",
  "fish","fix","gi","grand","great","heav","ho","hunt","ion","its","jo","lat",
  "lead","lect","lent","less","lin","mal","mi","mil","moth","near","nel","net",
  "new","one","point","prac","ral","rect","ried","round","row","sa","sand",
  "self","sent","ship","sim","sions","sis","sons","stand","sug","tel","tom",
  "tors","tract","tray","us","vel","west","where","writ",
];
// Credit to Aaron Snoswell on Github for syllable list
// https://gist.github.com/aaronsnoswell/41fb311d85f3130e690d559b2df2d1be
const name_suffixes = [
    "",
    "I",
    "II",
    "III",
    "IV",
    "V",
    "Jr.",
    "Sr.",
    "PhD",
    "MD",
    "Esq.",
    "Esquire",
    "The Lesser",
    "The Blind",
    "Emeritus",
    "Visiting",
    "v2",
    "(the dead version)",
    "The Great",
    "The Mighty",
    "The Terrible",
    "The Vile",
    "The Horrible",
    "The Drunk",
    "The Rich",
    "The Cool"
]


const position_prefixes = [
    "", "General", "Regional", "National", 
    "International", "Global", "Junior",
    "Mid-Level", "Senior", "Lead", "Principal",
    "Ancient", "Acting", "Shadow", "Evil",
    "Good", "Holy", "Accursed", "Forbidden",
    "Forgotten", "Blessed", "Cursed", "Alpha",
    "Beta", "Gamma", "Sigma", "Omega"
]
const positions = [
    "CEO", "CFO", "COO", "CTO", "Director", "Vice President", "Head", "Developer", "Engineer", "Architect", "DevOps", 
    "QA Engineer", "Manager", "Accountant", "Analyst", "Consultant", "Sales Representative", "Writer", "Editor", 
    "Designer", "Content Strategist", "Researcher", "Scientist", "Data Scientist", "HR Specialist", "IT Administrator", 
    "Support Engineer", "Intern", "Trainee", "Apprentice", "Janitor", "Custodian", "Facilities Technician",
    "Private Investigator", "Demolitionist", "Hitman", "Shin Biter", "Nepotist", "Sith", "Sith Lord", "\"The Night\"",
    "Exorcist", "Satanist", "Philosopher", "Mercenary", "Bounty Hunter", "John", "Lorekeeper", "Dungeon Master", 
    "Survivor", "Human", "Non-Human", "Musician", "Sound Designer", "Power Lifter", "Lord of Lords", "Fall Guy", "Lisan Al-Gaib",
    "Clone", "Time Lord", "Dark Lord", "Chosen One", "Mutant", "Menace", "Temp", "Coach", "Speaker", "Host", "Co-Host", "Viking",
    "Clanker", "CIS Representative", "Senator", "Chancellor", "\"The Senate\"", "Jedi", "Ambassador"
];
const position_suffixes = [
    "", "Specialist", "Consultant",
    "Coordinator", "Supervisor", "Officer",
    "Master", "Paragon", "Assistant", 
    "Associate", "Executive", "Overlord",
    "God", "Supreme", "Leader", "Victorious",
    "Knockoff"
]


const salary_scale = [
    "",
    "K",
    "M",
    "B",
    "T"
]
const salary_currency = [
    "USD",
    "EUR",
    "GBP",
    "JPY",
    "CAD",
    "INR",
    "MXN",
    "KRW",
    "AUD",
    "VND"
]


const employee_count = 500;
function generate_employees(){
    const employees_element = document.querySelector("#employees");

    let output = "<table>";
    // Adding Headers
    output += "<tr id=\"table_header\"><th>Name</th><th>Position</th><th>Salary</th></tr>";

    let employee_of_the_month = Math.floor(Math.random() * employee_count) + 1;

    let alternator = false;
    for (let i = 0; i < employee_count; i++){
        if (i == employee_of_the_month){
            let employee = generate_employee(true, alternator);
            output += employee;
        }
        else{
            let employee = generate_employee(false, alternator);
            output += employee;
        }
        alternator = !alternator;
    }
    output += "</table>";
    employees_element.innerHTML = output;
}

function generate_employee(employee_of_the_month, alternator) {
    //Set Up Output
    let output = "";

    //Begin Assembly of Table Row
    output += "<tr";
    if (employee_of_the_month == true){
        output += " id = \"employee_of_the_month\"";
    }
    else {
        if (alternator == true) output += " id = \"resultA\"";
        if (alternator == false) output += " id = \"resultB\"";
    }
    output += ">";


    //Generate Name
    output += "<td>"
    let prefix = name_prefixes[Math.floor(Math.random() * name_prefixes.length)];
    output += " " + prefix;
    let new_name = "";
    for (let y =0; y < Math.floor(Math.random() * 3) + 1; y++){
        let new_word = "";
        let new_world_syllables = Math.floor(Math.random() * 2) + 2;
        for (let x = 0; x < new_world_syllables; x++) {
            let new_syllable = all_syllables[Math.floor(Math.random() * all_syllables.length)];
            new_word += new_syllable;
        }
        new_word = new_word[0].toUpperCase() + new_word.slice(1);
        new_name += new_word + " ";
    }
    output += " " + new_name;
    let suffix = name_suffixes[Math.floor(Math.random() * name_suffixes.length)];
    output += " " + suffix;
    output += "</td>"


    //Generate Position
    output += "<td>"
    let position_prefix = position_prefixes[Math.floor(Math.random() * position_prefixes.length)];
    output += " " + position_prefix;
    let position = positions[Math.floor(Math.random() * positions.length)];
    output += " " + position;
    let position_suffix = position_suffixes[Math.floor(Math.random() * position_suffixes.length)];
    output += " " + position_suffix;
    output += "</td>"


    //Generate Salary
    output += "<td>";
    let salary = Math.floor(Math.random() * 500);
    let scale = salary_scale[Math.floor(Math.random() * salary_scale.length)];
    let currency = salary_currency[Math.floor(Math.random() * salary_currency.length)];

    output += salary + scale + " " + currency;
    output += "</td>";


    //Close Table Row
    output += "</tr>";

    //Return Output
    return output;
}

document.addEventListener("DOMContentLoaded", () => {
    generate_employees();
});