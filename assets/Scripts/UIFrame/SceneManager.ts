import { IFormConfig, IFormData, GetForm } from "./Struct";
import { warn } from "cc";

/**
 * 
 */
const TAG = "SceneMgr";
class SceneManager {

    private _scenes: Array<IFormConfig> = [];
    private _currScene: IFormConfig;

    /**
     * 开打一个场景
     * @param form 
     * @param params 
     * @param formData 
     */
    public async open(form: IFormConfig | string, params?: any, formData?: IFormData) {
        form = GetForm(form);
        let scenePath = form.prefabUrl;
        if (this._currScene && this._currScene.prefabUrl == scenePath) {
            warn(TAG, "当前场景和需要open的场景是同一个");
            return null;
        }
        await this.openLoading(formData?.loadingForm, params, formData);


    }

    /**
     * 
     * @param formConfig 
     * @param params 
     * @param formData 
     * @returns 
     */
    private async openLoading(formConfig: IFormConfig, params: any, formData: IFormData) {
        let form = formConfig || SysDefine.defaultLoadingForm;
        if(!form) return ;
        await TipsMgr.open(form.prefabUrl, params, formData);
    }
    
    /**
     * 
     * @param formConfig 
     * @returns 
     */
    private async closeLoading(formConfig: IFormConfig) {
        let form = formConfig || SysDefine.defaultLoadingForm;
        if(!form) return ;
        await TipsMgr.close(form.prefabUrl);
    }
}