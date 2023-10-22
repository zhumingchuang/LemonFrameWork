import { Pool, IPool } from '../Common/Utils/Pool';
import { js } from 'cc';

/**
 * 订阅事件
 */
export class EventInfo implements IPool {
    callback: Function;
    target: any;
    once: boolean;

    free() {
        this.callback = null;
        this.target = null;
        this.once = false;
    }
    init(callback: Function, target: Object, once: boolean) {
        this.callback = callback;
        this.target = target;
        this.once = once;
    }
}

/**
 * 删除事件
 */
class RemoveCommand {
    public eventName: string;
    public targetId: string;
    public callback: Function;

    constructor(eventName: string, callback: Function, targetId: string) {
        this.eventName = eventName;
        this.callback = callback;
        this.targetId = targetId;
    }
}

/**
 * 事件处理中心
 */
let idSeed = 1;
export class EventCenter {
    private static _listeners: { [eventName: string]: { [id: string]: Array<EventInfo> } } = js.createMap();
    private static _dispatching: number = 0;
    private static _removeCommands: RemoveCommand[] = [];

    private static _eventPool: Pool<EventInfo> = new Pool<EventInfo>(() => {
        return new EventInfo();
    }, 10);

    /**
     * 注册事件
     * @param eventName 
     * @param callback 
     * @param target 
     * @param once 
     */
    public static on(eventName: string, callback: Function, target: any = undefined, once = false) {
        target = target || this;
        let targetId: string = target['uuid'] || target['id'];
        if (targetId == undefined) {
            target['uuid'] = targetId = '' + idSeed++;
        }
        this.onById(eventName, targetId, target, callback, once);
    }

    /**
     * 注册一次事件
     * @param eventName 
     * @param callback 
     * @param target 
     */
    public static once(eventName: string, callback: Function, target: any = undefined) {
        this.on(eventName, callback, target, true);
    }

    /**
     * 
     * @param eventName 
     * @param callback 
     * @param target 
     * @returns 
     */
    public static off(eventName: string, callback: Function, target: any = undefined) {
        target = target || this;
        let targetId = target['uuid'] || target['id'];
        if (!targetId) return false;
        this.offById(eventName, callback, targetId);
    }

    /**
     * 删除目标对象所有监听事件
     * @param target 
     */
    public static targetOff(target: any) {
        target = target || this;
        let targetId = target['uuid'] || target['id'];
        if (!targetId) return;
        for (let event in this._listeners) {
            let collection = this._listeners[event];
            if (collection[targetId] !== undefined) {
                delete collection[targetId];
            }
        }
    }

    /**
     * 发送事件
     * @param eventName 
     * @param param 
     * @returns 
     */
    public static emit(eventName: string, ...param: any[]) {
        let collection = this._listeners[eventName];
        if (!collection) return false;
        this._dispatching++;
        for (let targetId in collection) {
            for (let eventInfo of collection[targetId]) {
                eventInfo.callback.call(eventInfo.target, ...param);
                if (eventInfo.once) {
                    let cmd = new RemoveCommand(eventName, eventInfo.callback, targetId);
                    this._removeCommands.push(cmd);
                }
            }
        }
        this._dispatching--;
        this.doRemoveCommands();
    }

    /**
     * 添加事件
     * @param eventName 
     * @param targetId 
     * @param target 
     * @param cb 
     * @param once 
     */
    private static onById(eventName: string, targetId: string, target: any, callback: Function, once: boolean) {
        let collection = this._listeners[eventName];
        if (!collection) {
            collection = this._listeners[eventName] = {};
        }
        let events = collection[targetId];
        if (!events) {
            events = collection[targetId] = [];
        }
        let eventInfo = this._eventPool.alloc();
        eventInfo.init(callback, target, once);
        events.push(eventInfo);
    }

    /**
     * 清除列中中的事件监听
     * @returns 
     */
    private static doRemoveCommands() {
        if (this._dispatching !== 0) {
            return;
        }
        for (let cmd of this._removeCommands) {
            this.doOff(cmd.eventName, cmd.callback, cmd.targetId);
        }
        this._removeCommands.length = 0;
    }

    /**
     * 删除指定事件ID监听
     * @param eventName 
     * @param callback 
     * @param targetId 
     * @returns 
     */
    private static doOff(eventName: string, callback: Function, targetId: string) {
        let collection = this._listeners[eventName];
        if (!collection) return;
        let events = collection[targetId];
        if (!events) return;
        for (let i = events.length - 1; i >= 0; i--) {
            if (events[i].callback === callback) {
                events.splice(i, 1);
            }
        }
        if (events.length === 0) {
            collection[targetId] = null;
            delete collection[targetId];
        }
    }

    /**
     * 删除指定ID事件监听
     * @param eventName 
     * @param callback 
     * @param targetId 
     */
    private static offById(eventName: string, callback: Function, targetId: string) {
        if (this._dispatching > 0) {
            let cmd = new RemoveCommand(eventName, callback, targetId);
            this._removeCommands.push(cmd);
        } else {
            this.doOff(eventName, callback, targetId);
        }
    }
}





