# Anonymous Reviewer Django React

This project allows anyone to see and leave reviews for businesses without needing to create an account, thereby remaining anonymous.  This project is built using Django and ReactJS.  See below for quickstart instructions.

## Live Demo

https://anonymous-reviewer-app.herokuapp.com/

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

Note: This project relies on postgresql being installed on your system
There should be a database with a name, user, and password of 'anonymous_reviewer_django_react'

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


## Deploying to Heroku

This project also contains the configuration to be deploy to Heroku (https://devcenter.heroku.com/articles/django-app-configuration).  If you created a project in Heroku you should only need to set the git upstream and run `git push heroku master` in order for this project to be run on Heroku.  For further instructions please reference Heroku documentation.
