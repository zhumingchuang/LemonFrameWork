import PropController from "./Common/Components/PropController";
import UINavigator from "./UIScript/UINavigator";
import { _decorator, Component } from "cc";

const { ccclass, property } = _decorator;

@ccclass
export default class Main extends Component {

    @property(PropController) building: PropController = null;
    onLoad() {

    }

    start() {
        UINavigator.open();
    }

    onDestroy() {

    }
}