from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Todo(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    title = models.CharField(max_length=100)
    description = models.TextField(max_length=1000)
    date = models.CharField(max_length=30, null=True, blank=True)
    time = models.CharField(max_length=30, null=True, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.IntegerField(default=0)
    updated_at = models.DateTimeField(null=True, blank=True)
    updated_by = models.IntegerField(default=0)
    deleted_at = models.DateTimeField(null=True, blank=True)
    deleted_by = models.IntegerField(default=0)
