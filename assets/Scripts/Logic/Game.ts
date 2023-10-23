import { Node } from "cc";
import ConfigManager from "./Manager/ConfigManager";
import PlayerManager from "./Manager/PlayerManager";

/**
 * 
 */
export class Game {

    public inited = false;
    public configMgr: ConfigManager = null;
    public playerMgr: PlayerManager = null;

    public async init(uiRoot: Node) {
        this.configMgr = new ConfigManager(this);
        this.playerMgr = new PlayerManager(this);

        //加载配置
        await this.configMgr.loadConfigs();
    }

    onGameShow() {

    }
    onGameHide() {

    }

    /**
     * 
     * @param dt 
     */
    public update(dt: number) {

    }
}
let GameMgr = new Game();
export default GameMgr;