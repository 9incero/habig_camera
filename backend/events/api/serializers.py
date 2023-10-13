from rest_framework import serializers
from ..models import Event, img, Photos
from drf_extra_fields.fields import Base64ImageField

# , Selectedhabit


class EventModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ('id', 'name', 'description', 'qr_code', 'date')


# class SelectedhabitModelSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Selectedhabit
#         fields = ('user', 'selecthabit')
#     user = serializers.IntegerField()
#     selecthabit = serializers.CharField(max_length=1000),


class imgModelSerializer(serializers.ModelSerializer):
    imge = serializers.CharField(max_length=1000)
    imgname = serializers.CharField(max_length=1000)

    class Meta:
        model = img
        fields = ('imgname', 'imge')

    # def create(self, validated_data):
    #     return img.objects.create(**validated_data)


class PhotosModelSerializer(serializers.ModelSerializer):
    photo = Base64ImageField(required=False)

    class Meta:
        model = Photos
        fields = ('photo',)
