import 'phaser';
import MainScene from './scenes/mainScene';
import PreloadScene from './scenes/preloadScene';
import BattleScene from './scenes/battleScene';
import GameConfig = Phaser.Types.Core.GameConfig;
import { Renderer } from 'phaser';
import skellyScene from './scenes/skellyScene';
import SkellyScene from './scenes/skellyScene';

const DEFAULT_WIDTH = 640;
const DEFAULT_HEIGHT = 480;


const config: GameConfig = {
    backgroundColor: '#ffffff',
    scale: {
        parent: 'phaser-game',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT
    },
    scene: [PreloadScene, MainScene, BattleScene, SkellyScene],
    render: {
        pixelArt: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
            //gravity: { y: 400 }
        }
    }
};

window.addEventListener('load', () => {
    window['game'] = new Phaser.Game(config);
});

//
