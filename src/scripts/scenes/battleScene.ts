export default class BattleScene extends Phaser.Scene {
background: Phaser.GameObjects.TileSprite;
height: number;
width: number;
value: number;
type: string;
enemy: Phaser.GameObjects.Sprite;
player: Phaser.GameObjects.Sprite;
    constructor() {
      super({ key: 'BattleScene' });
    }
    
    init(data){
      this.type = data.type;
      this.value = data.value;
    }

    preload() {
    this.width = 300;
    this.height = 160;
    }
  
    create() {
      this.background = this.add.tileSprite(0, 0, 448, this.height, "background");
      this.background.setOrigin(0, 0);
      this.background.setScrollFactor(0);
      this.enemy = this.add.sprite(280, 80, this.type);
      this.enemy.flipX = true; // might need to make this conditional for some enemies, we can solve that when we know
      this.enemy.setScale(2);
      this.enemy.play(this.type + '_anim');
      this.player = this.add.sprite(20, 80, 'player');
      this.player.play('player_anim');
      console.log("create complete");
    }

    update(){

    }
  }
  