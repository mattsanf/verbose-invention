<template>
  <div>
    <paypal />
    <google-pay />
  </div>
  <hr/>
  <details class="rebilly-instruments-accordion" :open="selectedMethod === 'payment-card'"> 
    <summary @click.prevent="selectedMethod = 'payment-card'">Payment Card</summary>
    <payment-card v-if="selectedMethod === 'payment-card'"/>
  </details>
  <details class="rebilly-instruments-accordion" :open="selectedMethod === 'bank-account'">
    <summary @click.prevent="selectedMethod = 'bank-account'">Bank Account</summary>
    <bank-account v-if="selectedMethod === 'bank-account'"/>
  </details>
</template>

<script>
  import {
    defineComponent,
    defineAsyncComponent,
    ref
  } from 'vue';
 
  export default defineComponent({
    components: {
      PaymentCard: defineAsyncComponent(() => import('./payment-instruments/payment-card.vue')),
      BankAccount: defineAsyncComponent(() => import('./payment-instruments/bank-account.vue')),
      GooglePay: defineAsyncComponent(() => import('./payment-instruments/google-pay.vue')),
      Paypal: defineAsyncComponent(() => import('./payment-instruments/paypal.vue')),
    },
    setup() {
      return {
        selectedMethod: ref('payment-card'),
      }
    },
  });
</script>