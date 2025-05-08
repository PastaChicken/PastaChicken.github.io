class MenuScene extends Phaser.Scene{
    constructor() {
        super("menuScene");
        this.keyEnter;
    }

    create() {
        let menuscreen = this.add.image(0, 0, "menu screen").setOrigin(0);
        menuscreen.setScale(2);

        this.keyEnter = this.input.keyboard.addKey("ENTER");

        this.titleText = this.add.text(20, 50, "Press ENTER to Start", {
            fontSize:72,
        });

        this.userHelp = this.add.text(100, 400, "Press Space to shoot!", {
            fontSize:32,
        });

        this.titleText.textTween = this.tweens.add({
            targets: this.titleText,
            duration:1000,
            repeat: -1,
            yoyo: true,
            alpha:0
        })
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(this.keyEnter)) {
            this.scene.start("duckScene");
        }
    }
}