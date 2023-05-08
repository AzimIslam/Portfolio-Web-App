from django.db import models

# Singleton pattern: Only one model instance can be created
class Singleton(models.Model):
    class Meta:
        abstract = True
    
    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)

    @classmethod
    def load(cls):
        obj, created = cls.objects.get_or_create(pk=1)
        return obj