/* eslint-disable no-console */

import { log, logWarn, logError } from '../log';

console.log = jest.fn();
console.warn = jest.fn();
console.error = jest.fn();

const logPrefix = 'MitDemokrati:';

describe('the log utility', () => {
  it('logs messages to console with prefix', () => {
    log('test');

    expect(console.log).toHaveBeenCalledWith(`${logPrefix} test`);
  });

  it('logs warning to console with prefix', () => {
    logWarn('warning');

    expect(console.warn).toHaveBeenCalledWith(`${logPrefix} warning`);
  });

  it('logs error to console', () => {
    logError(Error('test'));

    expect(console.error).toHaveBeenCalledWith(Error('test'));
  });

  it('logs string error to console with prefix', () => {
    logError('error');

    expect(console.error).toHaveBeenCalledWith(`${logPrefix} error`);
  });
});
