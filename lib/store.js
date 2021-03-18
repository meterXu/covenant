import { action, observable, computed, runInAction, makeObservable } from 'mobx'
import { enableStaticRendering } from 'mobx-react'
import { useMemo } from 'react'
import Store from '../pages/stores'
let store
const window = window||{}
enableStaticRendering(typeof window === 'undefined')
function initializeStore() {
    const _store = store ?? new Store()
    if (typeof window === 'undefined') {
        return _store
    }else if(!window.store){
        window.store = _store
    }
    if (!store) store = _store

    return _store
}

export function useStore() {
    const store = useMemo(() => initializeStore(), [])
    return store
}
