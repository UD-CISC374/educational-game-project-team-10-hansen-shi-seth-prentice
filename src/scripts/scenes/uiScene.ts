export default class uiScene extends Phaser.Scene {
    playerHp;
    enemyHp;
    enemyAtk;

    atkButton: Phaser.GameObjects.Sprite;
    
    constructor() {
        super({ key: 'UI' });
    }

    init(data) {
        this.playerHp = data.playerHp;
        this.enemyHp = data.enemyHp;
        this.enemyAtk = data.enemyAtk;
    }

    create() {
        this.atkButton = this.add.sprite(90, 500, "fightbtn");
        this.atkButton.setScale(.75);
        this.atkButton.setInteractive();
        this.atkButton.on('pointerover', this.Hover, this);
        this.atkButton.on('pointerdown', this.onPressed, this);

    }

    update() {

    }

    onPressed(){
        console.log("pressed");
        this.events.emit("attack");
    }

    Hover(){
        console.log("hover");
    }
}