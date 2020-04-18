import ExampleObject from '../objects/exampleObject';
import Player from '../objects/Player';
import { Cameras, Types } from 'phaser';
import Skeleton from '../objects/Skeleton';

export default class MainScene extends Phaser.Scene {
  private player: Player;
  background: Phaser.GameObjects.TileSprite;
  height: number;
  width: number;
  cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
  myCam: Cameras.Scene2D.Camera;
  enemies: Phaser.GameObjects.Group;


  constructor() {
    super({ key: 'MainScene' });
  }

  preload() {
    //this.width = config.width;
    this.height = 160;//BECAUSE   CAN'T        OUT     TO     CONFIG
    this.width = 300;//         I       FIGURE     HOW    GET        REEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
  }

  create() {
    this.background = this.add.tileSprite(0, 0, 448, this.height, "background");
    this.background.setOrigin(0, 0);
    this.background.setScrollFactor(0);
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.enemies = this.physics.add.group();


    //animations under here
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

    //define anything that needs animation here
    this.player = new Player(this, 0, this.height - 13);
    new Skeleton(this, 200, this.height - 20, 5);

    //camera stuff
    this.myCam = this.cameras.main;
    this.myCam.setBounds(0, 0, this.width * 100, this.height);
    this.myCam.startFollow(this.player);

    //collison stuff
    this.physics.add.overlap(this.player, this.enemies, this.enterCombat);
  }

  update() {//                           update is here
    this.movePlayerManager();
    this.enemiesManager();
    this.background.tilePositionX = this.myCam.scrollX;
  }

  movePlayerManager() { //moves player with arrow keys (not down)
    this.player.moving = false;
    if (this.cursorKeys.left?.isDown) {
      this.player.x -= 3;
      this.player.flipX = true;
      this.player.moving = true;
    }
    if (this.cursorKeys.right?.isDown) {
      this.player.x += 3;
      this.player.flipX = false;
      this.player.moving = true;
    }
    if (this.player.moving) {
      this.player.anims.resume();
    }
    else {
      this.player.anims.pause();
    }
    if (this.cursorKeys.up?.isDown && this.player.y == this.height - 20) {
      this.player.velY = 9;
    }
    //gravity: phaser gravity is annoying so im gonna ignore it
    this.player.y -= this.player.velY;
    if (this.player.velY > -15) {
      this.player.velY -= .5;
    }
    if (this.player.y > this.height - 20) {
      this.player.y = this.height - 20;
    }
  }

  enemiesManager() {
    for (let i = 0; i < this.enemies.getChildren().length; i++) {
      let enemy = this.enemies.getChildren()[i];
      if(enemy.active){
        enemy.update();
      }
      else{
        let temp = enemy.name.split(" ");
        this.scene.start('BattleScene', { type: temp[0], value: <number> <unknown>temp[1] });
        enemy.destroy();
      }
    }
  }

  enterCombat(player, enemy) {
    console.log("get hit nerd");
    enemy.active = false;
  }
}
