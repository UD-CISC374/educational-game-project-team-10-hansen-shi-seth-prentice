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
    
    
    
    
    this.player = this.add.sprite(60, this.height - 300, 'player');
    this.player.setScale(3);
    //this.player.play('player_anim');
    console.log("create complete");
  }

  update() {

  }
}
