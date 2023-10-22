import { Component, warn } from "cc";
import { IFormData } from "./Struct";

/**
 * UI基类
 */
export default class UIBase extends Component {
    /**
     * 
     */
    public static open(param?: any, formData?: IFormData) {
        let uiconfig = this['UIConfig'];
        if (!uiconfig) {
            warn(`sorry UIConfig is null, please check AutoConfig`);
            return;
        }
    }

    /**
     * 
     */
    public static close(){

    }
}