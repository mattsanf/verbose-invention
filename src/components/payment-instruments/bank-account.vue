<template>
  <form class="rebilly-instruments-form">
    <div id="rebilly-instruments-account-type"></div>
    <p>Account Number: </p>
    <div id="rebilly-instruments-account-number"></div>
    <p>Routing Number: </p>
    <div id="rebilly-instruments-routing-number"></div>
    <button @click.prevent="submit">Submit</button>
  </form>
</template>

<script>
  import {
    defineComponent,
    onMounted,
    onBeforeUnmount,
    shallowRef
  } from 'vue';
  import {useFramePay} from '../../vendor/frame-pay';
  import Event from '../../events';
  import {useInstrumentTokenStore} from '../../state/instrument-token';

  export default defineComponent({
    setup() {
        const Rebilly = shallowRef(null);
        const accountType = shallowRef(null);
        const accountNumber = shallowRef(null);
        const routingNumber = shallowRef(null);
        const token = useInstrumentTokenStore();

        onMounted(() => {
          const {Rebilly: RebillyInstance} = useFramePay();
    
          RebillyInstance.on('ready', () => {
            accountType.value = RebillyInstance.bban.mount('#rebilly-instruments-account-type', 'accountType');
            accountNumber.value = RebillyInstance.bban.mount('#rebilly-instruments-account-number', 'accountNumber');
            routingNumber.value = RebillyInstance.bban.mount('#rebilly-instruments-routing-number', 'routingNumber');

            Rebilly.value = RebillyInstance;
          });
        });
        
        onBeforeUnmount(() => {
          accountType.value.destroy();
          accountNumber.value.destroy();
          routingNumber.value.destroy();
        });

        return {
          Rebilly,
          token
        }
      },
      methods: {
        async submit() {
          const fields = await this.Rebilly.createToken(this.PaymentCardForm, {
            method: 'ach'
          });
          this.token.setToken(fields);
          
          Event.instrumentReady.dispatch({
            _raw: this.token
          });
        },
      }
  });
</script>