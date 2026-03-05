
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


function get_village(){
    let village = "";
    let prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    let suffix = suffixes[Math.floor(Math.random() * suffixes.length)];

    let amt_syllables = 0; //Math.round(Math.random());
    let inner_syllable = "";
    if (amt_syllables == 1){
        inner_syllable = syllables[Math.floor(Math.random() * syllables.length)];
    }

    village = prefix + inner_syllable + suffix;
    return village;
}

function get_villages(amt){
    let villages = [];
    for (let i = 0; i < amt; i++){
        let village = get_village();
        villages.push(village);
    }
    return villages;
}

function display_villages(villages){
    let output = "";
    for (let village of villages){
        let formatted_village = " - " + village + "<br>";
        output += formatted_village;
    }
    const display = document.querySelector("#output");
    display.innerHTML = output;
}

const create = document.querySelector("#create_btn");
create.addEventListener("click", () => {
    const amount_element = document.querySelector("#amt_input");
    let amount = parseInt(amount_element.value);
    let villages = get_villages(amount);
    display_villages(villages);
});