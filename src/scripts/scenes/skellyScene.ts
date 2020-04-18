import Skeleton from "../objects/Skeleton";
import Player from "../objects/Player";

export default class SkellyScene extends Phaser.Scene {
    background: Phaser.GameObjects.TileSprite;
    height: number = 480;
    width: number = 640;
    enemy: Skeleton;
    player: Player;
    enemies: Phaser.GameObjects.Group;
    constructor() {
        super({ key: 'SkellyScene' });
    }
    //this scene is literally the same as the battle scene
    //but I have access to the classes directly
    create() {
        this.enemies = this.physics.add.group();

        this.background = this.add.tileSprite(0, 0, 640, this.height, "background");
        this.background.setOrigin(0, 0);
        this.background.setScrollFactor(0);

        this.enemy = new Skeleton(this, 600, this.height - 200, 5, 2);
        this.enemy.flipX = true; 
        this.enemy.setScale(5);
        this.enemy.anims.pause();


        this.player = new Player(this, 0, this.height - 200);
        this.player.setScale(3);
        this.player.anims.pause();
        console.log(this.enemy.getHealth());
    }

    update() {

    }
}