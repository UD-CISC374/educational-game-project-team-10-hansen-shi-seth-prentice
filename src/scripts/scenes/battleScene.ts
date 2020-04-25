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
  phase: number = 1;
  heart: Phaser.GameObjects.Image;
  first: Phaser.GameObjects.BitmapText;
  op: Phaser.GameObjects.BitmapText;
  second: Phaser.GameObjects.BitmapText;
  helpText: Phaser.GameObjects.BitmapText;
  enemyHp: Phaser.GameObjects.BitmapText;
  animText: Phaser.GameObjects.BitmapText;

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
    this.one = this.add.bitmapText(65,this.height-80,"pixelFont", "1", 30 );
    this.one.name = '1';
    this.two = this.add.bitmapText(130,this.height-80,"pixelFont", "2", 30 );
    this.two.name = '2';
    this.three = this.add.bitmapText(195,this.height-80,"pixelFont", "3", 30 );
    this.three.name = '3';
    this.plus = this.add.bitmapText(260,this.height-80,"pixelFont", "+", 30 );
    this.plus.name = '+';
    this.minus = this.add.bitmapText(325,this.height-80,"pixelFont", "-", 30 );
    this.minus.name = '-';
    
    this.one.setInteractive().on('pointerdown',this.oneClicked, this);
    this.two.setInteractive().on('pointerdown',this.twoClicked, this);
    this.three.setInteractive().on('pointerdown',this.threeClicked, this);
    this.plus.setInteractive().on('pointerdown',this.plusClicked, this);
    this.minus.setInteractive().on('pointerdown',this.minusClicked, this);

    this.first = this.add.bitmapText(120,this.height-300,"pixelFont", "_", 50 );
    this.op = this.add.bitmapText(150,this.height-300,"pixelFont", "_", 50 );
    this.second = this.add.bitmapText(180,this.height-300,"pixelFont", "_", 50 );

    this.helpText = this.add.bitmapText(10, 10,"pixelFont", "Click a number, then an operator then another number \n reduce the enemy hp to 0 to win", 30 );

    this.enemyHp = this.add.bitmapText(this.width - 70, this.height - 370,"pixelFont", "HP: " + this.hp, 30 );

    this.animText = this.add.bitmapText(this.width/2 - 70, this.height - 320,"pixelFont", "fancy animation here", 30 );
    this.animText.alpha = 0;

    console.log("create complete");
  }

  update() {
    if(this.hp === 0){
      console.log("win");
      this.hp--;
      this.sceneSwitcher();
    }
    if(this.helpText.alpha > 0){
      this.helpText.alpha -=.003;
    }
    if(this.animText.alpha > 0){
      this.animText.alpha -=.003;
    }
    this.enemyHp.text = "HP: " + this.hp;
  }

  oneClicked(){
    console.log(1);
    if(this.phase === 1){
      this.first.text = "1";
      this.phase++;
    }
    else if(this.phase === 2){
      this.helpText.text = "Please select an operator";
      this.helpText.alpha = 1;
    }
    else if(this.phase === 3){
      this.second.text = "1";
      this.phase = 1;
      this.resolve();
    }
  }

  twoClicked(){
    console.log(2);
    if(this.phase === 1){
      this.first.text = "2";
      this.phase++;
    }
    else if(this.phase === 2){
      this.helpText.text = "Please select an operator";
      this.helpText.alpha = 1;
    }
    else if(this.phase === 3){
      this.second.text = "2";
      this.phase = 1;
      this.resolve();
    }
  }

  threeClicked(){
    console.log(3);
    if(this.phase === 1){
      this.first.text = "3";
      this.phase++;
    }
    else if(this.phase === 2){
      this.helpText.text = "Please select an operator";
      this.helpText.alpha = 1;
    }
    else if(this.phase === 3){
      this.second.text = "3";
      this.phase = 1;
      this.resolve();
    }
  }

  plusClicked(){
    console.log("+");
    if(this.phase === 2){
      this.op.text = "+";
      this.phase++;
    }
    else if(this.phase === 1 || this.phase === 3){
      this.helpText.text = "Please select a number";
      this.helpText.alpha = 1;
    }
  }

  minusClicked(){
    console.log("-");
    if(this.phase === 2){
      this.op.text = "-";
      this.phase++;
    }
    else if(this.phase === 1 || this.phase === 3){
      this.helpText.text = "Please select a number";
      this.helpText.alpha = 1;
    }
  }

  resolve(){
    if(this.op.text === "+"){
      this.hp -=+(+<number> <unknown>this.first.text + +<number> <unknown>this.second.text);
    }
    else if(this.op.text === "-"){
      this.hp -=+(+<number> <unknown>this.first.text - +<number> <unknown>this.second.text)
    }

    this.op.text = "_";
    this.first.text = "_";
    this.second.text = "_";
    console.log(this.hp);
    this.animText.alpha = 1;
  }

  sceneSwitcher() {
    this.events.emit("win");
    this.scene.stop("BattleScene");
    this.scene.resume("MainScene");
    this.scene.setVisible(false, "UI");
  }
}

