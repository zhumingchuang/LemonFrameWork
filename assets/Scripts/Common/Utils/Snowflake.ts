/**
 * 雪花ID
 */
class Snowflake {
    private static _instance: Snowflake;
    private sequence: number;
    private lastTimestamp: number;
    private static readonly EPOCH = 1600000000000; //起始时间2020年

    private constructor() {
        this.sequence = 0;
        this.lastTimestamp = -1;
    }

    /**
     * 获取雪花ID Singleton
     * @returns Singleton
     */
    public static getInstance(): Snowflake {
        if (!Snowflake._instance) {
            Snowflake._instance = new Snowflake();
        }
        return Snowflake._instance;
    }

    /**
     * 获取雪花ID
     * @returns number id
     */
    public generateId(): number {
        let timestamp = Date.now();
        if (timestamp === this.lastTimestamp) {
            this.sequence = (this.sequence + 1) & 4095; // 最多支持 4096 个 ID
            if (this.sequence === 0) {
                // 同一毫秒内的序列号已经达到上限
                do {
                    timestamp = Date.now();
                } while (timestamp <= this.lastTimestamp);
            }
        } else {
            this.sequence = 0;
        }
        this.lastTimestamp = timestamp;
        return (((timestamp - Snowflake.EPOCH) << 22) | (Math.floor(Math.random() * 1024) << 12) | this.sequence);
    }

    /**
     * 获取雪花字符串ID
     * @returns 
     */
    public generateIdStr(): string {
        return this.generateId().toString();
    }
}