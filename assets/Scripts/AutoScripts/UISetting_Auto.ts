import ButtonPlus from "./../Common/Components/ButtonPlus"
import { _decorator, Component } from "cc";

const { ccclass, property } = _decorator;
@ccclass
export default class UISetting_Auto extends Component {
	@property(ButtonPlus)
	Pop: ButtonPlus = null;
	@property(ButtonPlus)
	Mobx: ButtonPlus = null;
	@property(ButtonPlus)
	Capture: ButtonPlus = null;
	@property(ButtonPlus)
	Light: ButtonPlus = null;
}