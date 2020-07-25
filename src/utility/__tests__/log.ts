/* eslint-disable no-console */

import { log, logError } from '../log';

console.log = jest.fn();
console.error = jest.fn();

const logPrefix = 'MitDemokrati';

describe('the log utility', () => {
  it('logs messages to console with prefix', () => {
    log('test');

    expect(console.log).toHaveBeenCalledWith(`${logPrefix}: test`);
  });

  it('logs error to console', () => {
    logError(Error('test'));

    expect(console.error).toHaveBeenCalledWith(Error('test'));
  });

  it('logs string error to console with prefix', () => {
    logError('error');

    expect(console.error).toHaveBeenCalledWith(`${logPrefix}: error`);
  });
});
