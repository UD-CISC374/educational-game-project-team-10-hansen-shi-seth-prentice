import ExampleObject from '../objects/exampleObject';
import Player from '../objects/Player';
import { Cameras, Types } from 'phaser';

export default class MainScene extends Phaser.Scene {
  private player: Player;
  background: Phaser.GameObjects.TileSprite;
  height: number;
  width: number;
  cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
  myCam: Cameras.Scene2D.Camera;


  constructor() {
    super({ key: 'MainScene' });
  }

  preload() {
    //this.width = config.width;
    this.height = 160;//BECAUSE   CAN'T        OUT     TO     CONFIG
    this.width = 200;//         I       FIGURE     HOW    GET        REEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
  }

  create() {
    this.background = this.add.tileSprite(0, 0, 448, this.height, "background");//I know its shit, we can get a better one later
    this.background.setOrigin(0, 0);
    this.background.setScrollFactor(0);

    this.cursorKeys = this.input.keyboard.createCursorKeys();

    this.player = new Player(this, 0, this.height-13);
    //this.player.setScale(1.25);
    this.myCam = this.cameras.main;
    this.myCam.setBounds(0, 0, this.width * 100, this.height);
    this.myCam.startFollow(this.player);

    this.anims.create({
      key:"player_anim",
      frames: this.anims.generateFrameNumbers("player",{ start: 0, end: 3 }),
      frameRate: 7,
      repeat: -1
    });
    this.player.play("player_anim");
  }

  update() {
    this.movePlayerManager();
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
    if (this.player.moving){
      this.player.anims.resume();
    }
    else{
      this.player.anims.pause();
    }
    if (this.cursorKeys.up?.isDown && this.player.y == this.height - 20){
      this.player.velY = 9;
    }
    //gravity: phaser gravity is annoying so im gonna ignore it
    this.player.y -= this.player.velY ;
    if (this.player.velY > -15) {
      this.player.velY -= .5;
    }
    if (this.player.y > this.height - 20){
      this.player.y = this.height - 20;
    }
  }
}
