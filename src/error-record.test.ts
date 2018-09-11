import { ErrorRecord } from './error-record';

describe('An ErrorRecord', () => {
  const originalErrors = [
    new ErrorRecord(new Error('An error'), 1),
    new ErrorRecord(new Error('An second error'), 2)
  ];

  it('can be converted to JSON and back', () => {
    const json = JSON.stringify(originalErrors);

    const newErrors = JSON.parse(json);

    expect(newErrors).toEqual(originalErrors);
  });
});
