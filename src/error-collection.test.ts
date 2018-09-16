import {
  clearAllErrors,
  addError,
  getAllErrors,
  clearErrors
} from './error-collection';

jest.mock('./error-record');

describe('error-collection', () => {
  describe('getAllErrors', () => {
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

  describe('clearErrors', () => {
    beforeEach(() => {
      clearAllErrors();
    });

    it('works without errors', () => {
      clearErrors([]);
    });

    it('clears all errors', () => {
      const errors: any[] = [{}, {}];
      errors.forEach(element => {
        addError(element);
      });

      expect(getAllErrors().length).toBe(2);
      clearErrors(getAllErrors());
      expect(getAllErrors().length).toBe(0);
    });

    it('clears one error of two', () => {
      const errors: any[] = [{}, {}, {}];
      errors.forEach(element => {
        addError(element);
      });

      expect(getAllErrors().length).toBe(3);
      clearErrors([getAllErrors()[0]]);
      expect(getAllErrors().length).toBe(2);
    });
  });
});
