import { postErrors } from './error-posting';
import { DefaultOptions } from './default-options';
import { getAllErrors, clearAllErrors, addError } from './error-collection';

describe('postErrors', () => {
  let fakeFetch: Function;
  let options: DefaultOptions;

  beforeEach(() => {
    fakeFetch = jest
      .fn()
      .mockImplementation(() => Promise.resolve({ ok: true }));

    (global as any).fetch = fakeFetch;

    clearAllErrors();
    options = new DefaultOptions();
  });
  describe('not sending', () => {
    test('should do nothing without an url or errors', () => {
      postErrors(options);

      expect(fakeFetch).not.toHaveBeenCalled();
    });

    test('should do nothing without an url', () => {
      addError(new Error());
      postErrors(options);

      expect(fakeFetch).not.toHaveBeenCalled();
    });

    test('should do nothing without an error', () => {
      options.url = 'http://somewhere.com/api/error-collection';
      postErrors(options);

      expect(fakeFetch).not.toHaveBeenCalled();
    });
  });

  describe('not sending successfully', () => {
    beforeEach(() => {
      fakeFetch = jest
        .fn()
        .mockImplementation(() => Promise.resolve({ ok: true }));

      (global as any).fetch = fakeFetch;
    });

    test('should post with an error and URL', async () => {
      options.url = 'http://somewhere.com/api/error-collection';
      addError(new Error());
      expect(getAllErrors().length).toBe(1);

      await postErrors(options);

      expect(fakeFetch).toHaveBeenCalled();
      expect(getAllErrors().length).toBe(0);
    });
  });

  describe('not sending unsuccessfully', () => {
    beforeEach(() => {
      fakeFetch = jest
        .fn()
        .mockImplementation(() => Promise.resolve({ ok: false }));

      (global as any).fetch = fakeFetch;
    });

    test('should post with an error and URL', async () => {
      options.url = 'http://somewhere.com/api/error-collection';
      addError(new Error());
      expect(getAllErrors().length).toBe(1);

      await postErrors(options);

      expect(fakeFetch).toHaveBeenCalled();
      expect(getAllErrors().length).toBe(1);
    });
  });

  describe('not sending fails', () => {
    beforeEach(() => {
      fakeFetch = jest.fn().mockImplementation(() => Promise.reject());

      (global as any).fetch = fakeFetch;
    });

    test('should post with an error and URL', async () => {
      options.url = 'http://somewhere.com/api/error-collection';
      addError(new Error());
      expect(getAllErrors().length).toBe(1);

      await postErrors(options);

      expect(fakeFetch).toHaveBeenCalled();
      expect(getAllErrors().length).toBe(1);
    });
  });
});
