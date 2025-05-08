class Duck extends Phaser.GameObjects.Sprite {

    
    constructor(scene, x, y, texture, frame, leftKey, rightKey, playerSpeed) {
        super(scene, x, y, texture, frame);

        this.keyA = leftKey;
        this.keyD = rightKey;
        this.playerSpeed = playerSpeed;

        scene.add.existing(this);

        return this;
    }

    update() {
        // Moving left
        if (this.keyA.isDown) {
            // Check to make sure the sprite can actually move left
            if (this.x > (this.displayWidth/2) + 40) {
                this.x -= this.playerSpeed;
            }
        }

        // Moving right
        if (this.keyD.isDown) {
            // Check to make sure the sprite can actually move right
            if (this.x < (game.config.width - (this.displayWidth/2) - 100)) {
                this.x += this.playerSpeed;
            }
        }
    }

}