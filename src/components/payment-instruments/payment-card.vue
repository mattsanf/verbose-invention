<template>
  <form class="rebilly-instruments-form" ref="PaymentCardForm">
    <input
      data-rebilly="fullName"
      placeholder="Cardholder Name"
    />
    <div id="payment-card"></div>
    <button @click.prevent="submit">Submit</button>
  </form>
</template>

<script>
  import {
    defineComponent,
    onMounted,
    onBeforeUnmount,
    ref,
    shallowRef
  } from 'vue';
  import {useFramePay} from '../../vendor/frame-pay';
  import Event from '../../events';
  import {useInstrumentTokenStore} from '../../state/instrument-token';

  export default defineComponent({
    setup() {
        const Rebilly = shallowRef(null);
        const card = shallowRef(null);
        const token = useInstrumentTokenStore();

        onMounted(() => {
          const {Rebilly: RebillyInstance} = useFramePay();
          RebillyInstance.on('ready',() => {
            card.value = RebillyInstance.card.mount('#payment-card');
          });

          Rebilly.value = RebillyInstance;
        });

        onBeforeUnmount(() => {
          card.value.destroy();
        });
        
        return {
          Rebilly,
          token,
          PaymentCardForm: ref()
        }
      },
      methods: {
        async submit() {
          const fields = await this.Rebilly.createToken(this.PaymentCardForm, {
            method: 'payment-card'
          });
          this.token.setToken(fields);
          
          Event.instrumentReady.dispatch({
            _raw: this.token
          });
        },
      }
  });
</script>