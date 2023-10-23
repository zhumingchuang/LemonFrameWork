import { FormType } from "./Config/SysDefine";
import { IFormConfig, IFormData } from "./Struct";
import SceneManager from "./SceneManager";

/**
 * 
 */
class FormManager {
    /**
     * 打开窗体
     * @param form 窗体配置信息
     * @param param 自定义参数
     * @param formData 窗体处理时的数据
     */
    async open(form:IFormConfig,param?:any,formData?:IFormData) {
        switch(form.type){
            //case FormType.Screen:
        }
    }

    /**
     * 
     * @param form 
     * @param param 
     * @param formData 
     * @returns 
     */
    async close(form: IFormConfig, param?: any, formData?: IFormData) {
        switch(form.type) {
            case FormType.Screen:
                return await SceneManager.close(form, param, formData);
            case FormType.Window:
                return await WindowManager.close(form, param, formData);
            case FormType.Fixed:
                return await FixedMgr.close(form, param, formData);
            case FormType.Tips:
                return await TipsMgr.close(form, param, formData);
            case FormType.Toast:
                cc.warn("UIToast 目前不能通过这种方式关闭, 请使用 ToastMgr.close()");
                break;
            default:
                cc.error(`未知类型的窗体: ${form.type}`);
                return false;
        }
    }

}

export default new FormManager();