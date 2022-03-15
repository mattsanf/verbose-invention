<template>
  <component :is="view"/>
</template>

<script>
  import {
    defineAsyncComponent,
    defineComponent,
    provide,
  } from 'vue';
  import {useStore, useStoreRefs} from '../state/form';

  export default defineComponent({
    components: {
      MethodSelector: defineAsyncComponent(() => import('../components/method-selector.vue')),
      Confirmation: defineAsyncComponent(() => import('../components/confirmation.vue'))
    },
    setup() {
      const store = useStore();
      const {view} = useStoreRefs(store);

      provide('changeView', store.changeView);

      return {
        view
      }
    },
  })
</script>