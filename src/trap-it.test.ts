import {
  addError,
  clearAllErrors,
  getAllErrors,
  trapGlobalErrors
} from './trap-it';

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
    beforeAll(() => {
      Date.now = jest.fn(() => 1536000000000);
    });

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
      delete allErrors[0].stack;
      delete allErrors[0].secondsActive;

      expect(allErrors).toEqual([
        {
          message: 'Some message',
          name: 'Error',
          when: '2018-09-03T18:40:00.000Z'
        }
      ]);
    });

    it('can add and clear', () => {
      expect(getAllErrors().length).toBe(0);
      addError(new Error('A message'));
      addError(new Error('Another message'));
      expect(getAllErrors().length).toBe(2);
      clearAllErrors();
      expect(getAllErrors().length).toBe(0);
    });
  });
});
