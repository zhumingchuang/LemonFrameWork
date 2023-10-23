import { Component, Node, BlockInputEvents, macro } from "cc";
import Game from "../Logic/Game";
/**
 * 
 */
export default class Scene extends Component {
    public static instance: Scene = null;
    private ndBlock: Node = null;

    onLoad() {
        this.initBlockNode();
    }

    /**
     * 
     */
    public initBlockNode() {
        this.ndBlock = new Node("block");
        this.ndBlock.addComponent(BlockInputEvents);
        //this.node.addChild(this.ndBlock,cc.macro.MAX_ZINDEX);  TODO:暂未找到最新版本替代方案
    }

    public async start() {
        Scene.instance = this;
    }

    /** 游戏初始化 */
    public async onGameInit() {
        // 第一步 展示loading页面，当然有些默认就是loading页面

        // 第二步 初始化游戏（Managers，Configs，SDKs）
        await Game.init(this.node);
        // 第三步 构建初始场景（加载必要的prefab，音频，texture）

        // 第四步 加载主界面UI,关掉loading页面,正式进入游戏

    }
}