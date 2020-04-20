export default class Player extends Phaser.Physics.Arcade.Sprite {
    body: Phaser.Physics.Arcade.Body;
    moving: boolean;
    inventory: Map<string, string>;
    health: number;

    constructor(scene, x: number, y: number) {
        super(scene, x, y, 'player');
        this.inventory = new Map().set("power: 0", "has: infinite");
        this.health = 3;
        scene.physics.add.existing(this);
        scene.add.existing(this);
        this.body.setSize(25,28);
        this.play("player_anim");
        this.body.setCollideWorldBounds(true);
        this.setDepth(1);
        
    }
}
