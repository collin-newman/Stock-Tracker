/**
 * @jest-environment node
 */

describe('Testing jest/enzyme config', () => {
  beforeAll(() => {
    console.log('Running new test.');
  });

  it('Runs a test', () => {
    expect(true).toEqual(true);
  });
});