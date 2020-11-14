import uuid

from django.contrib.auth.validators import UnicodeUsernameValidator
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models
from django.utils.translation import gettext_lazy as _


class BaseModel(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False)
    created_datetime = models.DateTimeField(
        help_text="Date in which this entity was created",
        auto_now_add=True)
    modified_datetime = models.DateTimeField(
        help_text="Date in which this entity was modified the last time",
        auto_now=True)

    class Meta:
        abstract = True


class Company(BaseModel):

    name = models.CharField(
        _('name'),
        max_length=150,
        help_text=_('Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.'),
        validators=[UnicodeUsernameValidator()],
    )

    street_name = models.CharField(max_length=150, blank=True)
    street_number = models.CharField(max_length=150, blank=True)
    city = models.CharField(max_length=150, blank=True)
    province = models.CharField(max_length=150, blank=True)
    country = models.CharField(max_length=150, blank=True)
    postal_code = models.CharField(max_length=150, blank=True)

    def __str__(self):
        return self.name

    def __repr__(self):
        return self.name


class Review(BaseModel):
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='reviews')
    rating = models.IntegerField(null=True, validators=[MinValueValidator(1), MaxValueValidator(5)])
    message = models.CharField(max_length=4000)

    class Meta:
        ordering = ['-created_datetime']
