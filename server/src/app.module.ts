import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from './auth/auth.module';
import { User } from './users/entities/user.entity';
import { Customer } from './customers/entities/customer.entity';
import { UsersModule } from './users/users.module';
import { CustomersModule } from './customers/customers.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.TYPEORM_HOST || 'localhost',
      port: 5432,
      username: process.env.TYPEORM_USERNAME || 'postgres',
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE || 'postgres',
      entities: [User, Customer],
      autoLoadEntities: true,
      synchronize: true, // DO NOT USE IN PRODUCTION
    }),
    MulterModule.register({
      dest: './upload',
    }),
    UsersModule,
    CustomersModule,
  ],
})
export class AppModule {}
