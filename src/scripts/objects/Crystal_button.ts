export default class Crystal extends Phaser.Physics.Arcade.Sprite {
    value: number;
    amount: number;
    text: Phaser.GameObjects.BitmapText;
    hovered:boolean;

    constructor(scene, x: number, y: number, type:string, amount:number) {
        if(type === "one"){
            super(scene, x, y, 'crystal_button1');
            this.value=1;
            scene.add.existing(this); 
        }
        else if(type === "two"){
            super(scene, x, y, 'crystal_button2');
            this.value=2;
            scene.add.existing(this);
        }
        else if(type === "three"){
            super(scene, x, y, 'crystal_button3');
            this.value=3;
            scene.add.existing(this);
        }
        else if(type === "four"){
            super(scene, x, y, 'crystal_button4');
            this.value=4;
            scene.add.existing(this);
        }
        else if(type === "five"){
            super(scene, x, y, 'crystal_button5');
            this.value=5;
            scene.add.existing(this);
        }
        else if(type === "six"){
            super(scene, x, y, 'crystal_button6');
            this.value=6;
            scene.add.existing(this);
        }
        else if(type === "seven"){
            super(scene, x, y, 'crystal_button7');
            this.value=7;
            scene.add.existing(this);
        }
        else if(type === "eight"){
            super(scene, x, y, 'crystal_button8');
            this.value=8;
            scene.add.existing(this);
        }
        else if(type === "nine"){
            super(scene, x, y, 'crystal_button9');
            this.value=9;
            scene.add.existing(this);
        }
        this.name = type;
        this.amount = amount;
        this.hovered = false;
    }

    clicked(scene){
        console.log(this.value);
    if(scene.phase === 1 && this.amount > 0){
      scene.mutable.reduce(this.name);
      this.amount-=1;
      scene.first.text = <string> <unknown> this.value;
      scene.phase++;
    }
    else if (scene.phase === 2) {
      scene.helpText.text = "Please select an operator";
      scene.helpText.alpha = 1;
    }
    else if(scene.phase === 3 && scene.num4 > 0){
      scene.mutable.reduce(this.name);
      this.amount-=1;
      scene.second.text = <string> <unknown> this.value;
      scene.phase = 1;
      scene.playAnim = true;
      if (scene.op.text === "+") {
        scene.attackNum = +(+<number><unknown>scene.first.text + +<number><unknown>scene.second.text);
      }
      else if (scene.op.text === "-") {
        scene.attackNum = +(+<number><unknown>scene.first.text - +<number><unknown>scene.second.text);
      }
      else if (scene.text === "x") {
        scene.attackNum = +((+<number><unknown>scene.first.text) * (+<number><unknown>scene.second.text));
      }
      scene.fireText.text = <string><unknown>scene.attackNum;
    }
    }

    undo(scene){
        scene.mutable.increase(this.name);
        this.amount+=1;
    }

    hover(){
        if(this.amount>0 && !this.hovered){
            if(this.name === "one"){
                this.setTexture("cry1");
                this.play("cry1_anim");
            }
            else if(this.name === "two"){
                this.setTexture("cry2");
                this.play("cry2_anim");
            }
            else if(this.name === "three"){
                this.setTexture("cry3");
                this.play("cry3_anim");
            }
            else if(this.name === "four"){
                this.setTexture("cry4");
                this.play("cry4_anim");
            }
            else if(this.name === "five"){
                this.setTexture("cry5");
                this.play("cry5_anim");
            }
            else if(this.name === "six"){
                this.setTexture("cry6");
                this.play("cry6_anim");
            }
            else if(this.name === "seven"){
                this.setTexture("cry7");
                this.play("cry7_anim");
            }
            else if(this.name === "eight"){
                this.setTexture("cry8");
                this.play("cry8_anim");
            }
            else if(this.name === "nine"){
                this.setTexture("cry9");
                this.play("cry9_anim");
            }
            this.hovered = true;
        }
    }

    no_hover(){
        if(this.hovered){
            if(this.name === "one"){
                this.anims.stop();
                this.setTexture("crystal_button1");
            }
            else if(this.name === "two"){
                this.anims.stop();
                this.setTexture("crystal_button2");
            }
            else if(this.name === "three"){
                this.anims.stop();
                this.setTexture("crystal_button3");
            }
            else if(this.name === "four"){
                this.anims.stop();
                this.setTexture("crystal_button4");
            }
            else if(this.name === "five"){
                this.anims.stop();
                this.setTexture("crystal_button5");
            }
            else if(this.name === "six"){
                this.anims.stop();
                this.setTexture("crystal_button6");
            }
            else if(this.name === "seven"){
                this.anims.stop();
                this.setTexture("crystal_button7");
            }
            else if(this.name === "eight"){
                this.anims.stop();
                this.setTexture("crystal_button8");
            }
            else if(this.name === "nine"){
                this.anims.stop();
                this.setTexture("crystal_button9");
            }
            this.hovered = false;
        }
    }
}