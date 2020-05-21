import Skeleton from "../objects/Skeleton";
import Player from "../objects/Player";
import Bunny from "../objects/Bunny";
import Bat from "../objects/Bat";
import Crystal_button from "../objects/Crystal_button";
import Ghost from "../objects/Ghost";
import Frog from '../objects/Frog';


export default class BattleScene extends Phaser.Scene {
  background: Phaser.GameObjects.TileSprite;
  height: number;
  width: number;
  turnCounter: number = 0;
  hp: number;
  atk: number;
  type: string;
  enemy: any;
  player: Player;
  enemies: Phaser.GameObjects.Group;
  one: Phaser.GameObjects.BitmapText;
  two: Phaser.GameObjects.BitmapText;
  three: Phaser.GameObjects.BitmapText;
  four: Phaser.GameObjects.BitmapText;
  five: Phaser.GameObjects.BitmapText;
  six: Phaser.GameObjects.BitmapText;
  seven: Phaser.GameObjects.BitmapText;
  eight: Phaser.GameObjects.BitmapText;
  nine: Phaser.GameObjects.BitmapText;
  plus: Phaser.GameObjects.BitmapText;
  minus: Phaser.GameObjects.BitmapText;
  times: Phaser.GameObjects.BitmapText;
  phase: number = 1;
  heart: Phaser.GameObjects.Image;
  first: Phaser.GameObjects.BitmapText;
  op: Phaser.GameObjects.BitmapText;
  second: Phaser.GameObjects.BitmapText;
  helpText: Phaser.GameObjects.BitmapText;
  enemyHp: Phaser.GameObjects.BitmapText;
  fireText: Phaser.GameObjects.BitmapText;
  undo: Phaser.GameObjects.BitmapText;
  baddie: any;
  playAnim: boolean = false;
  fireball: Phaser.GameObjects.Sprite;
  attackNum: number;
  previousScene: string;

  cr1: Crystal_button;
  cr2: Crystal_button;
  cr3: Crystal_button;
  cr4: Crystal_button;
  cr5: Crystal_button;
  cr6: Crystal_button;
  cr7: Crystal_button;
  cr8: Crystal_button;
  cr9: Crystal_button;
  num1: number;
  num2: number;
  num3: number;
  num4: number;
  num5: number;
  num6: number;
  num7: number;
  num8: number;
  num9: number;
  mutable: Player;

  playerTurn: boolean = true;
  enemyAtk: Phaser.GameObjects.BitmapText;
  playerHp: Phaser.GameObjects.BitmapText;
  tutorialBackground: Phaser.GameObjects.TileSprite;

  constructor() {
    super({ key: 'BattleScene' });
  }

  init(data) {
    this.baddie = data.baddie;
    this.hp = data.baddie.health;
    this.atk = data.baddie.atk;
    this.previousScene = data.previousScene;
    this.mutable = data.player
  }

  create() {
    this.width = <number>this.game.config.width;
    this.height = <number>this.game.config.height;

    this.enemies = this.physics.add.group();

    this.background = this.add.tileSprite(0, 0, this.width, this.height, "fight");
    this.background.setOrigin(0, 0);
    this.background.setScrollFactor(0);

    this.fireball = this.physics.add.sprite(150, this.height - 290, 'fireball');
    this.fireball.setScale(3.5);
    this.fireball.setAngle(90);
    this.fireball.alpha = 0;
    this.fireball.play('fireball_anim');

    this.num1 = <number>this.mutable.inventory.get('one');
    this.num2 = <number>this.mutable.inventory.get('two');
    this.num3 = <number>this.mutable.inventory.get('three');
    this.num4 = <number>this.mutable.inventory.get('four');
    this.num5 = <number>this.mutable.inventory.get('five');
    this.num6 = <number>this.mutable.inventory.get('six');
    this.num7 = <number>this.mutable.inventory.get('seven');
    this.num8 = <number>this.mutable.inventory.get('eight');
    this.num9 = <number>this.mutable.inventory.get('nine');

    if (this.baddie.name === "skeleton") {
      this.enemy = new Skeleton(this, this.width - 40, this.height - 300, this.hp, this.atk);
      this.enemy.flipX = true;
      this.enemy.setScale(5);
      this.enemy.anims.pause();
    }
    else if (this.baddie.name === "bunny") {
      this.enemy = new Bunny(this, this.width - 40, this.height - 300, this.hp, this.atk);
    }
    else if (this.baddie.name === "bat") {
      this.enemy = new Bat(this, this.width - 40, this.height - 300, this.hp, this.atk);
      this.enemy.flipX = true;
      this.enemy.setScale(3);
    }
    else if (this.baddie.name === "ghost") {
      this.enemy = new Ghost(this, this.width - 40, this.height - 300, this.hp, this.atk);
      this.enemy.flipX = true;
      this.enemy.setScale(4);
    }
    else if (this.baddie.name === "frog") {
      this.enemy = new Frog(this, this.width - 40, this.height - 300, this.hp, this.atk);
      this.enemy.flipX = true;
      this.enemy.setScale(6);
    }
    else if (this.baddie.name === "bossFrog") {
      this.enemy = new Frog(this, this.width - 40, this.height - 300, this.hp, this.atk);
      this.enemy.setScale(8);
      this.enemy.flipX = true;
    }

    this.player = new Player(this, 60, this.height - 300);
    this.player.setScale(3);
    this.player.anims.pause();

    this.one = this.add.bitmapText(71, this.height - 95, "pixelFont", "x" + <string><unknown>this.num1, 25);
    this.one.setAngle(-15);
    this.two = this.add.bitmapText(136, this.height - 95, "pixelFont", "x" + <string><unknown>this.num2, 25);
    this.two.setAngle(-15);
    this.three = this.add.bitmapText(201, this.height - 95, "pixelFont", "x" + <string><unknown>this.num3, 25);
    this.three.setAngle(-15);
    this.four = this.add.bitmapText(266, this.height - 95, "pixelFont", "x" + <string><unknown>this.num4, 25);
    this.four.setAngle(-15);
    this.five = this.add.bitmapText(331, this.height - 95, "pixelFont", "x" + <string><unknown>this.num5, 25);
    this.five.setAngle(-15);
    this.six = this.add.bitmapText(396, this.height - 95, "pixelFont", "x" + <string><unknown>this.num6, 25);
    this.six.setAngle(-15);
    this.seven = this.add.bitmapText(461, this.height - 95, "pixelFont", "x" + <string><unknown>this.num7, 25);
    this.seven.setAngle(-15);
    this.eight = this.add.bitmapText(526, this.height - 95, "pixelFont", "x" + <string><unknown>this.num8, 25);
    this.eight.setAngle(-15);
    this.nine = this.add.bitmapText(591, this.height - 95, "pixelFont", "x" + <string><unknown>this.num9, 25);
    this.nine.setAngle(-15);

    this.plus = this.add.bitmapText(650, this.height - 90, "pixelFont", "+", 30);
    this.minus = this.add.bitmapText(715, this.height - 90, "pixelFont", "-", 30);
    //this.times = this.add.bitmapText(780,this.height-90,"pixelFont", "x", 30 );

    this.cr1 = new Crystal_button(this, 65, this.height - 80, "one", this.num1);
    this.cr2 = new Crystal_button(this, 130, this.height - 80, "two", this.num2);
    this.cr3 = new Crystal_button(this, 195, this.height - 80, "three", this.num3);
    this.cr4 = new Crystal_button(this, 260, this.height - 80, "four", this.num4);
    this.cr5 = new Crystal_button(this, 325, this.height - 80, "five", this.num5);
    this.cr6 = new Crystal_button(this, 390, this.height - 80, "six", this.num6);
    this.cr7 = new Crystal_button(this, 455, this.height - 80, "seven", this.num7);
    this.cr8 = new Crystal_button(this, 520, this.height - 80, "eight", this.num8);
    this.cr9 = new Crystal_button(this, 585, this.height - 80, "nine", this.num9);

    this.cr1.setInteractive().on('pointerdown', () => this.cr1.clicked(this), this);
    this.cr2.setInteractive().on('pointerdown', () => this.cr2.clicked(this), this);
    this.cr3.setInteractive().on('pointerdown', () => this.cr3.clicked(this), this);
    this.cr4.setInteractive().on('pointerdown', () => this.cr4.clicked(this), this);
    this.cr5.setInteractive().on('pointerdown', () => this.cr5.clicked(this), this);
    this.cr6.setInteractive().on('pointerdown', () => this.cr6.clicked(this), this);
    this.cr7.setInteractive().on('pointerdown', () => this.cr7.clicked(this), this);
    this.cr8.setInteractive().on('pointerdown', () => this.cr8.clicked(this), this);
    this.cr9.setInteractive().on('pointerdown', () => this.cr9.clicked(this), this);
    this.plus.setInteractive().on('pointerdown', this.plusClicked, this);
    this.minus.setInteractive().on('pointerdown', this.minusClicked, this);
    //this.times.setInteractive().on('pointerdown',this.timesClicked, this);

    this.cr1.setInteractive().on('pointerover', () => this.cr1.hover(), this);
    this.cr2.setInteractive().on('pointerover', () => this.cr2.hover(), this);
    this.cr3.setInteractive().on('pointerover', () => this.cr3.hover(), this);
    this.cr4.setInteractive().on('pointerover', () => this.cr4.hover(), this);
    this.cr5.setInteractive().on('pointerover', () => this.cr5.hover(), this);
    this.cr6.setInteractive().on('pointerover', () => this.cr6.hover(), this);
    this.cr7.setInteractive().on('pointerover', () => this.cr7.hover(), this);
    this.cr8.setInteractive().on('pointerover', () => this.cr8.hover(), this);
    this.cr9.setInteractive().on('pointerover', () => this.cr9.hover(), this);

    this.cr1.setInteractive().on('pointerout', () => this.cr1.no_hover(), this);
    this.cr2.setInteractive().on('pointerout', () => this.cr2.no_hover(), this);
    this.cr3.setInteractive().on('pointerout', () => this.cr3.no_hover(), this);
    this.cr4.setInteractive().on('pointerout', () => this.cr4.no_hover(), this);
    this.cr5.setInteractive().on('pointerout', () => this.cr5.no_hover(), this);
    this.cr6.setInteractive().on('pointerout', () => this.cr6.no_hover(), this);
    this.cr7.setInteractive().on('pointerout', () => this.cr7.no_hover(), this);
    this.cr8.setInteractive().on('pointerout', () => this.cr8.no_hover(), this);
    this.cr9.setInteractive().on('pointerout', () => this.cr9.no_hover(), this);

    this.first = this.add.bitmapText(120, this.height - 300, "pixelFont", "_", 50);
    this.op = this.add.bitmapText(150, this.height - 300, "pixelFont", "_", 50);
    this.second = this.add.bitmapText(180, this.height - 300, "pixelFont", "_", 50);

    this.helpText = this.add.bitmapText(10, 10, "pixelFont", "Click a number, then an operator then another number \n reduce the enemy hp to 0 to win", 30);

    this.enemyHp = this.add.bitmapText(this.width - 70, this.height - 250, "pixelFont", "Hp: " + this.enemy.health, 30);
    this.enemyAtk = this.add.bitmapText(this.width - 70, this.height - 370, "pixelFont", "Atk: " + this.enemy.atk, 30);

    this.playerHp = this.add.bitmapText(30, this.height - 250, "pixelFont", "Hp: " + this.player.health, 30);
    this.undo = this.add.bitmapText(30, this.height - 220, "pixelFont", 'Undo', 30);
    this.undo.setInteractive().on('pointerdown', this.undoTurn, this);

    this.fireText = this.add.bitmapText(155, this.height - 298, "pixelFont", "5", 30);
    this.fireText.alpha = 0;
    this.fireText.tint = 0x023ada//you may notice this says ada, I will pretend this is on purpose... cause it totally was... yes

    this.fireball.play('fireball_anim');

  }

  update() {
    this.victory();
    this.turnManager();
    this.updateText();
  }

  updateText() {
    this.one.text = "x" + this.cr1.amount;
    this.two.text = "x" + this.cr2.amount;
    this.three.text = "x" + this.cr3.amount;
    this.four.text = "x" + this.cr4.amount;
    this.five.text = "x" + this.cr5.amount;
    this.six.text = "x" + this.cr6.amount;
    this.seven.text = "x" + this.cr7.amount;
    this.eight.text = "x" + this.cr8.amount;
    this.nine.text = "x" + this.cr9.amount;

    if (this.helpText.alpha > 0) {
      this.helpText.alpha -= .003;
    }
    this.enemyHp.text = "Hp: " + this.enemy.health;
    this.playerHp.text = "Hp: " + this.player.health;
  }

  plusClicked() {
    console.log("+");
    if (this.phase === 2) {
      this.op.text = "+";
      this.phase++;
    }
    else if (this.phase === 1 || this.phase === 3) {
      this.helpText.text = "Please select a number";
      this.helpText.alpha = 1;
    }
  }

  minusClicked() {
    console.log("-");
    if (this.phase === 2) {
      this.op.text = "-";
      this.phase++;
    }
    else if (this.phase === 1 || this.phase === 3) {
      this.helpText.text = "Please select a number";
      this.helpText.alpha = 1;
    }
  }

  timesClicked() {
    console.log("x");
    if (this.phase === 2) {
      this.op.text = "x";
      this.phase++;
    }
    else if (this.phase === 1 || this.phase === 3) {
      this.helpText.text = "Please select a number";
      this.helpText.alpha = 1;
    }
  }

  undoTurn() {
    if (this.phase === 1) {
      this.helpText.text = "There is nothing to undo";
      this.helpText.alpha = 1;
    }
    else if (this.phase === 2) {
      if (this.first.text === "1") {
        this.cr1.undo(this);
      }
      else if (this.first.text === "2") {
        this.cr2.undo(this);
      }
      else if (this.first.text === "3") {
        this.cr3.undo(this);
      }
      else if (this.first.text === "4") {
        this.cr4.undo(this);
      }
      else if (this.first.text === "5") {
        this.cr5.undo(this);
      }
      else if (this.first.text === "6") {
        this.cr6.undo(this);
      }
      else if (this.first.text === "7") {
        this.cr7.undo(this);
      }
      else if (this.first.text === "8") {
        this.cr8.undo(this);
      }
      else if (this.first.text === "9") {
        this.cr9.undo(this);
      }
      this.first.text = "_";
      this.phase -= 1;
    }
    else if (this.phase === 3) {
      this.op.text = "_";
      this.phase -= 1;
    }
  }

  resolve() {

    this.first.x = 120;
    this.second.x = 180;
    this.first.alpha = 1;
    this.op.alpha = 1;
    this.second.alpha = 1;
    this.fireball.x = 150;
    this.fireText.x = 155;

    this.op.text = "_";
    this.first.text = "_";
    this.second.text = "_";

  }

  sceneSwitcher() {
    this.events.emit("win", this.baddie.name);
    this.scene.stop("BattleScene");
    this.scene.resume(this.previousScene);
    this.scene.setVisible(false, "UI");
    this.scene.get(this.previousScene).input.keyboard.resetKeys();
  }


  victory() {
    if (this.enemy.health === 0) {
      this.sceneSwitcher();
    }
    if (this.enemy.health < 0) {
      this.sceneSwitcher();
    }
  }

  death() {
    if (this.player.health <= 0) {
      this.scene.pause("BattleScene");
      this.scene.launch("Restart", { currentScene: this.previousScene });
      this.scene.sendToBack("BattleScene");
    }
  }

  fled() {
    if (this.enemy.health > 0 && this.turnCounter > 0) {
      this.sceneSwitcher();
    }
  }

  enemyTurn() {
    this.enemy.x -= 6;
    if (this.enemy.x < 40) {
      this.player.health -= this.enemy.atk;
      this.enemy.x = this.width - 40;
      this.playerTurn = true;
      this.playAnim = false;
    }
  }

  playerTurnAnim() {
    if (this.playAnim) {
      if (this.first.x > 149) {
        this.fireball.x += 8;
        this.fireText.x += 8;
        if (this.fireball.x > this.width - 50) {
          this.enemy.tint = 0xffffff;
        }
        if (this.fireball.x > this.width - 40) {
          this.fireball.alpha = 0;
          this.fireText.alpha = 0;
          this.playerTurn = false;
          this.enemy.health -= this.attackNum;
          this.resolve();
          if (this.enemy.health === 0) {
            this.playerTurn = true;
            this.turnCounter += 1;
            this.playAnim = false;
          }
        }
      }
      else if (this.first.x > 140) {
        this.first.x += .3;
        this.second.x -= .3;
        this.first.alpha -= .03;
        this.second.alpha -= .03;
        this.fireball.alpha += .1;
        this.fireText.alpha += .1;
      }
      else {
        this.first.x += .25;
        this.second.x -= .25;
        this.op.alpha -= .015;
      }
    }
  }

  turnManager() {
    if (this.playerTurn) {
      this.playerTurnAnim();
    }
    else {
      this.enemyTurn();
    }
  }
}

