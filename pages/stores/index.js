import {action, computed, makeObservable, observable, runInAction} from "mobx";

export default class Store {
    constructor() {
        makeObservable(this)
    }
    @observable theme = 'dark'
    @action setTheme = (theme)=>{
        this.theme = theme
    }
}
