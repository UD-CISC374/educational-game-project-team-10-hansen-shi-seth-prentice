import Skeleton from "../objects/Skeleton";
import Player from "../objects/Player";
import Bunny from "../objects/Bunny";
import Crystal_button from "../objects/Crystal_button";

export default class TutorialBattleScene extends Phaser.Scene {
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
  heartContainers: Phaser.GameObjects.Group;
  one: Phaser.GameObjects.BitmapText;
  two: Phaser.GameObjects.BitmapText;
  three: Phaser.GameObjects.BitmapText;
  plus: Phaser.GameObjects.BitmapText;
  minus: Phaser.GameObjects.BitmapText;
  phase: number = 1;
  heart: Phaser.GameObjects.Image;
  first: Phaser.GameObjects.BitmapText;
  op: Phaser.GameObjects.BitmapText;
  second: Phaser.GameObjects.BitmapText;
  helpText: Phaser.GameObjects.BitmapText;
  enemyHp: Phaser.GameObjects.BitmapText;
  fireText: Phaser.GameObjects.BitmapText;
  baddie: any;
  playAnim: boolean = false;
  fireball: Phaser.GameObjects.Sprite;
  attackNum: number;
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
  previousScene: string;
  rect: Phaser.GameObjects.Rectangle;

  playerTurn: boolean = true;
  enemyAtk: Phaser.GameObjects.BitmapText;
  playerHp: Phaser.GameObjects.BitmapText;
  tutorialBackground: Phaser.GameObjects.TileSprite;

  constructor() {
    super({ key: 'TutorialBattleScene' });
  }

  init(data) {
    this.baddie = data.baddie;
    this.hp = data.baddie.health;
    this.atk = data.baddie.atk;
    this.previousScene = data.previousScene;
  }

  create() {
    this.width = <number>this.game.config.width;
    this.height = <number>this.game.config.height;

    this.enemies = this.physics.add.group();
    this.heartContainers = this.physics.add.staticGroup();

    this.background = this.add.tileSprite(0, 0, this.width, this.height, "tutorialBattle");
    this.background.setOrigin(0, 0);
    this.background.setScrollFactor(0);

    this.fireball = this.physics.add.sprite(150, this.height - 290, 'fireball');
    this.fireball.setScale(3.5);
    this.fireball.setAngle(90);
    this.fireball.alpha = 0;
    this.fireball.play('fireball_anim');

    if (this.baddie.name === "skeleton") {
      this.enemy = new Skeleton(this, this.width - 40, this.height - 300, this.hp, this.atk);
      this.enemy.flipX = true;
      this.enemy.setScale(5);
      this.enemy.anims.pause();
    }
    else if (this.baddie.name === "bunny") {
      this.enemy = new Bunny(this, this.width - 40, this.height - 300, this.hp, this.atk);
    }

    this.player = new Player(this, 60, this.height - 300);
    this.player.setScale(3);
    this.player.anims.pause();

    //this.scene.launch('UI', { playerHp: this.player.health, enemyHp: this.enemy.health, enemyAtk: this.enemy.atk })

    this.rect = this.add.rectangle(63.7, this.height-80, 20, 40, 0xff0000);

    //this.one = this.add.bitmapText(65,this.height-80,"pixelFont", "1", 30 );
    //this.two = this.add.bitmapText(130,this.height-80,"pixelFont", "2", 30 );
    //this.three = this.add.bitmapText(195,this.height-80,"pixelFont", "3", 30 );
    this.plus = this.add.bitmapText(650, this.height - 80, "pixelFont", "+", 30);
    this.minus = this.add.bitmapText(715, this.height - 80, "pixelFont", "-", 30);

    this.cr1 = new Crystal_button(this, 65, this.height-80, "one", this.num1);
    this.cr2 = new Crystal_button(this, 130, this.height-80, "two", this.num2);
    this.cr3 = new Crystal_button(this, 195, this.height-80, "three", this.num3);
    this.cr4 = new Crystal_button(this, 260, this.height-80, "four", this.num4);
    this.cr5 = new Crystal_button(this, 325, this.height-80, "five", this.num5);
    this.cr6 = new Crystal_button(this, 390, this.height-80, "six", this.num6);
    this.cr7 = new Crystal_button(this, 455, this.height-80, "seven", this.num7);
    this.cr8 = new Crystal_button(this, 520, this.height-80, "eight", this.num8);
    this.cr9 = new Crystal_button(this, 585, this.height-80, "nine", this.num9);

    this.cr1.setInteractive().on('pointerdown', this.oneClicked, this);
    this.cr2.setInteractive().on('pointerdown', this.twoClicked, this);
    /*this.cr3.setInteractive().on('pointerdown', this.threeClicked, this);
    this.cr4.setInteractive().on('pointerdown', this.fourClicked, this);
    this.cr5.setInteractive().on('pointerdown', this.fiveClicked, this);
    this.cr6.setInteractive().on('pointerdown', this.sixClicked, this);
    this.cr7.setInteractive().on('pointerdown', this.sevenClicked, this);
    this.cr8.setInteractive().on('pointerdown', this.eightClicked, this);
    this.cr9.setInteractive().on('pointerdown', this.nineClicked, this);*/
    this.plus.setInteractive().on('pointerdown', this.plusClicked, this);
    this.minus.setInteractive().on('pointerdown', this.minusClicked, this);

    this.first = this.add.bitmapText(120, this.height - 300, "pixelFont", "_", 50);
    this.op = this.add.bitmapText(150, this.height - 300, "pixelFont", "_", 50);
    this.second = this.add.bitmapText(180, this.height - 300, "pixelFont", "_", 50);

    this.helpText = this.add.bitmapText(10, 10, "pixelFont", "Click one, your goal is to \nreduce the enemy hp to exactly 0", 30);

    this.enemyHp = this.add.bitmapText(this.width - 60, this.height - 250, "pixelFont", "Hp: " + this.enemy.health, 30);
    this.enemyAtk = this.add.bitmapText(this.width - 70, this.height - 370, "pixelFont", "Atk: " + this.enemy.atk, 30);

    this.playerHp = this.add.bitmapText(30, this.height - 250, "pixelFont", "Hp: " + this.player.health, 30);

    this.fireText = this.add.bitmapText(155, this.height - 298, "pixelFont", "5", 30);
    this.fireText.alpha = 0;
    this.fireText.tint = 0x023ada//you may notice this says ada, I will pretend this is on purpose... cause it totally was... yes

    this.fireball.play('fireball_anim');

  }

  update() {
    this.victory();
    this.turnManager();

    if(this.phase === 2){
      this.helpText.text = "Next you pick an operator, \nclick on plus"
      this.rect.x = 657.5;
      this.rect.y = this.height-58.5;
      this.rect.width = 17;
      this.rect.height = 17;
    }
    if(this.phase === 3){
      this.helpText.text = "finially you select the other number, \npick 2"
      this.rect.x = 128.7;
      this.rect.y = this.height-80;
      this.rect.width = 20;
      this.rect.height = 40;
    }

    /*if (this.helpText.alpha > 0) {
      this.helpText.alpha -= .003;
    }*/
    if (this.playAnim) {
      if (this.first.x > 149) {
        this.fireball.x += 8;
        this.fireText.x += 8;
        if (this.fireball.x > this.width - 50) {
          this.baddie.tint = 0xffffff;
        }
        if (this.fireball.x > this.width - 40) {
          this.resolve();
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
    this.updateHealth();
    this.emitManager();
  }

  oneClicked() {
    console.log(1);
    if (this.phase === 1) {
      this.first.text = "1";
      this.phase++;
    }
    else if (this.phase === 2) {
      this.helpText.text = "Please select an operator";
      this.helpText.alpha = 1;
    }
    else if (this.phase === 3) {
      this.second.text = "1";
      this.phase = 1;
      this.playAnim = true;
      if (this.op.text === "+") {
        this.attackNum = +(+<number><unknown>this.first.text + +<number><unknown>this.second.text);
      }
      else if (this.op.text === "-") {
        this.attackNum = +(+<number><unknown>this.first.text - +<number><unknown>this.second.text)
      }
      this.fireText.text = <string><unknown>this.attackNum;
    }
  }

  twoClicked() {
    console.log(2);
    if (this.phase === 1) {
      this.first.text = "2";
      this.phase++;
    }
    else if (this.phase === 2) {
      this.helpText.text = "Please select an operator";
      this.helpText.alpha = 1;
    }
    else if (this.phase === 3) {
      this.second.text = "2";
      this.phase = 1;
      this.playAnim = true;
      if (this.op.text === "+") {
        this.attackNum = +(+<number><unknown>this.first.text + +<number><unknown>this.second.text);
      }
      else if (this.op.text === "-") {
        this.attackNum = +(+<number><unknown>this.first.text - +<number><unknown>this.second.text)
      }
      this.fireText.text = <string><unknown>this.attackNum;
    }
  }

  threeClicked() {
    console.log(3);
    if (this.phase === 1) {
      this.first.text = "3";
      this.phase++;
    }
    else if (this.phase === 2) {
      this.helpText.text = "Please select an operator";
      this.helpText.alpha = 1;
    }
    else if (this.phase === 3) {
      this.second.text = "3";
      this.phase = 1;
      this.playAnim = true;
      if (this.op.text === "+") {
        this.attackNum = +(+<number><unknown>this.first.text + +<number><unknown>this.second.text);
      }
      else if (this.op.text === "-") {
        this.attackNum = +(+<number><unknown>this.first.text - +<number><unknown>this.second.text)
      }
      this.fireText.text = <string><unknown>this.attackNum;
    }
  }

  fourClicked() {
    console.log(4);
    if (this.phase === 1) {
      this.first.text = "4";
      this.phase++;
    }
    else if (this.phase === 2) {
      this.helpText.text = "Please select an operator";
      this.helpText.alpha = 1;
    }
    else if (this.phase === 3) {
      this.second.text = "4";
      this.phase = 1;
      this.playAnim = true;
      if (this.op.text === "+") {
        this.attackNum = +(+<number><unknown>this.first.text + +<number><unknown>this.second.text);
      }
      else if (this.op.text === "-") {
        this.attackNum = +(+<number><unknown>this.first.text - +<number><unknown>this.second.text)
      }
      this.fireText.text = <string><unknown>this.attackNum;
    }
  }

  fiveClicked() {
    console.log(5);
    if (this.phase === 1) {
      this.first.text = "5";
      this.phase++;
    }
    else if (this.phase === 2) {
      this.helpText.text = "Please select an operator";
      this.helpText.alpha = 1;
    }
    else if (this.phase === 3) {
      this.second.text = "5";
      this.phase = 1;
      this.playAnim = true;
      if (this.op.text === "+") {
        this.attackNum = +(+<number><unknown>this.first.text + +<number><unknown>this.second.text);
      }
      else if (this.op.text === "-") {
        this.attackNum = +(+<number><unknown>this.first.text - +<number><unknown>this.second.text)
      }
      this.fireText.text = <string><unknown>this.attackNum;
    }
  }

  sixClicked() {
    console.log(6);
    if (this.phase === 1) {
      this.first.text = "6";
      this.phase++;
    }
    else if (this.phase === 2) {
      this.helpText.text = "Please select an operator";
      this.helpText.alpha = 1;
    }
    else if (this.phase === 3) {
      this.second.text = "6";
      this.phase = 1;
      this.playAnim = true;
      if (this.op.text === "+") {
        this.attackNum = +(+<number><unknown>this.first.text + +<number><unknown>this.second.text);
      }
      else if (this.op.text === "-") {
        this.attackNum = +(+<number><unknown>this.first.text - +<number><unknown>this.second.text)
      }
      this.fireText.text = <string><unknown>this.attackNum;
    }
  }

  sevenClicked() {
    console.log(3);
    if (this.phase === 1) {
      this.first.text = "7";
      this.phase++;
    }
    else if (this.phase === 2) {
      this.helpText.text = "Please select an operator";
      this.helpText.alpha = 1;
    }
    else if (this.phase === 3) {
      this.second.text = "7";
      this.phase = 1;
      this.playAnim = true;
      if (this.op.text === "+") {
        this.attackNum = +(+<number><unknown>this.first.text + +<number><unknown>this.second.text);
      }
      else if (this.op.text === "-") {
        this.attackNum = +(+<number><unknown>this.first.text - +<number><unknown>this.second.text)
      }
      this.fireText.text = <string><unknown>this.attackNum;
    }
  }

  eightClicked() {
    console.log(8);
    if (this.phase === 1) {
      this.first.text = "8";
      this.phase++;
    }
    else if (this.phase === 2) {
      this.helpText.text = "Please select an operator";
      this.helpText.alpha = 1;
    }
    else if (this.phase === 3) {
      this.second.text = "8";
      this.phase = 1;
      this.playAnim = true;
      if (this.op.text === "+") {
        this.attackNum = +(+<number><unknown>this.first.text + +<number><unknown>this.second.text);
      }
      else if (this.op.text === "-") {
        this.attackNum = +(+<number><unknown>this.first.text - +<number><unknown>this.second.text)
      }
      this.fireText.text = <string><unknown>this.attackNum;
    }
  }

  nineClicked() {
    console.log(9);
    if (this.phase === 1) {
      this.first.text = "9";
      this.phase++;
    }
    else if (this.phase === 2) {
      this.helpText.text = "Please select an operator";
      this.helpText.alpha = 1;
    }
    else if (this.phase === 3) {
      this.second.text = "9";
      this.phase = 1;
      this.playAnim = true;
      if (this.op.text === "+") {
        this.attackNum = +(+<number><unknown>this.first.text + +<number><unknown>this.second.text);
      }
      else if (this.op.text === "-") {
        this.attackNum = +(+<number><unknown>this.first.text - +<number><unknown>this.second.text)
      }
      this.fireText.text = <string><unknown>this.attackNum;
    }
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

  resolve() {
    this.enemy.health -= this.attackNum;

    this.playAnim = false;

    this.first.x = 120;
    this.second.x = 180;
    this.first.alpha = 1;
    this.op.alpha = 1;
    this.second.alpha = 1;
    this.fireball.x = 150;
    this.fireText.x = 155;
    this.fireball.alpha = 0;
    this.fireText.alpha = 0;

    this.op.text = "_";
    this.first.text = "_";
    this.second.text = "_";

    this.baddie.clearTint();
    this.playerTurn = false;
    this.turnCounter += 1;
  }

  sceneSwitcher() {
    this.events.emit("win");
    this.scene.stop("TutorialBattleScene");
    this.scene.resume(this.previousScene);
    this.scene.setVisible(false, "UI");
    this.scene.get(this.previousScene).input.keyboard.resetKeys();
  }

  victory() {
    if (this.enemy.health === 0) {
      this.sceneSwitcher();
    }
  }

  fled() {
    if (this.enemy.health > 0 && this.turnCounter > 0){
      this.sceneSwitcher();
    }
  }

  emitManager() {
    this.scene.get("UI").events.once("attack", () => {
      this.one.setVisible(true);
      this.two.setVisible(true);
      this.three.setVisible(true);
      this.plus.setVisible(true);
      this.minus.setVisible(true);

    });
  }

  enemyTurn() {
    if (this.enemy.chooseAction() === 'attack') {
      this.player.health -= this.enemy.atk;
      this.playerTurn = true;
    }
    else if (this.enemy.chooseAction() === 'flee') {
      this.fled();
    }
  }

  updateHealth(){
    this.enemyHp.text = "Hp: " + this.enemy.health;
    this.playerHp.text = "Hp: " + this.player.health;
  }

  turnManager() {
    if (this.playerTurn) {

    }
    else {
      this.enemyTurn();
    }
  }
}

