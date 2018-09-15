import { ErrorRecord } from './error-record';
import { DefaultOptions } from './default-options';

const startTime = Date.now();
let errors: ErrorRecord[] = [];

export const clearAllErrors = () => {
  errors.length = 0;
};

const clearErrors = (toClear: ErrorRecord[]) => {};

export const addError = (error: Error) => {
  const secondsActive = (Date.now() - startTime) / 1000;
  const errorRecord = new ErrorRecord(error, secondsActive);
  errors.push(errorRecord);
};

export const getAllErrors = () => {
  return errors;
};

export const windowErrorListener = (evt: ErrorEvent): void => {
  try {
    // console.error(`Unhandled error: ${evt.message}`);

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

export const unhandledRejectionListener = (
  evt: PromiseRejectionEvent
): void => {
  try {
    // console.log('evt.reason = Error', evt.reason instanceof Error);

    // console.error(`Uncaught (in promise)`, evt.reason);
    const error = new Error(`Unhandled promise rejection: ${evt.reason}`);

    addError(error);

    evt.preventDefault();
  } catch (err) {
    console.error(`Trap-it: ${err}`);
  }
};

const postErrors = async (options: DefaultOptions) => {
  try {
    var errors = getAllErrors();

    if (errors.length) {
      const rsp = await fetch(options.url, {
        body: JSON.stringify(errors),
        method: 'post'
      });
      if (!rsp.ok) {
        throw new Error(rsp.statusText);
      }

      clearErrors(errors);
    }
  } catch (err) {
    console.error(`Trap-it: ${err}`);
  }
};

const aMinute = 60 * 1000;

const setupErrorPosting = (options: DefaultOptions) => {
  if (options.url) {
    setInterval(() => postErrors(options), aMinute);
  }
};

export const init = (options: Partial<DefaultOptions> = {}) => {
  const o = { ...new DefaultOptions(), ...options };

  if (o.checkErrors) {
    window.addEventListener('error', windowErrorListener);
  }

  if (o.checkUnhandledRejections) {
    // Only supported by Chrome
    window.addEventListener('unhandledrejection', unhandledRejectionListener);
  }

  setupErrorPosting(o);
};
