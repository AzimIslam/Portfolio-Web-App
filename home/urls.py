from .views import getHomepageData, getExperienceData

from django.urls import path
from django.http import HttpResponse



urlpatterns = [
    path("status/", lambda x: HttpResponse("OK")),
    path("api/get", getHomepageData),
    path("api/getExperience", getExperienceData)
]