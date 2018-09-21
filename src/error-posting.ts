import { DefaultOptions } from './default-options';
import { getAllErrors, clearErrors } from './error-collection';

const aMinute = 60 * 1000;

async function postErrors(options: DefaultOptions) {
  if (!options.url) {
    return;
  }
  
  try {
    var errors = getAllErrors();

    if (errors.length) {
      const rsp = await fetch(options.url, {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify(errors)
      });
      if (!rsp.ok) {
        throw new Error(rsp.statusText);
      }

      clearErrors(errors);
    }
  } catch (err) {
    console.error(`Trap-it: ${err}`);
  }
}

export const setupErrorPosting = (options: DefaultOptions) => {
  if (options.url) {
    setInterval(() => postErrors(options), aMinute);
  }
};
