import {action, computed, makeObservable, observable,autorun} from "mobx";
let _window = null
autorun(()=>{
    if(!_window && typeof window !== "undefined")
        _window = window
})
export default class Store {
    constructor() {
        makeObservable(this)
        if(_window&&_window.localStorage){
            this.theme = _window.localStorage.getItem('theme')
        }
    }
    @observable
    theme = 'dark'
    @action setTheme = (theme)=>{
        this.theme = theme
        localStorage.setItem('theme',theme)
    }
}
