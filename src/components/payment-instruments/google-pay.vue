<template>
  <form class="rebilly-instruments-form" ref="googlePayForm">
    <div id="google-pay"></div>
  </form>
</template>

<script>
  import {
    defineComponent,
    onMounted,
    onBeforeUnmount,
    shallowRef,
    ref
  } from 'vue';
  import {useFramePay} from '../../vendor/frame-pay';
  import Event from '../../events';
  import {useInstrumentTokenStore} from '../../state/instrument-token';

  export default defineComponent({
    setup() {
      const Rebilly = shallowRef(null);
      const googlePay = shallowRef(null);
      const googlePayForm = ref();
      const token = useInstrumentTokenStore();

      onMounted(() => {
        const {Rebilly: RebillyInstance} = useFramePay();
  
        RebillyInstance.on('ready', () => {
          googlePay.value = RebillyInstance.googlePay.mount('#google-pay', {
            type: 'googlePay',
            form: googlePayForm,
          });
        });

        RebillyInstance.on('token-ready', (fields) => {
          token.setToken(fields);
          if (token.isGooglePay) {
            Event.instrumentReady.dispatch({_raw: token});
          }
        });

        Rebilly.value = RebillyInstance;
      });

      onBeforeUnmount(() => {
        googlePay.value.destroy();
      });
      
      return {
        Rebilly,
        googlePayForm
      }
    }
  });
</script>