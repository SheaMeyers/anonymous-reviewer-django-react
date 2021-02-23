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


## Quickstart Instructions

1. Create a Google Recaptcha key https://developers.google.com/recaptcha/docs/invisible
and add it to the `keys.tsx` file (optional but needed for submitting data from website)

2. Create a virtual environment (optional but recommended)
https://packaging.python.org/guides/installing-using-pip-and-virtual-environments/

3. Install python requirements
```bash
pip install -r requirements.txt
```

4. Install node modules
```bash
npm install
```

5. Compile static resources
```bash
npm run build
```
```bash
python manage.py collectstatic --no-input
```

6. Run migrations
```bash
python manage.py migrate
```

7. Load testing fixtures
```bash
python manage.py loaddata backend/fixtures/fixtures.json
```

8. Run server
```bash
python manage.py runserver
```

9. The project should be running and accessible by going to localhost:8000

One example is to search for `My Restaurant` which will have a variety of reviews 