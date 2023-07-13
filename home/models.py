from django.db import models
from personalWebApp.patterns import Singleton

# Create your models here.
class Homepage(Singleton):
    class Meta:
        verbose_name_plural = "Home page"

    name = models.CharField(max_length=100)
    job_title = models.CharField(max_length=100)
    punchline = models.TextField(max_length=255)
    profile_pic = models.ImageField(upload_to="images/")
    about_me = models.TextField()
    linkedin = models.URLField(max_length=200)
    github = models.URLField(max_length=200)
    email = models.EmailField(max_length=200)
    experiences = models.ManyToManyField("Experience", blank=True)
    cv = models.URLField(max_length=200)
    contact_desc = models.TextField(max_length=400, null=True)

    def __str__(self) -> str:
        return "Homepage Data"

    def to_dict(self):
        return {
            "name": self.name,
            "job_title": self.job_title,
            "punchline": self.punchline,
            "profile_pic": self.profile_pic.url,
            "about_me": self.about_me,
            "linkedin": self.linkedin,
            "github": self.github,
            "email": self.email,
            "cv": self.cv,
            "contact_desc": self.contact_desc,
        }
    
    def get_experience(self):
        return [experience.to_dict() for experience in self.experiences.all()]
    
class Experience(models.Model):
    company = models.CharField(max_length=100)
    job_title = models.CharField(max_length=100)
    logo = models.ImageField(upload_to="images/company_logos/")
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)
    company_description = models.TextField()
    experience_description = models.ManyToManyField("Responsibility")
    skills = models.ManyToManyField("Skill")
    present = models.BooleanField(default=True)

    def __str__(self):
        return self.company

    def to_dict(self):
        return {
            "company": self.company,
            "job_title": self.job_title,
            "logo": self.logo.url,
            "start_date": self.start_date,
            "end_date": self.end_date,
            "company_description": self.company_description,
            "experience_description": [str(responsibility) for responsibility in self.experience_description.all()],
            "skills": [skill.to_dict() for skill in self.skills.all()],
            "present": self.present,
        }
    
class Skill(models.Model):
    name = models.CharField(max_length=100)
    logo = models.FileField(upload_to="images/skill_logos/")

    def __str__(self):
        return self.name

    def to_dict(self):
        return {
            "name": self.name,
            "logo": self.logo.url,
        }
    
class Responsibility(models.Model):
    class Meta:
        verbose_name_plural = "Responsibilities"

    description = models.TextField()
    Experience = models.ForeignKey(Experience, on_delete=models.CASCADE)

    def __str__(self):
        return self.description

    def to_dict(self):
        return {
            "description": self.description,
            "company": self.experience.company,
        }