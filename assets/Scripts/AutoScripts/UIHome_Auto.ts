import ButtonPlus from "./../Common/Components/ButtonPlus"
import { _decorator, Component, Node } from "cc";

const { ccclass, property } = _decorator;
@ccclass
export default class UIHome_Auto extends Component {
	@property(Node)
	Logo: Node = null;
	@property(ButtonPlus)
	Start: ButtonPlus = null;
	@property(ButtonPlus)
	About: ButtonPlus = null;
	@property(ButtonPlus)
	Back: ButtonPlus = null;

}