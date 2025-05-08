let config = {
    parent: 'phaser-game',
    type: Phaser.CANVAS,
    render: {
        pixelArt: true  // prevent pixel art from getting blurred when scaled
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    width: 1024,
    height: 800,
    scene: [LoadScene, MenuScene, DuckDuckShooter]
    }
    
    const game = new Phaser.Game(config);