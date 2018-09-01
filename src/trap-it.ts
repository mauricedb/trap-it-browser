import { ErrorRecord } from './error-record';

const startTime = Date.now();
let errors: ErrorRecord[] = [];

export const addError = (error: Error) => {
  const secondsActive = (Date.now() - startTime) / 1000;
  const errorRecord = new ErrorRecord(error, secondsActive);
  errors.push(errorRecord);
};

export const getAllErrors = () => {
  return errors;
};


const windowErrorListener = (evt: ErrorEvent): void => {
  try {
    console.error(`Unhandled promise rejection: ${evt.message}`);

    let error = evt.error || evt;

    if (!(error instanceof Error)) {
      try {
        error = new Error(JSON.stringify(error));
      } catch (ex) {
        error = new Error(error);
      }
    }

    addError(error);

    evt.preventDefault();
  } catch (err) {
    console.error(`Trap-it: ${err}`);
  }
};

const unhandledrejectionListener = (evt: PromiseRejectionEvent): void => {
  try {
    console.log(
      'evt instanceof PromiseRejectionEvent',
      evt instanceof PromiseRejectionEvent
    );
    console.log('evt.reason = Error', evt.reason instanceof Error);
    console.log('evt.reason = Response', evt.reason instanceof Response);

    console.error(`Unhandled promise rejection: ${evt.reason}`);

    
    const error = new Error(`Unhandled promise rejection: ${evt.reason}`);

    addError(error);

    evt.preventDefault();
  } catch (err) {
    console.error(`Trap-it: ${err}`);
  }
};

export const trapGlobalErrors = (evt: ErrorEvent) => {
  window.addEventListener('error', windowErrorListener);
  // Only supported by Chrome
  window.addEventListener('unhandledrejection', unhandledrejectionListener);
};
