export default class BigFrog extends Phaser.Physics.Arcade.Sprite {
    body: Phaser.Physics.Arcade.Body;
    homeX: number;
    facingLeft: boolean;
    health: number;
    atk: number;

    constructor(scene, x: number, y: number, hp: number, atk: number) {
        super(scene, x, y, 'frog');
        this.flipX = true;
        this.name = 'bossFrog' 
        this.health = hp;
        this.atk = atk;
        scene.physics.add.existing(this);
        scene.add.existing(this);
        this.setScale(10);
        this.body.setSize(12, 16);
        this.body.setOffset(2, 0);
        this.setDepth(1);
    }

    update(){
    }
    
    chooseAction(){
        let action : string = Phaser.Math.RND.pick(['attack', 'attack', 'attack']);
        return action;
    }
    
    getHealth(){
        return this.health;
    }
}
