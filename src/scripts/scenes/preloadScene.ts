export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    this.load.tilemapTiledJSON('tutorial', './assets/maps/map.json');
    this.load.image('tiles', './assets/tileSets/tutorialTileSet.png');

    let loadingBar = this.add.graphics({
      fillStyle : {
        color : 0xffffff
      }
    })

    this.load.on("progress", (percent)=>{
      console.log(percent);
    })
    this.load.image("background" , "assets/environment-background.png");
    this.load.spritesheet("player", "assets/WizSheet.png",{
      frameWidth:32,
      frameHeight:32
    });
    this.load.spritesheet("skeleton", "assets/Enemies/skeleton.png",{
      frameWidth:16,
      frameHeight:16
    });
  }

  create() {
    this.scene.start('MainScene');
  }
}
