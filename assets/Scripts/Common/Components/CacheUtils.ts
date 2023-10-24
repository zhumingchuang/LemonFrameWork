import ResMgr from "../../UIFrame/ResMgr";
import { _decorator,Component,Label,Node } from "cc";

const {ccclass, property} = _decorator;

@ccclass
export default class CacheUtils extends Component {

    // LIFE-CYCLE CALLBACKS:

    public com: Label = null;
    onLoad () {
        this.com = this.getComponent(Label);
    }

    start () {
        this.node.on(Node.EventType.TOUCH_MOVE, (e: cc.Event.EventTouch) => {
            this.node.x += e.getDeltaX();
            this.node.y += e.getDeltaY();
        }, this);
    }

    private passTime = 0;
    update (dt) {
        this.passTime += dt;
        if(this.passTime > 1) {
            this.passTime = 0;
            this.com.string = ResMgr.inst.computeTextureCache();
        }
        
    }
}
