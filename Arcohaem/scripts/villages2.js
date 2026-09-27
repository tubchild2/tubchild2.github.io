"use strict";
// Control Variables
let year = 0;

let funmode = false;

let intervalID = null;
let sim_rate = 0;
const min_sim_rate = 1;
const def_sim_rate = 500;
const max_sim_rate = 1000;

const def_wealth = 100;
const def_population = 50;
const def_happiness = 50;
const def_crime = 1;


// Village Variables
let wealth = 0;
let population = 0;
let happiness = 0.00;
let crime = 0;
let tribe = "";
let founded = 0;
let age = 0;
let features = [];
let history = [];
let village_name = "";

// References
const FrigoshianTribes = ["Nedrena", "Brunnborg", "Sor", "Havbo", "Norby", "Sandstaor", "Tjernfell", "Beirdall", "Freyrhage", "Ragklint", "Lnvell", "Ravmyr", "Ultun", "Ulkog", "Holtgard", "Aburbekk", "Vindberg", "Denndal", "Strandby", "Torbekk", "Gransker"];
const RepublicTribes = ["Thoth", "Ammalor", "Freyr", "Hephaestus", "Sindri", "Karlstad", "Steinvaltn", "Skaad", "Hathor", "Ullr"];
const SouthernTribes = ["Bekhild", "Leifgard", "Eirstaad", "Grimdal", "Ravnsby", "Torvik", "Freyland", "Torhavn", "Skodgarour", "Bjornhaug", "Qorra", "Kessek", "Kalldal"];
const EATUTribes = ["Austborg", "Olofvik", "Koh", "Ragkilde", "Reinstead", "Istholm", "Kjellhage", "Mosegard", "Skalth", "Tyrberg", "Lemnaeus", "Nesholm"];
const Tribes = ["Nedrena", "Brunnborg", "Sor", "Havbo", "Norby", "Sandstaor", "Tjernfell", "Beirdall", "Freyrhage", "Ragklint", "Lnvell", "Ravmyr", "Ultun", "Ulkog", "Holtgard", "Aburbekk", "Vindberg", "Denndal", "Strandby", "Torbekk", "Gransker", "Thoth", "Ammalor", "Freyr", "Hephaestus", "Sindri", "Karlstad", "Steinvaltn", "Skaad", "Hathor", "Ullr", "Bekhild", "Leifgard", "Eirstaad", "Grimdal", "Ravnsby", "Torvik", "Freyland", "Torhavn", "Skodgarour", "Bjornhaug", "Qorra", "Kessek", "Kalldal", "Austborg", "Olofvik", "Koh", "Ragkilde", "Reinstead", "Istholm", "Kjellhage", "Mosegard", "Skalth", "Tyrberg", "Lemnaeus", "Nesholm" ];
let prefixes = ["Nor", "Nord", "Sund", "Sør", "Syd", "Aust", "Øst", "Ves", "Vest", "Vestr", "Inn", "Upp", "Øvre", "Ned", "Nedre", "Storm", "Vind", "Blæs", "Frost", "Is", "Snø", "Regn", "Tåke", "Skod", "Sol", "Måne", "Sky", "Torden", "Lyn", "Stein", "Sten", "Fjell", "Berg", "Klipp", "Klint", "Hamr", "Hammar", "Haug", "Høg", "Høy", "Dal", "Djuv", "Grov", "Mo", "Mark", "Myr", "Sand", "Grus", "Leir", "Jord", "Grav", "Skog", "Lund", "Holt", "Eik", "Ask", "Bjørk", "Gran", "Furu", "Rogn", "Hass", "Einer", "Bregn", "Lyng", "Mose", "Strand", "Kyst", "Sjø", "Hav", "Vik", "Fjord", "Sund", "Nes", "Elv", "Å", "Bekk", "Kilde", "Brunn", "Tjern", "Vatn", "Ulf", "Ulvs", "Ravn", "Hrafn", "Bjørn", "Ørn", "Hjort", "Elg", "Orm", "Fisk", "Sel", "Hval", "Rein", "Eirik", "Erik", "Hakon", "Haakon", "Harald", "Ivar", "Leif", "Sigurd", "Ragn", "Ragnar", "Gud", "Gunn", "Sven", "Sten", "Tor", "Tore", "Torbj", "Bjorn", "Bjarni", "Knut", "Kjell", "Aslak", "Olav", "Olof", "Odin", "Freyr", "Frey", "Freya", "Tyr", "Loki", "Njord", "Ull", "Hof", "Ve", "Blot", "Hel" ];
let syllables = ["a", "e", "i", "o", "u", "y", "an", "en", "in", "on", "un","ar", "er", "ir", "or", "ur", "al", "el", "il", "ol", "ul", "am", "em", "im", "om", "um", "sk", "st", "sv", "sp", "gr", "gl", "gn", "kn", "kr", "tr", "dr", "br", "fj", "hj", "tj", "kj", "bj", "dj", "ld", "nd", "ng", "rd", "rk", "rm", "rn", "rs", "rt", "grim", "hild", "vald", "ulf", "ravn", "bjorn", "orm", "vind", "kald", "eld", "svar", "hvit", "mork", "ljos", "skog", "lund", "holt", "vang", "eng", "bekk", "elv", "vat", "tarn", "sjo", "heim", "gard", "tun", "tor", "dal", "nes", "vik", "borg", "haug", "hamr", "mark", "li", "mo", "myr"];
let suffixes = ["by", "bý", "stad", "staðr", "stead", "heim", "heimr", "tun", "tún", "gård", "gard", "torp", "thorp", "bøl", "bol", "bø", "set", "sætr", "hus", "land", "rike", "vik", "vík", "fjord", "fjörðr", "sund", "nes", "øy", "ey", "holm", "skär", "sker", "strand", "os", "ós", "elv", "å", "á", "bekk", "vatn", "tjern", "kilde", "brunn", "havn", "höfn", "dal", "dalen", "berg", "fjell", "ås", "haug", "mo", "myr", "mark", "skog", "li", "lid", "hamr", "hammer", "klint", "klett", "lund", "holt", "vang", "vång", "eng", "hage", "borg", "ting", "þing", "bro", "vad", "voll", "staðir", "gil", "hóll", "vellir", "mýri", "garður"];
const HowlingFront = ["Gransker", "Ultun", "Ulkog", "Steinvaltn", "Karlstad", "Vindberg", "Torbekk", "Denndal", "Strandby", "Freyrhage"];
const WastesPale = ["Brunnborg", "Nedrena", "Sandstaor", "Tjernfell", "Sor", "Havbo", "Norby"];

// Features
const land_types = ["Hilly", "Mountainous", "Fjord", "Valley", "Plains", "Plateau", "Canyon", "Glacial Field"];
const land_features = ["Grove", "Lichen Field", "Wetland", "Taiga", "Waterfall", "Lake", "River", "Creek", "Pond", "Grotto", "Underwater Cave", "Meltwater River", "Volcanic Vents", "Geysers", "Hot Springs", "Sinkhole", "Collapsed Cavern",  "Earth Fissure", "Ravine", "Pit", "Cliffs", "Basalt Columns", "Rock Arches"];

const territories = ["Northern", "Central", "Southern", "Eastern"];
const affilitations = ["Tiamatian", "Tribal", "Republic", "EATU", "Frigoshian"];

const sub_territories = ["Howling Front", "Wastes Pale"];

const culture_features = ["Noble Family", "Annual Festival", "Wraith Sighting"];
const crime_features = ["Criminal Hideout", "Local Charlatan", "Gang Activity", "Black Market"];
const disaster_features = ["Blizzard", "Avalanche", "Plague", "Missing Children", "Vanishing Town", "Famine"];
const discovery_features = ["Exploded Cave", "Ancient Fortress", "Desolated Valley", "Dragon Bones"];
const building_features = ["Mine", "Lumbermill", "Fishery", "Farm", "Pasture", "University", "Market", "Police"];
const funmode_features = ["Johnson's Big-Ass Plague of Giga Cobra Diarrhea", "Phallic Meteor Shower", "Big D. Randy", "Rafia Activity", "Chupacabra Sighting"];

// Elements
const new_village_button = document.getElementById("create_btn");
const sim_rate_input = document.getElementById("sim_rate");
const funmode_toggle = document.getElementById("funmode");

const happiness_display = document.getElementById("happiness");
const wealth_display = document.getElementById("wealth");
const population_display = document.getElementById("population");
const year_display = document.getElementById("year");
const founded_display = document.getElementById("founded");
const tribe_display = document.getElementById("tribe");
const feature_display = document.getElementById("features");
const history_display = document.getElementById("history");
const village_name_display = document.getElementById("village_name");
const age_display = document.getElementById("age");
const crime_display = document.getElementById("crime");


// Control Functions
new_village_button.addEventListener("click", () => {
    if(sim_rate_input.value != "") { sim_rate = sim_rate_input.value; }
    else { sim_rate = def_sim_rate; }
    sim_rate = Math.min(Math.max(sim_rate, min_sim_rate), max_sim_rate);

    new_village();
});
function new_village(){
    wealth = def_wealth;
    population = def_population;
    happiness = def_happiness;
    crime = def_crime;
    features = [];
    history = [];
    age = 0;

    funmode = funmode_toggle.checked;
    console.log(funmode);
    village_name = new_name();
    tribe = Tribes[Math.floor(Math.random() * Tribes.length)];
    founded = Math.floor(Math.random() * 1146) + 120;
    year = founded;
    new_geography();

    add_history("village founded");

    update_display();
    simulate_time();
}
function update_display(){
    happiness_display.textContent = happiness;
    wealth_display.textContent = wealth;
    population_display.textContent = population;
    year_display.textContent = year;
    founded_display.textContent = founded;
    tribe_display.textContent = tribe;
    village_name_display.textContent = village_name;
    age_display.textContent = age;
    crime_display.textContent = crime;

    feature_display.innerHTML = "";
    for (let i = 0; i < features.length; i++){
        feature_display.innerHTML += "<li>" + features[i] + "</li>";
    };

    history_display.innerHTML = "";
    for (let i = 0; i < history.length; i++){
        history_display.innerHTML += "<li>" + history[i] + "</li>";
    };
}
function simulate_time(){
    if (intervalID !== null){
        clearInterval(intervalID);
        intervalID = null;
    }
    intervalID = setInterval(() => {
        time_step();
        if (year >= 1266) {
            year = 1266;
            clearInterval(intervalID);
        }
        year += 1;
        age += 1;
    }, sim_rate * 5);
}
function time_step(){
    check_history();    
    for (let i = 0; i < 2; i++) { random_events(); }
    update_stats();
    update_display();
}
function select_features(options, min, max, proc){
    // Selects a MIN number of features from OPTIONS up to a MAX.
    // It won't select anything though if the random percentage falls below PROC. 
    // If the entered MIN is greater than MAX, MAX will be equal to MIN
    // It won't select the same thing twice. 

    let applied_traits = [];
    if (min > max) {max = min;}
    let num_traits = Math.floor(Math.random() * max) + 1;
    if (num_traits < min) {num_traits = min;}

    if (Math.random() < proc) {
        for (let i = 0; i < num_traits; i++){
            let trait_id = Math.floor(Math.random() * options.length);
            let counter = 0;
            while (applied_traits.includes(options[trait_id])){
                trait_id = Math.floor(Math.random() * options.length);
                counter++;
                if (counter > options.length) {
                    break;
                }
            }
            applied_traits.push(options[trait_id]);
        }
    }
    return applied_traits;
};

// Creation Functions
function new_geography() {
    let selected_land = select_features(land_types, 1, 1, 1);
    features.push(selected_land);

    let selected_land_features = select_features(land_features, 3, 6, 1);
    for(let i = 0; i < selected_land_features.length; i++) {features.push(selected_land_features[i]); }

    if (FrigoshianTribes.includes(tribe)) { features.push("Northern"); }
    if (RepublicTribes.includes(tribe)) { features.push("Central"); }
    if (EATUTribes.includes(tribe)) { features.push("Eastern"); }
    if (SouthernTribes.includes(tribe)) { features.push("Southern"); }
    if (WastesPale.includes(tribe)) {features.push("Wastes Pale"); }
}
function check_history() {
    // Affiliations
    clear_affiliations();
    if (year < 604) {
        features.push("Tribal");
    }
    else if (year > 604 && year < 656) {
        if (!features.includes("Southern")){
            features.push("Republic");
        }
        else {
            features.push("Tribal");
        }
    }
    else if (year > 656 && year < 708) {
        features.push("Republic");
    }
    else if (year > 708 && year < 1255) {
        if (features.includes("Eastern")) {
            features.push("EATU");
        }
        else {
            features.push("Republic");
        }
    }
    else if (year > 1255) {
        if (features.includes("Eastern")) {
            features.push("EATU");
        }
        else if (features.includes("Northern")){
            features.push("Frigoshian");
        }
        else {
            features.push("Republic");
        }

        if (HowlingFront.includes(tribe) && !features.includes("Howling Front")) {
            features.push("Howling Front"); 
        }
    }   

    // Live History
    if (year == 604) { // Republic forms
        add_history("The Republic of Arcohaem has formed in Hephaestus! Northern, Eastern, and Central tribes are now Republic owned.");
    }
    if (year == 656) { // Southern induction
        add_history("The southern tribes have just agreed to join the Republic! All of Arcohaem is united!");
    }
    if (year == 708) { // EATU forms
        add_history("The eastern tribes have unionized and formed the East Arcohaem Trade Union (EATU)!");
    }
    if (year == 738) { // Normonism
        add_history("The practice of Normonism has formed in the southern tribes!");
    }
    if (year == 1122) { // The White Azalea
        add_history("Organized crime groups like the White Azalea have formed in the Republic.");
    }
    if (year == 1252) { // Industrial Revolution and the Black Winter
        add_history("The industrial revolution has begun in greater Serendipita.");
        add_history("Arcohaemian industrialization was roadblocked by the northern and southern tribes.");
        add_history("The Black Winter of 1252 ravaged Arcohaem.");
    }
    if (year == 1254) { // Chancellor Harald assassinated
        add_history("Chancellor Harald has been assassinated! Chancellor Kaul was elected in his place.");
        add_history("Chancellor Kaul exploited the panic to industrialize Arcohaem without the northern and southern tribes' permission!");
    }
    if (year == 1255) { // Civil war, Frigoshia forms, Karlstad
        add_history("The northern tribes have declared independence and formed Frigoshia!");
        add_history("Frigoshia has declared war on the Republic!");
        add_history("Karlstad has been destroyed by Frigoshians!");
    }
    if (year == 1256) { // The Howling Front
        add_history("The Howling Front has formed in upper-central Arcohaem!");
    }
    if (year == 1256) { // Bunkers
        if (features.includes("Wastes Pale")) {
            add_history("Government bunkers have been recently constructed in your territory.")
        }
    }
}
function add_history(message) {
    history.push(year + ": " + message);
}
function clear_affiliations() {
    for (let i = 0; i < affilitations.length; i++) {
        if (features.includes(affilitations[i])) {
            let index = features.indexOf(affilitations[i]);
            features.splice(index, 1);
        }
    }
}
function new_name(){
    let prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    let suffix = suffixes[Math.floor(Math.random() * suffixes.length)];

    let amt_syllables = Math.floor(Math.random() * 2);
    let inner_syllable = "";
    if (amt_syllables == 1){
        inner_syllable = syllables[Math.floor(Math.random() * syllables.length)];
    }

    village_name = prefix + inner_syllable + suffix;
    return village_name;
}
function random_events(){
    let feature_list = []; 
    if (funmode == true) {
        feature_list = [...culture_features, ...crime_features, ...disaster_features, ...discovery_features, ...building_features, ...funmode_features];
    }
    else {
        feature_list = [...culture_features, ...crime_features, ...disaster_features, ...discovery_features, ...building_features];
    }
    //features.push(feature_list[Math.floor(Math.random() * feature_list.length)]);
}

// Simulation Functions
function update_stats(){
    wealth += Math.round(population * happiness * 0.01);
    population += Math.round(happiness * 0.01);
}