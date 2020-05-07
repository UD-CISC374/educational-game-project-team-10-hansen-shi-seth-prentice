
import Player from '../objects/Player';
import { Cameras, Types } from 'phaser';
import Skeleton from '../objects/Skeleton';
import Bat from '../objects/Bat';
import Crystal from '../objects/Crystal';
import Ghost from '../objects/Ghost';

export default class MainScene extends Phaser.Scene {
  private player: Player;
  enemy: Skeleton;
  enemy2: Bat;
  enemy3: Ghost;
  background: Phaser.GameObjects.TileSprite;
  height: number;
  width: number;
  cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
  enemies: Phaser.GameObjects.Group;
  gems: Phaser.GameObjects.Group;
  platforms: Phaser.GameObjects.Group;


  playerGems: Phaser.GameObjects.BitmapText;

  helpText: Phaser.GameObjects.BitmapText;

  elevator: Phaser.Physics.Arcade.Sprite
  elevator2: Phaser.Physics.Arcade.Sprite



  constructor() {
    super({ key: 'MainScene' });
  }

  create() {

    this.height = <number>this.game.config.height;
    this.width = <number>this.game.config.width;


    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(520, 600, "levelFloor");
    this.platforms.create(-300, 400, 'levelFloor');
    this.platforms.create(1000, 200, "levelFloor");
    this.platforms.create(350, 325, "batform");
    this.platforms.create(200, 250, "batform");
    this.platforms.create(400, 185, "batform");
    this.platforms.create(100, 50, "batform");
    this.platforms.create(1900, 200, "altar");
    this.platforms.create(1900, 100, "statue");

    this.elevator = this.physics.add.sprite(250, 400, "elevator");
    this.elevator.setImmovable(true);
    this.elevator2 = this.physics.add.sprite(1550, 0, "elevator");
    this.elevator2.setImmovable(true);

    this.helpText = this.add.bitmapText(10, 10, "pixelFont", "Move with arrow keys", 30);


    this.helpText = this.add.bitmapText(10, 10,"pixelFont", "Move with arrow keys", 30 );
    
    

    this.background = this.add.tileSprite(0, 0, this.width, this.height, "background").setDepth(-1);//I know its shit, we can get a better one later
    this.background.setOrigin(0, 0);
    this.background.setScrollFactor(0);

    this.cursorKeys = this.input.keyboard.createCursorKeys();

    this.enemies = this.physics.add.group();
    this.gems = this.physics.add.group();

    let testGem1 = new Crystal(this, 200, 550, 'one');
    let testGem2 = new Crystal(this, 975, 550, 'two');
    let testGem3 = new Crystal(this, 1000, 550, 'three');
    let testGem4 = new Crystal(this, 300, 550, 'four');
    let testGem5 = new Crystal(this, 1025, 550, 'two');
    
    this.gems.add(testGem1);
    this.gems.add(testGem4);
    this.gems.add(testGem2);
    this.gems.add(testGem3);
    this.gems.add(testGem5);
    

    //define anything that needs animation here
    this.player = new Player(this, 20, this.height - 600)
    this.player.setGravityY(1400);
    this.enemy = new Skeleton(this, 860, this.height - 250, 5, 2);
    this.enemies.add(this.enemy);
    this.enemy.setGravityY(1400);
    this.player.setCollideWorldBounds(false);
    this.enemy2 = new Bat(this, 200, 120, 3, 2);
    this.enemies.add(this.enemy2);
    this.enemy3 = new Ghost(this, 1900, 150, 10, 3);
    this.enemies.add(this.enemy3);

    //camera
    this.cameras.main.setBounds(0, 0, this.width * 3, this.height);
    this.cameras.main.setSize(this.width, this.height);
    this.cameras.main.startFollow(this.player);

    //collison stuff
    this.physics.add.overlap(this.player, this.enemies, this.enterCombat);
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.enemy, this.platforms);
    this.physics.add.collider(this.gems, this.platforms);
    
    
    this.physics.add.overlap(this.player, this.gems, this.pickupItem);
    this.physics.add.collider(this.player, this.elevator);
    this.physics.add.collider(this.player, this.elevator2);
    this.physics.add.overlap(this.player, this.enemy3, this.enterCombat);
    





  }


  update() {//                           update is here
    this.movePlayerManager();
    this.enemiesManager();
    this.emitManager();
    this.eleveatorHandler();
    this.elevatorHandler2();
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
    else {
      this.player.setVelocityX(0);
    }
    if (this.player.moving) {
      this.player.anims.resume();
    }
    else {
      this.player.anims.pause();
    }
    if (this.cursorKeys.up?.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-500);
    }
  }
  enemiesManager() {
    for (let i = 0; i < this.enemies.getChildren().length; i++) {
      let enemy = this.enemies.getChildren()[i];
      if (enemy.active) {
        enemy.update();
      }
      else{
        
        this.scene.launch('BattleScene', {baddie: enemy, previousScene: this.scene.key , player:this.player});
        this.scene.pause('MainScene');
        this.scene.sendToBack('MainScene');
      }
    }
  }

  pickupItem(player, gem){
    player.pickup(gem);
    gem.active = false;
    gem.destroy();
  }

  enterCombat(player, enemy) {
    console.log("get hit nerd");
    enemy.active = false;
  }

  emitManager() {
    this.scene.get("BattleScene").events.once("win", () => {
      this.spawnLoot(this.enemy);
      this.enemy.destroy();
    });
  }

  spawnLoot(enemy: Phaser.GameObjects.Sprite) {
    let loot = new Crystal(this, enemy.x, enemy.y - 100, 'three');
    this.gems.add(loot);
    loot.setGravityY(400);
  }

  eleveatorHandler(){
    if (this.elevator.y <= 400){
      this.elevator.setVelocityY(50);
    }
    else if (this.elevator.y >= 550){
      this.elevator.setVelocityY(-50);
    }
  }
  elevatorHandler2(){
    if (this.elevator2.y <= 0){
      this.elevator2.setVelocityY(25);
    }
    else if (this.elevator2.y >= 200){
      this.elevator2.setVelocityY(-25);
    }
  }
}
