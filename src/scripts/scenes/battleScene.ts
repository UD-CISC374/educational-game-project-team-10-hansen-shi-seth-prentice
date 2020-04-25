import Skeleton from "../objects/Skeleton";
import Player from "../objects/Player";

export default class BattleScene extends Phaser.Scene {
  background: Phaser.GameObjects.TileSprite;
  height: number;
  width: number;
  hp: number;
  atk: number;
  type: string;
  enemy: Skeleton;
  player: Player;
  enemies: Phaser.GameObjects.Group;
  heartContainers: Phaser.GameObjects.Group;
  one: Phaser.GameObjects.BitmapText;
  two: Phaser.GameObjects.BitmapText;
  three: Phaser.GameObjects.BitmapText;
  plus: Phaser.GameObjects.BitmapText;
  minus: Phaser.GameObjects.BitmapText;
  phase: number = 0;
  heart: Phaser.GameObjects.Sprite;
  constructor() {
    super({ key: 'BattleScene' });
  }

  init(data) {
    this.type = data.type;
    this.hp = data.hp;
    this.atk = data.atk;
  }

  create() {

    this.width = <number>this.game.config.width;
    this.height = <number>this.game.config.height;

    this.enemies = this.physics.add.group();
    this.heartContainers = this.physics.add.staticGroup();

    this.background = this.add.tileSprite(0, 0, this.width, this.height, "background");
    this.background.setOrigin(0, 0);
    this.background.setScrollFactor(0);

    if (this.type === "skeleton") {
      this.enemy = new Skeleton(this, this.width - 40, this.height - 300, this.hp, this.atk);
      this.enemy.flipX = true;
      this.enemy.setScale(5);
      this.enemy.anims.pause();
    }

    this.player = new Player(this, 60, this.height - 300);
    this.player.setScale(3);
    this.player.anims.pause();

    this.scene.launch('UI', { playerHp: this.player.health, enemyHp: this.enemy.health, enemyAtk: this.enemy.atk })

    //this.heart = this.add.sprite(60, this.height - 400, 'heart');
    //it doesn't auto complete for some reason
    //but it works
    console.log(this.enemy.getHealth());
    this.one = this.add.bitmapText(60, this.height - 80, "pixelFont", "1", 16);
    this.one.name = '1';
    this.two = this.add.bitmapText(120, this.height - 80, "pixelFont", "2", 16);
    this.two.name = '2';
    this.three = this.add.bitmapText(180, this.height - 80, "pixelFont", "3", 16);
    this.three.name = '3';
    this.plus = this.add.bitmapText(240, this.height - 80, "pixelFont", "+", 16);
    this.plus.name = '+';
    this.minus = this.add.bitmapText(300, this.height - 80, "pixelFont", "-", 16);
    this.minus.name = '-';

    this.one.setInteractive().on('pointerdown', this.valSelect);
    this.two.setInteractive().on('pointerdown', this.valSelect);
    this.three.setInteractive().on('pointerdown', this.valSelect);
    this.plus.setInteractive().on('pointerdown', this.valSelect);
    this.minus.setInteractive().on('pointerdown', this.valSelect);

    console.log("create complete");
  }

  update() {
    this.attackHandler();
  }

  valSelect(crystal) {
    console.log(crystal.name);
  }

  attackHandler() {
    this.scene.get('UI').events.on('attack', () => {
      this.scene.resume('MainScene');
      this.scene.pause("BattleScene");
      this.scene.sendToBack("BattleScene");
      this.scene.setVisible(false, 'UI');
    });

  }
}

