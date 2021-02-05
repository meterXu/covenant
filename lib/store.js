import { action, observable, computed, runInAction, makeObservable } from 'mobx'
import { enableStaticRendering } from 'mobx-react'
import { useMemo } from 'react'
// eslint-disable-next-line react-hooks/rules-of-hooks
enableStaticRendering(typeof window === 'undefined')
import Store from '../pages/stores'
let store
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
