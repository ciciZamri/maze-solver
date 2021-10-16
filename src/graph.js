export default class Graph {
    constructor(g) {
        this.graph = [];
        this.nodeList = [];
        this.createGraph(g);
    }

    createGraph(g) {
        for (let node of g) {
            for (let neighbour of node.neighbour) {
                this.addEdge(node.index, neighbour.node, neighbour.weight);
            }
        }
    }

    addEdge(node1, node2, weight) {
        if (this.graph.length <= node1) {
            for (let i = (this.graph.length - 1); i < node1; i++) {
                this.graph.push([]);
            }
            this.graph[node1].push([node2, weight]);
        }
        else {
            this.graph[node1].push([node2, weight]);
        }
    }

    printGraph() {
        for (let i = 0; i < this.graph.length; i++) {
            console.log(`${i}-->`);
            for (let j = 0; j < this.graph[i].length; j++) {
                console.log(this.graph[i][j]);
            }
        }
    }

    // getShortestPath(start, target) {
    //     let solution = this.findShortestPath(start, target);
    //     let sequence = [];
    //     let pos = target;
    //     while (pos != start) {
    //         sequence.push(pos);
    //         pos = solution[pos][1]
    //     }
    //     sequence.push(start);
    //     sequence.reverse();

    //     return sequence;
    // }

    findShortestPath(start, target) {
        let currentNode = start;
        let queue = [];
        let distance = 0;
        let info = [];

        for (let i = 0; i < this.graph.length; i++) {
            //console.log(i);
            info.push([Infinity, null]);
            queue.push(i);
        }

        let n = 1;
        while (queue.length > 0) {
            //console.log("iteration" + n);

            //console.log("try pop: " + currentNode);
            let newQueue = [];
            for (let i of queue) {
                if (i === currentNode) continue;
                else newQueue.push(i);
            }
            queue.splice(0, queue.length);
            queue = newQueue;
            //console.log("queue: " + queue);
            //console.log(this.graph[currentNode]);
            for (let neighbour of this.graph[currentNode]) {
                if (queue.includes(neighbour[0])) {
                    //console.log("check node: " + neighbour[0]);
                    //console.log("dist node: " + neighbour[1]);
                    if (distance + neighbour[1] < info[neighbour[0]][0]) {
                        info[neighbour[0]][0] = distance + neighbour[1];
                        info[neighbour[0]][1] = currentNode;
                    }
                }
            }

            distance += this.graph[start][0][1];

            for (let i of queue) {
                if (info[i][0] <= distance) {
                    distance = info[i][0];
                    currentNode = i;
                    //console.log("currentnode: " + currentNode);
                }
            }

            if (currentNode === target) {
                break;
            }

            n += 1;

            //console.log("info: " + info);
        }

        let solution = info;
        let sequence = [];
        let pos = target;
        while (pos != start) {
            sequence.push(pos);
            pos = solution[pos][1]
        }
        sequence.push(start);
        sequence.reverse();

        return sequence;
    }
}