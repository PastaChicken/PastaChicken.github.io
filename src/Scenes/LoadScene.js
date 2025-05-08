class LoadScene extends Phaser.Scene {
    constructor() {
       super("loadScene");
    }

    Init() {

    }

    preload() {
        this.load.setPath("./assets/");
        this.load.atlasXML("Ducks", "spritesheet_objects.png", "spritesheet_objects.xml");
        this.load.atlasXML("Enemies", "enemies.png", "enemies.xml");
        this.load.image("Pond", "fishSpritesheet.png");
        this.load.tilemapTiledJSON("map", "PondMap.json");
        document.getElementById('description').innerHTML = '<h2>DuckDuckShooter<br>'
        this.load.image("menu screen", "DuckDuckShooter.png")
    let loadingBar = this.add.graphics({
        fillStyle: {
            color: 0xffffff
        }
     })


     

     this.load.on("progress", (percent)=>{

        loadingBar.fillRect(0, game.config.height /2, game.config.width * percent, 50);
        console.log(percent);
     })

     this.load.on("complete", ()=>{
        this.scene.start("menuScene");
     })
    }

    
}