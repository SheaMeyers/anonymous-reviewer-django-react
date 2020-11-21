from rest_framework import serializers
from backend.models import Company, Review, RatingStats


class RatingStatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = RatingStats
        fields = '__all__'


class CompanySerializer(serializers.ModelSerializer):
    rating_stats = RatingStatsSerializer(read_only=True)

    class Meta:
        model = Company
        fields = '__all__'


class ReviewSerializer(serializers.ModelSerializer):

    class Meta:
        model = Review
        fields = '__all__'

    def to_representation(self, obj):
        data = super().to_representation(obj)
        data['company'] = str(data['company'])
        return data


class CreateReviewSerializers(serializers.Serializer):
    company_id = serializers.CharField(required=False)
    rating = serializers.IntegerField()
    message = serializers.CharField(required=False)


class CreateCompanySerializers(serializers.Serializer):
    name = serializers.CharField()
    street_name = serializers.CharField()
    street_number = serializers.CharField()
    city = serializers.CharField()
    province = serializers.CharField(required=False, allow_blank=True)
    country = serializers.CharField(required=False, allow_blank=True)
    postal_code = serializers.CharField(required=False, allow_blank=True)
