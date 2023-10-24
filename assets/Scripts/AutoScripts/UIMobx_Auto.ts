import ButtonPlus from "./../Common/Components/ButtonPlus"
import { _decorator, Component, Label } from "cc";

const { ccclass, property } = _decorator;
@ccclass
export default class UIMobx_Auto extends Component {
	@property(ButtonPlus)
	Close: ButtonPlus = null;
	@property(Label)
	Txt1: Label = null;
	@property(ButtonPlus)
	Btn1: ButtonPlus = null;
	@property(Label)
	Txt2: Label = null;
	@property(ButtonPlus)
	Btn2: ButtonPlus = null;
	@property(Label)
	Txt3: Label = null;
	@property(Label)
	Txt4: Label = null;
	@property(ButtonPlus)
	Btn3: ButtonPlus = null;
	@property(ButtonPlus)
	Btn4: ButtonPlus = null;
	@property(Label)
	Txt5: Label = null;

}