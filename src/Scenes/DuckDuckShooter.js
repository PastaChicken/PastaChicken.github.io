class DuckDuckShooter extends Phaser.Scene{
    constructor() {
        super("duckScene");
        this.my = {sprite: {}};
        
        //movement
        this.keyA;
        this.keyD;
        //interactions
        this.keySpace;
        this.keyEnter;
        this.duckShootGroup;
        this.enemy2shootgroup;
        //enemies
        this.enemy;
        this.bulletGroup;
        this.groupEnemies1;
        this.totalEnemies;

        //only check for collistion for each specific wave
        this.collistion1 = false;
        this.collistion2 = false;
        this.collistion3 = false;
        this.collistion4 = false;
        //for enemy ai
        this.curve;
        this.playing;
        
        //score & timer
        this.score = 0;
        this.text = '';

        this.quack; //for Quack class
        //heath and gameover from hp variables
        this.health = 3;
        this.healthText;
        this.dead;
        this.finalScoreText;
        this.GameOverText;
        this.immuneframes;
        this.immune;

        
        
    }

    preload() { //======all assets currently using====
       // this.load.setPath("./assets/");
        

    }
    create() {
        let my = this.my;

        //===========background code===============
        this.map = this.add.tilemap("map", 32, 32, 16, 16);
        this.tileset = this.map.addTilesetImage("fishSpritesheet", "Pond");
        this.pondLayer = this.map.createLayer("PondLayer", this.tileset, 0, 0);
        this.pondLayer.setScale(1.5);
        this.boarderLayer = this.map.createLayer("BoarderLayer", this.tileset, 0, 0);
        this.boarderLayer.setScale(1.5);

        //==============Score=====================
        this.titleText = this.add.text(20, 25, "Score: ", {
            fontSize: 32
        });
        this.healthText = this.add.text(game.config.width / 1.5, game.config.height - 50, "", {
            fontSize: 32
        });

        this.GameOverText = this.add.text(game.config.width / 2, game.config.height / 2, "", {
            fontSize: 64
        });
        this.finalScoreText = this.add.text(game.config.width / 2, game.config.height / 2 + 50, "", {
            fontSize: 64
        });
        //========================================

        //path of enemies
        this.points = [
            20, 20,
            80, 400,
            450, 450
        ];

        this.curve = new Phaser.Curves.Spline(this.points); // enemy movement array

        //all necessary keys
        this.keyA = this.input.keyboard.addKey("A");
        this.keyD = this.input.keyboard.addKey("D");
        this.keyEnter = this.input.keyboard.addKey("ENTER");
        this.keySpace = this.input.keyboard.addKey("SPACE");
        


        this.duckShootGroup = new DuckShootGroup(this, "shot_blue_small.png");
        this.enemy2shootgroup = new Enemy2shootGroup(this, "shot_yellow_small.png");




        my.sprite.duck = new Duck(this, game.config.width/2, game.config.height - 40, "Ducks", "duck_yellow.png",
        this.keyA, this.keyD, 5);

        this.quack = new Quack(this, my.sprite.duck.x, my.sprite.duck.y - 20, "Ducks", "shot_blue_small.png", 
        this.keySpace, this.duckShootGroup);

        my.sprite.duck.angle = -90; //angled to look "up"
        this.immune = false;
       
        



         //needed to get amount of bullets in duckShootGroup class
         this.bulletGroup = this.duckShootGroup.getChildren();
         this.enemybulletGroup = this.enemy2shootgroup.getChildren();

        this.playing = false;

        //different group for each wave
        this.groupEnemies1 = this.add.group();
        this.groupEnemies2 = this.add.group();
        this.groupEnemies3 = this.add.group();
        this.groupEnemies4 = this.add.group();


        
        //wave one enemies=================
        for(let i = -300; i <= 300; i+= 150) {
            this.groupEnemies1.add(new EnemySlime(this, this.scale.width/2 + i, -20 - (i / 5), "enemy1"));

        }
        //===================================

        //wave 2 enemeis=====================

        for(let i = -300; i <=300; i+= 300) {
            this.groupEnemies2.add(new EnemySlime(this,this.scale.width/2 + i, -20, "enemy1")); 
        }
        this.groupEnemies2.add(new Enemy2(this,this.scale.width/2 + 150, -80, "Ducks", "shot_yellow_small.png", this.enemy2shootgroup, "enemy2")); 
        this.groupEnemies2.add(new Enemy2(this,this.scale.width/2 - 150, -80, "Ducks", "shot_yellow_small.png", this.enemy2shootgroup, "enemy2")); 
        
        //======Wave 3 enemies==============
        for(let i = -300; i <= 300; i+= 150) {
            this.groupEnemies3.add(new EnemySlime(this, this.scale.width/2 + i, -20 - (i / 5), "enemy1"));
        }
        this.groupEnemies3.add(new Enemy2(this,this.scale.width/2 + 200, -40, "Ducks", "shot_yellow_small.png", this.enemy2shootgroup, "enemy2")); 
        this.groupEnemies3.add(new Enemy2(this,this.scale.width/2 - 200, -40, "Ducks", "shot_yellow_small.png", this.enemy2shootgroup, "enemy2")); 
        this.groupEnemies3.add(new Enemy2(this,this.scale.width/2 + 100, -80, "Ducks", "shot_yellow_small.png", this.enemy2shootgroup, "enemy2")); 
        this.groupEnemies3.add(new Enemy2(this,this.scale.width/2 - 100, -80, "Ducks", "shot_yellow_small.png", this.enemy2shootgroup, "enemy2")); 
        //==================================

        //======Wave 4 enemies==============
        for(let i = -300; i <= 300; i+= 150) {
            this.groupEnemies4.add(new EnemySlime(this, this.scale.width/2 + i, -20 - (i / 5), "enemy1"));
        }
        this.groupEnemies4.add(new Enemy2(this,this.scale.width/2 + 200, -40, "Ducks", "shot_yellow_small.png", this.enemy2shootgroup, "enemy2")); 
        this.groupEnemies4.add(new Enemy2(this,this.scale.width/2 - 200, -40, "Ducks", "shot_yellow_small.png", this.enemy2shootgroup, "enemy2")); 
        this.groupEnemies4.add(new Enemy2(this,this.scale.width/2 + 100, -80, "Ducks", "shot_yellow_small.png", this.enemy2shootgroup, "enemy2")); 
        this.groupEnemies4.add(new Enemy2(this,this.scale.width/2 - 100, -80, "Ducks", "shot_yellow_small.png", this.enemy2shootgroup, "enemy2")); 
        //==================================
    
        this.totalEnemies = this.groupEnemies1.getChildren();

        for (const member of this.groupEnemies1.getChildren()) {
            member.enemySmile.visible = false;
            member.enemySmile.active = false;
        }
        for (const member of this.groupEnemies2.getChildren()) {
            member.enemySmile.visible = false;
            member.enemySmile.active = false;
        }

        for (const member of this.groupEnemies3.getChildren()) {
            member.enemySmile.visible = false;
            member.enemySmile.active = false;
        }
        for (const member of this.groupEnemies4.getChildren()) {
            member.enemySmile.visible = false;
            member.enemySmile.active = false;
        }

        this.text = this.add.text(32, 32);
        this.healthText.setText("Health: " + this.health + "/3");

        //timer for length of level
        this.timedEvent = this.time.delayedCall(20000, this.onEvent, [], this);


        //wave one
        this.waveOne = this.time.delayedCall(1000, this.waveOne, [], this);
        this.waveTwo = this.time.delayedCall(5000, this.waveTwo, [], this);
        this.waveThree = this.time.delayedCall(9000, this.waveThree, [], this);
        this.waveFour = this.time.delayedCall(14000, this.waveFour, [], this);

    }
    

    update() {
        let my = this.my;

        //testing for length
       // this.text.setText(`Event.progress: ${this.timedEvent.getProgress().toString().substr(0, 4)}`);
    
        //
        if(this.health > 0) {
             //movement calling from Duck.js
             my.sprite.duck.update();

             //shooting passing the ducks current x & y position
             this.quack.update(my.sprite.duck.x, my.sprite.duck.y);
        }

            //collistion with bullet & enemies
            for(let bullet in this.bulletGroup) {
                if(this.quack.duckShootGroup.children.entries[bullet].active) { 
                    //right now big O is (n^2 / 30 - # of active bullets) dunno if i can make it more efficent (each wave new check b/c differnt group)
                    if(this.collistion1) {
                      this.checkCollistion(this.groupEnemies1, bullet);                      
                    }
                    if(this.collistion2) {
                        this.checkCollistion(this.groupEnemies2, bullet);
                    }
                    if(this.collistion3) {
                        this.checkCollistion(this.groupEnemies3, bullet);
                    }
                    if(this.collistion4) {
                        this.checkCollistion(this.groupEnemies4, bullet);

                    }
                 }
            }

            //enemy bullet collistion
            this.enemyBulletCollistion(this.enemy2shootgroup);

            
           if(this.dead) {
            this.GameOverText.setText("GAME OVER");
            this.finalScoreText.setText(this.score);

           }

           
        
    }

    //end wave ending
    onEvent ()
    {
        this.scene.start("menuScene");

    }

    //spawn wave one enable collistion check
    waveOne () {

        for (const member of this.groupEnemies1.getChildren()) {
    
            member.update();

            }
            this.collistion1 = true;
    }
    
    //spawn wave 2 enable collistion check
    waveTwo() {
        for (const member of this.groupEnemies2.getChildren()) {
    
            member.update();
            }
            this.collistion2 = true;
            
            //enemy2 shooting timer
            this.slimeShoot = this.time.delayedCall(1000, this.slimeShoot, [], this);

    }
    
    //spawn wave 3 enable collistion check
    waveThree() {
        for (const member of this.groupEnemies3.getChildren()) {
    
            member.update();
            }
            this.collistion3 = true;
            this.collistion1 = false;

            //enemy2 shooting timer
            this.slimeShoot2 = this.time.delayedCall(1000, this.slimeShoot2, [], this);
    }

    //spawn wave 4 enable collistion check
    waveFour() {
        for (const member of this.groupEnemies3.getChildren()) {
    
            member.update();
            }
            this.collistion4 = true;
            this.collistion2 = false;

            //enemy2 shooting timer
            this.slimeShoot3 = this.time.delayedCall(1000, this.slimeShoot3, [], this);
    }

    //Enemy2 shoot function
    
    slimeShoot() {

        for (const member of this.groupEnemies2.getChildren()) {
            if(member.id == "enemy2") {
                let group = member.getGroup();
                group.slimeLaser(member.enemySmile.x, member.enemySmile.y);
            }
            
            }
    }
    slimeShoot2() {
        for (const member of this.groupEnemies3.getChildren()) {
            if(member.id == "enemy2") {
                let group = member.getGroup();
                group.slimeLaser(member.enemySmile.x, member.enemySmile.y);
            }
            
            }
    }
    slimeShoot3() {
        for (const member of this.groupEnemies4.getChildren()) {
            if(member.id == "enemy2") {
                let group = member.getGroup();
                group.slimeLaser(member.enemySmile.x, member.enemySmile.y);
            }
            
            }
    }

    //collisition function
    collides(a, b) {
        if (Math.abs(a.x - b.x) > (a.displayWidth/2 + b.displayWidth/2)) return false;
        if (Math.abs(a.y - b.y) > (a.displayHeight/2 + b.displayHeight/2)) return false;
        return true;
    }

    checkCollistion(group, bullet) {
        for(const member of group.getChildren()){
            if(this.collides(this.quack.duckShootGroup.children.entries[bullet], member.enemySmile))
                {
                this.quack.duckShootGroup.children.entries[bullet].setActive(false);
                this.quack.duckShootGroup.children.entries[bullet].setVisible(false);
                member.enemySmile.visible = false;
                member.enemySmile.active = false;
                member.enemySmile.y = -100;
                this.score += 50;
                this.titleText.setText("Score: " + this.score);

                 }
         }
    }
    enemyBulletCollistion(group) {
        for(let bullet in this.enemybulletGroup) {
            if(group.children.entries[bullet].active) {
                if(this.collides(this.my.sprite.duck, group.children.entries[bullet])) {
                    group.children.entries[bullet].y = -100;
                    group.children.entries[bullet].setActive(false);
                    group.children.entries[bullet].setVisible(false);

                   
                    --this.health;
                    
                    

                    if(this.health == 0) {
                        this.dead = true;
                    }
                    this.healthText.setText("Health: " + this.health + "/3");
                }
            }
        }
    }

    immuneFrames() {
    this.immune = false
    }
    /* 
            for(let bullet in this.enemybulletGroup) {
                if(this.enemy2shootgroup.children.entries[bullet].active) {
                    if(this.collides(my.sprite.duck, this.enemy2shootgroup.children.entries[bullet])) {
                        --this.health;
                        if(this.health == 0) {
                            this.dead = true;
                        }
                        this.enemy2shootgroup.children.entries[bullet].setActive(false);
                        this.enemy2shootgroup.children.entries[bullet].setVisible(false);
                        this.healthText.setText("Health: " + this.health + "/3");
                    }
                }
            }
            */

}