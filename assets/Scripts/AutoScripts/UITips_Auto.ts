import { _decorator, Component, Label } from "cc";

const { ccclass, property } = _decorator;
@ccclass
export default class UITips_Auto extends Component {
	@property(Label)
	Tips: Label = null;
}