
import Player from '../objects/Player';
import { Cameras, Types } from 'phaser';
import Skeleton from '../objects/Skeleton';

export default class MainScene extends Phaser.Scene {
  private player: Player;
  enemy : Skeleton;
  background: Phaser.GameObjects.TileSprite;
  height: number; 
  width: number; 
  cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
  enemies: Phaser.GameObjects.Group;
  gems: Phaser.GameObjects.Group;

  playerGems: Phaser.GameObjects.BitmapText;
  
  

  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    
    this.height = <number> this.game.config.height;
    this.width = <number> this.game.config.width;
    
    //let tutMap = this.make.tilemap({key: 'tutorial'});
    //let baseLayer = tutMap.addTilesetImage('otherTiles', 'tiles');
    //var bottom = tutMap.createStaticLayer('Tile Layer 1', baseLayer, 0, 0);

    let floor = this.physics.add.sprite(475, 600, 'platform').setImmovable(true);
    

    this.background = this.add.tileSprite(0, 0, this.width, this.height, "background").setDepth(-1);//I know its shit, we can get a better one later
    this.background.setOrigin(0, 0);
    this.background.setScrollFactor(0);
    
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    
    this.enemies = this.physics.add.group();
    this.gems = this.physics.add.group();
    
    let testGem = this.physics.add.sprite(200, 540, 'gem');
    this.gems.add(testGem);

    //define anything that needs animation here
    this.player = new Player(this, 0, this.height - 400);
    for (let i = 0; i <= this.player.health; i++ ){
      let spacing = 50 * i;
      this.physics.add.sprite
    }

    this.player.setGravityY(1400);
    this.enemy = new Skeleton(this, 860, this.height - 400, 5, 2);
    this.enemies.add(this.enemy);
    this.enemy.setGravityY(1400);
    
    //camera
    this.cameras.main.setBounds(0, 0, this.width, this.height);
    this.cameras.main.startFollow(this.player);

    //collison stuff
    this.physics.add.overlap(this.player, this.enemies, this.enterCombat);
    this.physics.add.collider(this.player, floor);
    this.physics.add.collider(this.enemy, floor);
    this.physics.add.collider(this.gems, floor);
    this.physics.add.overlap(this.player, testGem, this.pickupItem);
    this.physics.add.overlap(this.player, this.gems, this.pickupItem);
    
    //WHY YOU NO WORK
    //bottom.setCollisionByProperty({collides: true});
    //this.physics.add.collider(this.player, bottom);

    /*const debugGraphics = this.add.graphics().setAlpha(0.75);
    bottom.renderDebug(debugGraphics, {
    tileColor: null, // Color of non-colliding tiles
    collidingTileColor: null, // Color of colliding tiles
    faceColor: new Phaser.Display.Color(255, 0, 255, 255)
    });*/
    
    
  }
  

  update() {//                           update is here
    this.movePlayerManager();
    this.enemiesManager();
    this.collectionHandler();
    this.emitManager();
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
    if (this.cursorKeys.up?.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-500);
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
        this.scene.launch('BattleScene', { type: temp[0], hp: <number><unknown>temp[1], atk: <number><unknown>temp[2] });
        this.scene.pause('MainScene');
        this.scene.sendToBack('MainScene');
        this.player.setVelocity(0, 0);
        //switchy scene go brrr
        //this.scene.switch('SkellyScene');
      }
    }
  }
  collectionHandler(){
    for (let i = 0; i <this.gems.getChildren().length; i++){
      let tmp = this.gems.getChildren()[i];
      if (!tmp.active){
        this.player.inventory.set("power: 5", "has : 5");
      }
    }
  }

  pickupItem(player, gem){
    gem.active = false;
    gem.destroy();
  }

  enterCombat(player, enemy) {
    console.log("get hit nerd");
    enemy.active = false;
  }

  emitManager(){
    this.scene.get("BattleScene").events.once("win", ()=>{
      console.log("here");
      this.spawnLoot(this.enemy);
      this.enemy.destroy();
    });
  }

  spawnLoot(enemy: Phaser.GameObjects.Sprite){
    this.gems.create(enemy.x, enemy.y - 100, 'gem').setGravityY(200);
  }
}
