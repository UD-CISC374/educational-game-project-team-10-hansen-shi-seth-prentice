export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    this.load.tilemapTiledJSON('tutorial', './assets/maps/map.json');
    this.load.tilemapTiledJSON('ti', './assets/maps/testmap5.json')
    this.load.image('tiles', './assets/tileSets/tutorialTileSet.png');
    this.load.image('tileset', './assets/tileSets/tiles.png');
    this.load.bitmapFont("pixelFont", "assets/fonts/font.png", "assets/font.xml");
    

    //for loading screen later, don't mind him
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
    this.load.spritesheet("cry1", "assets/Crystal_1.png",{
      frameWidth:32,
      frameHeight:32
    });
    this.load.spritesheet("cry2", "assets/Crystal_1.png",{
      frameWidth:32,
      frameHeight:32
    });
    this.load.spritesheet("cry3", "assets/Crystal_1.png",{
      frameWidth:32,
      frameHeight:32
    });
    this.load.spritesheet("cry4", "assets/Crystal_1.png",{
      frameWidth:32,
      frameHeight:32
    });
    this.load.spritesheet("cry5", "assets/Crystal_1.png",{
      frameWidth:32,
      frameHeight:32
    });
    this.load.spritesheet("cry6", "assets/Crystal_1.png",{
      frameWidth:32,
      frameHeight:32
    });
    this.load.spritesheet("cry7", "assets/Crystal_1.png",{
      frameWidth:32,
      frameHeight:32
    });
    this.load.spritesheet("cry8", "assets/Crystal_1.png",{
      frameWidth:32,
      frameHeight:32
    });
    this.load.spritesheet("cry9", "assets/Crystal_1.png",{
      frameWidth:32,
      frameHeight:32
    });
    this.load.spritesheet('fireball', "assets/Enemies/fire-ball.png",{
      frameWidth:16,
      frameHeight:16
    });
    this.load.image("platform", "assets/platforms/map.png");
    this.load.image("gem", "assets/crystals/emerald.png");
    this.load.image("heart", "assets/heart.png");
    this.load.image("fightbtn", "assets/fightbutton.png");

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
    this.anims.create({
      key: "cry1_anim",
      frames: this.anims.generateFrameNumbers("cry1", { start: 0, end: 3 }),
      frameRate: 7,
      repeat: -1
    });
    this.anims.create({
      key: "cry2_anim",
      frames: this.anims.generateFrameNumbers("cry2", { start: 0, end: 3 }),
      frameRate: 7,
      repeat: -1
    });
    this.anims.create({
      key: "cry3_anim",
      frames: this.anims.generateFrameNumbers("cry3", { start: 0, end: 3 }),
      frameRate: 7,
      repeat: -1
    });
    this.anims.create({
      key: "cry4_anim",
      frames: this.anims.generateFrameNumbers("cry4", { start: 0, end: 3 }),
      frameRate: 7,
      repeat: -1
    });
    this.anims.create({
      key: "cry5_anim",
      frames: this.anims.generateFrameNumbers("cry5", { start: 0, end: 3 }),
      frameRate: 7,
      repeat: -1
    });
    this.anims.create({
      key: "cry6_anim",
      frames: this.anims.generateFrameNumbers("cry6", { start: 0, end: 3 }),
      frameRate: 7,
      repeat: -1
    });
    this.anims.create({
      key: "cry7_anim",
      frames: this.anims.generateFrameNumbers("cry7", { start: 0, end: 3 }),
      frameRate: 7,
      repeat: -1
    });
    this.anims.create({
      key: "cry8_anim",
      frames: this.anims.generateFrameNumbers("cry8", { start: 0, end: 3 }),
      frameRate: 7,
      repeat: -1
    });
    this.anims.create({
      key: "cry9_anim",
      frames: this.anims.generateFrameNumbers("cry9", { start: 0, end: 3 }),
      frameRate: 7,
      repeat: -1
    });
    this.anims.create({
      key: "fireball_anim",
      frames: this.anims.generateFrameNumbers("fireball", { start: 0, end: 2 }),
      frameRate: 12,
      repeat: -1
    });
    
    
    this.scene.start('MainScene');
  }
}
