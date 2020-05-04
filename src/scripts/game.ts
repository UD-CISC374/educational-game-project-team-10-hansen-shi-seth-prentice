import 'phaser';
import MainScene from './scenes/mainScene';
import PreloadScene from './scenes/preloadScene';
import BattleScene from './scenes/battleScene';
import GameConfig = Phaser.Types.Core.GameConfig;
import { Renderer } from 'phaser';
import uiScene from './scenes/uiScene';
import Tutorial from './scenes/tutorial';
import TutorialBattleScene from './scenes/tutorialBattleScene';

const DEFAULT_WIDTH: number = 960;
const DEFAULT_HEIGHT: number = 720;


const config: GameConfig = {
    backgroundColor: '#ffffff',
    scale: {
        parent: 'phaser-game',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT
    },
    scene: [PreloadScene, MainScene, BattleScene, Tutorial, uiScene, TutorialBattleScene],
    render: {
        pixelArt: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    }
};

window.addEventListener('load', () => {
    window['game'] = new Phaser.Game(config);
});

//
