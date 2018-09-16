import { ErrorRecord } from './error-record';

const startTime = Date.now();
let errors: ErrorRecord[] = [];

export const clearAllErrors = () => {
  errors.length = 0;
};

export const clearErrors = (toClear: ErrorRecord[]) => {
  errors = errors.filter(err => toClear.indexOf(err) === -1);
};

export const addError = (error: Error) => {
  const secondsActive = (Date.now() - startTime) / 1000;
  const errorRecord = new ErrorRecord(error, secondsActive);
  errors.push(errorRecord);
};

export const getAllErrors = () => {
  return errors;
};
