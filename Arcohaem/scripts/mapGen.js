"use strict";

// 
// VARIABLES ----------------------------------------------------------------------------------------------------------------------------------
// 

// UI SETTINGS
let zoom_power = 0.05;
let min_zoom = 0.01;
let max_zoom = 15;
let drag_speed = 2;
let pan_speed = 15;

let layers = 0;
let layer_visibility = 0;
const layers_def = [1, 30, 100];
const layer_visibility_def = [1, 50, 100];

const map_density = 5;
const pan_rate = 2;

// UI VARIABLES
let cameraX = 0;
let cameraY = 0;
let zoom = 1;
let isDragging = false;
let lastMouseX = 0;
let lastMouseY = 0;
let active_keys = [];
let LOD = 1;
const LOD_def = [1, 2, 10];

const pan_keys = ['w', 'a', 's', 'd'];


// GENERATION SETTINGS
let map_width = 0;
let map_height = 0;
let map_scale = 0;
let water_level = 0;
let island_mode = false;
let octaves = 0;
let octave_scale = 0;
let octave_visibility = 0;

const map_width_def = [1, 300, 1000];
const map_height_def = [1, 300, 1000];
const map_scale_def = [1, 16, 500];
const water_level_def = [-255, -25, 255];
const island_mode_def = true;
const octaves_def = [0, 3, 10];
const octave_scale_def = [0.01, 8, 20];
const octave_visibility_def = [0, 0.2, 2];

const water_color = 'rgb(36, 40, 107)';
const sand_color = 'rgb(233, 236, 221)';
const land_color = 'rgb(66, 180, 85)';
const mountain_color = 'rgb(59, 92, 81)';
const snow_color = 'rgb(228, 255, 246)';

const sand_level_change = 20;
const land_level_change = 75;
const mountain_level_change = 38;
const snow_level_change = 12;


// GENERATION VARIABLES
let map = [];
let sand_level = 0;
let land_level = 0;
let mountain_level = 0;
let snow_level = 0;
let cell_count = 0;


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
const input_island = document.getElementById("input_island");
const input_octaves = document.getElementById("input_octaves");
const input_octave_scale = document.getElementById("input_octave_scale");
const input_octave_visibility = document.getElementById("input_octave_visibility");
const input_layers = document.getElementById("input_layers");
const input_layer_visibility = document.getElementById("input_layer_visibility");

const output_x = document.getElementById("output_x");
const output_y = document.getElementById("output_y");
const output_z = document.getElementById("output_z");
const output_cells = document.getElementById("output_cells");
const output_LOD = document.getElementById("output_LOD");


// 
// CODE ----------------------------------------------------------------------------------------------------------------------------------
// 


// CONTROLS AND MANAGEMENT
document.addEventListener("DOMContentLoaded", () => { reset_all(); });

button_reset.addEventListener("click", () => { reset_all(); })
function reset_all(){
    // UI Reset
    reset_inputs();
    prep_canvas();
    render_canvas();
    center_canvas();

    // Generation Reset
    perlin.seed();
    LOD = LOD_def[1];
    map = [];
}
button_start.addEventListener("click", () => { start(); })
function start(){
    get_inputs();
    test_map();
    calc_LOD();
    render_canvas();
}
function reset_inputs(){
    input_height.value = map_height_def[1];
    input_width.value = map_width_def[1];
    input_scale.value = map_scale_def[1];
    input_water_level.value = water_level_def[1];
    input_island.checked = island_mode_def;
    input_octaves.value = octaves_def[1];
    input_octave_scale.value = octave_scale_def[1];
    input_octave_visibility.value = octave_visibility_def[1];
    input_layers.value = layers_def[1];
    input_layer_visibility.value = layer_visibility_def[1];
}
function get_inputs(){
    map_height = clamp(input_height.value, map_height_def[0],map_height_def[2]);
    map_width = clamp(input_width.value, map_width_def[0], map_width_def[2]);
    map_scale = clamp(input_scale.value, map_scale_def[0], map_scale_def[2]);
    water_level = clamp(input_water_level.value, water_level_def[0], water_level_def[2]);
    octaves = clamp(input_octaves.value, octaves_def[0], octaves_def[2]);
    octave_scale = clamp(input_octave_scale.value, octave_scale_def[0], octave_scale_def[2]);
    octave_visibility = clamp(input_octave_visibility.value, octave_visibility_def[0], octave_visibility_def[2]);
    layers = clamp(input_layers.value, layers_def[0], layers_def[2]);
    layer_visibility = clamp(input_layer_visibility.value, layer_visibility_def[0], layer_visibility_def[2]);

    sand_level = water_level + sand_level_change;
    land_level = sand_level + land_level_change;
    mountain_level = land_level + mountain_level_change;
    snow_level = mountain_level + snow_level_change;
    island_mode = input_island.checked;

    // Rewriting clamped values
    input_height.value = map_height;
    input_width.value = map_width;
    input_scale.value = map_scale;
    input_water_level.value = water_level;
    input_octaves.value = octaves;
    input_octave_scale.value = octave_scale;
    input_octave_visibility.value = octave_visibility;
    input_layers.value = layers;
    input_layer_visibility.value = layer_visibility;
}


// GENERATION
function test_map(){
    map = [];

    // Primary Map
    perlin.seed();
    let scale = map_scale * 0.001;
    for (let x = 0; x < map_width; x++){
        let column = [];
        for (let y = 0; y < map_height; y++){
            let value = perlin.get(x * scale, y * scale);
            if (island_mode){
                let d = dist(x, y, map_width / 2, map_width / 2);
                value -= ((d * 2) / map_width) ** 6;
            }
            column.push(Math.round(value * 250));
        }
        map.push(column);
    }

    // Octaves
    for (let octave = 1; octave <= octaves; octave++){
        let o_scale = scale + (octave * octave_scale * 0.001);
        let visibility = octave_visibility;
        for (let x = 0; x < map_width; x++){
            for (let y = 0; y < map_height; y++){
                let value = perlin.get(x*o_scale, y*o_scale);
                map[x][y] += Math.round(value * visibility * 250);
            }
        }
    }


    let m = 20; // octave multiplier
    let vis = 0.05; // visibility
    for (let x = 0; x < map_width; x++){
        for (let y = 0; y < map_height; y++){
            let v = perlin.get(x * (map_scale * m / 1000), y * (map_scale * m / 1000));

            let cx = map_width / 2;
            let cy = map_height / 2;
            v -= dist(x, y, cx, cy) / map_width;

            //map[x][y] += Math.round(v*vis*250);
        }
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
    draw_map(ctx, canvas);
    update_outputs();
}
function prep_canvas(){
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
        calc_LOD();
        render_canvas();
    }, { passive: false });
    function calc_LOD(){
        if (zoom > 1.25) { LOD = 1; }
        else if (zoom > 1) { LOD = 2; }
        else { LOD = clamp(Math.round((1-zoom) * LOD_def[2]), 2, LOD_def[2]); }
    }


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
function draw_map(context, canvas){
    if (map.length <= 0) { return; }
    cell_count = 0;
    let ctx = context;

    let cw = canvas.width;
    let ch = canvas.height;
    
    let cam_l = (0 - cameraX) / zoom;
    let cam_t= (0 - cameraY) / zoom;
    let cam_r = (canvas.width - cameraX) / zoom;
    let cam_b = (canvas.height - cameraY) / zoom;

    for (let x = 0; x < map_width; x+=LOD){
        for (let y = 0; y< map_height; y+=LOD){

            // Check if the cell is even seen by the camera
            let pos_x = x * map_density;
            let pos_y = y * map_density;
            let buffer = map_density * 3;

            if (pos_x  < cam_l - buffer || pos_x > cam_r + buffer) { continue; }
            if (pos_y < cam_t - buffer || pos_y > cam_b + buffer) { continue; }

            // Get the value and color of the pos in the noise map
            const v = map[x][y];
            const c = find_cell_color(v);
            if (c == -1) { continue; } // skip drawing water;
            ctx.fillStyle = c;

            // Check for contiguous columns of cells that can be rendered as one
            let column_length = 1;
            let run_end = false;
            while (y+(column_length*LOD)<map_height && !run_end) {
                let bv = map[x][y+(column_length*LOD)];
                let bc = find_cell_color(bv);
                if (c == bc) { column_length += 1; }
                else { run_end = true }
            }

            // Draw the cells to the canvas
            ctx.fillRect(pos_x, pos_y, (map_density * LOD) + 0.1, (map_density * LOD) * column_length + 0.1);
            y+= (column_length - 1) * LOD;
            cell_count++;
        }
    }
}
function find_cell_color(v){
    let cell_color = 'white';
    const layer_offset = Math.round(v / layers) * (layer_visibility * layers * 0.01);

    if (v < water_level){
        return -1;
    }
    else if (v < sand_level) {
        cell_color = sand_color;
    }
    else if (v < land_level) {
        cell_color = land_color;
    }
    else if (v < mountain_level) {
        cell_color = mountain_color;
    }
    else {
        cell_color = snow_color;
    }
            
    let [r, g, b] = cell_color.match(/\d+/g).map(Number);
    cell_color = `rgb(${r - layer_offset}, ${g - layer_offset}, ${b - layer_offset})`;
    return cell_color;
}
function update_outputs(){
    output_x.textContent = cameraX.toFixed(2);
    output_y.textContent = cameraY.toFixed(2);
    output_z.textContent = zoom.toFixed(2);
    output_cells.textContent = cell_count;
    output_LOD.textContent = LOD;
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
function dist(x1, y1, x2, y2){
    let dx = x1 - x2;
    let dy = y1 - y2;
    let d = Math.sqrt(dx ** 2 + dy ** 2)
    return d;
}