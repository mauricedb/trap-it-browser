import {
  addError,
  clearAllErrors,
  getAllErrors,
  trapGlobalErrors
} from './trap-it';

jest.mock('./error-record');

describe('Trap it', () => {
  describe('trapGlobalErrors', () => {
    it('should be a function', () => {
      expect(typeof trapGlobalErrors).toBe('function');
    });

    it('should have a single argument', () => {
      expect(trapGlobalErrors.length).toBe(1);
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
});
