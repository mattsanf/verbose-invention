import { createApp } from 'vue';
import { initializeFramePay } from './vendor/frame-pay';
import camelCase from 'lodash.camelcase';
import Events from './events';
import FormView from './views/form.vue';
import SummaryView from './views/summary.vue';
import { createPinia } from 'pinia';
import { useStore as useFormStore } from './state/form';

class Instruments {
  constructor() {
    this.state = createPinia();
  }

  async mount({
    form = '#rebilly-instruments',
    summary = null
  } = {}) {
    await initializeFramePay();
    createApp(FormView)
      .use(this.state)
      .mount(form);

    if (summary) {
      createApp(SummaryView)
        .use(this.state)
        .mount(summary);
    }

    // IF features.autoConfirmation
    this.on('instrument-ready', () => {
      const form = useFormStore();
      form.changeView('Confirmation');
    });
  }

  on(eventName, callback) {
    const internalEventName = camelCase(eventName);
    Events[internalEventName].addEventListener(callback);
  }
}

const instrument = new Instruments();
export default instrument;  