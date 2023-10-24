import ButtonPlus from "./../Common/Components/ButtonPlus"
import { _decorator,Component } from "cc";

const {ccclass, property} = _decorator;
@ccclass
export default class UICapture_Auto extends Component {
	@property(ButtonPlus)
	Back: ButtonPlus = null;
	@property(ButtonPlus)
	Capture: ButtonPlus = null;
	@property(ButtonPlus)
	Pen: ButtonPlus = null;
	@property(ButtonPlus)
	Reaser: ButtonPlus = null;
 
}