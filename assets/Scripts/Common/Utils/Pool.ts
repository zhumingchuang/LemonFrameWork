/**
 * 对象池接口
 */
export interface IPool {
    use?(...params: any): any;
    free?(): any;
}

/**
 * 对象池泛型基类
 */
export class Pool<T extends IPool>{
    private _fn: () => T;
    private _idx: number;
    private _frees: T[];

    constructor(fn: () => T, size: number) {
        this._fn = fn;
        this._idx = size - 1;
        this._frees = new Array<T>(size);
        for (let i = 0; i < size; i++) {
            this._frees[i] = fn();
        }
    }

    /**
     * 获取当前对象池数量
     */
    public get freeCount() {
        return this._frees.length;
    }

    /**
     * 获取
     */
    public alloc(...params: any): T {
        if (this._idx < 0) {
            this._expand(Math.round(this._frees.length * 1.2) + 1);
        }
        const obj = this._frees[this._idx];
        this._frees.splice(this._idx);
        --this._idx;
        obj.use && obj.use(...params);
        return obj;
    }

    /**
     * 释放
     */
    public free(obj: T) {
        ++this._idx;
        obj.free && obj.free();
        this._frees[this._idx] = obj;
    }

    /**
     * 清除
     */
    public clear(fn: (obj: T) => void) {
        for (let i = 0; i < this._idx; i++) {
            fn && fn(this._frees[i]);
        }
        this._frees.splice(0);
        this._idx = -1;
    }

    /**
     * 扩大容量
     */
    private _expand(size: number) {
        const old = this._frees;
        this._frees = new Array(size);
        const len = size - old.length;
        for (let i = 0; i < len; i++) {
            this._frees[i] = this._fn();
        }
        for (let i = len, j = 0; i < size; ++i, ++j) {
            this._frees[i] = old[j];
        }
        this._idx += len;
    }

}
