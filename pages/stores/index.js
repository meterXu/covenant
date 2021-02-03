import {action, computed, makeObservable, observable, runInAction} from "mobx";

export default class Store {
    constructor() {
        makeObservable(this)
        if(localStorage.getItem('theme')){
            this.theme  = localStorage.getItem('theme')
        }
    }
    @observable theme = 'dark'
    @action setTheme = (theme)=>{
        this.theme = theme
        localStorage.setItem('theme',theme)
    }
}
