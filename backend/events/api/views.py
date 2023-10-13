from rest_framework import viewsets
from ..models import Event, img, Photos
from .serializers import EventModelSerializer, imgModelSerializer, PhotosModelSerializer
# SelectedhabitModelSerializer
from django.http.response import HttpResponse


class EventsViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventModelSerializer


class imgViewSet(viewsets.ModelViewSet):
    queryset = img.objects.all()
    serializer_class = imgModelSerializer


class PhotosViewSet(viewsets.ModelViewSet):
    queryset = Photos.objects.all()
    serializer_class = PhotosModelSerializer
