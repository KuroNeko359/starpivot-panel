/**
 * 抽象内存类，定义了内存的基本属性和构造函数。
 * 该类作为所有具体内存类的基类，提供了统一的内存信息结构。
 */
abstract class AbstractMemory {
    /**
     * 已使用的内存大小，单位为字节。
     */
    usedMemory: number;
    /**
     * 空闲的内存大小，单位为字节。
     */
    freeMemory: number;
    /**
     * 总的内存大小，单位为字节。
     */
    totalMemory: number;

    /**
     * 抽象内存类的构造函数。
     *
     * @param usedMemory - 已使用的内存大小，单位为字节。
     * @param freeMemory - 空闲的内存大小，单位为字节。
     * @param totalMemory - 总的内存大小，单位为字节。
     */
    protected constructor(usedMemory: number, freeMemory: number, totalMemory: number) {
        this.usedMemory = usedMemory;
        this.freeMemory = freeMemory;
        this.totalMemory = totalMemory;
    }
}

/**
 * 系统内存类，继承自抽象内存类，用于表示系统的内存信息。
 */
export class SystemMemory extends AbstractMemory {
    /**
     * 系统内存类的构造函数。
     *
     * @param usedMemory - 系统已使用的内存大小，单位为字节。
     * @param freeMemory - 系统空闲的内存大小，单位为字节。
     * @param totalMemory - 系统总的内存大小，单位为字节。
     */
    constructor(usedMemory: number, freeMemory: number, totalMemory: number) {
        super(usedMemory, freeMemory, totalMemory);
    }
}

/**
 * JVM 内存类，继承自抽象内存类，用于表示 JVM 的内存信息。
 */
export class JVMMemory extends AbstractMemory {
    /**
     * JVM 内存类的构造函数。
     *
     * @param usedMemory - JVM 已使用的内存大小，单位为字节。
     * @param freeMemory - JVM 空闲的内存大小，单位为字节。
     * @param totalMemory - JVM 总的内存大小，单位为字节。
     */
    constructor(usedMemory: number, freeMemory: number, totalMemory: number) {
        super(usedMemory, freeMemory, totalMemory);
    }
}

/**
 * 承接后端 MemoryInfoDTO 的类，用于整合系统内存和 JVM 内存信息。
 */
export class Memory {
    /**
     * 系统内存信息实例。
     */
    systemMemory: SystemMemory;
    /**
     * JVM 内存信息实例。
     */
    jvmMemory: JVMMemory;

    /**
     * Memory 类的构造函数。
     *
     * @param systemMemory - 系统内存信息实例。
     * @param jvmMemory - JVM 内存信息实例。
     */
    constructor(systemMemory: SystemMemory, jvmMemory: JVMMemory) {
        this.systemMemory = systemMemory;
        this.jvmMemory = jvmMemory;
    }

    /**
     * 打印系统内存信息。
     * 该方法会在控制台输出系统的总内存、已使用内存和空闲内存大小。
     */
    printSystemMemoryInfo(): void {
        console.log(`System Total Memory: ${this.systemMemory.totalMemory} bytes`);
        console.log(`System Used Memory: ${this.systemMemory.usedMemory} bytes`);
        console.log(`System Free Memory: ${this.systemMemory.freeMemory} bytes`);
    }

    /**
     * 打印 JVM 内存信息。
     * 该方法会在控制台输出 JVM 的总内存、已使用内存和空闲内存大小。
     */
    printJVMMemoryInfo(): void {
        console.log(`JVM Total Memory: ${this.jvmMemory.totalMemory} bytes`);
        console.log(`JVM Used Memory: ${this.jvmMemory.usedMemory} bytes`);
        console.log(`JVM Free Memory: ${this.jvmMemory.freeMemory} bytes`);
    }
}

/**
 * 内存使用率类，用于计算和存储 JVM 内存使用率和系统内存使用率。
 */
export class MemoryUsageRate {
    /**
     * JVM 内存使用率，取值范围为 0 到 1。
     */
    jvmMemoryUsageRate: number;
    /**
     * 系统内存使用率，取值范围为 0 到 1。
     */
    systemMemoryUsedRate: number;

    /**
     * MemoryUsageRate 类的构造函数。
     *
     * @param memory - 包含系统内存和 JVM 内存信息的实例。
     */
    constructor(memory: Memory) {
        this.jvmMemoryUsageRate = memory.jvmMemory.usedMemory / memory.jvmMemory.totalMemory;
        this.systemMemoryUsedRate = memory.systemMemory.usedMemory / memory.systemMemory.totalMemory;
    }

}