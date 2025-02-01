import { collision } from "../utils/collision.js";
import { branchcollision } from "../utils/branchcollision.js";
import { FlyCollectableBlock } from "../utils/flycollect.js";
import { fly } from "../script.js";
import Sprite from "./sprite.js";
import { EndBlock } from "../utils/end.js";
import { flag } from "../script.js";

export default class Player extends Sprite {
    constructor({
        position,
        imageSrc,
        frameRate,
        frameBuffer,
        collisionBlocks,
        branchCollisionBlocks,
        flyCollectableBlocks,
        EndBlocks,
        canvas,
        c,
        gravity,
        scale = 1,
        animations,
    }) {
        super({ position, imageSrc, frameRate, frameBuffer, c });
        this.position = position;
        this.frameRate = frameRate;
        this.currentFrame = 0;
        this.frameBuffer = frameBuffer;
        this.elapsedFrames = 0;
        this.scale = scale;
        this.velocity = { x: 0, y: 1 };
        this.c = c;
        this.canvas = canvas;
        this.gravity = gravity;
        this.collisionBlocks = collisionBlocks;
        this.branchCollisionBlocks = branchCollisionBlocks;
        this.flyCollectableBlocks = flyCollectableBlocks;
        this.EndBlocks = EndBlocks;
        this.animations = animations;
        this.imagesLoaded = 0;
        this.totalImages = Object.keys(this.animations).length + 1;

        this.image = new Image();
        this.image.src = imageSrc;
        this.image.onload = () => {
            this.width = (this.image.width / this.frameRate) * this.scale;
            this.height = this.image.height * this.scale;
            this.imagesLoaded++;
            this.checkIfAllImagesLoaded();
            console.log(`Main image loaded: ${this.image.src}`);
        };
        this.image.onerror = () => {
            console.error(`Failed to load main image: ${this.image.src}`);
        };

        for (let key in this.animations) {
            const image = new Image();
            image.src = this.animations[key].imageSrc;

            console.log(`Loading image: ${image.src} for animation ${key}`);

            image.onload = () => {
                this.imagesLoaded++;
                this.checkIfAllImagesLoaded();
            };

            image.onerror = () => {
                console.error(`Failed to load image: ${image.src} for animation ${key}`);
            };

            this.animations[key].image = image;
        }

        this.cameraBox = {
            position: {
                x: this.position.x,
                y: this.position.y - 270,
            },
            width: 450,
            height: 450,
        };
    }

    checkIfAllImagesLoaded() {
        if (this.imagesLoaded === this.totalImages) {
            this.loaded = true;
        }
    }

    draw() {
        if (!this.loaded || !this.visible) return;

        const cropbox = {
            position: {
                x: this.currentFrame * (this.image.width / this.frameRate),
                y: 0,
            },
            width: this.image.width / this.frameRate,
            height: this.image.height,
        };

        this.c.drawImage(
            this.image,
            cropbox.position.x,
            cropbox.position.y,
            cropbox.width,
            cropbox.height,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );

        this.elapsedFrames++;

        if (this.elapsedFrames % this.frameBuffer === 0) {
            this.currentFrame++;
            if (this.currentFrame >= this.frameRate) {
                this.currentFrame = 0;
            }
        }
    }

    updateCamerabox() {
        this.cameraBox.position.x = this.position.x;
        this.cameraBox.position.y = this.position.y - 180;
    }

    shouldPanCameraUp({ canvas, camera }) {
        const cameraBoxTop = this.cameraBox.position.y + this.cameraBox.height;

        if (cameraBoxTop >= canvas.height) {
            this.cameraBox.position.y -= this.velocity.y;
        }
    }

    checkForVerticalFlyCollectable() {
        for (let i = 0; i < this.flyCollectableBlocks.length; i++) {
            const FlyCollectableBlock = this.flyCollectableBlocks[i];

            if (FlyCollectableBlock.checkCollision(this)) {
                console.log('Fly collectable colliding with player, removing');
                this.flyCollectableBlocks.splice(i, 1);
                fly.visible = false;
                this.showFlyCollected();
                break;
            }
        }
    }

    checkForVerticalEnd() {
        for (let i = 0; i < this.EndBlocks.length; i++) {
            const EndBlock = this.EndBlocks[i];

            if (EndBlock.checkCollision(this)) {
                console.log('Flag End colliding with player, removing');
                this.EndBlocks.splice(i, 1);
                flag.visible = false;
                // Call the method to show the End-Screen
                this.showEndScreen();
                break;
            }
        }
    }

    showFlyCollected() {
        const flyCollected = document.getElementById('flycollected');
        if (flyCollected) {
            flyCollected.style.display = 'block';
            console.log("show fly collected")
        } else {
            console.error('flycollected div not found');
        }
    }

    showEndScreen() {
        const endScreen = document.getElementById('end-screen');
        if (endScreen) {
            endScreen.style.display = 'block';
        } else {
            console.error('End-Screen div not found');
        }
    }

    switchSprite(key) {
        if (this.image === this.animations[key].image) return;
        this.currentFrame = 0;
        this.elapsedFrames = 0;
        this.image = this.animations[key].image;
        this.frameRate = this.animations[key].frameRate;
        this.frameBuffer = this.animations[key].frameBuffer;
        this.width = (this.image.width / this.frameRate) * this.scale;
        this.height = this.image.height * this.scale;

        //console.log(`Switched to sprite: ${key}, image source: ${this.image.src}`);
    }

    applyGravity() {
        /* console.log(`Applying gravity: velocity.y before ${this.velocity.y}`); */
        this.velocity.y += this.gravity;
        this.position.y += this.velocity.y;
        /* console.log(`Applying gravity: velocity.y after ${this.velocity.y}, position.y ${this.position.y}`); */
    }

    update() {
        if (!this.loaded) return;
        this.updateFrames();
        this.draw();
        this.position.x += this.velocity.x;
        this.updateCamerabox();
        this.checkForVerticalEnd();
        this.checkForVerticalFlyCollectable();
        this.checkForHorizontalCollisions();
        this.applyGravity();
        this.checkForVerticalCollisions();
        this.checkForVerticalBranchCollisions();

        this.keepWithinCanvasBounds();

        this.shouldPanCameraUp({ canvas: this.canvas, camera: this.camera });

        if (this.velocity.y < 0) {
            this.switchSprite('Jump');
            console.log('Switching to Jump sprite');
        } else if (this.velocity.y > 0) {
            this.switchSprite('Fall');
            console.log('Switching to Fall sprite');
        }
    }

    checkForVerticalCollisions() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const CollisionBlock = this.collisionBlocks[i];

            if (collision({ object1: this, object2: CollisionBlock })) {
                if (this.velocity.y > 0) {
                    this.velocity.y = 0;
                    this.position.y = CollisionBlock.position.y - this.height - 0.01;
                    /* console.log('Collision below detected'); */
                    break;
                }
                if (this.velocity.y < 0) {
                    this.velocity.y = 0;
                    this.position.y = CollisionBlock.position.y + CollisionBlock.height + 0.01;
                    /* console.log('Collision above detected'); */
                    break;
                }
            }
        }
    }

    keepWithinCanvasBounds() {
        if (this.position.x < 0) {
            this.position.x = 0;
            this.velocity.x = 0;
        }

        if (this.position.x + this.width > this.canvas.width - 90) {
            this.position.x = this.canvas.width - this.width - 90;
            this.velocity.x = 0;
        }

        if (this.position.y < 0) {
            this.position.y = 0;
            this.velocity.y = 0;
        }

        if (this.position.y + this.height > this.canvas.height + 2250) {
            this.position.y = this.canvas.height - this.height + 2250;
            this.velocity.y = 0;
        }
    }

    checkForHorizontalCollisions() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const CollisionBlock = this.collisionBlocks[i];

            if (collision({ object1: this, object2: CollisionBlock })) {
                if (this.velocity.x > 0) {
                    this.velocity.x = 0;
                    this.position.x = CollisionBlock.position.x - this.width - 0.01;
                    break;
                }
                if (this.velocity.x < 0) {
                    this.velocity.x = 0;
                    this.position.x = CollisionBlock.position.x + CollisionBlock.width + 0.01;
                    break;
                }
            }
        }
    }

    checkForVerticalBranchCollisions() {
        for (let i = 0; i < this.branchCollisionBlocks.length; i++) {
            const BranchCollisionBlock = this.branchCollisionBlocks[i];

            if (branchcollision({ object1: this, object3: BranchCollisionBlock })) {
                if (this.velocity.y > 0) {
                    this.velocity.y = 0;
                    this.position.y = BranchCollisionBlock.position.y - this.height - 0.01;
                    break;
                }
            }
        }
    }
}



