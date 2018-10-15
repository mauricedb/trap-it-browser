import { ErrorRecord } from './error-record';

const startTime = Date.now();
const minuteLength = '2018-10-15T19:25'.length;

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

  const sameError = errors
    .filter(
      err =>
        err.hashCode === errorRecord.hashCode &&
        err.when.substring(0, minuteLength) ===
          errorRecord.when.substring(0, minuteLength)
    )
    .pop();

  if (sameError) {
    sameError.count++;
  } else {
    errors.push(errorRecord);
  }

  return errorRecord.hashCode;
};

export const getAllErrors = () => {
  return errors;
};
