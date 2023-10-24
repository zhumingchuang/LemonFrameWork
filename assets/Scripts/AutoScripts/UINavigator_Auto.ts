import { _decorator, Component, ScrollView } from "cc";

const { ccclass, property } = _decorator;
@ccclass
export default class UINavigator_Auto extends Component {
	@property(ScrollView)
	Scroll: ScrollView = null;

}