import Skeleton from "../objects/Skeleton";
import Player from "../objects/Player";
import Bunny from "../objects/Bunny";
import Bat from "../objects/Bat";
import Crystal from "../objects/Crystal";

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
  heartContainers: Phaser.GameObjects.Group;
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
  previousScene: string;
  
  cr1: Phaser.GameObjects.Image;
  cr2: Phaser.GameObjects.Image;
  cr3: Phaser.GameObjects.Image;
  cr4: Phaser.GameObjects.Image;
  cr5: Phaser.GameObjects.Image;
  cr6: Phaser.GameObjects.Image;
  cr7: Phaser.GameObjects.Image;
  cr8: Phaser.GameObjects.Image;
  cr9: Phaser.GameObjects.Image;
  num1: number;
  num2: number;
  num3: number;
  num4: number;
  num5: number;
  num6: number;
  num7: number;
  num8: number;
  num9: number;
  mutable:Player;

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
    this.heartContainers = this.physics.add.staticGroup();

    this.background = this.add.tileSprite(0, 0, this.width, this.height, "fight");
    this.background.setOrigin(0, 0);
    this.background.setScrollFactor(0);

    this.fireball = this.physics.add.sprite(150, this.height - 290, 'fireball');
    this.fireball.setScale(3.5);
    this.fireball.setAngle(90);
    this.fireball.alpha = 0;
    this.fireball.play('fireball_anim');

    this.num1 = <number> this.mutable.inventory.get('one');
    this.num2 = <number> this.mutable.inventory.get('two');
    this.num3 = <number> this.mutable.inventory.get('three');
    this.num4 = <number> this.mutable.inventory.get('four');
    this.num5 = <number> this.mutable.inventory.get('five');
    this.num6 = <number> this.mutable.inventory.get('six');
    this.num7 = <number> this.mutable.inventory.get('seven');
    this.num8 = <number> this.mutable.inventory.get('eight');
    this.num9 = <number> this.mutable.inventory.get('nine');

    if (this.baddie.name === "skeleton") {
      this.enemy = new Skeleton(this, this.width - 40, this.height - 300, this.hp, this.atk);
      this.enemy.flipX = true;
      this.enemy.setScale(5);
      this.enemy.anims.pause();
    }
    else if (this.baddie.name === "bunny") {
      this.enemy = new Bunny(this, this.width - 40, this.height - 300, this.hp, this.atk);
    }
    else if (this.baddie.name === "bat"){
      this.enemy = new Bat(this, this.width - 40, this.height - 300, this.hp, this.atk);
      this.enemy.flipX = true;
      this.enemy.setScale(3);
    }

    this.player = new Player(this, 60, this.height - 300);
    this.player.setScale(3);
    this.player.anims.pause();

    this.one = this.add.bitmapText(71,this.height-95,"pixelFont", "x" + <string> <unknown>this.num1, 25 );
    this.one.setAngle(-15);
    this.two = this.add.bitmapText(136,this.height-95,"pixelFont", "x" + <string> <unknown>this.num2, 25 );
    this.two.setAngle(-15);
    this.three = this.add.bitmapText(201,this.height-95,"pixelFont", "x" + <string> <unknown>this.num3, 25 );
    this.three.setAngle(-15);
    this.four = this.add.bitmapText(266,this.height-95,"pixelFont", "x" + <string> <unknown>this.num4, 25 );
    this.four.setAngle(-15);
    this.five = this.add.bitmapText(331,this.height-95,"pixelFont", "x" + <string> <unknown>this.num5, 25 );
    this.five.setAngle(-15);
    this.six = this.add.bitmapText(396,this.height-95,"pixelFont", "x" + <string> <unknown>this.num6, 25 );
    this.six.setAngle(-15);
    this.seven = this.add.bitmapText(461,this.height-95,"pixelFont", "x" + <string> <unknown>this.num7, 25 );
    this.seven.setAngle(-15);
    this.eight = this.add.bitmapText(526,this.height-95,"pixelFont", "x" + <string> <unknown>this.num8, 25 );
    this.eight.setAngle(-15);
    this.nine = this.add.bitmapText(591,this.height-95,"pixelFont", "x" + <string> <unknown>this.num9, 25 );
    this.nine.setAngle(-15);

    this.plus = this.add.bitmapText(650,this.height-90,"pixelFont", "+", 30 );
    this.minus = this.add.bitmapText(715,this.height-90,"pixelFont", "-", 30 );

    this.cr1 = this.add.image(65, this.height-80, 'crystal_button1');
    this.cr2 = this.add.image(130, this.height-80, 'crystal_button2');
    this.cr3 = this.add.image(195, this.height-80, 'crystal_button3');
    this.cr4 = this.add.image(260, this.height-80, 'crystal_button4');
    this.cr5 = this.add.image(325, this.height-80, 'crystal_button5');
    this.cr6 = this.add.image(390, this.height-80, 'crystal_button6');
    this.cr7 = this.add.image(455, this.height-80, 'crystal_button7');
    this.cr8 = this.add.image(520, this.height-80, 'crystal_button8');
    this.cr9 = this.add.image(585, this.height-80, 'crystal_button9');
    
    this.cr1.setInteractive().on('pointerdown',this.oneClicked, this);
    this.cr2.setInteractive().on('pointerdown',this.twoClicked, this);
    this.cr3.setInteractive().on('pointerdown',this.threeClicked, this);
    this.cr4.setInteractive().on('pointerdown',this.fourClicked, this);
    this.cr5.setInteractive().on('pointerdown',this.fiveClicked, this);
    this.cr6.setInteractive().on('pointerdown',this.sixClicked, this);
    this.cr7.setInteractive().on('pointerdown',this.sevenClicked, this);
    this.cr8.setInteractive().on('pointerdown',this.eightClicked, this);
    this.cr9.setInteractive().on('pointerdown',this.nineClicked, this);
    this.plus.setInteractive().on('pointerdown',this.plusClicked, this);
    this.minus.setInteractive().on('pointerdown',this.minusClicked, this);

    this.first = this.add.bitmapText(120,this.height-300,"pixelFont", "_", 50 );
    this.op = this.add.bitmapText(150,this.height-300,"pixelFont", "_", 50 );
    this.second = this.add.bitmapText(180,this.height-300,"pixelFont", "_", 50 );

    this.helpText = this.add.bitmapText(10, 10,"pixelFont", "Click a number, then an operator then another number \n reduce the enemy hp to 0 to win", 30 );

    this.enemyHp = this.add.bitmapText(this.width - 70, this.height - 250,"pixelFont", "Hp: " + this.enemy.health, 30 );
    this.enemyAtk = this.add.bitmapText(this.width - 70, this.height - 370,"pixelFont", "Atk: " + this.enemy.atk, 30 );

    this.playerHp = this.add.bitmapText(30, this.height - 250,"pixelFont", "Hp: " + this.player.health, 30 );
    
    this.fireText = this.add.bitmapText(155,this.height-298,"pixelFont", "5", 30 );
    this.fireText.alpha = 0;
    this.fireText.tint = 0x023ada

    this.fireball.play('fireball_anim');

  }

  update() {
    this.victory();
    this.turnManager();

    if (this.helpText.alpha > 0) {
      this.helpText.alpha -= .003;
    }
    this.enemyHp.text = "Hp: " + this.enemy.health;
    this.playerHp.text = "Hp: " + this.player.health;
    
  }

  oneClicked() {
    console.log(1);
    if(this.phase === 1 && this.num1>0){
      this.mutable.reduce("one");
      this.num1-=1;
      this.one.text = "x"+this.num1;
      this.first.text = "1";
      this.phase++;
    }
    else if (this.phase === 2) {
      this.helpText.text = "Please select an operator";
      this.helpText.alpha = 1;
    }
    else if(this.phase === 3 && this.num1 > 0){
      this.mutable.reduce("one");
      this.num1-=1;
      this.one.text = "x"+this.num1;
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
    if(this.phase === 1 && this.num2 > 0){
      this.mutable.reduce("two");
      this.num2-=1;
      this.two.text = "x"+this.num2;
      this.first.text = "2";
      this.phase++;
    }
    else if (this.phase === 2) {
      this.helpText.text = "Please select an operator";
      this.helpText.alpha = 1;
    }
    else if(this.phase === 3 && this.num2 > 0){
      this.mutable.reduce("two");
      this.num2-=1;
      this.two.text = "x"+this.num2;
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
    if(this.phase === 1 && this.num3>0){
      this.mutable.reduce("three");
      this.num3-=1;
      this.three.text = "x"+this.num3;
      this.first.text = "3";
      this.phase++;
    }
    else if (this.phase === 2) {
      this.helpText.text = "Please select an operator";
      this.helpText.alpha = 1;
    }
    else if(this.phase === 3 && this.num3){
      this.mutable.reduce("three");
      this.num3-=1;
      this.three.text = "x"+this.num3;
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
    if(this.phase === 1 && this.num4 > 0){
      this.mutable.reduce("four");
      this.num4-=1;
      this.four.text = "x"+this.num4;
      this.first.text = "4";
      this.phase++;
    }
    else if (this.phase === 2) {
      this.helpText.text = "Please select an operator";
      this.helpText.alpha = 1;
    }
    else if(this.phase === 3 && this.num4 > 0){
      this.mutable.reduce("four");
      this.num4-=1;
      this.four.text = "x"+this.num4;
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
    if(this.phase === 1 && this.num5 > 0){
      this.mutable.reduce("five");
      this.num5-=1;
      this.five.text = "x"+this.num5;
      this.first.text = "5";
      this.phase++;
    }
    else if (this.phase === 2) {
      this.helpText.text = "Please select an operator";
      this.helpText.alpha = 1;
    }
    else if(this.phase === 3 && this.num5 > 0){
      this.mutable.reduce("five");
      this.num5-=1;
      this.five.text = "x"+this.num5;
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
    if(this.phase === 1 && this.num6 > 0){
      this.mutable.reduce("six");
      this.num6-=1;
      this.six.text = "x"+this.num6;
      this.first.text = "6";
      this.phase++;
    }
    else if (this.phase === 2) {
      this.helpText.text = "Please select an operator";
      this.helpText.alpha = 1;
    }
    else if(this.phase === 3 && this.num6 > 0){
      this.mutable.reduce("six");
      this.num6-=1;
      this.six.text = "x"+this.num6;
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
    if(this.phase === 1 && this.num7 > 0){
      this.mutable.reduce("seven");
      this.num7-=1;
      this.seven.text = "x"+this.num7;
      this.first.text = "7";
      this.phase++;
    }
    else if(this.phase === 2 && this.num7 > 0){
      this.num7-=1;
      this.seven.text = "x"+this.num7;
      this.helpText.text = "Please select an operator";
      this.helpText.alpha = 1;
    }
    else if(this.phase === 3 && this.num7 > 0){
      this.mutable.reduce("seven");
      this.num7-=1;
      this.seven.text = "x"+this.num7;
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
    if(this.phase === 1 && this.num8 > 0){
      this.mutable.reduce("eight");
      this.num8-=1;
      this.eight.text = "x"+this.num8;
      this.first.text = "8";
      this.phase++;
    }
    else if (this.phase === 2) {
      this.helpText.text = "Please select an operator";
      this.helpText.alpha = 1;
    }
    else if(this.phase === 3 && this.num8 > 0){
      this.mutable.reduce("eight");
      this.num8-=1;
      this.eight.text = "x"+this.num8;
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
    if(this.phase === 1 && this.num9 > 0){
      this.mutable.reduce("nine");
      this.num9-=1;
      this.nine.text = "x"+this.num9;
      this.first.text = "9";
      this.phase++;
    }
    else if (this.phase === 2) {
      this.helpText.text = "Please select an operator";
      this.helpText.alpha = 1;
    }
    else if(this.phase === 3 && this.num9 > 0){
      this.mutable.reduce("nine");
      this.num9-=1;
      this.nine.text = "x"+this.num9;
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

  resolve(){
    
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
    this.events.emit("win");
    this.scene.stop("BattleScene");
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

  enemyTurn(){
    this.enemy.x -= 6;
    if(this.enemy.x < 40){
      this.player.health -= this.enemy.atk;
      this.enemy.x = this.width-40;
      this.playerTurn = true;
      this.playAnim=false;
    }
  }

  playerTurnAnim(){
    if(this.playAnim){
      if(this.first.x > 149){
        this.fireball.x += 8;
        this.fireText.x += 8;
        if(this.fireball.x > this.width-50){
          this.enemy.tint = 0xffffff;
        }
        if(this.fireball.x > this.width-40){
          this.fireball.alpha = 0;
          this.fireText.alpha = 0;
          this.playerTurn = false;
          this.enemy.health -= this.attackNum;
          this.resolve();
          if(this.enemy.health === 0){
            this.playerTurn = true;
            this.turnCounter += 1;
            this.playAnim=false;
          }
        }
      }
      else if(this.first.x > 140){
        this.first.x += .3;
        this.second.x -= .3;
        this.first.alpha -= .03;
        this.second.alpha -= .03;
        this.fireball.alpha += .1;
        this.fireText.alpha += .1;
      }
      else{
        this.first.x += .25;
        this.second.x -= .25;
        this.op.alpha -= .015;
      }
    }
  }

  turnManager(){
    if (this.playerTurn){
      this.playerTurnAnim();
    }
    else {
      this.enemyTurn();
    }
  }
}

