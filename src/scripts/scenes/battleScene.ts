export default class BattleScene extends Phaser.Scene {
  background: Phaser.GameObjects.TileSprite;
  height: number = 480;
  width: number = 640;
  value: number;
  type: string;
  enemy: Phaser.GameObjects.Sprite;
  player: Phaser.GameObjects.Sprite;
  constructor() {
    super({ key: 'BattleScene' });
  }



  create() {
    this.background = this.add.tileSprite(0, 0, 640, this.height, "background");
    this.background.setOrigin(0, 0);
    this.background.setScrollFactor(0);

    this.enemy = this.add.sprite(600, 300, this.type);
    this.enemy.flipX = true; // might need to make this conditional for some enemies, we can solve that when we know
    this.enemy.setScale(5);
    //this.enemy.play(this.type + '_anim');
    
    
    this.player = this.add.sprite(60, 300, 'player');
    this.player.setScale(3);
    //this.player.play('player_anim');
    console.log("create complete");
  }

  update() {

  }
}
