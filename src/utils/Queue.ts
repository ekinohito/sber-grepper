export type QueueResident<T> = {
    cb: () => Promise<T>
    resolve: (result: T) => void
}

export class Queue {
    timer: NodeJS.Timer | undefined = undefined
    private queue: QueueResident<any>[] = []
    constructor(private cooldown: number) {}
    async add<T>(cb: () => Promise<T>) {
        const promise = new Promise<T | null>((resolve) => {
            this.queue.push({cb, resolve})
        })
        this.startTimer()
        return promise
    }
    startTimer() {
        if (this.timer != undefined) return
        this.timer = setInterval(async () => {
            const first = this.queue.shift()
            if (first == undefined) return this.stopTimer()
            try {
                const result = await first.cb()
                first.resolve(result)
            } catch (e) {
                first.resolve(null)
            }
        }, this.cooldown)
    }
    stopTimer() {
        if (this.timer == undefined) return
        clearTimeout(this.timer)
        this.timer = undefined
    }
}