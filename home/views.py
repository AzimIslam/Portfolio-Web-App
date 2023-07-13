from django.http import JsonResponse
from .models import Homepage
from django.core.mail import send_mail

import os
import json

from dotenv import load_dotenv

load_dotenv()  # Load the .env file

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
    
"""
addMessage(request)
    Adds a message to the database.
    Request type: POST
"""
def addMessage(request):
    if request.method == "POST":
        data = json.loads(request.body.decode("utf-8"))
        name = data.get("name")
        email = data.get("email")
        message = data.get("message")

        if not name or not email or not message:
            return JsonResponse({"error": "Missing required fields."}, status=400)

        send_mail(subject="[Personal Website] Message from " + name, 
                  message=message, 
                  from_email=email,
                  recipient_list=[os.environ.get("EMAIL_HOST_USER")],
                  fail_silently=False)
        
        return JsonResponse({"success": "Message successfully added."})
    else:
        return JsonResponse({"error": "Invalid request type. POST request required."}, status=400)