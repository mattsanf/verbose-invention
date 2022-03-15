<template>
  <form class="rebilly-instruments-form" ref="PayPalForm">
    <div id="pay-pal"></div>
  </form>
</template>

<script>
  import {
    defineComponent,
    shallowRef,
    ref,
    onMounted,
    onBeforeUnmount
  } from 'vue';
  import {useFramePay} from '../../vendor/frame-pay';
  import Event from '../../events';
  import {useInstrumentTokenStore} from '../../state/instrument-token';

  export default defineComponent({
    setup() {
      const Rebilly = shallowRef(null);
      const paypal = shallowRef(null);
      const token = useInstrumentTokenStore();

      onMounted(() => {
        const {Rebilly: RebillyInstance} = useFramePay();
  
        RebillyInstance.on('ready', () => {
          paypal.value = RebillyInstance.paypal.mount('#pay-pal');
        });

        RebillyInstance.on('token-ready', (fields) => {
          token.setToken(fields);
          if (token.isPaypal) {
            Event.instrumentReady.dispatch({_raw: token});
          }
        });
      });

      onBeforeUnmount(() => {
        paypal.value.destroy();
      });
      
      return {
        Rebilly,
        PayPalForm: ref(),
      }
    }
  });
</script>