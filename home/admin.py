from django.contrib import admin
from .models import Homepage, Experience, Skill, Responsibility

# Register your models here.
@admin.register(Homepage)
class HomepageAdmin(admin.ModelAdmin):
    list_display = ["name", "job_title", "punchline", "profile_pic", "about_me", "linkedin", "github", "email"]

@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ["company", "job_title", "logo", "start_date", "end_date", "company_description", "present"]

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ["name", "logo"]

@admin.register(Responsibility)
class ResponsibilityAdmin(admin.ModelAdmin):
    list_display = ["description"]