import { collision } from "../utils/collision.js";
import { branchcollision } from "../utils/branchcollision.js";

export default class Player {
    constructor({position, imageSrc, collisionBlocks, branchCollisionBlocks, canvas, c, gravity})   { 
        this.position = position
        this.image = new Image()
        this.image.src = imageSrc
        this.velocity = {
            x: 0,
            y: 1
        }
        this.width = 90/1.05
        this.height = 90
        this.c = c
        this.canvas = canvas,
        this.gravity = gravity
        this.collisionBlocks = collisionBlocks
        this.branchCollisionBlocks = branchCollisionBlocks
    }

    draw() {
        if (!this.image) return
        this.c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
    }

    update(){
        this.draw()
        this.position.x += this.velocity.x
        this.checkForHorizontalCollisions()
        this.applyGravity()
        this.checkForVerticalCollisions()
        this.checkForVerticalBranchCollisions()
    }

    checkForHorizontalCollisions() {
        for (let i = 0; i < this.collisionBlocks.length; i++){
            const CollisionBlock = this.collisionBlocks[i]

            if (
                collision({
                    object1: this,
                    object2: CollisionBlock,
                })
            ){
                if (this.velocity.x > 0){
                    this.velocity.x = 0
                    this.position.x = CollisionBlock.position.x - this.width - 0.01
                }
                if (this.velocity.x < 0){
                    this.velocity.x = 0
                    this.position.x = CollisionBlock.position.x + CollisionBlock.width + 0.01
                }
            }
        }
    }

    applyGravity(){
        this.position.y += this.velocity.y
        this.velocity.y += this.gravity
    }

    checkForVerticalCollisions() {
        for (let i = 0; i < this.collisionBlocks.length; i++){
            const CollisionBlock = this.collisionBlocks[i]

            if (
                collision({
                    object1: this,
                    object2: CollisionBlock,
                })
            ){
                if (this.velocity.y > 0){
                    this.velocity.y = 0
                    this.position.y = CollisionBlock.position.y - this.height - 0.01
                }
                if (this.velocity.y < 0){
                    this.velocity.y = 0
                    this.position.y = CollisionBlock.position.y + CollisionBlock.height + 0.01
                }
            }
        }
    }
    
    checkForVerticalBranchCollisions() {
        for (let i = 0; i < this.branchCollisionBlocks.length; i++){
            const BranchCollisionBlock = this.branchCollisionBlocks[i]

            if (
                branchcollision({
                    object1: this,
                    object3: BranchCollisionBlock,
                })
            ){
                if (this.velocity.y > 0){
                    this.velocity.y = 0
                    this.position.y = BranchCollisionBlock.position.y - this.height - 0.01
                }
            }
        }
    }
}