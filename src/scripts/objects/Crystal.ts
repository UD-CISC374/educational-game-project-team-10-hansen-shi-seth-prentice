export default class Crystal extends Phaser.Physics.Arcade.Sprite {
    value: number;

    constructor(scene, x: number, y: number, type:string) {
        if(type === "one"){
            super(scene, x, y, 'cry1');
            this.value=1;
            scene.physics.add.existing(this);
            this.play('cry1_anim');
        }
        else if(type === "two"){
            super(scene, x, y, 'cry2');
            this.value=2;
            scene.physics.add.existing(this);
            this.play('cry2_anim');
        }
        else if(type === "three"){
            super(scene, x, y, 'cry3');
            this.value=3;
            scene.physics.add.existing(this);
            this.play('cry3_anim');
        }
        else if(type === "four"){
            super(scene, x, y, 'cry4');
            this.value=4;
            scene.physics.add.existing(this);
            this.play('cry4_anim');
        }
        else if(type === "five"){
            super(scene, x, y, 'cry5');
            this.value=5;
            scene.physics.add.existing(this);
            this.play('cry5_anim');
        }
        else if(type === "six"){
            super(scene, x, y, 'cry6');
            this.value=6;
            scene.physics.add.existing(this);
            this.play('cry6_anim');
        }
        else if(type === "seven"){
            super(scene, x, y, 'cry7');
            this.value=7;
            scene.physics.add.existing(this);
            this.play('cry7_anim');
        }
        else if(type === "eight"){
            super(scene, x, y, 'cry8');
            this.value=8;
            scene.physics.add.existing(this);
            this.play('cry8_anim');
        }
        else if(type === "nine"){
            super(scene, x, y, 'cry9');
            this.value=9;
            scene.physics.add.existing(this);
            this.play('cry9_anim');
        }

        this.name=type;
   
        scene.physics.add.existing(this);
        scene.add.existing(this);
    }
}