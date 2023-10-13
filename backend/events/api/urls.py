from rest_framework import routers
from .views import EventsViewSet, imgViewSet, PhotosViewSet
from django.urls import path, include


router = routers.DefaultRouter()
router.register(r'events', EventsViewSet)
router.register(r'img', imgViewSet)
router.register(r'photos', PhotosViewSet)


urlpatterns = [
    path('', include(router.urls))
]
