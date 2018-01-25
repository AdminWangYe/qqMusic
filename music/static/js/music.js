window.onload = function(){
	//切换音乐列表的显示模式
	var musicList = document.querySelector(".musicList")
	document.querySelector("#playList").onclick = function(e){
		musicList.style.top = "0px";
	}
	document.querySelector(".listDis").onclick = function(){
		musicList.style.top = "100%"
	}
	document.querySelector(".closeList").onclick = function(){
		musicList.style.top = "100%"
	}


	// 页面上的对象
	var range = document.querySelector(".range")
	var preBtn = document.querySelector("#playPre")
	var playBtn = document.querySelector("#play")
	var nextBtn = document.querySelector("#playNext")
	var playModeBtn = document.querySelector("#playMode")
	var listMode = document.querySelector(".listMode")
	var listModeP = document.querySelector(".listModeP")
	// var musicPlayer = document.querySelector("#musicPlayer") 

	// 首先创建一个音乐播放器对象
	var player = definePlayer()


/****【建模】根据歌曲的json进行建模****/
	function Music(){

	} 

	Music.prototype.img = ''
	Music.prototype.musicName = ''
	Music.prototype.name = ''
	Music.prototype.num = ''
	Music.prototype.src = ''
	var musicModels = []
	/****【数据处理】**/ 
	// 定义一个数组，用于存存所有的model
	ajaxRequest("getlist","get",function(data){

		var mArr = JSON.parse(data)
		for (var i = 0; i < mArr.length; i++) {
			var model = new Music()
			model.img = mArr[i]['headr']
			model.musicName = mArr[i]['title']
			model.name = mArr[i]['singer']
			// model.num = mArr[i]['num']
			model.src = mArr[i]['music']
			// alert(model.name)
			// 每遍历一条歌曲的信息就将对应的模型添加到数组中
			musicModels.push(model)



		}

		// console.log(musicModels)
		// 【注意】对于Ajax异步请求的代码，属于一个耗时操作，执行速度要远远小于其他代码，所以，对于一些需要在远程数据到达以后才能进行的操作，要放在Ajax完事以后的回调方法中处理
		makeMusicList(musicModels)

		// 音乐起始是处于播放状态
		player.musicModelList = musicModels
		player.playMusic()

		// 功能3、单击某条音乐播放
		player.listSelect()
	
	})

	/*****3、【音乐播放器功能的调用】******/ 
	// 功能1、点击播放或暂停按钮
	playBtn.onclick=function(e){
		// 切换音乐的播放状态
		player.playStatus()

	}

	// 功能2、播放上一曲与下一曲
	preBtn.onclick = function(e){
		player.preMusic()
	}
	nextBtn.onclick=function(e){
		player.nextMusic()
	}
	
	// 功能4、拖动进度条上的滑块控制音乐的播放进度
	range.onchange=function(e){

		// 拖动滑块的实质就是改变了滑块的值
		// 让播放进度设置为当前滑块的值
		player.audio.currentTime = this.value

	}


	// 功能5、切换播放模式
	playModeBtn.onclick = function(e){
		// 1）切换按钮图片 2）切换player的播放模式 3）切换音乐列表中的相关内容和图标
		if (player.playMode == "C") {
			// 当前如果是循环，则切换为随机
			this.src = "/static/source/playModeRandom.png"
			player.playMode = "R"
			listMode.src = "/static/source/playModeRandom.png"
			listModeP.innerHTML = "随机播放 ("+player.musicModelList.length+"首)"
		} else if (player.playMode == "R") {
			// 如果当前是随机，则切换为单曲
			this.src = "/static/source/playModeSingleLoop.png"
			player.playMode = "S"
			listMode.src = "/static/source/playModeSingleLoop.png"
			listModeP.innerHTML = "单曲播放(1首)"
		} else {
			// 如果当前是单曲，则切换为循环
			this.src = "/static/source/playModeLoop.png"
			player.playMode = "C"
			listMode.src = "/static/source/playModeLoop.png"
			listModeP.innerHTML = "循环播放 ("+player.musicModelList.length+"首)"
		}

	}

}