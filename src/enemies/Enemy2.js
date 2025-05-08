class Enemy2 extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, x, y, texture, frame, enemy2shootGroup, id) {
        super(scene, x, y, texture, frame, []);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.points = [
            x, y,
            x + 200, y + 200,
            x - 200, y + 400,
            x + 200, y + 600,
            x - 200, y + 800,
            x + 200, y + 1000

        ];

        this.enemy2shootGroup = enemy2shootGroup;
        this.curve = new Phaser.Curves.Spline(this.points); // enemy movement array
        this.enemySmile = scene.add.follower(this.curve, x, y, "Enemies", "slimeGreen.png");
        this.id = id;

        return this;
    }

    getGroup() { // getter
        return this.enemy2shootGroup;
    }

    slimeFire(x, y) {
        this.body.reset(x, y);
        this.setActive(true);
        this.setVisible(true);
        this.setVelocityY(400);
    }

    

   
    check() {
        if(this.y <= 0) {
            this.setActive(false);
            this.setVisible(false);
        }

    }
        
    

    update() {
        

     

            
            
            this.enemySmile.visible = true;
            this.enemySmile.active = true;

            this.enemySmile.startFollow({
                from: 0,
                to: 1,
                delay: 0,
                duration: 6000,
                ease: 'Sine.easeInOut',
                repeat: 0,
                yoyo: false,
                rotateToPath: false,
                rolationOffset: -90

            });


        
    }

}

class Enemy2shootGroup extends Phaser.Physics.Arcade.Group{
    constructor(scene, frame) {
        super(scene.physics.world, scene);
        this.createMultiple({
            classType: Enemy2,
            frameQuantity: 20,
            active: false,
            visible: false,
            key: 'Ducks',
            frame: frame,

        })
        

    }
    slimeLaser(x, y) {
        const bullet = this.getFirstDead(false);
        if(bullet) {
            bullet.slimeFire(x, y);
        }
    }
    
}

