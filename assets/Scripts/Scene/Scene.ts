import Game from "../Logic/Game";
import AdapterMgr, { AdapterType } from "../UIFrame/AdapterMgr";
import { EventCenter } from "../UIFrame/EventCenter";
import { EventType } from "../UIFrame/EventType";
import { _decorator,director, Component, Node, BlockInputEvents, sys,game,warn } from "cc";
const { ccclass, property } = _decorator;

@ccclass
export default class Scene extends Component {

    public static inst: Scene = null;
    private ndBlock: Node = null;
    onLoad() {
        this.initBlockNode();
    }

    public initBlockNode() {
        this.ndBlock = new Node("block");
        this.ndBlock.addComponent(BlockInputEvents);
        this.node.addChild(this.ndBlock, macro.MAX_ZINDEX); TODO:
    }

    public async start() {
        Scene.inst = this;
        AdapterMgr.inst.adapteByType(AdapterType.StretchHeight | AdapterType.StretchWidth, this.node);
        await this.onGameInit();
        this.registerEvent();
    }
    /** 游戏初始化 */
    public async onGameInit() {
        // 第一步 展示loading页面，当然有些默认就是loading页面

        // 第二步 初始化游戏（Managers，Configs，SDKs）
        await Game.init(this.node);
        // 第三步 构建初始场景（加载必要的prefab，音频，texture）

        // 第四步 加载主界面UI,关掉loading页面,正式进入游戏

    }
    /** 初始化事件 */
    private registerEvent() {
        if (sys.platform === sys.WECHAT_GAME) {
            wx.onShow(this.onGameShow.bind(this));
            wx.onHide(this.onGameHide.bind(this));
        } else {
            game.on(game.EVENT_SHOW, this.onGameShow, this);
            game.on(game.EVENT_HIDE, this.onGameHide, this);
        }
    }

    private onGameShow(param: any) {
        EventCenter.emit(EventType.GameShow, param);
        director.resume()
    }
    private onGameHide() {
        EventCenter.emit(EventType.GameHide);
        director.pause();
    }

    public update(dt: number) {
        Game.update(dt);
    }

    public lateUpdate() {

    }

    /** 设置是否阻挡游戏触摸输入 */
    private _block = 0;
    public setInputBlock(bool: boolean) {
        if (!this.ndBlock) {
            warn("未启用 block input");
            return;
        }
        bool ? ++this._block : --this._block;
        this.ndBlock.active = this._block > 0;
    }
}