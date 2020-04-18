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
    this.anims.create({
      key: "player_anim",
      frames: this.anims.generateFrameNumbers("player", { start: 0, end: 3 }),
      frameRate: 7,
      repeat: -1
    });
    this.anims.create({
      key: "skeleton_anim",
      frames: this.anims.generateFrameNumbers("skeleton", { start: 0, end: 3 }),
      frameRate: 7,
      repeat: -1
    });
    
    this.scene.start('MainScene');
  }
}
