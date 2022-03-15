export const FramePayConfiguration = {
  publishableKey: 'pk_sandbox_RtA7zbc0UMyUnYNJcBCeBoFOJJVOuA31NpykAB9',
  organizationId: '0a2540d2-2285-414d-a677-868bde7e442f',
  websiteId: 'pokemon.nintendo.com',
  transactionData: {
    currency: 'USD',
    amount: 10,
    label: 'Demo purchase label'
  },
};

export function initializeFramePay () {
  return new Promise(resolve => {
    const script = document.createElement('script');
    script.async = true;
    script.onload = () => {
      window.Rebilly.initialize(FramePayConfiguration);
      resolve();
    };
    script.src = 'https://framepay.rebilly.com/rebilly.js';
  
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = 'https://framepay.rebilly.com/rebilly.css'
  
    document.getElementsByTagName('head')[0].appendChild(style);
    document.getElementsByTagName('head')[0].appendChild(script);
  });
}

export function useFramePay () {
  return {
    Rebilly: window.Rebilly
  };
}