class Player extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, texture, frame, cursors, particles, jumpParticles) {
        super(scene, x, y, texture, frame);
       
        this.ACCELERATION = 250;
        this.DECELERATION = 1000; //used for quick turn around when pressing opposite movement key
        this.DRAG = 3000;
        this.JUMP_VELOCITY = -450;
        this.MAX_SPEED = 600;
        this.x = x;
        this.y = y;
        this.SCALE = .8;

        this.player = scene.physics.add.sprite(x, y, texture, frame);
        this.player.setScale(this.SCALE);
        this.cursors = cursors;
        this.doubleJump = true;
        this.particles = particles;
        this.jumpParticles = jumpParticles;
        this.PARTICLE_VELOCITY = 50;


        scene.add.existing(this);

        return this;
    }

    getPlayer() {
        return this.player;
    }

    update() {

        //player movement left
        if(cursors.left.isDown) {
            this.player.resetFlip();
            this.player.anims.play('walk', true);
            if(this.player.body.velocity.x > 0) {
                this.player.body.setAccelerationX(-(this.ACCELERATION + this.DECELERATION));
            } else {
                this.player.body.setAccelerationX(-this.ACCELERATION);

                if(this.player.body.velocity.x < -this.MAX_SPEED) {
                    this.player.body.velocity.x = -this.MAX_SPEED;

                }

            }
            
            //juice stuff
            this.player.setAngle(-5);
            this.particles.startFollow(this.player, this.player.displayWidth/2, this.player.displayHeight/2, false);

            this.particles.setParticleSpeed(this.PARTICLE_VELOCITY, 0);
            if (this.player.body.blocked.down) {

                this.particles.start();

            }

        } 
        //player movement right
        else if(cursors.right.isDown) {

            this.player.setFlip(true, false);
            this.player.anims.play('walk', true);

            if(this.player.body.velocity.x < 0) {
                this.player.body.setAccelerationX((this.ACCELERATION + this.DECELERATION));
            } else {
                this.player.body.setAccelerationX(this.ACCELERATION);

                if(this.player.body.velocity.x > this.MAX_SPEED) {
                    this.player.body.velocity.x = this.MAX_SPEED;
                }

            }
            
            //juice stuff
            this.player.setAngle(5);
            this.particles.startFollow(this.player, this.player.displayWidth/2-20, this.player.displayHeight/2, false);

            this.particles.setParticleSpeed(this.PARTICLE_VELOCITY, 0);

            // Only play smoke effect if touching the ground

            if (this.player.body.blocked.down) {

                this.particles.start();

            }

        } 

        //idle
        else {

            this.player.body.setAccelerationX(0);
        this.player.body.setDragX(this.DRAG);
            this.player.anims.play('idle');

            //juice stuff
            this.player.setAngle(0);
            this.particles.stop();


        }

        // player jump
        // note that we need body.blocked rather than body.touching b/c the former applies to tilemap tiles and the latter to the "ground"
        
        if(!this.player.body.blocked.down) {
            this.player.anims.play('jump');
            this.player.setScale(this.SCALE);
            this.particles.stop();

        }

        if(this.player.body.blocked.down && Phaser.Input.Keyboard.JustDown(cursors.up)) {
            this.jumpParticles.emitParticleAt(this.player.x , this.player.y + 5);
            this.player.body.setVelocityY(this.JUMP_VELOCITY);
            this.doubleJump = true;
            this.player.setScale(this.SCALE * 1.2, this.SCALE);
            scene.sound.play('jumpSFX');
            

           
            
        }

        //double jump
        if(!this.player.body.blocked.down && this.doubleJump && Phaser.Input.Keyboard.JustDown(cursors.up)) {
            if(this.player.body.velocity.y < this.JUMP_VELOCITY) {
                this.player.body.setVelocityY(this.JUMP_VELOCITY + this.player.body.velocity.y);
            } else {
                this.player.body.setVelocityY(this.JUMP_VELOCITY);

            }

            this.doubleJump = false;
            //jump juice!
            this.jumpParticles.emitParticleAt(this.player.x, this.player.y + 15);
            scene.sound.play('jumpSFX');

        }

        if(this.player.body.blocked.down) {
            this.doubleJump = true;

        }
        


        
        if(this.player.body.y > 900) {
            this.player.body.x = this.x;
            this.player.body.y = this.y;
            this.player.body.velocity.x = 0;
            this.player.body.velocity.y = 0;
            scene.endZone = false;
            this.doubleJump = true;


        }
    }

}