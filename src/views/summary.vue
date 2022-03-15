<template>
  <h1>hello world</h1>
  <p>view: {{view}}</p>
</template>


<script>
import { defineComponent } from 'vue';
import { useStoreRefs as useFormStoreRefs } from '../state/form';

export default defineComponent({
  setup() {
    const {view} = useFormStoreRefs();

    return {
      view
    }
  },
})
</script>
