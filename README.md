# Anonymous Reviewer Django React

## Compiling static resource

Run the two commands below to update the resources

```bash
npm run build
python manage.py collectstatic --no-input
```

## Rebuild and run in one command

```bash
npm run build; python manage.py collectstatic --no-input; python manage.py runserver
```

## Loading fixtures

```
python manage.py loaddata backend/fixtures/fixtures.json
```

## Run Celery

To run celery ensure Redis is running and run the command

```bash
celery -A backend worker
```
