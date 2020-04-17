import ExampleObject from '../objects/exampleObject';

export default class MainScene extends Phaser.Scene {
  private exampleObject: ExampleObject;

  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    let tutMap = this.add.tilemap('tutorial');
    let baseLayer = tutMap.addTilesetImage('otherTiles', 'tiles');

    let bottom = tutMap.createStaticLayer('Tile Layer 1', [baseLayer], 0, 0);
    
  }

  update() {
  }
}
