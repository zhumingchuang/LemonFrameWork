import ButtonPlus from "./../Common/Components/ButtonPlus"
import { _decorator, Component, Node, Label } from "cc";

const { ccclass, property } = _decorator;
@ccclass
export default class UILogin_Auto extends Component {
	@property(Node)
	Login: Node = null;
	@property(ButtonPlus)
	btn: ButtonPlus = null;
	@property(Label)
	Name: Label = null;

}