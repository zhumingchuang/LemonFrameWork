import ButtonPlus from "./../Common/Components/ButtonPlus"
import { _decorator, Component } from "cc";

const { ccclass, property } = _decorator;
@ccclass
export default class UISkills_Auto extends Component {
	@property(ButtonPlus)
	Close: ButtonPlus = null;

}