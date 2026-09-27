/* VILLAGE STATS */
let village_name = "";

let village_direction = "";
let village_distance = "";
let village_affiliation = "";
let village_tribe = "";
let in_howling_front = false;
let in_wastes_pale = false;

let history = [];
let traits = [];
let wealth = 0;
let village_birth = 0;
let village_age = 0;
let village_era = "";

const current_year = 1266;




/* NAME GENERATION */
let prefixes = [
   // Direction / position
  "Nor", "Nord", "Sund", "Sør", "Syd", "Aust", "Øst", "Ves", "Vest", "Vestr",
  "Inn", "Upp", "Øvre", "Ned", "Nedre",

  // Nature / weather
  "Storm", "Vind", "Blæs", "Frost", "Is", "Snø", "Regn", "Tåke", "Skod",
  "Sol", "Måne", "Sky", "Torden", "Lyn",

  // Terrain / earth
  "Stein", "Sten", "Fjell", "Berg", "Klipp", "Klint", "Hamr", "Hammar",
  "Haug", "Høg", "Høy", "Dal", "Djuv", "Grov", "Mo", "Mark", "Myr",
  "Sand", "Grus", "Leir", "Jord", "Grav",

  // Forest / plants
  "Skog", "Lund", "Holt", "Eik", "Ask", "Bjørk", "Gran", "Furu", "Rogn",
  "Hass", "Einer", "Bregn", "Lyng", "Mose",

  // Water
  "Strand", "Kyst", "Sjø", "Hav", "Vik", "Fjord", "Sund", "Nes", "Elv",
  "Å", "Bekk", "Kilde", "Brunn", "Tjern", "Vatn",

  // Animals
  "Ulf", "Ulvs", "Ravn", "Hrafn", "Bjørn", "Ørn", "Hjort", "Elg",
  "Orm", "Fisk", "Sel", "Hval", "Rein",

  // People / clans (common “founder” vibe)
  "Eirik", "Erik", "Hakon", "Haakon", "Harald", "Ivar", "Leif", "Sigurd",
  "Ragn", "Ragnar", "Gud", "Gunn", "Sven", "Sten", "Tor", "Tore", "Torbj",
  "Bjorn", "Bjarni", "Knut", "Kjell", "Aslak", "Olav", "Olof",

  // Myth / sacred (use sparingly, but great)
  "Odin", "Freyr", "Frey", "Freya", "Tyr", "Loki", "Njord", "Ull",
  "Hof", "Ve", "Blot", "Hel"
];
let syllables = [
  // Generic glue syllables
  "a", "e", "i", "o", "u", "y",
  "an", "en", "in", "on", "un",
  "ar", "er", "ir", "or", "ur",
  "al", "el", "il", "ol", "ul",
  "am", "em", "im", "om", "um",

  // Scandinavian-ish clusters
  "sk", "st", "sv", "sp", "gr", "gl", "gn", "kn", "kr", "tr", "dr", "br",
  "fj", "hj", "tj", "kj", "bj", "dj",
  "ld", "nd", "ng", "rd", "rk", "rm", "rn", "rs", "rt",

  // “Real” place-name feeling bits
  "grim", "hild", "vald", "ulf", "ravn", "bjorn", "orm", "vind",
  "kald", "eld", "svar", "hvit", "mork", "ljos",
  "skog", "lund", "holt", "vang", "eng",
  "bekk", "elv", "vat", "tarn", "sjo",

  // Norse-flavored
  "heim", "gard", "tun", "tor", "dal", "nes", "vik", "borg",
  "haug", "hamr", "mark", "li", "mo", "myr"
];
let suffixes = [
     // Core settlement
  "by", "bý", "stad", "staðr", "stead", "heim", "heimr", "tun", "tún",
  "gård", "gard", "torp", "thorp", "bøl", "bol", "bø", "set", "sætr",
  "hus", "land", "rike",

  // Coastal / water
  "vik", "vík", "fjord", "fjörðr", "sund", "nes", "øy", "ey", "holm",
  "skär", "sker", "strand", "os", "ós", "elv", "å", "á", "bekk",
  "vatn", "tjern", "kilde", "brunn", "havn", "höfn",

  // Terrain
  "dal", "dalen", "berg", "fjell", "ås", "haug", "mo", "myr", "mark",
  "skog", "li", "lid", "hamr", "hammer", "klint", "klett",

  // Fields / vegetation
  "lund", "holt", "vang", "vång", "eng", "hage",

  // Defensive / man-made
  "borg", "ting", "þing", "bro", "vad", "voll",

  // Icelandic saga-flavor
  "staðir", "gil", "hóll", "vellir", "mýri", "garður"
];
function new_name(){
    let prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    let suffix = suffixes[Math.floor(Math.random() * suffixes.length)];

    let amt_syllables = Math.floor(Math.random() * 2);
    let inner_syllable = "";
    if (amt_syllables == 1){
        inner_syllable = syllables[Math.floor(Math.random() * syllables.length)];
    }

    village_name = prefix + inner_syllable + suffix;
    const display = document.querySelector("#name");
    display.innerHTML = village_name;
}



/* LOCATION GENERATION */
const directions = [ "north", "northeast", "east", "southeast", "south", "southwest", "west", "northwest" ];
const distances = ["", "the center of", "inner", "outer", "the edge of" ];
const affiliations = ["Frigoshia", "The Republic of Arcohaem", "The EATU", "The Southern Tribes" ];
const FrigoshianTribes = ["Nedrena", "Brunnborg", "Sor", "Havbo", "Norby", "Sandstaor", "Tjernfell", "Beirdall", "Freyrhage", "Ragklint", "Lnvell", "Ravmyr", "Ultun", "Ulkog", "Holtgard", "Aburbekk", "Vindberg", "Denndal", "Strandby", "Torbekk", "Gransker"];
const RepublicTribes = ["Thoth", "Ammalor", "Freyr", "Hephaestus", "Sindri", "Karlstad", "Steinvaltn", "Skaad", "Hathor", "Ullr"];
const SouthernTribes = ["Bekhild", "Leifgard", "Eirstaad", "Grimdal", "Ravnsby", "Torvik", "Freyland", "Torhavn", "Skodgarour", "Bjornhaug", "Qorra", "Kessek", "Kalldal"];
const EATUTribes = ["Austborg", "Olofvik", "Koh", "Ragkilde", "Reinstead", "Istholm", "Kjellhage", "Mosegard", "Skalth", "Tyrberg", "Lemnaeus", "Nesholm"];
const HowlingFront = ["Gransker", "Ultun", "Ulkog", "Steinvaltn", "Karlstad", "Vindberg", "Torbekk", "Denndal", "Strandby", "Freyrhage"];
const WastesPale = ["Brunnborg", "Nedrena", "Sandstaor", "Tjernfell", "Sor", "Havbo", "Norby"];
function new_location(){
    /* GENERATING */
    village_direction = directions[Math.floor(Math.random() * directions.length)];
    village_distance = distances[Math.floor(Math.random() * distances.length)];
    village_affiliation = affiliations[Math.floor(Math.random() * affiliations.length)];

    if (village_affiliation == "Frigoshia") { 
        village_tribe = FrigoshianTribes[Math.floor(Math.random() * FrigoshianTribes.length)]; 
        traits.push("Frigoshian")
    }
    else if (village_affiliation == "The Republic of Arcohaem") { 
        village_tribe = RepublicTribes[Math.floor(Math.random() * RepublicTribes.length)]; 
        traits.push("Republic")
    }
    else if (village_affiliation == "The EATU") { 
        village_tribe = EATUTribes[Math.floor(Math.random() * EATUTribes.length)]; 
        traits.push("EATU")
    }
    else { 
        village_tribe = SouthernTribes[Math.floor(Math.random() * SouthernTribes.length)]; 
        traits.push("Southern")
    }

    in_howling_front = HowlingFront.includes(village_tribe);
    in_wastes_pale = WastesPale.includes(village_tribe);


    /* DISPLAYING */
    const location_p = document.getElementById("location");
    location_p.innerHTML = "";

    location_p.innerHTML += "Located in " + village_distance + " " + village_direction + " " + village_tribe + ".";
    if (in_howling_front) { location_p.innerHTML += "<br>In the Howling Front." };
    if (in_wastes_pale) { location_p.innerHTML += "<br>In the Wastes Pale." }
    location_p.innerHTML += "<br>Affiliated with " + village_affiliation + "."
}



/* GEOGRAPHY GENERATION */
const land_traits = ["Hills", "Mountain", "Fjord", "Valley", "Plains", "Plateau", "Canyon"];
const vegetation_traits = ["Taiga", "Arctic Grassland", "Arctic Tundra", "Glacial Field"];
const water_traits = ["Waterfall", "Lake", "River", "Creek", "Pond"];
const volcanic_traits = ["Volcanic Vents", "Geysers", "Hot Springs"];
const cave_traits = ["Sinkhole", "Collapsed Cavern", "Earth Fissure", "Ravine", "Underwater Cave", "Pit Cave", "Cliff Cave", "Grotto"];
function new_geography() {
    traits = [];
    wealth = 0;

    select_traits(land_traits, 1, 1.00);
    select_traits(vegetation_traits, 1, 1.00);
    select_traits(water_traits, 2, 0.50);
    select_traits(volcanic_traits, 1, 0.10);
    select_traits(cave_traits, 2, 0.20);

    const traits_display = document.getElementById("traits");
    traits_display.innerHTML = "<ul>";
    for (let i = 0; i < traits.length; i++){
        traits_display.innerHTML += "<li>" + traits[i] + "</li>";
    }
    traits_display.innerHTML += "</ul>";

};
function select_traits(options, max, proc){
    let applied_traits = [];

    let num_traits = Math.floor(Math.random() * max) + 1;
    let prev_trait_id = -1;
    if (Math.random() < proc) {
        for (let i = 0; i < num_traits; i++){
            let trait_id = Math.floor(Math.random() * options.length);
            while (trait_id == prev_trait_id && options.length > 1){
                trait_id = Math.floor(Math.random() * options.length);
            }
            traits.push(options[trait_id]);
            applied_traits.push(options[trait_id]);
        }
    }
    return applied_traits;
};



/* HISTORY GENERATION */
function new_history() {
    village_birth = Math.floor(Math.random() * 1146) + 120;
    if (village_birth >= 120 && village_birth < 604) {village_era = "ancient"; };
    if (village_birth >= 604 && village_birth < 708) {village_era = "classical"; };
    if (village_birth >= 708 && village_birth < 1040) {village_era = "medieval"; };
    if (village_birth >= 1040 && village_birth < 1252) {village_era = "early modern"; };
    if (village_birth >= 1252 && village_birth < 1266) {village_era = "industrial"; };
    village_age = 1266 - village_birth;

    // Timeline
    let timeline = village_birth;
    let last_turn = timeline;
    const step_size = 25;

    while (timeline < current_year) {
        // Historical Events
        if (village_era == "ancient"){
            let applied = select_traits(["Draconic Ancestry", 1, 0.25]);
        }

        // 2 Random Events

        // Trait Application

        // Timeline Progression
        timeline += Math.floor(Math.random() * step_size);
    }
};


/* WEALTH CALCULATION */



/* INPUT */
const create = document.querySelector("#create_btn");
create.addEventListener("click", () => {
    new_name();
    new_location();
    new_geography();
    new_history();
});