export default class BranchCollisionBlock {
    constructor({position, c}){
        this.position = position
        this.width = 90.5
        this.height = 70
        this.c = c
    }

    draw(){
        //console.log(`Drawing block at(${this.position.x}, ${this.position.y})`);
        //this.c.fillStyle = "green";
        //this.c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update(){
        this.draw();
    }
}
export {BranchCollisionBlock}