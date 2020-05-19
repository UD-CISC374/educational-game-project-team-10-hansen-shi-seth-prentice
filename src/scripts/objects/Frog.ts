export default class Frog extends Phaser.Physics.Arcade.Sprite {
    body: Phaser.Physics.Arcade.Body;
    homeX: number;
    facingLeft: boolean;
    health: number;
    atk: number;

    constructor(scene, x: number, y: number, hp: number, atk: number) {
        super(scene, x, y, 'frog');
        this.homeX = x;
        this.facingLeft=true;
        this.name = 'frog' 
        this.health = hp;
        this.atk = atk;
        scene.physics.add.existing(this);
        scene.add.existing(this);
        this.setScale(2);
        this.body.setSize(12, 16);
        this.body.setOffset(2, 0);
        this.play('frog_anim');
        this.setDepth(1);
    }

    update(){
        if(this.facingLeft){
            this.x -= 1;
            this.flipX = true;
        }
        else{
            this.x += 1;
            this.flipX = false;
        }
        if (this.x === this.homeX + 80 || this.x === this.homeX - 80){
            this.facingLeft = !this.facingLeft;
        }
    }
    
    chooseAction(){
        let action : string = Phaser.Math.RND.pick(['attack', 'attack', 'attack']);
        return action;
    }
    
    getHealth(){
        return this.health;
    }
}
