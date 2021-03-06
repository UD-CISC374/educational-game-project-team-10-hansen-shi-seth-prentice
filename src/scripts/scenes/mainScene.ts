import Player from '../objects/Player';
import { Cameras, Types } from 'phaser';
import Skeleton from '../objects/Skeleton';
import Bat from '../objects/Bat';
import Crystal from '../objects/Crystal';
import Ghost from '../objects/Ghost';
import Frog from '../objects/Frog';

export default class MainScene extends Phaser.Scene {
  private player: Player;
  enemy: Skeleton;
  enemy2: Bat;
  enemy3: Ghost;
  enemy4: Frog;
  background: Phaser.GameObjects.TileSprite;
  height: number;
  width: number;
  cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
  enemies: Phaser.GameObjects.Group;
  gems: Phaser.GameObjects.Group;
  platforms: Phaser.GameObjects.Group;
  pouch: Phaser.Physics.Arcade.Sprite;
  statue: Phaser.Physics.Arcade.Sprite;
  altar: Phaser.Physics.Arcade.Sprite;
  proceed: boolean = false;


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

    //I'm making levels the old fashioned way because I've spent way
    //too much time trying to make tilemaps work to no avail
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(520, 600, "levelFloor");
    this.platforms.create(-300, 400, 'levelFloor');
    this.platforms.create(1000, 200, "levelFloor");
    this.platforms.create(350, 325, "batform");
    this.platforms.create(200, 250, "batform");
    this.platforms.create(400, 185, "batform");
    this.platforms.create(100, 50, "batform");

    this.statue = this.physics.add.sprite(1900, 100, "statue");
    this.altar = this.physics.add.sprite(1900, 200, "altar").setImmovable(true);

    this.elevator = this.physics.add.sprite(250, 400, "elevator");
    this.elevator.setImmovable(true);
    this.elevator2 = this.physics.add.sprite(1550, 0, "elevator");
    this.elevator2.setImmovable(true);

    this.helpText = this.add.bitmapText(10, 10, "pixelFont", "Move with arrow keys", 30);


    this.helpText = this.add.bitmapText(10, 10, "pixelFont", "Move with arrow keys", 30);

    this.pouch = this.physics.add.sprite(70, this.height - 600, "pouch");
    this.pouch.setScale(.1);
    this.pouch.setGravityY(500);

    this.background = this.add.tileSprite(0, 0, this.width, this.height, "background").setDepth(-1);
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
    let testGem6 = new Crystal(this, 198, 213, 'two');
    let testGem7 = new Crystal(this, 400, 148, 'two');
    let testGem8 = new Crystal(this, 628, 150, 'two');
    let testGem9 = new Crystal(this, 353, 288, 'two');

    this.gems.add(testGem1);
    this.gems.add(testGem4);
    this.gems.add(testGem2);
    this.gems.add(testGem3);
    this.gems.add(testGem5);
    this.gems.add(testGem6);
    this.gems.add(testGem7);
    this.gems.add(testGem8);
    this.gems.add(testGem9);


    //define anything that needs animation here
    this.player = new Player(this, 20, this.height - 600)
    this.player.setGravityY(1400);
    this.enemy = new Skeleton(this, 860, this.height - 250, 5, 2);
    this.enemies.add(this.enemy);
    this.enemy.setGravityY(1400);
    this.player.setCollideWorldBounds(false);
    this.enemy2 = new Bat(this, 1200, 150, 3, 2);
    this.enemies.add(this.enemy2);
    this.enemy3 = new Ghost(this, 1875, 150, 10, 3);
    this.enemies.add(this.enemy3);
    this.enemy4 = new Frog(this, 600, 150, 10, 2);
    this.enemies.add(this.enemy4);
    this.enemy4.setGravityY(1400);

    //camera
    this.cameras.main.setBounds(0, 0, this.width * 3, this.height);
    this.cameras.main.setSize(this.width, this.height);
    this.cameras.main.startFollow(this.player);

    //collison stuff
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.enemy, this.platforms);
    this.physics.add.collider(this.gems, this.platforms);
    this.physics.add.collider(this.player, this.elevator);
    this.physics.add.collider(this.player, this.elevator2);
    this.physics.add.collider(this.pouch, this.platforms);
    this.physics.add.collider(this.enemy4, this.platforms);
    this.physics.add.collider(this.player, this.altar);
    this.physics.add.collider(this.altar, this.statue);


    this.physics.add.overlap(this.player, this.gems, this.pickupItem);
    this.physics.add.overlap(this.player, this.enemies, this.enterCombat);
    this.physics.add.overlap(this.player, this.enemy3, this.enterCombat);
    this.physics.add.overlap(this.player, this.pouch, () => {
      this.pouch.destroy();
      this.player.inventory.set("one", 5);
      this.player.inventory.set("two", 4);
      this.player.inventory.set("three", 3);
      this.player.inventory.set("four", 2);
      this.player.inventory.set("five", 1);
    });
  }


  update() {//                           update is here
    this.movePlayerManager();
    this.enemiesManager();
    this.eleveatorHandler();
    this.elevatorHandler2();
    this.death();
    this.emitHandler();
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
      else {
        this.spawnLoot(enemy);
        enemy.destroy();
        this.scene.launch('BattleScene', { baddie: enemy, previousScene: this.scene.key, player: this.player });
        this.scene.pause('MainScene');
        this.scene.sendToBack('MainScene');
      }
    }
  }

  pickupItem(player, gem) {
    player.pickup(gem);
    gem.active = false;
    gem.destroy();
  }

  enterCombat(player, enemy) {
    enemy.active = false;
  }

  spawnLoot(enemy: any) {
    if (enemy.name === "skeleton") {
      let loot = new Crystal(this, enemy.x, enemy.y - 100, 'four');
      let loot2 = new Crystal(this, enemy.x, enemy.y - 100, 'two');
      this.gems.add(loot);
      this.gems.add(loot2);
      loot.setGravityY(400);
      loot2.setGravityY(400);
    }
    else if (enemy.name === "bat") {
      let loot = new Crystal(this, enemy.x, enemy.y - 100, 'three');
      this.gems.add(loot);
      loot.setGravityY(400);
    }
    else if (enemy.name === "ghost") {
      let loot = new Crystal(this, enemy.x, enemy.y - 100, 'five');
      let loot2 = new Crystal(this, enemy.x, enemy.y - 100, 'three');
      let loot3 = new Crystal(this, enemy.x, enemy.y - 100, 'eight');
      this.gems.add(loot);
      this.gems.add(loot2);
      this.gems.add(loot3);
      loot.setGravityY(400);
      loot2.setGravityY(400);
      loot3.setGravityY(400);
    }
    else if (enemy.name === "frog"){
      let loot = new Crystal(this, enemy.x, enemy.y - 100, 'six');
      let loot2 = new Crystal(this, enemy.x, enemy.y - 100, 'three');
      let loot3 = new Crystal(this, enemy.x, enemy.y - 100, 'one');
      this.gems.add(loot);
      this.gems.add(loot2);
      this.gems.add(loot3);
      loot.setGravityY(400);
      loot2.setGravityY(400);
      loot3.setGravityY(400);
    }
  }

  eleveatorHandler() {
    if (this.elevator.y <= 400) {
      this.elevator.setVelocityY(50);
    }
    else if (this.elevator.y >= 550) {
      this.elevator.setVelocityY(-50);
    }
  }
  elevatorHandler2() {
    if (this.elevator2.y <= 100) {
      this.elevator2.setVelocityY(25);
    }
    else if (this.elevator2.y >= 300) {
      this.elevator2.setVelocityY(-25);
    }
  }

  death() {
    if (this.player.y > 700) {
      this.scene.launch("Restart", { currentScene: this.scene.key });
    }
  }

  emitHandler() {
    this.scene.get('BattleScene').events.once('win', (name) => {
      if (name === 'ghost') {
        this.proceed = true;
      }
    }, this);

    if (this.proceed) {
      this.altar.setVelocityY(-50);
      this.cameras.main.shake(50, .002);
      if (this.player.y < 0) {
        this.scene.start("OtherMainScene");
        this.scene.remove(this.scene.key);
      }
    }
  }
}
