module.exports = [
  {
    name: 'default',
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'QwertyWeb123',
    database: 'bzn',
    synchronize: true,
    logging: true,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    seeds: [__dirname + '/**/*.seeder{.ts,.js}'],
    factories: [__dirname + '/**/*.factory{.ts,.js}'],
  },
];
