import { ErrorRecord } from './error-record';
import { start } from 'repl';

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
  console.error(`Unhandled promise rejection: ${evt.message}`);

  addError(evt.error);
};

const unhandledrejectionListener = (evt: PromiseRejectionEvent): void => {
  console.error(`Unhandled promise rejection: ${evt.reason}`);

  const error = new Error(`Unhandled promise rejection: ${evt.reason}`);
  addError(error);
};

export const trapGlobalErrors = (evt: ErrorEvent) => {
  window.addEventListener('error', windowErrorListener);
  // Only supported by Chrome
  window.addEventListener('unhandledrejection', unhandledrejectionListener);
};
