import CocosHelper from "../../UIFrame/CocosHelper";
import { CommonUtils } from "../Utils/CommonUtils";
import { _decorator, Component, Node, Camera } from "cc";

const { ccclass, property } = _decorator;

@ccclass
export default class CameraCapture extends Component {

    static inst: CameraCapture = null;

    @property(Node)
    captureNode: Node = null;

    private camera: Camera = null;
    onLoad() {
        CameraCapture.inst = this;
        this.camera = this.getComponent(Camera);
        if (!this.camera) {
            this.camera = this.addComponent(Camera);
        }
        this.node.active = false;

    }

    start() { }

    captureTexture() {
        this.node.active = true;
        this.captureNode.active = false;
        let data = CocosHelper.captureScreen(this.camera, this.captureNode);
        this.captureNode.active = true;
        this.node.active = false;

        return data;
    }


}
