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


class RatingStats(BaseModel):
    
    average_rating = models.FloatField(default=0)
    number_five_star_ratings = models.IntegerField(default=0)
    number_four_star_ratings = models.IntegerField(default=0)
    number_three_star_ratings = models.IntegerField(default=0)
    number_two_star_ratings = models.IntegerField(default=0)
    number_one_star_ratings = models.IntegerField(default=0)


class Company(BaseModel):

    name = models.CharField(
        _('name'),
        max_length=150,
        help_text=_('Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.'),
        validators=[UnicodeUsernameValidator()],
    )

    rating_stats = models.OneToOneField(
        RatingStats,
        on_delete=models.CASCADE
    )

    street_name = models.CharField(max_length=150)
    street_number = models.CharField(max_length=150)
    city = models.CharField(max_length=150)
    province = models.CharField(max_length=150, blank=True)
    country = models.CharField(max_length=150, blank=True)
    postal_code = models.CharField(max_length=150, blank=True)

    is_flagged = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False)

    def __str__(self):
        return self.name

    def __repr__(self):
        return self.name

    def save(self, force_insert=False, force_update=False, using=None,
             update_fields=None):

        self.rating_stats = RatingStats.objects.create()

        return super().save(force_insert=force_insert, force_update=force_update,
                            using=using, update_fields=update_fields)


class Review(BaseModel):
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='reviews')
    rating = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    message = models.CharField(max_length=4000, blank=True)

    is_flagged = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_datetime']
