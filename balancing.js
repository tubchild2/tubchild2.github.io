"use strict";

// Stats By Level
//     Start with standard array of -1, -1, 0, 0, 1, 1
//     +1 to three stats at level 1 (can be all in 1 stats)
//     Every level after level 1 adds +1
//     Stats cap out at 5
//     Players play till level 20

function minStat(){
    // -1 base stat from SA
    // origin elements are dodged
    // level ups are dodged
    // it can't go lower

    return -1;
}
function avgStat(level){
    // 0 base stat from SA
    // 3 / 6 from the origin elements splitting across 6 stats
    // level - 1 from subsequent level ups
    // min(5,) from capping at 5 

    let l = level;
    if (l > 20) l = 20;
    let average = Math.min(5, (l - 1)/6 + 0.5);
    return average;
}
function maxStat(level){
    // 1 base stat from SA
    // +3 from origin elements placing into 1 stat
    // level - 1 for subsequent level ups
    // min(5,) from capping at 5 

    let l = level;
    if (l > 20) l = 20;
    let maximum = Math.min(5, 3 + l);
    return maximum;
}



// Skills By Level
//     18 base skills
//     +1 to three skills at level 1 (all different skills)
//     +1 to three skills at level 1 from origin elements (can all be in 1 skill)
//     Every level after level 1 adds 1 level to one skill
//     Skills cap out at 5
function minSkill(){
    // Start with nothing
    // Add nothing to it
    // You get nothing
    return 0;
}
function avgSkill(level){
    // Start with 3/18 from from creation
    // Add 3/18 from origin elements
    // Add level-1/18 for level up bonuses
    // Min(5,) from skill cap
    
    let l = level;
    if (l > 20) l = 20;
    let average = Math.min(5, (l + 5)/18);
    return average;
}
function maxSkill(level){
    // Start with 1 from creation
    // Add 3 from origin elements
    // Add level - 1 for level up bonuses

    let l = level;
    if (l > 20) l = 20;
    let maximum = Math.min(5, l + 3);
    return maximum;
}



// Roll Modifiers By Level
function minMod(level){
    let l = level;
    if (l > 20) l = 20;
    let minimum = minStat(l) + minSkill(l);
    return minimum;
}
function avgMod(level){
    let l = level;
    if (l > 20) l = 20;
    let average = avgStat(l) + avgSkill(l);
    return average;
}
function maxMod(level){
    let l = level;
    if (l > 20) l = 20;
    let maximum = maxStat(l) + maxSkill(l);
    return maximum;
}



// Max HP By Level
// For every level you have, add the following to your max HP:
//     2 + CON + Class HP + Species HP + Background HP + New Max Level
//     Class HP is ~3-5
//     Species HP is ~0-1
//     Background HP is ~0-1

function minHP(level){
    // Assume Class HP is minimum of 3
    // Assumed Species and Background HP of 0
    // Assume minimum possible CON
    // Add level sum

    let l = level;
    if (l > 20) l = 20;
    let l_sum = (l * (l+1)) / 2;
    let minimum = l_sum + l * (2 + minStat(l) + 3);
    return minimum;
}
function avgHP(level){
    // Assume Class HP is avg of 4
    // Assume Species and Background HP are totalling 1
    // Use average CON
    // Add level sum

    let l = level;
    if (l > 20) l = 20;
    let l_sum = (l * (l+1)) / 2;
    let average = l_sum + l * (2 + avgStat(l) + 5);
    return average;
}
function maxHP(level){
    // Assume Class HP is max of 5
    // Assume Species and Background HP are both 1, totalling 2
    // Use max CON
    // Add level sum

    let l = level;
    if (l > 20) l = 20;
    let l_sum = (l * (l+1)) / 2;
    let maximum = l_sum + l * (2 + maxStat(l) + 7);
    return maximum;
}



// Suggest Damage by Level, Difficulty, and Rarity
// Damage is more complicated
// It should be powerful enough to kill a player in a number of hits equal to double the difficulty
// Rarity offsets level by (r-1)0.25
function minDamage(level, diff, rarity){
    let l = level;
    if (level > 20) l = 20;

    let hits_to_kill_player = (diff) * (1 - (rarity * 0.05));
    let minimum = minHP(l) / hits_to_kill_player;

    return minimum;
}
function avgDamage(level, diff, rarity){
    let l = level;
    if (level > 20) l = 20;

    let hits_to_kill_player = (diff) * (1 - (rarity * 0.05));
    let average = avgHP(l) / hits_to_kill_player;
    return average;
}
function maxDamage(level, diff, rarity){
    let l = level;
    if (level > 20) l = 20;

    let hits_to_kill_player = (diff) * (1 - (rarity * 0.05));
    let maximum = maxHP(l) / hits_to_kill_player;
    return maximum;
}



// Suggest Defense by Level, Difficulty, and Rarity
function defense(level, diff, rarity){
    let l = level;
    if (l > 20) l = 20;
    
    let suggested_defense = Math.max(1, -diff + l + (0.5 * rarity) + 16.5);
    return suggested_defense;
}



// Value Appraisal
function value(diff, level, rarity, damage, defense){
    let l = level;
    if (l > 20) l = 20;

    let power = 
        (damage * 2) + 
        (defense * 8) + 
        (l * 5);

    let difficulty_multiplier = 1 + (diff * 0.1);
    let value = power * difficulty_multiplier;
    return value;
}


// Names for things
const rarities = [
  { name: "Awful", color: "black" },
  { name: "Common", color: "gray" },
  { name: "Uncommon", color: "white" },
  { name: "Rare", color: "rgb(73, 73, 255)" },
  { name: "Very Rare", color: "green" },
  { name: "Epic", color: "rgb(197, 197, 0)" },
  { name: "Legendary", color: "orange" },
  { name: "Mythical", color: "rgb(255, 49, 49)" },
  { name: "Relic", color: "rgb(139, 0, 0)" },
  { name: "Eternal", color: "purple" }
];
const difficulties = [
  { name: "Story", color: "rgb(0, 0, 0)" },
  { name: "Guided", color: "#444" },
  { name: "Casual", color: "gray" },
  { name: "Easy", color: "#bbb" },
  { name: "Normal", color: "white" },
  { name: "Hard", color: "#b8b8ff" },
  { name: "Expert", color: "rgb(73,73,255)" },
  { name: "Brutal", color: "#4bb7ff" },
  { name: "Nightmare", color: "green" },
  { name: "Hell", color: "#a0c000" },
  { name: "Abyss I", color: "rgb(197,197,0)" },
  { name: "Abyss II", color: "#ffcc00" },
  { name: "Abyss III", color: "orange" },
  { name: "Abyss IV", color: "#ff7a30" },
  { name: "Abyss V", color: "rgb(255,49,49)" },
  { name: "Abyss VI", color: "#c22a2a" },
  { name: "Abyss VII", color: "rgb(139,0,0)" },
  { name: "Abyss VIII", color: "#8b0060" },
  { name: "Abyss IX", color: "purple" },
  { name: "Abyss X", color: "#640064" }
];


// Encounters
// Enemy HP should be equal to the total combined HP of the party, 
// then a percentage is subtracted depending on the difficulty
function easy_encounter_hp(level, diff, party_size){
    let party_hp = avg_party_hp(level, Math.max(1, party_size - 1))
    if (party_size == 1) party_hp /= 2;

    let encounter_hp = party_hp * ((diff * 0.05) + 0.66);
    if (diff == 1){
        encounter_hp = party_hp;
    }
    return encounter_hp;
}
function med_encounter_hp(level, diff, party_size){
    let party_hp = avg_party_hp(level, Math.max(1, party_size - 1))
    if (party_size == 1) party_hp /= 2;

    let encounter_hp = party_hp * ((diff * 0.05) + 1);
    if (diff == 1){
        encounter_hp = party_hp;
    }
    return encounter_hp;
}
function hard_encounter_hp(level, diff, party_size){
    let party_hp = avg_party_hp(level, Math.max(1, party_size - 1))
    if (party_size == 1) party_hp /= 2;
    
    let encounter_hp = party_hp * ((diff * 0.05) + 1.33);
    if (diff == 1){
        encounter_hp = party_hp;
    }
    return encounter_hp;
}


// Party HP
function min_party_hp(level, party_size){
    let party_hp = minHP(level) * party_size;
    return party_hp;
}
function avg_party_hp(level, party_size){
    let party_hp = avgHP(level) * party_size;
    return party_hp;
}
function max_party_hp(level, party_size){
    let party_hp = maxHP(level) * party_size;
    return party_hp;
}


// Enemy damage per round
function easy_encounter_dpr(level, party_size, diff){
    let number_of_hits = party_size * 2;
    let dpr = min_party_hp(level, party_size) / number_of_hits + diff * 0.25;
    return dpr;
}
function med_encounter_dpr(level, party_size, diff){
    let number_of_hits = party_size * 2;
    let dpr = avg_party_hp(level, party_size) / number_of_hits + diff * 0.25;
    return dpr;
}
function hard_encounter_dpr(level, party_size, diff){
    let number_of_hits = party_size * 2;
    let dpr = max_party_hp(level, party_size) / number_of_hits + diff * 0.25;
    return dpr;
}


// Testing
function stats_at_level(level, diff, weapon_rarity, armor_rarity){
    let output = "";
    output += "\n\n\n";
    output += "------------------------------------------";
    output += "\n\n\nLEVEL = " + level;

    output += "\n\nMinimum Core Stat: " + minStat(level);
    output += "\nAverage Core Stat: " + avgStat(level);
    output += "\nMaximum Core Stat: " + maxStat(level);
        
    output += "\n\nMinimum Skill: " + minSkill(level);
    output += "\nAverage Skill: " + avgSkill(level);
    output += "\nMaximum Skill: " + maxSkill(level);

    output += "\n\nMinimum Roll Modifier: " + minMod(level);
    output += "\nAverage Roll Modifier: " + avgMod(level);
    output += "\nMaximum Roll Modifier: " + maxMod(level);

    output += "\n\nMinimum Health: " + minHP(level);
    output += "\nAverage Health: " + avgHP(level);
    output += "\nMaximum Health: " + maxHP(level);

    output += "\n\nMinimum Damage: " + minDamage(level, diff, weapon_rarity);
    output += "\nAverage Damage: " + avgDamage(level, diff, weapon_rarity);
    output += "\nMaximum Damage: " + maxDamage(level, diff, weapon_rarity);

    output += "\n\nAverage Defense: " + defense(level, diff, armor_rarity);
    
    output += "\n\n\n";
    output += "------------------------------------------";
    output += "\n\n\n\n";
    
    console.log(output);
}

function item_at_rarity(level, diff, rarity){
    let output = "";

    output += "\n\n\n";
    output += "------------------------------------------";
    output += "\n\n\nRARITY = " + rarity;
    output += "\nLEVEL = " + level;

    output += "\n\n SUGGESTED DEFENSE: " + defense(level, diff, rarity);
    output += "\n\n WEAK WEAPON DAMAGE: " + minDamage(level, diff, rarity); 
    output += "\n\n AVG WEAPON DAMAGE: " + avgDamage(level, diff, rarity);
    output += "\n\n STRONG WEAPON DAMAGE: " + maxDamage(level, diff, rarity); 

    return output;
}

function items_at_level(level, diff){
    let output = "";
    for (let i = 1; i <= 10; i++) {
        output += item_at_rarity(level, diff, i);
    }
    console.log(output);
}

function stats(diff, weapon_rarity, armor_rarity){
    for (let i = 1; i <= 20; i++){
        stats_at_level(i, diff, weapon_rarity, armor_rarity);
    }
}



// User Interface
const c_diff = document.getElementById("difficulty");
const c_lvl = document.getElementById("level");
const c_size = document.getElementById("players");

const results = document.getElementById("balance");
const diff_display = document.getElementById("diff-display");

c_diff.addEventListener("input", () => {
    diff_display.textContent = difficulties[c_diff.value - 1].name;
    diff_display.style.color = difficulties[c_diff.value - 1].color;
    update_display();
});
c_lvl.addEventListener("input", () => {
    update_display();
});
c_size.addEventListener("input", () => {
    update_display();
});

function update_display(){
    const diff = Number(c_diff.value);
    const lvl = Number(c_lvl.value);
    const size = Number(c_size.value);

    let valid = true;
    if (isNaN(diff)) valid = false;
    if (isNaN(lvl)) valid = false;
    if (isNaN(size)) valid = false;
    if (diff < 1 || diff > 20) valid = false;
    if (lvl < 1 || lvl > 20) valid = false;
    if (size < 1 || size > 10) valid = false;
    
    if (!valid){
        return;
    }

    results.innerHTML = "";
    let level_header = document.createElement("p");
    results.appendChild(level_header);
    level_header.innerHTML = "Level " + lvl;


    let stats_text  = document.createElement("p");
    results.appendChild(stats_text );
    stats_text .innerHTML = "Player Core Stat Range:<br>&nbsp&nbspMinimum: " + minStat().toFixed(2) + "<br>&nbsp&nbspAverage: " + avgStat(lvl).toFixed(2) + "<br>&nbsp&nbspMaximum: " + maxStat(lvl).toFixed(2);


    let skills = document.createElement("p");
    results.appendChild(skills);
    skills.innerHTML = "Player Skill Range:<br>&nbsp&nbspMinimum: " + minSkill().toFixed(2) + "<br>&nbsp&nbspAverage: " + avgSkill(lvl).toFixed(2) + "<br>&nbsp&nbspMaximum: " + maxSkill(lvl).toFixed(2);


    let modifiers = document.createElement("p");
    results.appendChild(modifiers);
    modifiers.innerHTML = "Player Roll Modifiers:<br>&nbsp&nbspMinimum: " + minMod(lvl).toFixed(2) + "<br>&nbsp&nbspAverage: " + avgMod(lvl).toFixed(2) + "<br>&nbsp&nbspMaximum: " + maxMod(lvl).toFixed(2);


    let health = document.createElement("p");
    results.appendChild(health);
    health.innerHTML = "Player Health:<br>&nbsp&nbspMinimum: " + minHP(lvl).toFixed(2) + "<br>&nbsp&nbspAverage: " + avgHP(lvl).toFixed(2) + "<br>&nbsp&nbspMaximum: " + maxHP(lvl).toFixed(2);


    let armors_header = document.createElement("p");
    results.appendChild(armors_header);
    armors_header.textContent = "Defense by Item Rarities";
    let armors = document.createElement("table");
    results.appendChild(armors);
    let armors_table_header = document.createElement("tr");
    armors_table_header.innerHTML = "<th>Rarity</th><th></th><th>Defense</th><th>ABS Value</th>";
    armors.appendChild(armors_table_header);
    for (let i = 1; i <= 10; i++){
        let armor = document.createElement("tr");
        armors.appendChild(armor);

        let rarity_data = document.createElement("td");
        armor.appendChild(rarity_data);
        rarity_data.textContent = i;

        let rarity_name = document.createElement("td");
        armor.appendChild(rarity_name);
        rarity_name.textContent = rarities[i-1].name;
        rarity_name.style.color = rarities[i-1].color;

        let defense_data = document.createElement("td");
        armor.appendChild(defense_data);
        let defense_val = defense(lvl, diff, i);
        defense_data.textContent = defense_val.toFixed(2);

        let value_data = document.createElement("td");
        armor.appendChild(value_data);
        value_data.textContent = value(diff, lvl, i, 0, defense_val).toFixed(2);
    }


    let weapons_header = document.createElement("p");
    results.appendChild(weapons_header);
    weapons_header.textContent = "Damage by Item Rarities";
    let weapons = document.createElement("table");
    results.appendChild(weapons);
    let weapons_table_header = document.createElement("tr");
    weapons_table_header.innerHTML = "<th>Rarity</th><th></th><th>Low</th><th>Med</th><th>High</th><th>ABS Value</th>";
    weapons.appendChild(weapons_table_header);
    for (let i = 1; i <= 10; i++){
        let weapon = document.createElement("tr");
        weapons.appendChild(weapon);

        let rarity_data = document.createElement("td");
        weapon.appendChild(rarity_data);
        rarity_data.textContent = i;

        let rarity_name = document.createElement("td");
        weapon.appendChild(rarity_name);
        rarity_name.textContent = rarities[i-1].name;
        rarity_name.style.color = rarities[i-1].color;

        let min_damage_data = document.createElement("td");
        weapon.appendChild(min_damage_data);
        let min_damage_val = minDamage(lvl, diff, i);
        min_damage_data.textContent = min_damage_val.toFixed(2);

        let avg_damage_data = document.createElement("td");
        weapon.appendChild(avg_damage_data);
        let avg_damage_val = avgDamage(lvl, diff, i);
        avg_damage_data.textContent = avg_damage_val.toFixed(2);

        let max_damage_data = document.createElement("td");
        weapon.appendChild(max_damage_data);
        let max_damage_val = maxDamage(lvl, diff, i);
        max_damage_data.textContent = max_damage_val.toFixed(2);

        let value_data = document.createElement("td");
        weapon.appendChild(value_data);
        value_data.textContent = value(diff, lvl, i, avg_damage_val, 0).toFixed(2);
    }

    let party_hp_text = document.createElement("p");
    results.appendChild(party_hp_text);
    party_hp_text.innerHTML = "Party HP Pool:<br>&nbsp&nbspMinimum: " + min_party_hp(lvl, size).toFixed(2) + "<br>&nbsp&nbspAverage: " + avg_party_hp(lvl, size).toFixed(2) + "<br>&nbsp&nbspMaximum: " + max_party_hp(lvl, size).toFixed(2);

    let encounter_hp_text  = document.createElement("p");
    results.appendChild(encounter_hp_text);
    encounter_hp_text.innerHTML = "Encounter HP Pool:<br>&nbsp&nbspEasy: " + easy_encounter_hp(lvl, diff, size).toFixed(2) + "<br>&nbsp&nbspMedium: " + med_encounter_hp(lvl, diff, size).toFixed(2) + "<br>&nbsp&nbspHard: " + hard_encounter_hp(lvl, diff, size).toFixed(2);

    let encounter_dpr_text = document.createElement("p");
    results.appendChild(encounter_dpr_text);
    encounter_dpr_text.innerHTML = "Encounter Damage Per Round:<br>&nbsp&nbspEasy: " + easy_encounter_dpr(lvl, size, diff).toFixed(2) + "<br>&nbsp&nbspMedium: " + med_encounter_dpr(lvl, size, diff).toFixed(2) + "<br>&nbsp&nbspHard: " + hard_encounter_dpr(lvl, size, diff).toFixed(2);
}