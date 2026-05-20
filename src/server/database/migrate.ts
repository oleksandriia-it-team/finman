import 'dotenv/config';

const { DBDataSource } = await import('./database-connection');

try {
  if (!DBDataSource.isInitialized) {
    await DBDataSource.initialize();
    console.log('Database connected');
  }

  await DBDataSource.runMigrations();
  console.log('Migrations done!');
} catch (error) {
  console.error('Migration error:', error);
  process.exitCode = 1;
} finally {
  if (DBDataSource.isInitialized) {
    await DBDataSource.destroy();
    console.log('Database connection closed.');
  }
}
