export class AppConfigService {
  private readonly configService: { [key: string]: string };
  constructor() {
    this.configService = {
      TYPEORM_CONFIG: 'database.config',
      PORT: process.env.PORT,
      NODE_ENV: process.env.NODE_ENV,
      SECRET: process.env.SECRET,
      EXPIRESIN: process.env.EXPIRESIN,
      DEFAULT_USER_PASSWORD: process.env.DEFAULT_USER_PASSWORD,
      DEFAULT_USER_NAME: process.env.DEFAULT_USER_NAME,
      DEFAULT_USER_EMAIL: process.env.DEFAULT_USER_EMAIL,
    };
  }

  get(key: string): string {
    return this.configService[key];
  }
}
