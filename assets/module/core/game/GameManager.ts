
import { Node, director } from 'cc';


export class GameManager {

    root!: Node;

    constructor(root: Node) {
        this.root = root;
    }


    setTimeScale(scale: number) {
        director.globalGameTimeScale = scale;
    }

    getTimeScale() {
        return director.globalGameTimeScale;
    }
}
