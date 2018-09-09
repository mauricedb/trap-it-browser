import {
  addError,
  clearAllErrors,
  getAllErrors,
  init,
  unhandledrejectionListener
} from './trap-it';

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
        expect.any(Function)
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
        expect.any(Function)
      );
    });
  });

  describe('errors', () => {
    // beforeAll(() => {
    //   Date.now = jest.fn(() => 1536000000000);
    // });

    beforeEach(() => {
      clearAllErrors();
    });

    it('can get all', () => {
      const allErrors = getAllErrors();
      expect(allErrors).toEqual([]);
    });

    it('can add', () => {
      addError(new Error('Some message'));
      const allErrors = getAllErrors();

      expect(allErrors).toEqual([{}]);
    });

    it('can add and clear', () => {
      expect(getAllErrors()).toEqual([]);
      addError(new Error('A message'));
      addError(new Error('Another message'));
      expect(getAllErrors()).toEqual([{}, {}]);
      clearAllErrors();
      expect(getAllErrors()).toEqual([]);
    });
  });

  describe('unhandledrejectionListener', () => {
    beforeEach(() => {
      clearAllErrors();
    });

    it('can handle events', () => {
      const e: any = new Event('');
      // e.promise = {
      //   then: () => {}
      // };
      e.reason = 'Some reason';

      unhandledrejectionListener(e);
      expect(getAllErrors()).toEqual([{}]);
    });
  });
});
