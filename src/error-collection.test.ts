import {
  clearAllErrors,
  addError,
  getAllErrors,
  clearErrors
} from './error-collection';

describe('error-collection', () => {
  let now = 1536000000000;
  beforeAll(() => {
    Date.now = jest.fn(() => now);
  });

  describe('getAllErrors', () => {
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

      expect(allErrors).toMatchObject([{ message: 'Some message', count: 1 }]);
    });

    it('can add and clear', () => {
      expect(getAllErrors()).toEqual([]);
      addError(new Error('A message'));
      addError(new Error('Another message'));
      expect(getAllErrors()).toMatchObject([{}, {}]);
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
      const errors: any[] = [{ message: '1' }, { message: '2' }];
      errors.forEach(element => addError(element));

      expect(getAllErrors().length).toBe(2);
      clearErrors(getAllErrors());
      expect(getAllErrors().length).toBe(0);
    });

    it('clears one error of two', () => {
      const errors: any[] = [
        { message: '1' },
        { message: '2' },
        { message: '3' }
      ];
      errors.forEach(element => addError(element));

      expect(getAllErrors().length).toBe(3);
      clearErrors([getAllErrors()[0]]);
      expect(getAllErrors().length).toBe(2);
    });
  });

  describe('addError', () => {
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

      expect(allErrors.length).toBe(1);
    });

    it('can add two after two minutes', () => {
      addError(new Error('Some message'));
      now += 1000 * 60 * 2;
      addError(new Error('Some message'));
      const allErrors = getAllErrors();

      expect(allErrors.length).toBe(2);
    });

    it('can add two after a second', () => {
      const error = new Error('Some message');
      addError(error);
      now += 1000;
      addError(error);
      const allErrors = getAllErrors();

      expect(allErrors.length).toBe(1);
      expect(allErrors[0]).toMatchObject({ count: 2 });
    });
  });
});
