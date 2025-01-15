import Sprite from "./classes/sprite.js";
import Player from "./classes/player.js";
import { floorCollisions} from "./data/collisions.js"
import { branchCollisions } from "./data/collisions.js";
import CollisionBlock from "./classes/CollisionBlock.js";
import BranchCollisionBlock from "./classes/BranchCollisionBlock.js";

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1889;
canvas.height = 930;

const scaledCanvas = {
    width: canvas.width / 1.54,
    height: canvas.height / 1,
}

const floorCollisions2D = []
for (let i = 0; i < floorCollisions.length; i += 20){
    floorCollisions2D.push(floorCollisions.slice(i, i + 20))
}

console.log(floorCollisions2D)

const collisionBlocks = []
floorCollisions2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if (symbol === 1){
            console.log('draw a block')
            let colls = new CollisionBlock({
                position: {
                    y: y * 90,
                    x: x * 90,
                },
                c: c
            });

            collisionBlocks.push(colls)
            // Collision draw
            colls.draw();
        }
    })
})

const branchCollisions2D = []
for (let i = 0; i < branchCollisions.length; i += 20){
    branchCollisions2D.push(branchCollisions.slice(i, i + 20))
}

const branchCollisionBlocks = []
branchCollisions2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if (symbol === 2){
            console.log('draw a block')
            let branchcolls = new BranchCollisionBlock({
                position: {
                    y: y * 90,
                    x: x * 90,
                },
                c: c
            });

            branchCollisionBlocks.push(branchcolls)
            // Collision draw
            branchcolls.draw();
        }
    })
})

console.log(`Total CollisionBlocks created ${collisionBlocks.length}`)

const gravity = 0.3

const player = new Player({
    position: {
        x: 50,
        y: 3000,
    },
    canvas: canvas,
    c: c,
    gravity: gravity,
    collisionBlocks: collisionBlocks,
    branchCollisionBlocks: branchCollisionBlocks,
    imageSrc: './img/froggyone.png',
})

const keys = {
    d:  {
        pressed: false,
    },
    a:  {
        pressed: false,
    },
}

const background = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    imageSrc: './img/background cr.png',
    c: c
})

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'white'
    c.fillRect(0,0,canvas.width,canvas.height)

    c.save()
    c.scale(1.05, 1)
    c.translate(0, -background.image.height + scaledCanvas.height)
    background.update()
    collisionBlocks.forEach(CollisionBlock => {
        CollisionBlock.update()
    })

    branchCollisionBlocks.forEach(BranchCollisionBlock => {
        BranchCollisionBlock.update()
    })

        player.update()

    player.velocity.x = 0
    if (keys.d.pressed) player.velocity.x = 4
    else if (keys.a.pressed) player.velocity.x = -4

    c.restore()

}

animate()

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = true
            break
        case 'a':
            keys.a.pressed = true
            break
    
    }
    if (event.code === 'Space' || event.key === 'w'){
        player.velocity.y = -15}
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
    }
})
