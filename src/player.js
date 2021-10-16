import Vector from './vector';

export default class Player {
    constructor(maze, sequence) {
        this.position = new Vector(maze.co(maze.points[sequence[0]][0]), maze.co(maze.points[sequence[0]][1]));
        console.log(this.position.y);
        this.speed = 20;
        this.locationIndex = 0;
        this.targetIndex = 0;

        this.grad = 0;

        this.maze = maze;
        this.sequence = sequence;
    }

    computeGrad(x1, y1, x2, y2) {
        let a = (x1 - x2);
        let b = (y1 - y2);
        if (a === 0 && b === 0) return 0;
        else if (a == 0) return Infinity; // vertical
        else if (b == 0) return -Infinity; // horizontal
        else return Math.abs(a / b);
    }

    moveTo() {
        if (this.grad === 0) {
            return;
        } else if (this.grad === Infinity) {
            if (this.position.y > this.targetIndex.y) this.position.y -= 0.1 * this.speed;
            else this.position.y += 0.1 * this.speed;
        } else if (this.grad === -Infinity) {
            if (this.position.x > this.targetIndex.x) this.position.x -= 0.1 * this.speed;
            else this.position.x += 0.1 * this.speed;
        } else {
            if (this.position.x > this.targetIndex.x) this.position.x -= 0.1 * this.speed;
            else this.position.x += 0.1 * this.speed;
            if (this.position.y > this.targetIndex.y) this.position.y -= 0.1 * this.speed * 1 / this.grad;
            else this.position.y += 0.1 * this.speed * 1 / this.grad;
        }
    }

    moveNext() {
        this.locationIndex += 1;
        if (this.locationIndex == this.sequence.length) return;
        this.targetIndex = new Vector(
            this.maze.co(this.maze.points[this.sequence[this.locationIndex]][0]),
            this.maze.co(this.maze.points[this.sequence[this.locationIndex]][1])
        );
        this.grad = this.computeGrad(
            this.maze.co(this.maze.points[this.sequence[this.locationIndex - 1]][0]),
            this.maze.co(this.maze.points[this.sequence[this.locationIndex - 1]][1]),
            this.maze.co(this.maze.points[this.sequence[this.locationIndex]][0]),
            this.maze.co(this.maze.points[this.sequence[this.locationIndex]][1]),
        );
    }

    run() {
        noStroke();
        fill(color(0, 0, 255));
        ellipse(this.position.x, this.position.y, this.maze.co(1), this.maze.co(1));

        if (this.locationIndex === this.sequence.length) return;

        this.moveTo();
        if (
            this.position.x > this.targetIndex.x - 5
            && this.position.x < this.targetIndex.x + 5
            && this.position.y > this.targetIndex.y - 5
            && this.position.y < this.targetIndex.y + 5
        ) {
            console.log("move");
            this.moveNext();
        }
    }

    restart() {
        this.position.x = this.maze.co(this.maze.points[this.sequence[0]][0]);
        this.position.y = this.maze.co(this.maze.points[this.sequence[0]][1]);
        this.locationIndex = 0;
        this.moveNext();
    }
}