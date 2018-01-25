#coding = utf-8
from __future__ import unicode_literals
from django.db import models


# Create your models here.
class MusicModel(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=20)
    style = models.CharField(max_length=10)
    singer = models.CharField(max_length=20)
    headerimg = models.FileField(upload_to="headerimg")
    music = models.FileField(upload_to="music")
    class Meta:
        db_table="musictable"



