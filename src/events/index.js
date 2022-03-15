import kebabCase from 'lodash.kebabcase';
import BaseEvent from './event';

const events = {
  dataReady: new BaseEvent('data-ready'),
  instrumentReady: new BaseEvent('instrument-ready'),
  purchaseCompleted: new BaseEvent('purchase-completed'),
  setupCompleted: new BaseEvent('setup-completed')
};

export default events;

export const publicEventNames = Object.keys(events).map((internalName) =>
  kebabCase(internalName)
);