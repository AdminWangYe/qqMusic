#coding=utf-8
from django.shortcuts import render
from django.http import HttpResponse
from  music.models import MusicModel
import json

# Create your views here.

def upload(request):

    if request.method =="POST":
        #接受
        title = request.POST["title"]
        style = request.POST["style"]
        singer = request.POST["singer"]
        header = request.FILES["header"]
        music = request.FILES["music"]

        # 存储
        model = MusicModel(title=title,style=style,singer=singer,headerimg=header,music=music)
        model.save()
        return HttpResponse("上传成功")


    return render(request,"upload.html")

def install_index(request):


    return render(request,"index.html")

def get_list(request):
    musics = MusicModel.objects.all()
    # 把music 列表 转化为json 字符串响应给前端
    vlist =[]
    for v in musics:
        vdict = {}
        vdict["id"] = v.id
        vdict["title"] = v.title
        vdict["singer"] = v.singer
        vdict["headr"]=v.headerimg.url
        vdict["music"]=v.music.url
        vlist.append(vdict)

    json_list = json.dumps(vlist)
    return HttpResponse(json_list)
