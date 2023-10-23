import UIBase from "./UIBase";
import { FormType, ModalOpacity } from "./Config/SysDefine";
import { ECloseType, ModalType } from "./Struct";
import { math, tween, Tween, v3, Vec3 } from "cc";
import CocosHelper from "./CocosHelper";

/**
 * 
 */
export class UIScreen extends UIBase {
    formType = FormType.Screen;
    closeType = ECloseType.CloseAndDestory;
}

/**
 * 
 */
export class UIWindow extends UIBase {
    formType = FormType.Window;
    modalType = new ModalType(ModalOpacity.OpacityFull);                // 阴影类型
    closeType = ECloseType.LRU;

    /** 显示效果 */
    public async showEffect() {
        this.node.scale.set(Vec3.ZERO);
        //await CocosHelper.runTweenSync(this.node, tween().to(0.3, { scale: 1 },easeBackOut()));
    }
}

/**
 * 
 */
export class UIFixed extends UIBase{
    formType = FormType.Fixed;
    closeType = ECloseType.LRU;
}

/**
 * 
 */
export class UITips extends UIBase {
    formType = FormType.Tips;
    closeType = ECloseType.CloseAndHide;
}