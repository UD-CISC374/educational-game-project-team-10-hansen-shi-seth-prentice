export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    
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
    this.load.image("groundback", "assets/background.png");
    this.load.image("crystal_button1" , "assets/crystals/Crys_1.png");
    this.load.image("crystal_button2" , "assets/crystals/Crys_2.png");
    this.load.image("crystal_button3" , "assets/crystals/Crys_3.png");
    this.load.image("crystal_button4" , "assets/crystals/Crys_4.png");
    this.load.image("crystal_button5" , "assets/crystals/Crys_5.png");
    this.load.image("crystal_button6" , "assets/crystals/Crys_6.png");
    this.load.image("crystal_button7" , "assets/crystals/Crys_7.png");
    this.load.image("crystal_button8" , "assets/crystals/Crys_8.png");
    this.load.image("crystal_button9" , "assets/crystals/Crys_9.png");
    this.load.spritesheet("player", "assets/WizSheet.png",{
      frameWidth:32,
      frameHeight:32
    });
    this.load.spritesheet("skeleton", "assets/Enemies/skeleton.png",{
      frameWidth:16,
      frameHeight:16
    });
    this.load.spritesheet("bat", "assets/Enemies/bat.png", {
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.spritesheet("cry1", "assets/crystals/Crystal_1.png",{
      frameWidth:32,
      frameHeight:32
    });
    this.load.spritesheet("cry2", "assets/crystals/Crystal_2.png",{
      frameWidth:32,
      frameHeight:32
    });
    this.load.spritesheet("cry3", "assets/crystals/Crystal_3.png",{
      frameWidth:32,
      frameHeight:32
    });
    this.load.spritesheet("cry4", "assets/crystals/Crystal_4.png",{
      frameWidth:32,
      frameHeight:32
    });
    this.load.spritesheet("cry5", "assets/crystals/Crystal_5.png",{
      frameWidth:32,
      frameHeight:32
    });
    this.load.spritesheet("cry6", "assets/crystals/Crystal_6.png",{
      frameWidth:32,
      frameHeight:32
    });
    this.load.spritesheet("cry7", "assets/crystals/Crystal_7.png",{
      frameWidth:32,
      frameHeight:32
    });
    this.load.spritesheet("cry8", "assets/crystals/Crystal_8.png",{
      frameWidth:32,
      frameHeight:32
    });
    this.load.spritesheet("cry9", "assets/crystals/Crystal_9.png",{
      frameWidth:32,
      frameHeight:32
    });
    this.load.spritesheet('fireball', "assets/Enemies/fire-ball.png",{
      frameWidth:16,
      frameHeight:16
    });
    this.load.image("platform", "assets/platforms/map.png");
    this.load.image("levelFloor", "assets/level/level.png");
    this.load.image("gem", "assets/crystals/emerald.png");
    this.load.image("heart", "assets/heart.png");
    this.load.image("fightbtn", "assets/fightbutton.png");
    this.load.image("fight", "assets/level/battle.png");
    this.load.image("stairs", "assets/level/stairs.png");
    this.load.image("bunny", "assets/Enemies/bunny.png");
    this.load.image("mama", "assets/Enemies/mamaBun.png");
    this.load.image("tutorialBattle", "assets/tutorialBattle.png");
    this.load.image("batform", "assets/level/batform.png");
    this.load.image("elevator", "assets/level/elevator.png");
    this.load.image("altar", "assets/level/altar.png");

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
      key: "bat_anim",
      frames: this.anims.generateFrameNumbers("bat", {start: 0, end: 3}),
      frameRate: 7,
      repeat: -1
    })
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
    
    
    this.scene.start('Tutorial');
    
  }
}
