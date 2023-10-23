import { director, Director, Node } from "cc";
import { SysDefine } from "./Config/SysDefine";
import Scene from "../Scene/Scene";
import UIBase from "./UIBase";

/**
 * UI管理类
 */
export default class UIManager {
    private _UIROOT: Node = null;   // UIROOT
    private _ndScreen: Node = null; // 全屏显示的UI 挂载结点
    private _ndFixed: Node = null;  // 固定显示的UI
    private _ndPopUp: Node = null;  // 弹出窗口
    private _ndToast: Node = null;  // toast
    private _ndTips: Node = null;   // 独立窗体

    private _windows: UIWindow[]                                       = [];                   // 存储弹出的窗体
    private _allForms: {[key: string]: UIBase}                         = cc.js.createMap();    // 所有已经挂载的窗体, 可能没有显示
    private _showingForms: {[key: string]: UIBase}                     = cc.js.createMap();    // 正在显示的窗体
    private _tipsForms: {[key: string]: UIBase}                        = cc.js.createMap();    // 独立窗体 独立于其他窗体, 不受其他窗体的影响
    private _loadingForm: {[key: string]: ((value: UIBase) => void)[]} = cc.js.createMap();    // 正在加载的form
    private _closingForm: {[key: string]: UIBase }                     = cc.js.createMap();    // 正在关闭的form
    private _LRUCache: LRUCache = new LRUCache(3);                                             // LRU cache

    private static instance: UIManager = null;

    /**
     * 
     * @returns 
     */
    public static getInstance(): UIManager {
        if (this.instance == null) {
            this.instance = new UIManager();
            let canvas = director.getScene().getChildByName("Canvas");
            let scene = canvas.getChildByName(SysDefine.SYS_SCENE_NODE);
            if (!scene) {
                scene = new Node(SysDefine.SYS_SCENE_NODE);
                scene.addComponent(Scene);
                scene.parent = canvas;
            } else {
                !(scene.getComponent(Scene)) && scene.addComponent(Scene);
            }
            let UIROOT = this.instance._UIROOT = new Node(SysDefine.SYS_UIROOT_NODE);
            scene.addChild(UIROOT);

            UIROOT.addChild(this.instance._ndScreen = new Node(SysDefine.SYS_SCREEN_NODE));
            UIROOT.addChild(this.instance._ndFixed = new Node(SysDefine.SYS_FIXED_NODE));
            UIROOT.addChild(this.instance._ndPopUp = new Node(SysDefine.SYS_POPUP_NODE));
            UIROOT.addChild(this.instance._ndToast = new Node(SysDefine.SYS_TOAST_NODE));
            UIROOT.addChild(this.instance._ndTips = new Node(SysDefine.SYS_TOPTIPS_NODE));
            director.once(Director.EVENT_BEFORE_SCENE_LAUNCH, () => {
                this.instance = null;
            });
        }
        return this.instance;
    }

    /**
     * 预加载UIForm
     */
    public async loadUIForm(prefabPath: string): Promise<UIBase> {
        let uiBase = await this._loadForm(prefabPath);
        if (!uiBase) {
            console.warn(`${uiBase}没有被成功加载`);
            return null;
        }
        return uiBase;
    }

    /**
     * 从窗口缓存中加载(如果没有就会在load加载), 并挂载到结点上
     * @param prefabPath 
     * @returns 
     */
    private async _loadForm(prefabPath: string): Promise<UIBase> {
        let com = this._allForms[prefabPath];
        if (com) return com;
        return new Promise((resolve, reject) => {
            if (this._loadingForm[prefabPath]) {
                this._loadingForm[prefabPath].push(resolve);
                return;
            }
            this._loadingForm[prefabPath] = [resolve];
            this._doLoadUIForm(prefabPath).then((com: UIBase) => {
                for (const func of this._loadingForm[prefabPath]) {
                    func(com);
                }
                this._loadingForm[prefabPath] = null;
                delete this._loadingForm[prefabPath];
            });
        });
    }

}