export default class EndBlock {
    constructor({position, c}) {
        this.position = position
        this.width = 90.5
        this.height = 90
        this.c = c
    }

    draw() {
        //console.log(`Drawing fly collectable at(${this.position.x}, ${this.position.y})`);
        //this.c.fillStyle = "yellow";
        //this.c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.draw();
    }

    checkCollision(player) {
        return (
            player.position.x < this.position.x + this.width &&
            player.position.x + player.width > this.position.x &&
            player.position.y < this.position.y + this.height &&
            player.position.y + player.height > this.position.y
        );
    }
}

export { EndBlock };