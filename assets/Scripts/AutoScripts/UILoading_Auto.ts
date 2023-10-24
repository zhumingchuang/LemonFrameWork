import { _decorator, Component, Node } from "cc";

const { ccclass, property } = _decorator;
@ccclass
export default class UILoading_Auto extends Component {
	@property(Node)
	Right: Node = null;
	@property(Node)
	Left: Node = null;

}