import { FormType } from "./Config/SysDefine";
import { IFormConfig, IFormData } from "./Struct";

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

}