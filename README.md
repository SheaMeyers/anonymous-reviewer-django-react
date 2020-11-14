# Anonymous Reviewer Django React

## Compiling static resource

Run the two commands below to update the resources

```bash
npm run build
python manage.py collectstatic --no-input
```

## Loading fixtures

```
python manage.py loaddata backend/fixtures/fixtures.json
```