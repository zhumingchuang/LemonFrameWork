import ButtonPlus from "./../Common/Components/ButtonPlus"
import { _decorator, Component } from "cc";

const { ccclass, property } = _decorator;
@ccclass
export default class UIMap_Auto extends Component {
	@property(ButtonPlus)
	Round: ButtonPlus = null;
	@property(ButtonPlus)
	Back: ButtonPlus = null;

}