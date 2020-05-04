export default class Bunny extends Phaser.Physics.Arcade.Sprite {
    body: Phaser.Physics.Arcade.Body;
    homeX: number;
    facingLeft: boolean;
    health: number;
    atk: number;

    constructor(scene, x: number, y: number, hp: number, attack: number) {
        super(scene, x, y, 'bunny');
        this.homeX = x;
        this.facingLeft=true;
        this.name = 'bunny' 
        this.health = hp;
        this.atk = attack;
        scene.physics.add.existing(this);
        scene.add.existing(this);
        this.setScale(1/3);
        this.body.setSize(150, 100);
        this.body.setOffset(50, 50);
        this.setDepth(1);
    }

    update(){
        if(this.facingLeft){
            this.setVelocityX(-200);
            this.flipX = true;
        }
        else{
            this.setVelocityX(200);
            this.flipX = false;
        }
        if (this.x === this.homeX + 80 || this.x === this.homeX - 80){
            this.facingLeft = !this.facingLeft;
        }
    }
    getHealth(){
        return this.health;
    }

    chooseAction(){
       let action: string = Phaser.Math.RND.pick(['flee', 'flee', 'flee', 'attack']);
       return action;
    }

}
