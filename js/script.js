import Sprite from "./classes/sprite.js";
import Player from "./classes/player.js";
import { branchCollisions } from "./data/collisions.js";
import CollisionBlock from "./classes/CollisionBlock.js";
import BranchCollisionBlock from "./classes/BranchCollisionBlock.js";
import FlyCollectableBlock from "./utils/flycollect.js";
import { flyCollectables } from "./data/collisions.js";
import EndBlock from "./utils/end.js";
import { End } from "./data/collisions.js";

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1889;
canvas.height = 930;

console.log('Initializing canvas and context');

const floorCollisions2D = []
for (let i = 0; i < branchCollisions.length; i += 20) {
    floorCollisions2D.push(branchCollisions.slice(i, i + 20))
}

const collisionBlocks = []

floorCollisions2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if (symbol === 1) {
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
for (let i = 0; i < branchCollisions.length; i += 20) {
    branchCollisions2D.push(branchCollisions.slice(i, i + 20))
}

const branchCollisionBlocks = []
branchCollisions2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if (symbol === 2) {
            console.log('draw a branch')
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

const flyCollectable2D = []
for (let i = 0; i < flyCollectables.length; i += 20) {
    flyCollectable2D.push(flyCollectables.slice(i, i + 20))
}

const flyCollectableBlocks = [];
flyCollectable2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if (symbol === 3) {
            let flycolls = new FlyCollectableBlock({
                position: {
                    y: y * 90,
                    x: x * 90,
                    c: c,
                }
            });

            flyCollectableBlocks.push(flycolls);
            flycolls.draw();
        }
    });
});

const End2D = []
for (let i = 0; i < End.length; i += 20) {
    End2D.push(End.slice(i, i + 20))
}

const EndBlocks = [];
End2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if (symbol === 4) {
            let endcolls = new EndBlock({
                position: {
                    y: y * 90,
                    x: x * 90,
                    c: c,
                }
            });

            EndBlocks.push(endcolls);
            endcolls.draw();
            console.log('Drawing End')
        }
    });
});


console.log(End2D)

console.log(`Total CollisionBlocks created ${collisionBlocks.length}`)

const gravity = 0.3

const keys = {
    d: {
        pressed: false,
    },
    a: {
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

const grassdetail = new Sprite({
    position: {
        x: 0,
        y: 225,
    },
    imageSrc: './img/grassdetailcr.png',
    c: c
})

export const fly = new Sprite({
    position: {
        x: 45,
        y: 550,
    },
    imageSrc: './img/fly.png',
    c: c
})

export const flag = new Sprite({
    position: {
        x: 1600,
        y: 100,
    },
    imageSrc: './img/flag.png',
    c: c
})

export const skybackground = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    imageSrc: './img/skybackground.png',
    c: c
})

const camera = {
    position: {
        x: 0,
        y: 0,
    }
}

function showStartScreen() {
    const startScreen = document.getElementById('start-screen');
    const startButton = document.getElementById('start-button');

    startButton.addEventListener('click', () => {
        startScreen.style.display = 'none';
        console.log('Start button clicked');
        initGame();
    });
}

window.addEventListener('load', showStartScreen);

function initGame() {
    console.log('Game initializing');
    const player = new Player({
        position: {
            x: 50,
            y: 3200,
        },
        imageSrc: './img/spritesheet_idle.png',
        canvas: canvas,
        c: c,
        gravity: gravity,
        scale: 0.333333333333,
        collisionBlocks: collisionBlocks,
        branchCollisionBlocks: branchCollisionBlocks,
        flyCollectableBlocks: flyCollectableBlocks,
        EndBlocks: EndBlocks,

        animations: {
            Idle: {
                imageSrc: './img/spritesheet_idle.png',
                frameRate: 8,
                frameBuffer: 15,
                scale: 1,
                image: new Image(),
            },
            Runright: {
                imageSrc: './img/spritesheet_run.png',
                frameRate: 8,
                frameBuffer: 25,
                scale: 1,
                image: new Image(),
            },
            Runleft: {
                imageSrc: './img/spritesheet_runleft.png',
                frameRate: 8,
                frameBuffer: 25,
                scale: 1,
                image: new Image(),
            },
            Jump: {
                imageSrc: './img/spritesheet_jump.png',
                frameRate: 1,
                frameBuffer: 25,
                scale: 1,
                image: new Image(),
            },
            Fall: {
                imageSrc: './img/spritesheet_fall.png',
                frameRate: 3,
                frameBuffer: 15,
                scale: 1,
                image: new Image(),
            },
        }
    });

    window.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'd':
                keys.d.pressed = true;
                break;
            case 'a':
                keys.a.pressed = true;
                break;
        }
        if ((event.code === 'Space' || event.key === 'w') && player.velocity.y === 0) {
            player.velocity.y = -15;
            console.log(player.velocity.y);
            player.shouldPanCameraUp({ canvas, camera });
        }
    });

    console.log(`Player initialized with image source: ${player.image.src}`);

    animate(player);
}

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;
    }

});

function animate(player) {
    //console.log(`Velocity: ${player.velocity.y}`)
    if (!player.loaded) {
        requestAnimationFrame(() => animate(player));
        return;
    }

    window.requestAnimationFrame(() => animate(player));
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);

    c.save();
    c.scale(1.05, 1);
    c.translate(0, -player.cameraBox.position.y + 300);
    skybackground.update();
    background.update();

    player.update();
    collisionBlocks.forEach(CollisionBlock => {
        CollisionBlock.update();
    });

    branchCollisionBlocks.forEach(BranchCollisionBlock => {
        BranchCollisionBlock.update();
    });

    flyCollectableBlocks.forEach(FlyCollectableBlock => {
        FlyCollectableBlock.update();
    });

    if (fly.visible) {
        fly.update();
    }

    EndBlocks.forEach(EndBlock => {
        EndBlock.update();
    });

    if (flag.visible) {
        flag.update();
    }

    grassdetail.update();

    player.velocity.x = 0;
    if (keys.d.pressed) {
        player.switchSprite('Runright');
        player.velocity.x = 6;
    } else if (keys.a.pressed) {
        player.switchSprite('Runleft');
        player.velocity.x = -6;
    } else if (player.velocity.y === 0) {
        player.switchSprite('Idle');
    }

    if (player.velocity.y < 0) player.switchSprite('Jump');
    else if (player.velocity.y > 0) player.switchSprite('Fall');

    c.restore();
}



