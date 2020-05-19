
export default class Restart extends Phaser.Scene {
    background: Phaser.GameObjects.TileSprite;
    height: number;
    width: number;
    gameOver: Phaser.GameObjects.BitmapText;
    restart: Phaser.GameObjects.Image;
    currentScene: string;

    constructor() {
        super({ key: 'Restart' });
    }

    init(data) {
        this.currentScene = data.currentScene;
      }

    create() {

        this.height = <number>this.game.config.height;
        this.width = <number>this.game.config.width;

        this.gameOver = this.add.bitmapText(200, this.height/2, "pixelFont", "Add Up All Your Pieces and Try Again!", 40);

        this.restart = this.add.image(this.width/2, this.height - 250, "fightbtn");
        this.restart.setInteractive().on('pointerdown', ()=> {
            let oldLevel = this.scene.get(this.currentScene);
            oldLevel.scene.restart();
            this.scene.stop("Restart");
        }, this);


    }

    update() {

    }
}