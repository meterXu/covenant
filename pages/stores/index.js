import {action, computed, makeObservable, observable, runInAction} from "mobx";

export default class Store {
    constructor() {
        makeObservable(this)
    }

    @observable lastUpdate = 0
    @observable light = false

    @action start = () => {
        this.timer = setInterval(() => {
            runInAction(() => {
                this.lastUpdate = Date.now()
                this.light = true
            })
        }, 1000)
    }

    @computed get timeString() {
        const pad = (n) => (n < 10 ? `0${n}` : n)
        const format = (t) =>
            `${pad(t.getUTCHours())}:${pad(t.getUTCMinutes())}:${pad(
                t.getUTCSeconds()
            )}`
        return format(new Date(this.lastUpdate))
    }

    stop = () => clearInterval(this.timer)


}
