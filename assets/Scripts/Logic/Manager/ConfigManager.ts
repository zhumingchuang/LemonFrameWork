import { BaseManager } from "./BaseManager";

export default class ConfigManager extends BaseManager {
    /**
     * 加载配置文件
     */
    public async loadConfigs() {

    }

    /**
     * 通知其他manager
     */
    public onConfigChange() {
        this.game.playerMgr.onConfigChange();
    }
}