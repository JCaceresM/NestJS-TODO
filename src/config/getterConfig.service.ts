
export class AppConfigService {
  private readonly configService: { [key: string]: string };
  constructor() {
    this.configService = {
      HOST: process.env.HOST,
      DB_NAME: process.env.DB_NAME,
      DB_USER: process.env.DB_USER,
      DB_PASS: process.env.DB_PASS,
      DB_PORT: process.env.DB_PORT,
      APP_PORT: process.env.APP_PORT,
      NODE_ENV: process.env.NODE_ENV,
    };
  }

  get(key: string): string {
    return this.configService[key];
  }
}
