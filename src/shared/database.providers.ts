import { DataSource, DataSourceOptions } from 'typeorm';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';

// 设置数据库类型
const databaseMongodbType: DataSourceOptions['type'] = 'mongodb';
const databaseMysqlType: DataSourceOptions['type'] = 'mysql';
// 数据库注入
export const DatabaseProviders = [
  {
    provide: 'MONGODB_DATA_SOURCE',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const config = {
        type: databaseMongodbType,
        url: configService.get<string>('database.mongodb.url'),
        username: configService.get<string>('database.mongodb.user'),
        password: configService.get<string>('database.mongodb.pass'),
        database: configService.get<string>('database.mongodb.name'),
        entities: [path.join(__dirname, `../../**/*.mongo.entity{.ts,.js}`)],
        logging: configService.get<boolean>('database.mongodb.logging'),
        synchronize: configService.get<boolean>('database.mongodb.synchronize'),
      };

      const ds = new DataSource(config);
      await ds.initialize();
      return ds;
    },
  },
  {
    provide: 'MYSQL_DATA_SOURCE',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const config = {
        type: databaseMysqlType,
        host: configService.get<string>('database.mysql.url'),
        port: configService.get<number>('database.mysql.port'),
        username: configService.get<string>('database.mysql.user'),
        password: configService.get<string>('database.mysql.pass'),
        database: configService.get<string>('database.mysql.name'),
        entities: [path.join(__dirname, `../../**/*.mysql.entity{.ts,.js}`)],
        logging: configService.get<boolean>('database.mysql.logging'),
        synchronize: configService.get<boolean>('database.mysql.synchronize'),
      };

      const ds = new DataSource(config);
      await ds.initialize();
      return ds;
    },
  },
];
