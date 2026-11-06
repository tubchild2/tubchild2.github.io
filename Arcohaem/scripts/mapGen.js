"use strict";

// 
// VARIABLES ----------------------------------------------------------------------------------------------------------------------------------
// 

// UI SETTINGS
let zoom_power = 0.05;
let zoom_power_def = [0.01, 0.05, 0.1];
let min_zoom = 0.1;
let min_zoom_def = [0.01, 0.1, 1];
let max_zoom = 15;
let max_zoom_def = [1, 15, 20];
let drag_speed = 2;
let drag_speed_def = [0.5, 2, 5];
let pan_speed = 15;
let pan_speed_def = [6, 15, 30]
const pan_rate = 2;

// UI VARIABLES
let cameraX = 0;
let cameraY = 0;
let zoom = 1;
let isDragging = false;
let lastMouseX = 0;
let lastMouseY = 0;
let active_keys = [];
const pan_keys = ['w', 'a', 's', 'd'];


// GENERATION SETTINGS
let map_width = 0;
let map_width_def = [1, 250, 500];

let map_height = 0;
let map_height_def = [1, 250, 500];

let map_scale = 0;
let map_scale_def = [1, 15, 500];

let map_density = 0;
let map_density_def = [1, 5, 100];

let water_level = 0;
let water_level_def = [-255, -25, 255];

let sand_level = 0;
let sand_level_def = [-255, -5, 255];

let land_level = 0;
let land_level_def = [-255, 50, 255];

let mountain_level = 0;
let mountain_level_def = [-255, 88, 255];

let snow_level = 0;
let snow_level_def = [-255, 100, 255];


// GENERATION VARIABLES
let map = [];
const water_color = '#24286b';
const sand_color = '#e9ecdd';
const land_color = '#42b455';
const mountain_color = '#3b5c51';
const snow_color = '#e4fff6';

// ELEMENT REFERENCES
const canvas_map = document.getElementById("canvas_map");
const button_start = document.getElementById("button_start");
const button_reset = document.getElementById("button_reset");
const button_center = document.getElementById("button_center");
const input_height = document.getElementById("input_height");
const input_width = document.getElementById("input_width");
const input_scale = document.getElementById("input_scale");
const input_density = document.getElementById("input_density");
const input_water_level = document.getElementById("input_water_level");
const input_sand_level = document.getElementById("input_sand_level");
const input_land_level = document.getElementById("input_land_level");
const input_mountain_level = document.getElementById("input_mountain_level");
const input_snow_level = document.getElementById("input_snow_level");
const output_x = document.getElementById("output_x");
const output_y = document.getElementById("output_y");



// 
// CODE ----------------------------------------------------------------------------------------------------------------------------------
// 



// CONTROLS AND MANAGEMENT
document.addEventListener("DOMContentLoaded", () => { reset_all(); });

button_reset.addEventListener("click", () => { reset_all(); })
function reset_all(){
    // UI Reset
    reset_inputs();
    prep_UI();
    render_canvas();
    center_canvas();

    // Generation Reset
    perlin.seed();
    map = [];
}
button_start.addEventListener("click", () => { start(); })
function start(){
    get_inputs();
    test_map();
    render_canvas();
}
function reset_inputs(){
    input_height.value = map_height_def[1];
    input_width.value = map_width_def[1];
    input_scale.value = map_scale_def[1];
    input_density.value = map_density_def[1];
    input_water_level.value = water_level_def[1];
    input_sand_level.value = sand_level_def[1];
    input_land_level.value = land_level_def[1];
    input_mountain_level.value = mountain_level_def[1];
    input_snow_level.value = snow_level_def[1];
}
function get_inputs(){
    // Map settings
    map_height  = clamp(input_height.value,  map_height_def[0],  map_height_def[2]);
    map_width   = clamp(input_width.value,   map_width_def[0],   map_width_def[2]);
    map_scale   = clamp(input_scale.value,   map_scale_def[0],   map_scale_def[2]);
    map_density = clamp(input_density.value, map_density_def[0], map_density_def[2]);

    // Terrain thresholds
    water_level    = clamp(input_water_level.value,    water_level_def[0],    water_level_def[2]);
    sand_level     = clamp(input_sand_level.value,     sand_level_def[0],     sand_level_def[2]);
    land_level     = clamp(input_land_level.value,     land_level_def[0],     land_level_def[2]);
    mountain_level = clamp(input_mountain_level.value, mountain_level_def[0], mountain_level_def[2]);
    snow_level = clamp(input_snow_level.value, snow_level_def[0], snow_level_def[2]);

    // Write the clamped values back to the inputs
    input_height.value = map_height;
    input_width.value = map_width;
    input_scale.value = map_scale;
    input_density.value = map_density;
    input_water_level.value = water_level;
    input_sand_level.value = sand_level;
    input_land_level.value = land_level;
    input_mountain_level.value = mountain_level;
}

// GENERATION
function test_map(){
    perlin.seed();
    map = [];

    for (let x = 0; x < map_width; x++){
        let column = [];
        for (let y = 0; y < map_height; y++){
            let v = perlin.get(x * (map_scale/1000), y * (map_scale/1000));
            
            let cx = map_width / 2;
            let cy = map_height / 2;
            let dx = x - cx;
            let dy = y - cy;
            let d = Math.sqrt(dx ** 2 + dy ** 2)
            v -= d / map_width;

            column.push(Math.round(v * 250));
        }
        map.push(column);
    }
}




// GUI
button_center.addEventListener("click", () => { center_canvas(); });
function render_canvas() {
    const canvas = document.getElementById("canvas_map");

    const ctx = canvas.getContext("2d");
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.setTransform(
        zoom, 0,
        0, zoom,
        cameraX, cameraY
    );

    // Drawing Elements
    draw_map(ctx);
}
function draw_map(context){
    if (map.length <= 0) { return; }
    let ctx = context;

    for (let x = 0; x < map_width; x++){
        for (let y = 0; y< map_height; y++){
            const v = map[x][y];
            //ctx.fillStyle = `rgb(${v}, ${v}, ${v})`;

            if (v < water_level){
                ctx.fillStyle = water_color;
            }
            else if (v < sand_level) {
                ctx.fillStyle = sand_color;
            }
            else if (v < land_level) {
                ctx.fillStyle = land_color;
            }
            else if (v < mountain_level) {
                ctx.fillStyle = mountain_color;
            }
            else {
                ctx.fillStyle = snow_color;
            }
            
            ctx.fillRect(x * map_density, y * map_density, map_density, map_density);
        }
    }

}
function prep_UI(){
    // DRAGGING
    canvas_map.addEventListener("mousedown", (event) => {
        isDragging = true;
        lastMouseX = event.clientX;
        lastMouseY = event.clientY;
    });
    window.addEventListener("mouseup", () => {
        isDragging = false;
    });
    canvas_map.addEventListener("mousemove", (event) => {
        if (!isDragging) return;
        const dx = event.clientX - lastMouseX;
        const dy = event.clientY - lastMouseY;
        cameraX += dx * drag_speed;
        cameraY += dy * drag_speed;
        lastMouseX = event.clientX;
        lastMouseY = event.clientY;
        render_canvas();
    });


    // SCROLL ZOOM
    canvas_map.addEventListener("wheel", (event) => {
        event.preventDefault();
        const rect = canvas_map.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        const graphX = (mouseX - cameraX) / zoom;
        const graphY = (mouseY - cameraY) / zoom;
        const factor = event.deltaY < 0 ? 1 + zoom_power : 1 - zoom_power;
        zoom = Math.max(min_zoom, Math.min(max_zoom, zoom * factor));
        cameraX = mouseX - graphX * zoom;
        cameraY = mouseY - graphY * zoom;
        render_canvas();
    }, { passive: false });


    // PANNING
    document.addEventListener("keydown", (event) => {
        let key = event.key.toLowerCase();
        if (!pan_keys.includes(key)) { return; }
        if (!active_keys.includes(key)) { active_keys.push(key); }
    });
    document.addEventListener("keyup", (event) => {
        let key = event.key.toLowerCase();
        for (let i = 0; i < active_keys.length; i++) {
            let i_key = active_keys[i];
            if (i_key == key) { active_keys.splice(i, 1); }
        }
    });
    window.addEventListener("blur", () => {
        active_keys = [];
    });
    function pan_camera(){
        if (active_keys.length <= 0) {return;} 
        let x_in = 0;
        let y_in = 0;
        if (active_keys.includes('w')) { x_in += 1; }
        if (active_keys.includes('s')) { x_in -= 1; }
        if (active_keys.includes('d')) { y_in += 1; }
        if (active_keys.includes('a')) { y_in -= 1; }
        cameraY += x_in * pan_speed;
        cameraX -= y_in * pan_speed;
    }
    const timerId = setInterval(() => {
        pan_camera();
        render_canvas();
    }, pan_rate * 5);
}
function center_canvas(){
    cameraX = 0;
    cameraY = 0;
    zoom = 1;
    render_canvas();
}
function update_outputs(){
    output_x.textContent = cameraX;
    output_y.textContent = cameraY;
}


// UTILITIES
let perlin = {
    // Credit Joeiddon https://github.com/joeiddon/perlin/tree/master

    rand_vect: function(){
        let theta = Math.random() * 2 * Math.PI;
        return {x: Math.cos(theta), y: Math.sin(theta)};
    },
    dot_prod_grid: function(x, y, vx, vy){
        let g_vect;
        let d_vect = {x: x - vx, y: y - vy};
        if (this.gradients[[vx,vy]]){
            g_vect = this.gradients[[vx,vy]];
        } else {
            g_vect = this.rand_vect();
            this.gradients[[vx, vy]] = g_vect;
        }
        return d_vect.x * g_vect.x + d_vect.y * g_vect.y;
    },
    smootherstep: function(x){
        return 6*x**5 - 15*x**4 + 10*x**3;
    },
    interp: function(x, a, b){
        return a + this.smootherstep(x) * (b-a);
    },
    seed: function(){
        this.gradients = {};
        this.memory = {};
    },
    get: function(x, y) {
        if (this.memory.hasOwnProperty([x,y]))
            return this.memory[[x,y]];
        let xf = Math.floor(x);
        let yf = Math.floor(y);
        //interpolate
        let tl = this.dot_prod_grid(x, y, xf,   yf);
        let tr = this.dot_prod_grid(x, y, xf+1, yf);
        let bl = this.dot_prod_grid(x, y, xf,   yf+1);
        let br = this.dot_prod_grid(x, y, xf+1, yf+1);
        let xt = this.interp(x-xf, tl, tr);
        let xb = this.interp(x-xf, bl, br);
        let v = this.interp(y-yf, xt, xb);
        this.memory[[x,y]] = v;
        return v;
    }
}
function clamp(num, min, max){
    return Math.min(Math.max(num, min), max);
}