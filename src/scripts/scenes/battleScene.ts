import Skeleton from "../objects/Skeleton";

export default class BattleScene extends Phaser.Scene {
  background: Phaser.GameObjects.TileSprite;
  height: number;
  width: number;
  hp: number;
  atk: number;
  type: string;
  enemy: any;
  player: Phaser.GameObjects.Sprite;
  enemies: Phaser.GameObjects.Group;
  heartContainers: Phaser.GameObjects.Group;
  one: Phaser.GameObjects.BitmapText;
  two: Phaser.GameObjects.BitmapText;
  three: Phaser.GameObjects.BitmapText;
  plus: Phaser.GameObjects.BitmapText;
  minus: Phaser.GameObjects.BitmapText;
  phase: number = 0;
  heart: Phaser.GameObjects.Image;
  constructor() {
    super({ key: 'BattleScene' });
  }

  init(data){
    this.type = data.type;
    this.hp = data.hp;
    this.atk = data.atk;
  }
  
  create() {

    this.width = <number> this.game.config.width;
    this.height = <number> this.game.config.height;
    
    this.enemies = this.physics.add.group();
    this.heartContainers = this.physics.add.group();

    this.background = this.add.tileSprite(0, 0, this.width, this.height, "background");
    this.background.setOrigin(0, 0);
    this.background.setScrollFactor(0);

    if (this.type === "skeleton"){
      this.enemy = new Skeleton(this, this.width - 40, this.height - 300, this.hp, this.atk);
      this.enemy.flipX = true;
      this.enemy.setScale(5);
      this.enemy.anims.pause();
    }
    
    //it doesn't auto complete for some reason
    //but it works
    console.log(this.enemy.getHealth());
    this.one = this.add.bitmapText(60,this.height-80,"pixelFont", "1", 16 );
    this.one.name = '1';
    this.two = this.add.bitmapText(120,this.height-80,"pixelFont", "2", 16 );
    this.two.name = '2';
    this.three = this.add.bitmapText(180,this.height-80,"pixelFont", "3", 16 );
    this.three.name = '3';
    this.plus = this.add.bitmapText(240,this.height-80,"pixelFont", "+", 16 );
    this.plus.name = '+';
    this.minus = this.add.bitmapText(300,this.height-80,"pixelFont", "-", 16 );
    this.minus.name = '-';
    
    this.one.setInteractive().on('pointerdown',this.valSelect);
    this.two.setInteractive().on('pointerdown',this.valSelect);
    this.three.setInteractive().on('pointerdown',this.valSelect);
    this.plus.setInteractive().on('pointerdown',this.valSelect);
    this.minus.setInteractive().on('pointerdown',this.valSelect);
    
    
    
    this.player = this.add.sprite(60, this.height - 300, 'player');
    this.player.setScale(3);
    //this.player.play('player_anim');
    console.log("create complete");
  }

  update() {
  }

  valSelect(crystal){
    console.log(crystal.name);
  }
}
