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
  }

  create() {
    this.scene.start('MainScene');
  }
}
