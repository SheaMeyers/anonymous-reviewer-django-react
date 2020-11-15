from rest_framework import serializers
from backend.models import Company, Review


class CompanySerializer(serializers.ModelSerializer):
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
