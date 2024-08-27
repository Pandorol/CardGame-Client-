export class moveaction {
    active: boolean = false
    speedratio = 0.05
    constructor() {
        // Initialize speed with default values
        this.speed = {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
        };

        // Initialize setSpeed with default values
        this.setSpeed = {
            top: true,
            bottom: true,
            left: true,
            right: true,
        };
    }
    speed: {
        top: number,
        bottom: number,
        left: number,
        right: number,
    }
    setSpeed: {
        top: boolean,
        bottom: boolean,
        left: boolean,
        right: boolean,
    }
}