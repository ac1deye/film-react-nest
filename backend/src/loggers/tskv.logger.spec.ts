import { TskvLogger } from './tskv.logger';

describe('TskvLogger', () => {
  let logger: TskvLogger;

  beforeEach(() => {
    logger = new TskvLogger();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('.log() should log in TSKV format', () => {
    const mock = jest.spyOn(console, 'log').mockImplementation(() => {});
    const message = 'log level message';
    const optionalParams = 'log optional params';

    logger.log(message, optionalParams);

    const tskv = `level=log\tmessage=${message}\toptionalParams=${optionalParams}\n`;

    expect(mock).toHaveBeenCalledWith(tskv);
  });

  it('.error() should log error in TSKV format', () => {
    const mock = jest.spyOn(console, 'error').mockImplementation(() => {});
    const message = 'error level message';
    const optionalParams = 'error optional params';

    logger.error(message, optionalParams);

    const tskv = `level=error\tmessage=${message}\toptionalParams=${optionalParams}\n`;

    expect(mock).toHaveBeenCalledWith(tskv);
  });

  it('.warn() should log warning in TSKV format', () => {
    const mock = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const message = 'warning level message';
    const optionalParams = 'warning optional params';

    logger.warn(message, optionalParams);

    const tskv = `level=warn\tmessage=${message}\toptionalParams=${optionalParams}\n`;

    expect(mock).toHaveBeenCalledWith(tskv);
  });
});
