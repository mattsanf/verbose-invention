import {
  defineStore,
  storeToRefs
} from 'pinia';

export const useStore = defineStore('Form', {
  state: () => {
    return {
      view: 'MethodSelector'
    }
  },
  actions: {
    changeView(key) {
      this.view = key;
    }
  }
});

export const useStoreRefs = (store = useStore()) => storeToRefs(store);