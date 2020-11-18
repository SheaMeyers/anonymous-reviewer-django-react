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
        exclude = ('id',)

    def to_representation(self, obj):
        data = super().to_representation(obj)
        data['company'] = str(data['company'])
        return data


class CreateReviewSerializers(serializers.Serializer):
    company_id = serializers.CharField()
    rating = serializers.IntegerField(required=False)
    message = serializers.CharField(required=False)
