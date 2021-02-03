import {action, computed, makeObservable, observable, runInAction,extendObservable,autorun} from "mobx";
import localStorage from 'mobx-localstorage';
let data = null
autorun(() => {
    data = {theme:localStorage.getItem('theme')}
});
export default class Store {
    constructor() {
        makeObservable(this)
    }
    @observable theme = 'dark'
    @action setTheme = (theme)=>{
        this.theme = theme
        localStorage.setItem('theme',theme)
    }
}
