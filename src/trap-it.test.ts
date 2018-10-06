import {
  init,
  unhandledRejectionListener,
  windowErrorListener
} from './trap-it';
import { getAllErrors, clearAllErrors } from './error-collection';

jest.mock('./error-record');

describe('Trap it', () => {
  describe('initialization ', () => {
    let addEventListener;
    beforeEach(() => {
      addEventListener = window.addEventListener;
      window.addEventListener = jest.fn();
    });

    afterEach(() => {
      window.addEventListener = addEventListener;
    });

    it('should be a function', () => {
      expect(typeof init).toBe('function');
    });

    it('should have a single argument', () => {
      expect(init.length).toBe(1);
    });

    it('should register both handlers with no options', () => {
      init();

      expect(window.addEventListener).toHaveBeenCalledTimes(2);
      expect(window.addEventListener).toBeCalledWith(
        'error',
        expect.any(Function)
      );
      expect(window.addEventListener).toBeCalledWith(
        'unhandledrejection',
        unhandledRejectionListener
      );
    });

    it('should register both handlers with empty options', () => {
      init({});

      expect(window.addEventListener).toHaveBeenCalledTimes(2);
    });

    it('should register only register the error handler when checkUnhandledRejections is false', () => {
      init({ checkUnhandledRejections: false });

      expect(window.addEventListener).toHaveBeenCalledTimes(1);
      expect(window.addEventListener).toBeCalledWith(
        'error',
        expect.any(Function)
      );
    });

    it('should register only register the unhandled rejections handler when checkErrors is false', () => {
      init({ checkErrors: false });

      expect(window.addEventListener).toHaveBeenCalledTimes(1);
      expect(window.addEventListener).toBeCalledWith(
        'unhandledrejection',
        unhandledRejectionListener
      );
    });
  });

  describe('unhandledRejectionListener', () => {
    beforeEach(() => {
      clearAllErrors();
    });

    it('can handle events', () => {
      const e: any = new Event('');

      unhandledRejectionListener(e);
      expect(getAllErrors()).toEqual([{}]);
    });
  });

  describe('windowErrorListener', () => {
    beforeEach(() => {
      clearAllErrors();
    });

    it('can handle events', () => {
      const e = new ErrorEvent('Some error');

      windowErrorListener(e);
      expect(getAllErrors()).toEqual([{}]);
    });
  });
});
