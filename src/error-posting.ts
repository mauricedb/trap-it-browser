import { DefaultOptions } from './default-options';

const aMinute = 60 * 1000;

const postErrors = async (options: DefaultOptions) => {
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
};

export const setupErrorPosting = (options: DefaultOptions) => {
  if (options.url) {
    setInterval(() => postErrors(options), aMinute);
  }
};
