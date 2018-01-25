from django.conf.urls import url
from . import views
urlpatterns=[
    url(r"upload",views.upload),
    url(r"index",views.install_index),
    url(r"getlist",views.get_list)
]