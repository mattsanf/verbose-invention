import {
  defineStore,
  storeToRefs
} from 'pinia';

export const useInstrumentTokenStore = defineStore('PaymentInstrumentToken', {
  state: () => ({}),
  actions: {
    setToken(fields) {
      Object.entries(fields).forEach(([key, value]) => {
        this[key] = value;
      });
    }
  },
  getters: {
    isPaypal() {
      return this.method === 'paypal';
    },
    isGooglePayToken() {
      return this.method === 'digital-wallet' && this.paymentInstrument?.type === 'Google Pay';
    }
  }
});

export const useInstrumentTokenStoreRefs = (store = useInstrumentTokenStore()) => storeToRefs(store);