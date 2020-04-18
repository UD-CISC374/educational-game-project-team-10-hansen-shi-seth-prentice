
import Player from '../objects/Player';
import { Cameras, Types } from 'phaser';
import Skeleton from '../objects/Skeleton';

export default class MainScene extends Phaser.Scene {
  private player: Player;
  enemy : Skeleton;
  background: Phaser.GameObjects.TileSprite;
  height: number = 480;
  width: number = 640;
  cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
  //myCam: Cameras.Scene2D.Camera;
  enemies: Phaser.GameObjects.Group;


  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    let tutMap = this.make.tilemap({key: 'tutorial'});
    let baseLayer = tutMap.addTilesetImage('otherTiles', 'tiles');

    var bottom = tutMap.createStaticLayer('Tile Layer 1', [baseLayer], 0, 0).setDepth(1);
    
    
    this.background = this.add.tileSprite(0, 0, 640, this.height, "background").setDepth(-1);//I know its shit, we can get a better one later
    this.background.setOrigin(0, 0);
    this.background.setScrollFactor(0);
    
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    
    this.enemies = this.physics.add.group();

    //define anything that needs animation here
    this.player = new Player(this, 0, this.height - 200);
    this.enemy = new Skeleton(this, 200, this.height - 60, 1);

    //camera stuff
    /*this.myCam = this.cameras.main;
    this.myCam.setBounds(0, 0, this.width * 100, this.height);
    this.myCam.startFollow(this.player);*/
    
    this.cameras.main.setBounds(0, 0, tutMap.widthInPixels, tutMap.heightInPixels);
    this.cameras.main.startFollow(this.player);

    //collison stuff
    this.physics.add.overlap(this.player, this.enemies, this.enterCombat);
    
    //so that doesn't work, I've tried literally every bug fix for phaser 2 and 3
    this.physics.add.collider(this.player, bottom);
    bottom.setCollisionByProperty({collides: true});
    
  }

  update() {//                           update is here
    this.movePlayerManager();
    this.enemiesManager();
    
    //this.background.tilePositionX = this.myCam.scrollX;
  }

  movePlayerManager() { //moves player with arrow keys (not down)
    this.player.moving = false;
    if (this.cursorKeys.left?.isDown) {
      this.player.setVelocityX(-200);
      this.player.flipX = true;
      this.player.moving = true;
    }
    else if (this.cursorKeys.right?.isDown) {
      this.player.setVelocityX(200);
      this.player.flipX = false;
      this.player.moving = true;
    }
    else{
      this.player.setVelocityX(0);
    }
    if (this.player.moving) {
      this.player.anims.resume();
    }
    else {
      this.player.anims.pause();
    }
    if (this.cursorKeys.up?.isDown && this.player.y == this.height - 20) {
      this.player.velY = 11;
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
        this.scene.start('BattleScene', { type: temp[0], value: <number> <unknown>temp[1], health: temp[0] });
        //switchy scene go brrr
        //this.scene.switch('SkellyScene');
        enemy.destroy();
      }
    }
  }

  enterCombat(player, enemy) {
    console.log("get hit nerd");
    enemy.active = false;
  }
}
