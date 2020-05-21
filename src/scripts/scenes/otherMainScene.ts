
import Player from '../objects/Player';
import { Cameras, Types } from 'phaser';
import Skeleton from '../objects/Skeleton';
import Bat from '../objects/Bat';
import Crystal from '../objects/Crystal';
import Ghost from '../objects/Ghost';
import Frog from '../objects/Frog';
import BigFrog from '../objects/BigFrog'

export default class OtherMainScene extends Phaser.Scene {
  private player: Player;
  enemy: Frog;
  enemy2: Frog;
  enemy3: Skeleton;
  enemy4: Skeleton;
  enemy5: Bat;
  enemy6: Ghost;
  bigFrog: BigFrog;
  background: Phaser.GameObjects.TileSprite;
  height: number;
  width: number;
  cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
  enemies: Phaser.GameObjects.Group;
  gems: Phaser.GameObjects.Group;
  platforms: Phaser.GameObjects.Group;

  pouch: Phaser.Physics.Arcade.Sprite;
  bigPouch: Phaser.Physics.Arcade.Sprite;
  pouch2: Phaser.Physics.Arcade.Sprite;
  bigPouch2: Phaser.Physics.Arcade.Sprite;
  statue: Phaser.Physics.Arcade.Sprite;


  playerGems: Phaser.GameObjects.BitmapText;

  helpText: Phaser.GameObjects.BitmapText;

  elevator: Phaser.Physics.Arcade.Sprite
  elevator2: Phaser.Physics.Arcade.Sprite

  endGame: boolean = false;
  altar: Phaser.Physics.Arcade.Sprite;



  constructor() {
    super({ key: 'OtherMainScene' });
  }

  create() {

    this.height = <number>this.game.config.height;
    this.width = <number>this.game.config.width;

    //I'm making levels the old fashioned way because I've spent way
    //too much time trying to make tilemaps work to no avail
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(520, 600, "formplat");
    this.platforms.create(820, 600, "formplat");
    this.platforms.create(1120, 600, "formplat");
    this.platforms.create(1420, 600, "formplat")
    this.platforms.create(-300, 300, 'platform');
    this.platforms.create(1000, 200, "levelFloor");
    this.platforms.create(350, 325, "batform");
    this.platforms.create(400, 240, "batform");
    this.platforms.create(100, 600, "altar");
    this.platforms.create(1545, 200, "elevator");
    this.platforms.create(1545, 150, "elevator");
    this.platforms.create(1545, 100, "elevator");
    this.platforms.create(1545, 50, "elevator");
    this.platforms.create(1545, 0, "elevator");

    this.altar = this.physics.add.sprite(2000, 400, "altar").setImmovable(true);

    this.statue = this.physics.add.sprite(100, 500, "statue");


    this.elevator = this.physics.add.sprite(250, 400, "elevator");
    this.elevator.setImmovable(true);
    this.elevator2 = this.physics.add.sprite(1675, 200, "elevator");
    this.elevator2.setImmovable(true);


    this.pouch = this.physics.add.sprite(200, 565, "pouch");
    this.pouch.setScale(.1);
    this.pouch.setGravityY(500);

    this.bigPouch = this.physics.add.sprite(80, 235, "pouch");
    this.bigPouch.setScale(.2);
    this.bigPouch.setGravityY(500);

    this.pouch2 = this.physics.add.sprite(820, 525, "pouch");
    this.pouch2.setScale(.1);
    this.pouch2.setGravityY(500);

    this.bigPouch2 = this.physics.add.sprite(1500, 500, "pouch");
    this.bigPouch2.setScale(.2);
    this.bigPouch2.setGravityY(500);


    this.background = this.add.tileSprite(0, 0, this.width, this.height, "background").setDepth(-1);
    this.background.setOrigin(0, 0);
    this.background.setScrollFactor(0);

    this.cursorKeys = this.input.keyboard.createCursorKeys();

    this.enemies = this.physics.add.group();
    this.gems = this.physics.add.group();


    //define anything that needs animation here
    this.player = new Player(this, 100, 560)
    this.player.setGravityY(1400);
    this.enemy = new Frog(this, 860, this.height - 250, 10, 2);
    this.enemies.add(this.enemy);
    this.enemy.setGravityY(1400);
    this.player.setCollideWorldBounds(false);
    this.enemy2 = new Frog(this, 500, this.height - 250, 8, 2);
    this.enemies.add(this.enemy2);
    this.enemy2.setGravityY(1400);

    this.enemy3 = new Skeleton(this, 460, this.height - 250, 8, 3);
    this.enemies.add(this.enemy3);
    this.enemy3.setGravityY(1400);
    this.enemy4 = new Skeleton(this, 820, this.height - 250, 10, 4);
    this.enemies.add(this.enemy4);
    this.enemy4.setGravityY(1400);

    this.enemy5 = new Bat(this, 1050, this.height - 250, 5, 1);
    this.enemies.add(this.enemy5);

    this.enemy6 = new Ghost(this, 1120, this.height - 250, 12, 4);
    this.enemies.add(this.enemy6);
    this.enemy6.setGravityY(1400);

    this.bigFrog = new BigFrog(this, 2000, 300, 30, 5);
    this.bigFrog.setScale(10);
    this.enemies.add(this.bigFrog);

    //camera
    this.cameras.main.setBounds(0, 0, this.width * 3, this.height);
    this.cameras.main.setSize(this.width, this.height);
    this.cameras.main.startFollow(this.player);

    //collison stuff
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.enemies, this.platforms);
    this.physics.add.collider(this.gems, this.platforms);
    this.physics.add.collider(this.player, this.elevator);
    this.physics.add.collider(this.player, this.elevator2);
    this.physics.add.collider(this.pouch, this.platforms);
    this.physics.add.collider(this.bigPouch, this.platforms);
    this.physics.add.collider(this.bigPouch2, this.platforms);
    this.physics.add.collider(this.pouch2, this.platforms);
    this.physics.add.collider(this.altar, this.player);
    this.physics.add.collider(this.bigFrog, this.altar);


    this.physics.add.overlap(this.player, this.gems, this.pickupItem);
    this.physics.add.overlap(this.player, this.enemies, this.enterCombat);
    this.physics.add.overlap(this.player, this.enemy3, this.enterCombat);
    this.physics.add.overlap(this.player, this.pouch, () => {
      this.pouch.destroy();
      this.player.inventory.set("one", <number>this.player.inventory.get("one") + 5);
      this.player.inventory.set("two", <number>this.player.inventory.get("two") + 4);
      this.player.inventory.set("three", <number>this.player.inventory.get("three") + 3);
      this.player.inventory.set("four", <number>this.player.inventory.get("four") + 2);
      this.player.inventory.set("five", <number>this.player.inventory.get("five") + 1);
    });
    this.physics.add.overlap(this.player, this.pouch2, () => {
      this.pouch2.destroy();
      this.player.inventory.set("one", <number>this.player.inventory.get("one") + 5);
      this.player.inventory.set("two", <number>this.player.inventory.get("two") + 4);
      this.player.inventory.set("three", <number>this.player.inventory.get("three") + 3);
      this.player.inventory.set("four", <number>this.player.inventory.get("four") + 2);
      this.player.inventory.set("five", <number>this.player.inventory.get("five") + 1);
    });
    this.physics.add.overlap(this.player, this.bigPouch, () => {
      this.bigPouch.destroy();
      this.player.inventory.set("five", <number>this.player.inventory.get("five") + 5);
      this.player.inventory.set("six", <number>this.player.inventory.get("six") + 4);
      this.player.inventory.set("seven", <number>this.player.inventory.get("seven") + 3);
      this.player.inventory.set("eight", <number>this.player.inventory.get("eight") + 3);
      this.player.inventory.set("nine", <number>this.player.inventory.get("nine") + 2);
    });
    this.physics.add.overlap(this.player, this.bigPouch2, () => {
      this.bigPouch2.destroy();
      this.player.inventory.set("five", <number>this.player.inventory.get("five") + 5);
      this.player.inventory.set("six", <number>this.player.inventory.get("six") + 4);
      this.player.inventory.set("seven", <number>this.player.inventory.get("seven") + 3);
      this.player.inventory.set("eight", <number>this.player.inventory.get("eight") + 3);
      this.player.inventory.set("nine", <number>this.player.inventory.get("nine") + 2);
    })
  }


  update() {//                           update is here
    this.movePlayerManager();
    this.enemiesManager();
    this.eleveatorHandler();
    this.elevatorHandler2();
    this.emitHandler();
    this.death();
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
        this.scene.pause('OtherMainScene');
        this.scene.sendToBack('OtherMainScene');
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
      let loot3 = new Crystal(this, enemy.x, enemy.y - 100, 'one');
      this.gems.add(loot);
      this.gems.add(loot2);
      this.gems.add(loot3);
      loot.setGravityY(400);
      loot2.setGravityY(400);
      loot3.setGravityY(400);
    }
    else if (enemy.name === "frog") {
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
    if (this.elevator2.y <= 400) {
      this.elevator2.setVelocityY(25);
    }
    else if (this.elevator2.y >= 575) {
      this.elevator2.setVelocityY(-25);
    }
  }

  death() {
    if (this.player.y > 700) {
      this.scene.launch("Restart", { currentScene: this.scene.key });
      this.scene.sendToBack("OtherMainScene");
    }
  }
  emitHandler() {
    this.scene.get('BattleScene').events.once('win', (name) => {
      if (name === 'bossFrog') {
        this.endGame = true;
      }
    }, this);

    if (this.endGame) {
      this.altar.setVelocityY(-50);
      this.cameras.main.shake(50, .002);
      if (this.player.y < 0) {
        this.scene.start("Tutorial");
        this.scene.remove(this.scene.key);
      }
    }
  }
}
