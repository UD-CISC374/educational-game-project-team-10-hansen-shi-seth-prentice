export default class Player extends Phaser.GameObjects.Sprite {
    velY: number;
    moving: boolean;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'player');
        scene.add.existing(this);
        this.velY = 0;
    }
}
