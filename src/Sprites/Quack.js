class Quack extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame, Space, duckShootGroup) {        
        super(scene, x, y, texture, frame);

        this.duckx = x;
        this.ducky = y;
        this.duckShootGroup = duckShootGroup;
        this.keySpace = Space;
       // scene.add.existing(this);

        return this;
        
        
    }

    fire(x, y) {
        this.body.reset(x, y);
        this.setActive(true);
        this.setVisible(true);
        this.setVelocityY(-800);
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        if(this.y <= 0) {
            this.setActive(false);
            this.setVisible(false);
        }

    }


    

    update(duckx, ducky) {
        if(Phaser.Input.Keyboard.JustDown(this.keySpace)) {
            this.duckShootGroup.firelaser(duckx - 20, ducky - 30);
        }
       
        
    }

}

class DuckShootGroup extends Phaser.Physics.Arcade.Group{
    constructor(scene, frame) {
        super(scene.physics.world, scene);
        this.createMultiple({
            classType: Quack,
            frameQuantity: 10,
            active: false,
            visible: false,
            key: 'Ducks',
            frame: frame,

        })
        

    }
    firelaser(x, y) {
        const bullet = this.getFirstDead(false);
        if(bullet) {
            bullet.fire(x, y);
        }
    }
    
}
