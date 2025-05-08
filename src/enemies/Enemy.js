class EnemySlime extends Phaser.GameObjects.Container{

    constructor(scene, x, y, id) {
        super(scene, x, y, []);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.points = [
            x, y,
            x, y + 200,
            x, y + 400,
            x, y + 600,
            x, y + 800,
            x, y + 1000

        ];

        this.curve = new Phaser.Curves.Spline(this.points); // enemy movement array
        this.enemySmile = scene.add.follower(this.curve, x, y, "Enemies", "slime.png");
        this.id = id;

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


