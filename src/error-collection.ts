import { ErrorRecord } from './error-record';

const startTime = Date.now();
let errors: ErrorRecord[] = [];

export const clearAllErrors = () => {
  errors.length = 0;
};

export const clearErrors = (toClear: ErrorRecord[]) => {
  errors = errors.filter(err => toClear.indexOf(err) === -1);
};

export const addError = (error: Error, fileName = '') => {
  const secondsActive = (Date.now() - startTime) / 1000;
  const errorRecord = new ErrorRecord(error, fileName, secondsActive);
  errors.push(errorRecord);

  return errorRecord.hashCode;
};

export const getAllErrors = () => {
  return errors;
};
