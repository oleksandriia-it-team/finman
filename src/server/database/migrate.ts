import 'dotenv/config';

async function migrate() {
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
  } finally {
    if (DBDataSource.isInitialized) {
      await DBDataSource.destroy();
      console.log('Database connection closed.');
    }
  }
}

migrate();
