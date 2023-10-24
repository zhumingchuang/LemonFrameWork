import BatchAssembler from "../Assemblers/BatchAssembler";
import { _decorator,RenderComponent,Enum } from "cc";

enum TraversalMode {
    Default,
    SameName,

}

const {ccclass, property} = _decorator;

@ccclass
export default class BantchComponent extends RenderComponent {

    @property({type: Enum(TraversalMode), tooltip: "遍历模式: Default 默认的广度遍历, SameName 同名结点同批次"})
    mode: TraversalMode = 0;

    onEnable() {
        super.onEnable();
        if (!CC_NATIVERENDERER) this.node._renderFlag |= cc.RenderFlow.FLAG_POST_RENDER;    
    }

    _resetAssembler() {
        this.setVertsDirty();
        let assembler = this._assembler = new BatchAssembler();
        assembler.init(this);
    }
}
