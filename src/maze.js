import Vector from './vector';

export default class Maze {
    constructor(gridCount, obstacleCoordinates, pointsCoordinates, canvasWidth) {
        this.gridCount = gridCount;
        this.width = canvasWidth;
        this.obstacleCoordinates = obstacleCoordinates;
        this.points = pointsCoordinates;
    }

    co(val) {
        return (val / this.gridCount) * this.width;
    }

    drawGrid() {
        stroke(0);
        strokeWeight(1);
        for (let i = 1; i < this.width; i++) {
            line(this.co(i), this.co(0), this.co(i), this.co(this.width));
            line(this.co(0), this.co(i), this.co(this.width), this.co(i));
        }
    }

    drawObstacles() {
        stroke(0);
        strokeWeight(18);
        for (let i = 0; i < this.obstacleCoordinates.length; i++) {
            line(
                this.co(this.obstacleCoordinates[i][0]),
                this.co(this.obstacleCoordinates[i][1]),
                this.co(this.obstacleCoordinates[i][2]),
                this.co(this.obstacleCoordinates[i][3])
            );
        }
    }

    drawPoints() {
        noStroke();
        fill(0);
        textAlign(CENTER, CENTER);
        textSize(28);
        for (let i = 0; i < this.points.length; i++) {
            text(`${i}`, this.co(this.points[i][0]), this.co(this.points[i][1]));
        }
    }
}