export default class Player extends Phaser.GameObjects.Sprite {
    body: Phaser.Physics.Arcade.Body;
    velY: number;
    moving: boolean;

    constructor(scene, x: number, y: number) {
        super(scene, x, y, 'player');
        scene.physics.add.existing(this);
        scene.add.existing(this);
        this.setSize(32,32);
        this.play("player_anim");
        this.velY = 0;
    }
}
