import Utils from "./Utils.js";
import Node from "./Node.js";

const mat4 = glMatrix.mat4;
const vec3 = glMatrix.vec3;

export default class Projectile extends Node {
    constructor(mesh, image, options) {
        super(options);
        Utils.init(this, this.constructor.defaults, options);

        this.mesh = mesh;
        this.image = image;
        this.projection = mat4.create();
        this.keys = {};
    }

    update(dt) {
        const c = this;

        const forward = vec3.set(
            vec3.create(),
            -Math.sin(c.rotation[1]),
            0,
            -Math.cos(c.rotation[1])
        );

        // Start movement
        let acc = vec3.create();
        if (this.keys["KeyP"]) {
            vec3.add(acc, acc, forward);
        }

        // 2: update velocity
        vec3.scaleAndAdd(c.velocity, c.velocity, acc, dt * c.acceleration);

        // 4: limit speed
        const len = vec3.len(c.velocity);
        if (len > c.maxSpeed) {
            vec3.scale(c.velocity, c.velocity, c.maxSpeed / len);
        }
    }
}

Projectile.defaults = {
    velocity: [0, 0, 0],
    maxSpeed: 8,
    acceleration: 20,
};
