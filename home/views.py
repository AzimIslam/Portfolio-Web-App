from django.http import JsonResponse
from django.shortcuts import render

from .models import Homepage, Experience, Skill

"""
getHomepageData(request)
    Returns the data for the homepage.
    Request type: GET
"""
def getHomepageData(request):
    if request.method == "GET":
        HomepageData = Homepage.load()

        return JsonResponse(HomepageData.to_dict())
    else:
        return JsonResponse({"error": "Invalid request type. GET request required."}, status=400)
    
"""
getExperienceData(request)
    Returns work experience data to be displayed on the homepage.
    Request type: GET
"""
def getExperienceData(request):
    if request.method == "GET":
        HomepageData = Homepage.load()
        experience = HomepageData.get_experience()

        return JsonResponse({"experience": experience})
    else:
        return JsonResponse({"error": "Invalid request type. GET request required."}, status=400)