import os

from celery import Celery
from django.conf import settings

# set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'app.settings')

celery = Celery('app',
                broker=f'{settings.CELERY_SCHEMA}://{settings.CELERY_URL}:{settings.CELERY_POST}/{settings.CELERY_DB}')

# Using a string here means the worker doesn't have to serialize
# the configuration object to child processes.
# - namespace='CELERY' means all celery-related configuration keys
#   should have a `CELERY_` prefix.
celery.config_from_object('django.conf:settings', namespace='CELERY')

# Load task modules from all registered Django app configs.
celery.autodiscover_tasks()
