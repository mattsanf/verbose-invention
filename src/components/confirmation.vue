<template>
  <div>
    <h1>Confirmation</h1>
    <a @click.prevent="changeView('MethodSelector')">← Choose another instrument</a>
  </div>
</template>

<script>
  import {
    defineComponent,
    inject
  } from 'vue';
 
  export default defineComponent({
    setup() {
      const changeView = inject('changeView');

      return {
        changeView
      }
    },
  });
</script>