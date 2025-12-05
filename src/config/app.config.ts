import { ConfigService } from '@nestjs/config';

let configService: ConfigService;

export const setConfigService = (_configService: ConfigService) => {
  configService = _configService;
};

export const getConfigService = () => {
  if (!configService) throw new Error('Config Service not initialized');
  return configService;
};
