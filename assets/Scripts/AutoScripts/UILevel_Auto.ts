import ButtonPlus from "./../Common/Components/ButtonPlus"
import { _decorator, Component } from "cc";

const { ccclass, property } = _decorator;
@ccclass
export default class UILevel_Auto extends Component {
	@property(ButtonPlus)
	Setting: ButtonPlus = null;
	@property(ButtonPlus)
	Skills: ButtonPlus = null;
	@property(ButtonPlus)
	Back: ButtonPlus = null;

}