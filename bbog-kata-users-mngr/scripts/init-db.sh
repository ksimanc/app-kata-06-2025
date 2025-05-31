#!/bin/sh

# Function to wait for PostgreSQL to be ready
wait_for_postgres() {
  echo "Waiting for PostgreSQL to be ready..."
  while ! nc -z users-db 5432; do
    sleep 1
  done
  echo "PostgreSQL is ready!"
}

# Function to check if database is initialized
check_db_initialized() {
  PGPASSWORD=$POSTGRES_PASSWORD psql -h users-db -U $POSTGRES_USER -d $POSTGRES_DB -c "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'users')" | grep -q 't'
  return $?
}

# Wait for PostgreSQL
wait_for_postgres

# Check if database needs initialization
if check_db_initialized; then
  echo "Database already initialized, skipping migrations and seeding..."
else
  echo "Fresh database detected, running migrations and seeding..."

  # Run database migrations
  echo "Running database migrations..."
  npm run db:generate
  npm run db:migrate

  # Run database seeding
  echo "Running database seeding..."
  node -r tsx/register src/db/seed.ts
fi

# Start the application
exec "$@"
