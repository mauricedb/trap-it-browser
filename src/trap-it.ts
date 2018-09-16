import { ErrorRecord } from './error-record';
import { DefaultOptions } from './default-options';
import { setupErrorPosting } from './error-posting';
import { addError } from './error-collection';

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

export const init = (options: Partial<DefaultOptions> = {}) => {
  const actualOptions = { ...new DefaultOptions(), ...options };

  if (actualOptions.checkErrors) {
    window.addEventListener('error', windowErrorListener);
  }

  if (actualOptions.checkUnhandledRejections) {
    // Only supported by Chrome
    window.addEventListener('unhandledrejection', unhandledRejectionListener);
  }

  setupErrorPosting(actualOptions);
};
