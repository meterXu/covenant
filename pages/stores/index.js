import {action, computed, makeObservable, observable,autorun} from "mobx";
import ls from 'mobx-localstorage';
let _theme = ''
autorun(() => {
    if(ls){
        _theme = ls.getItem('theme')
    }
});  
export default class Store {
    constructor() {
        makeObservable(this)
    }
    @computed 
    get theme (){
        return _theme
    }
    @action setTheme = (theme)=>{
        this._theme = theme
        ls.setItem('theme',theme)
    }
}
