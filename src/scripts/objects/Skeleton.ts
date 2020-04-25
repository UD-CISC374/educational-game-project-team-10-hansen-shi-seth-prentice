export default class Skeleton extends Phaser.Physics.Arcade.Sprite {
    body: Phaser.Physics.Arcade.Body;
    homeX: number;
    facingLeft: boolean;
    ///value: number;
    health: number;
    atk: number;

    constructor(scene, x: number, y: number, hp: number, atk: number) {
        super(scene, x, y, 'skeleton');
        this.homeX = x;
        this.facingLeft=true;
        this.name = 'skeleton ' + hp + ' ' + atk;
        this.health = 5;
        this.atk = 1;
        scene.physics.add.existing(this);
        scene.add.existing(this);
        //scene.enemies.add(this);
        this.setScale(2);
        this.body.setSize(12, 16);
        this.body.setOffset(2, 0);
        this.play('skeleton_anim');
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
    getHealth(){
        return this.health;
    }

    damage(x : number){
        this.health -= x;
        if (this.health <= 0) {
            this.anims.resume;
        }
    }
}
