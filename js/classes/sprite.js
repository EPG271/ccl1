export default class Sprite {
    constructor({position, imageSrc, c}){
        this.position = position
        this.image = new Image()
        this.image.src = imageSrc
        this.c = c
    }

    draw(){
        if (!this.image) return
        this.c.drawImage(this.image, this.position.x, this.position.y)
    }

    update(){
        this.draw()
    }
}