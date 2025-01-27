import { JsonLogger } from './json.logger';

describe('JsonLogger', () => {
  let logger: JsonLogger;

  beforeEach(() => {
    logger = new JsonLogger();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('.log() should log in JSON format', () => {
    const mock = jest.spyOn(console, 'log').mockImplementation(() => {});
    const message = 'log level message';

    logger.log(message);

    const json = JSON.stringify({
      level: 'log',
      message: message,
      optionalParams: [],
    });

    expect(mock).toHaveBeenCalledWith(json);
  });

  it('.error() should log error in JSON format', () => {
    const mock = jest.spyOn(console, 'error').mockImplementation(() => {});
    const message = 'error level message';

    logger.error(message);

    const json = JSON.stringify({
      level: 'error',
      message: message,
      optionalParams: [],
    });

    expect(mock).toHaveBeenCalledWith(json);
  });

  it('.warn() should log warning in JSON format', () => {
    const mock = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const message = 'warning level message';

    logger.warn(message);

    const json = JSON.stringify({
      level: 'warn',
      message: message,
      optionalParams: [],
    });

    expect(mock).toHaveBeenCalledWith(json);
  });
});
