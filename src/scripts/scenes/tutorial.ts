import Skeleton from "../objects/Skeleton";
import Player from "../objects/Player";
import Bunny from "../objects/Bunny";

export default class Tutorial extends Phaser.Scene {
    background: Phaser.GameObjects.TileSprite;
    height: number;
    width: number;
    player: Player;
    cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
    floor: Phaser.Physics.Arcade.Sprite;
    bun: Phaser.Physics.Arcade.Sprite;
    mama: Phaser.Physics.Arcade.Sprite;
    helpText: Phaser.GameObjects.BitmapText;
    constructor() {
        super({ key: 'Tutorial' });
    }

    create() {

        this.height = <number>this.game.config.height;
        this.width = <number>this.game.config.width;

        this.background = this.background = this.add.tileSprite(0, 0, this.width, this.height, "groundback").setDepth(-1);
        this.background.setOrigin(0, 0);
        this.background.setScrollFactor(0);

        this.cursorKeys = this.input.keyboard.createCursorKeys();

        this.floor = this.physics.add.sprite(400, 675, 'platform').setImmovable(true);

        this.helpText = this.add.bitmapText(10, 10, "pixelFont", "Father: Felix, go hunt a rabbit for dinner! \nCareful not to fall in the cave", 30);

        this.player = new Player(this, 60, this.height - 120);
        this.player.setGravityY(1400);
        this.player.setScale(2);
        this.player.setCollideWorldBounds(false);

        this.bun = new Bunny(this, 700, this.height - 110, 3, 1);
        this.bun.setGravityY(1400);

        this.mama = this.physics.add.sprite(-150, 500, 'bunny');
        this.mama.setScale(2);
        this.mama.flipX = true;
        this.mama.setSize(140, 120);
        this.mama.setOffset(50, 65);

        this.cameras.main.setBounds(0, 0, this.width * 2, this.height);
        this.cameras.main.setSize(this.width, this.height);
        this.cameras.main.startFollow(this.player);

        this.physics.add.collider(this.player, this.floor);
        this.physics.add.collider(this.bun, this.floor);

        this.physics.add.overlap(this.player, this.bun, () => {
            this.bun.setActive(false);
        }, this.enterCombat, this);

        this.physics.add.collider(this.mama, this.player);



    }

    update() {
        this.movePlayerManager();
        this.enemyManager();
        this.feelBad();
        this.helpText.alpha-=.003;
    }

    movePlayerManager() {
        this.player.moving = false;
        if (this.cursorKeys.left?.isDown) {
            this.player.setVelocityX(-200);
            this.player.flipX = true;
            this.player.moving = true;
        }
        else if (this.cursorKeys.right?.isDown) {
            this.player.setVelocityX(200);
            this.player.flipX = false;
            this.player.moving = true;
        }
        else {
            this.player.setVelocityX(0);
        }
        if (this.player.moving) {
            this.player.anims.resume();
        }
        else {
            this.player.anims.pause();
        }
        if (this.cursorKeys.up?.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-500);
        }
    }

    enterCombat() {
        this.scene.launch('TutorialBattleScene', { baddie: this.bun, previousScene: this.scene.key });
        this.scene.pause("Tutorial");
        this.scene.sendToBack("Tutorial");

    }

    feelBad(){
        if (!this.bun.active){
            this.input.keyboard.enabled = false;
            this.player.flipX = true;
            this.cameras.main.shake(50, .001);
            if (this.player.y > this.height){
                this.scene.start("MainScene");
                //this.scene.remove("TutorialBattleScene");
            }
        }
    }

    enemyManager() {
        if (this.bun.active) {
            if (this.bun.x - this.player.x < 200) {
                this.bun.setVelocityX(50);
            }
            if (this.bun.x > 852) {
                this.bun.setVelocityX(0);
            }
        }
        else{
            if (this.mama.x < 750){
                this.mama.setVelocityX(75);
            }
        }
        this.scene.get("TutorialBattleScene").events.once("win", () => {
            this.bun.setActive(false);
            this.bun.destroy();
        })
    }
}