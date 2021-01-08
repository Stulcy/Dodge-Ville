import Application from "./Application.js";

import Renderer from "./Renderer.js";
import Physics from "./Physics.js";
import Camera from "./Camera.js";
import SceneLoader from "./SceneLoader.js";
import SceneBuilder from "./SceneBuilder.js";

let state = false;

export default class App extends Application {
    start() {
        const gl = this.gl;

        this.renderer = new Renderer(gl);
        this.time = Date.now();
        this.startTime = this.time;
        this.aspect = 1;

        this.pointerlockchangeHandler = this.pointerlockchangeHandler.bind(this);
        document.addEventListener("pointerlockchange", this.pointerlockchangeHandler);

        this.load("scene.json");
    }

    async load(uri) {
        const scene = await new SceneLoader().loadScene(uri);
        const builder = new SceneBuilder(scene);
        this.scene = builder.build();
        this.physics = new Physics(this.scene);

        // Find first camera.
        this.camera = null;
        this.scene.traverse((node) => {
            if (node instanceof Camera) {
                this.camera = node;
            }
        });

        this.camera.aspect = this.aspect;
        this.camera.updateProjection();
        this.renderer.prepare(this.scene);
    }

    enableCamera() {
        this.canvas.requestPointerLock();
    }

    pointerlockchangeHandler() {
        if (!this.camera) {
            return;
        }

        if (document.pointerLockElement === this.canvas) {
            this.camera.enable();
        } else {
            this.camera.disable();
        }
    }

    update() {
        const t = (this.time = Date.now());
        const dt = (this.time - this.startTime) * 0.0015;
        this.startTime = this.time;

        if (state) {
            if (this.camera) {
                this.camera.update(dt);
            }

            if (this.physics) {
                this.physics.update(dt);
            }
        }
    }

    render() {
        if (this.scene) {
            this.renderer.render(this.scene, this.camera);
        }
    }

    resize() {
        const w = this.canvas.clientWidth;
        const h = this.canvas.clientHeight;
        this.aspect = w / h;
        if (this.camera) {
            this.camera.aspect = this.aspect;
            this.camera.updateProjection();
        }
    }
}

export function restart() {
    const canvas = document.querySelector("canvas");
    const app = new App(canvas);
    var x = document.getElementById("rounds");
    var y = document.getElementById("rounds_big");
    x.style.display = "none";
    y.style.display = "none";

    document.getElementById("btn").addEventListener("click", () => {
        var audio = new Audio("Disenchantment.mp3");
        audio.volume = 0.1;
        audio.play();
        var audio = new Audio("Welcome.mp3");
        audio.volume = 0.4;
        audio.play();
        app.enableCamera();
        document.getElementById("btn").style.display = "none";
        state = true;
        setTimeouts(x, y);
    });
}

const setTimeouts = (x, y) => {
    setTimeout(function () {
        document.getElementById("h1").style.display = "none";
        document.getElementById("h2").style.display = "none";
    }, 4000);
    setTimeout(function () {
        var audio = new Audio("Round_1.mp3");
        audio.volume = 0.4;
        audio.play();
        y.style.display = "block";
    }, 9000);
    setTimeout(function () {
        y.style.display = "none";
        x.style.display = "block";
    }, 11000);
    setTimeout(function () {
        x.style.display = "none";
        x.textContent = "Round 2";
        y.textContent = "Round 2";
        y.style.display = "block";
        var audio = new Audio("Round_2.mp3");
        audio.volume = 0.4;
        audio.play();
    }, 34000);
    setTimeout(function () {
        x.style.display = "block";
        y.style.display = "none";
    }, 36000);
    setTimeout(function () {
        y.textContent = "METEOR!";
        y.style.display = "block";
        var audio = new Audio("Meteor.mp3");
        audio.volume = 0.8;
        audio.play();
    }, 47000);
    setTimeout(function () {
        y.style.display = "none";
    }, 50500);
    setTimeout(function () {
        x.style.display = "none";
        x.textContent = "Round 3";
        y.textContent = "Round 3";
        y.style.display = "block";
        var audio = new Audio("Round_3.mp3");
        audio.volume = 0.4;
        audio.play();
    }, 53000);
    setTimeout(function () {
        x.style.display = "block";
        y.style.display = "none";
    }, 55000);
    setTimeout(function () {
        y.textContent = "METEOR!";
        y.style.display = "block";
    }, 94000);
    setTimeout(function () {
        y.style.display = "none";
    }, 98000);
    setTimeout(function () {
        x.style.display = "none";
        x.textContent = "Round 4";
        y.textContent = "Round 4";
        y.style.display = "block";
        var audio = new Audio("Round_4.mp3");
        audio.volume = 0.4;
        audio.play();
    }, 100000);
    setTimeout(function () {
        x.style.display = "block";
        y.style.display = "none";
    }, 102000);
};

document.addEventListener("DOMContentLoaded", () => {
    restart();
});
