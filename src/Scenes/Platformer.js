class Platformer extends Phaser.Scene {
    constructor() {
        super("platformerScene");
    }

    init() {
        // variables and settings
        this.physics.world.gravity.y = 1500;
        this.camera = this.cameras.main;
        this.backgroundx = 16 * 80;
        this.backgroundy = 16 * 20;
        this.SCALE = 2.81;
        this.walkJuice;
        this.jumpJuice;
        this.endZone = false;
        this.keyE;

        
    }

    create() {
        // Create a new tilemap game object which uses 16x16 pixel tiles, and is
        // 80 tiles wide and 20 tiles tall.
        this.map = this.add.tilemap("monochrome_level_1", 16, 16, 80, 20);

        // Add a tileset to the map
        // First parameter: name we gave the tileset in Tiled
        // Second parameter: key for the tilesheet (from this.load.image in Load.js)
        this.tileset = this.map.addTilesetImage("MonoChrome-Tileset", "monochrome");

        // Create a layer
        this.platformLayer = this.map.createLayer("Platform-Layer", this.tileset, 0, 0);
      //  this.platformLayer.setScale(2.0);
       

        // Make it collidable
        this.platformLayer.setCollisionByProperty({
            collide: true
        });

        
        

        this.keyE = this.input.keyboard.addKey("E");


        //===================particles for player=======================
        this.walkJuice = this.add.particles(0, 0, "kenny-particles", {
            frame: ['smoke_03.png', 'smoke_09.png'],

            random: true,
            scale: {start: 0.015, end: 0.05},
            maxAliveParticles: 10,

            lifespan: 200,
           gravityY: -400,
            alpha: {start: 1, end: 0.1}, 
        });

        this.jumpJuice = this.add.particles(0, 0, "kenny-particles", {
            frame: {frames: ['circle_01.png', 'circle_04.png'], cycle: true},
            scaleY: 0.025,
            lifespan: 100,
            //advance: 8,
            delay: 50,
            random: false,
            //speed: 150,
            duration: 200,
            quality: 1,
            blendMode: 'ADD',
            frequency: 50,
            alpha: {start: 1, end: 0.1}, 
            scaleX: {start: 0.05, end: 0.2},


        });
        //============CheckPoint code===============================

        this.endGoal1 = this.map.createFromObjects("Objects", {
            name: "EndGoal1",
            key: "monoChrome_sheet",
            frame: 52,
            scale: 2.0,
        });
        this.endGoal2 = this.map.createFromObjects("Objects", {
            name: "EndGoal2",
            key: "monoChrome_sheet",
            frame: 32,
            scale: 2.0,
        });

        this.endGoal3 = this.map.createFromObjects("Objects", {
            name: "EndGoal3",
            key: "monoChrome_sheet",
            frame: 12,
            scale: 2.0,
        });

    
        this.physics.world.enable(this.endGoal1, Phaser.Physics.Arcade.STATIC_BODY);
        this.physics.world.enable(this.endGoal2, Phaser.Physics.Arcade.STATIC_BODY);
        this.physics.world.enable(this.endGoal3, Phaser.Physics.Arcade.STATIC_BODY);


        this.endGoalGroup = this.add.group(this.endGoal1);
        this.endGoalGroup2 = this.add.group(this.endGoal2);
        this.endGoalGroup3 = this.add.group(this.endGoal3);

        this.arrGroup = [this.endGoalGroup, this.endGoalGroup2, this.endGoalGroup3];

        //======================================================================

        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();

        //create sprite player from Player class function
         my.sprite.player = new Player(this, game.config.width/30 - 20, game.config.height/6,
            "platformer_characters", "tile_0000.png", cursors, this.walkJuice, this.jumpJuice);


            //dont know why but creates 2 so make this one invisible use getPlayer() for class one
        my.sprite.player.visible = false;

        this.physics.add.collider(my.sprite.player.getPlayer(), this.platformLayer);


        //add collision detection for checkpoint end of the level to move to next level or quit
        for(let group of this.arrGroup) {
            this.physics.add.overlap(my.sprite.player.getPlayer(), group, (obj1, obj2) => {
                //win condition
                this.setEndpoint();
        
            });
        }
        
        

        
      


        // debug key listener (assigned to D key) 
        /* for testing
        this.input.keyboard.on('keydown-D', () => {
            this.physics.world.drawDebug = this.physics.world.drawDebug ? false : true
            this.physics.world.debugGraphic.clear()
        }, this);
        */

       this.physics.world.drawDebug = this.physics.world.drawDebug ? false : true
            this.physics.world.debugGraphic.clear()

        //camera details for level
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels * 2, this.map.heightInPixels);
        this.cameras.main.startFollow(my.sprite.player.getPlayer(), true, 0.25, 0.25); // (target, [,roundPixels][,lerpX][,lerpY])
        this.cameras.main.setDeadzone(50, 50);
        this.cameras.main.setZoom(this.SCALE);

        window.scene = this;




    }

    update() {
        //run player movement
        my.sprite.player.update();

        //end of level condition
        if(Phaser.Input.Keyboard.JustDown(this.keyE) && this.endZone) {
            this.scene.start("menuScene");
            this.endZone = false;
        }

    }

    //once player reaches the end of level (changed to false upon falling after getting checkpoint)
    setEndpoint() {
        this.endZone = true;
    }


    
}