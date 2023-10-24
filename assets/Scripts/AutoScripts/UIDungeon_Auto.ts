import ButtonPlus from "./../Common/Components/ButtonPlus"
import { _decorator, Component, Node } from "cc";

const { ccclass, property } = _decorator;
@ccclass
export default class UIDungeon_Auto extends Component {
	@property(Node)
	Items: Node = null;
	@property(ButtonPlus)
	Back: ButtonPlus = null;

}