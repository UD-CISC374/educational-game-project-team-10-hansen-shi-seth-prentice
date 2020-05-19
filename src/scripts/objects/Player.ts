import Crystal from '../objects/Crystal';


export default class Player extends Phaser.Physics.Arcade.Sprite {
    body: Phaser.Physics.Arcade.Body;
    moving: boolean;
    inventory: Map<string, number>;
    health: number;

    constructor(scene, x: number, y: number) {
        super(scene, x, y, 'player');
        this.inventory = new Map();
        this.health = 10;
        scene.physics.add.existing(this);
        scene.add.existing(this);
        this.body.setSize(25,28);
        this.play("player_anim");
        this.body.setCollideWorldBounds(true);
        this.setDepth(1);
        this.inventory.set("one",0);
        this.inventory.set("two",0);
        this.inventory.set("three",0);
        this.inventory.set("four",0);
        this.inventory.set("five",0);
        this.inventory.set("six",0);
        this.inventory.set("seven",0);
        this.inventory.set("eight",0);
        this.inventory.set("nine",0);
        
    }

    pickup(cry:Crystal){
        this.inventory.set(cry.name, <number> this.inventory.get(cry.name)+1);
        console.log(this.inventory);
    }

    reduce(str:string){
        this.inventory.set(str, <number> this.inventory.get(str)-1);
    }
    increase(str:string){
        this.inventory.set(str, <number> this.inventory.get(str)+1);
    }
}
