// 创建一个函数，用于创建音乐列表
function makeMusicList(models){
	var musicBox = document.querySelector(".mList")
	var listModeP = document.querySelector(".listModeP")

	for (var i = 0; i < models.length; i++) {
		//创建一个音乐节点
		var music = document.createElement("div")
		// music.class = 'music'
		music.setAttribute('class',"music")
		music.id = i
		//"<div class='music' data-index="+i+"></div>" //给元素绑定一个data-xxx属性，可以在该元素的jQuery对象里面通过data('xxx')获取到该属性的值
		// 将models里面的数据取出
		var model = models[i]
		
		// 创建歌曲名和演唱者节点
		var musname = document.createElement("p")
		musname.setAttribute('class','musname')
		musname.innerHTML = model.musicName

		var singername = document.createElement("p")
		singername.setAttribute('class','singername')
		singername.innerHTML = "—"+model.name

		// 将创建好的歌曲名和艺术家名字插入到音乐节点
		music.appendChild(musname)
		music.appendChild(singername)

		// 添加波浪
		var wave = document.createElement("img")
		wave.src = "/static/source/songListWave.gif"
		wave.setAttribute("class","wave")
		music.appendChild(wave)
		// 后面的删除按钮和喜欢按钮
		var delBtn = document.createElement('img')
		delBtn.src = '/static/source/close.png'
		delBtn.setAttribute("class","delBtn")
		music.appendChild(delBtn)

		var loveBtn = document.createElement('img')
		loveBtn.src = '/static/source/statusBarLove.png'
		loveBtn.setAttribute("class","loveBtn")
		music.appendChild(loveBtn)
		// 将创建好的音乐节点插入到音乐列表中
		musicBox.appendChild(music)

		// 设置音乐播放条数
		listModeP.innerHTML = "顺序播放  ("+models.length+"首)"

	}
}