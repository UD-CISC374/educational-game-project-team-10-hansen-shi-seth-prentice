export default class Skeleton extends Phaser.GameObjects.Sprite {
    body: Phaser.Physics.Arcade.Body;
    homeX: number;
    facingLeft: boolean;
    //id: string
    value: number;
    //battle: boolean;

    constructor(scene, x: number, y: number, v: number) {
        super(scene, x, y, 'skeleton');
        //this.play('skeleton_anim');
        this.homeX = x;
        this.facingLeft=true;
        this.name = 'skeleton ' + v;
        //this.battle = false;


        scene.add.existing(this);
        scene.enemies.add(this);
        this.setScale(2);
        this.body.setSize(12,35);
        this.body.setOffset(2, 0);
        this.play('skeleton_anim');
    }

    update(){
        if(this.facingLeft){
            this.x -= 2;
            this.flipX = true;
        }
        else{
            this.x += 2;
            this.flipX = false;
        }
        if (this.x === this.homeX + 80 || this.x === this.homeX - 80){
            this.facingLeft = !this.facingLeft;
        }
    }
}
