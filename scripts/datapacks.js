"use strict";

class Datapack {
    constructor(
        name, description, tone, 
        genre, difficulty, species, 
        backgrounds, classes, items, 
        features, tags, skills, conditions 
    ){
        this.name = name;
        this.description = description;
        this.tone = tone;
        this.genre = genre;
        this.difficulty = difficulty;
        this.species = species;
        this.backgrounds = backgrounds;
        this.classes = classes;
        this.items = items;
        this.features = features;
        this.tags = tags;
        this.skills = skills;
        this.conditions = conditions;
    }
}

let active_datapack = new Datapack("", "", "", "", 5, [], [], [], [], [], [], [], []);

const display = document.getElementById("display");
display.textContent = JSON.stringify(active_datapack);


// // CONTENT

// Tags
class Tag {
    constructor(name = "", func = ""){
        this.name = name;
        this.func = func;
    }
}
function add_tag (new_tag)
{

}

// Skills
class Skill { 
    constructor(name = "", desc = "", stat = [""]){
        this.name = name;
        this.desc = desc;
        this.stats = stat;
    }
}

// Conditions
class Condition {
    constructor(name = "", func = "", trig = ""){
        this.name = name;
        this.func = func;
        this.trig = trig;
    }
}

// Features
class Feature {
    constructor(name = "", desc = "", add_skill = [""], add_stat = [""], pacs = false, req_skill = [""], req_stat = [""]){
        this.name = name;
        this.desc = desc;
        this.add_skill = add_skill;
        this.add_stat = add_stat;
        this.pacs = pacs;
        this.req_skill = req_skill;
        this.req_stat = req_stat;
    }
}

// Items
class Item {
    constructor(name = "", desc = "", level = 1, rarity = 1, value = 0, tags = [""], damage = "", range = 0, action="Free", 
        stats = [""], condition = [""], defense = "", slots = 0, features = [""]){
            this.name = name;
            this.desc = desc;
            this.level = level;
            this.rarity = rarity;
            this.value = value;
            this.tags = tags;
            this.damage = damage;
            this.range = range;
            this.action = action;
            this.stats = stats;
            this.condition = condition;
            this.defense = defense;
            this.slots = slots;
            this.features = features;
        }
}

// Species
class Species {
    constructor(name = "", desc = "", hp = 0, stats = [""], skills = [""], speed = 6, features = [""]){
        this.name = name;
        this.desc = desc;
        this.hp = hp;
        this.stats = stats;
        this.skills = skills;
        this.speed = speed;
        this.features = features;
    }
}

// Backgrounds
class Background {
    constructor(name = "", desc = "", hp = 0, stats = [""], skills = [""], speed = 0, features = [""]){
        this.name = name;
        this.desc = desc;
        this.hp = hp;
        this.stats = stats;
        this.skills = skills;
        this.speed = speed;
        this.features = features;
    }
}

// Classes
class Class {
    constructor(name = "", desc = "", hp = 4, stats = [""], skills = [""], speed = 0, features = [""]){
        this.name = name;
        this.desc = desc;
        this.hp = hp;
        this.stats = stats;
        this.skills = skills;
        this.speed = speed;
        this.features = features;
    }
}