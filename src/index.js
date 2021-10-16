import Graph from './graph';
import data from './graphData';
import Vector from './vector';
import Maze from './maze';
import Controller from './controller';
import Player from './player';

const width = document.getElementById("canvas").clientWidth;

const obstacles = [
    [6, 0, 6, 6],
    [2, 2, 6, 2],
    [2, 4, 4, 4],
    [4, 4, 4, 10],
    [4, 8, 12, 8],
    [4, 10, 2, 10],
    [8, 4, 8, 2],
    [8, 2, 10, 2],
    [0, 8, 2, 8],
    [2, 8, 2, 6],
    [6, 12, 6, 10],
    [6, 10, 10, 10]
];

const sequence = [6, 0, 2, 9, 1];

const graph = new Graph(data);
const maze = new Maze(12, obstacles, data.map((e) => e.coords), width);
const controller = new Controller();
const player = new Player(maze, sequence);

function restart(){
    player.restart();
    clear();
    maze.drawObstacles();
    maze.drawPoints();
    player.run();
    controller.pause();
}

document.getElementById("restart-btn").addEventListener('click', restart);

document.getElementById("find-btn").addEventListener('click', (e)=>{
    const startIndex = parseInt(document.getElementById("start").value);
    const endIndex = parseInt(document.getElementById("end").value);
    player.sequence = graph.findShortestPath(startIndex, endIndex);
    document.getElementById("path").innerText = player.sequence.join(' >> ');
    restart();
});

function setup() {
    let canvas = createCanvas(width, width);
    canvas.parent("canvas");
    maze.drawObstacles();
    maze.drawPoints();
    player.run();
    player.moveNext();
}

function draw(){
    if(!controller.isPlaying) return;
    clear();

    //maze.drawGrid();
    maze.drawObstacles();
    maze.drawPoints();
    player.run();
    // //console.log(`${location.x}, ${location.y} -> ${d.x}, ${d.y}`);
}

window.setup = setup;
window.draw = draw;