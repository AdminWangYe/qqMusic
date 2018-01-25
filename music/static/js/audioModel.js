/*----------创建一个音乐播放器的原型，将音乐播放器的所有的功能封装起来----------*/ 
function definePlayer(){
	// 获取相关的DOM元素
	var bgImg = document.querySelector("#bgImg")
	var title = document.querySelector("#title")
	var singer = document.querySelector("#singer span")
	var header = document.querySelector("#header img")
	var range = document.querySelector(".range")
	var playBtn = document.querySelector("#play")
	var musicBox = document.querySelector(".mList")


	//构造音乐原型 
	function Player(){

	}
	/*【属性】*/ 
	// 将音乐播放器对象绑定到原型上
	Player.prototype.audio = document.getElementById('musicPlayer')
	// 设置一个属性用于记录当前音乐播放器的状态
	Player.prototype.isPlaying = true;
	// 设置一个属性，用于记录当前播放音乐的下标
	// Player.prototype.playIndex = 0    // 之前的

	// 数据库里的数据id 是从 3开始的
	// 但数组下标是从0开始的
	Player.prototype.playIndex = 0
	// 设置音乐信息列表
	Player.prototype.musicModelList = []
	// 记录当前音乐播放进度
	Player.prototype.cTime = 0
	// 记录当前音乐的播放模式（"C"代表循环，"S"代表单曲，"R"代表随机）
	Player.prototype.playMode = "C"	

	/**【行为】即音乐播放器的功能*/
	/**1、播放**/
	Player.prototype.playMusic = function(){

		// 将音乐播放器当期状态设置为播放
		this.isPlaying = true
		// 当前播放音乐的地址
		// this.audio.src = "musicSource/"+this.musicModelList[this.playIndex].src
		this.audio.src = this.musicModelList[this.playIndex].src
		// 【修复bug1】（暂停后播放从0开始的bug）当前音乐播放的进度为上一次记录的进度

		this.audio.currentTime = this.cTime
		// 将按钮改变成播放按钮
		playBtn.src = "/static/source/pause.png"
		// 如果当前为播放状态，将playstatus类别添加给当前对应的那个music
		selected(this.playIndex)

		// 设置头像与背景
		// 头像与背景的路径
		// bgImg.src = header.src = "musicSource/" + this.musicModelList[this.playIndex].img
		bgImg.src = header.src = this.musicModelList[this.playIndex].img
		// 让头像转动
		header.setAttribute('class',"rot")

		// console.log(header.style.transform)

		// 【修复bug3】（暂停后再开始头像从头开始转动）
		if (header.style.transform) {
			// 如果头像从未转动过（即：刚刷新页面时），transform样式是获取不到的

			// 通过eval将字符串“get”和获取到的transform矩阵构造成一个函数调用（该函数就是下面定义的辅助函数2），返回值就是由该矩阵计算出来的度数
			var cdeg = eval("get"+header.style.transform)
			// 获取样式列表
			var styleSheet = document.styleSheets[0]
			// console.log(document.styleSheets)
			// console.log(t[0].cssRules[9].cssText)
			// t[0].cssRules[9].cssText = "@keyframes rot {0% { transform: rotate(0deg); }100% { transform: rotate(200deg); }}"
			// 将样式表中原来的动画样式删除掉
			styleSheet.deleteRule(9)
			// console.log(t)
			// 根据现在转动的度数重新设置动画并插入到样式列表中的指定位置
			styleSheet.insertRule("@keyframes rot {0% { transform: rotate("+cdeg+"deg); }100% { transform: rotate("+(360+cdeg)+"deg); }}",9)
		}
		
		// 设置歌名与歌手
		title.innerHTML = this.musicModelList[this.playIndex].musicName
		singer.innerHTML = this.musicModelList[this.playIndex].name

		// 让音乐播放器播放
		this.audio.play()
		
		// 开启音乐进度条监听
		this.rangeUpdate()
	}
	// 辅助函数1、音乐被选中
	function selected(index){
		var musics = document.querySelectorAll(".music")
		var waves = document.querySelectorAll(".music .wave")
		for (var i = 0; i < musics.length; i++) {
			
			musics[i].setAttribute("class","music")
			waves[i].style.display = "none"

		}
		musics[index].setAttribute("class","music selected")
		waves[index].style.display = 'block'
		
		// alert(musicBox.offsetHeight)
		// alert(musics[index].offsetTop)
		if (musics[index].offsetTop > musicBox.offsetHeight / 2) {
			// alert("泥煤")
			musicBox.scrollTop = musicBox.offsetHeight / 2 + musics[index].offsetTop
		}
	}
	// 辅助函数2、定义一个函数，返回当前头像旋转的度数
	function getmatrix(a,b,c,d,e,f){ 
		//根据矩阵求出反三角函数值（解出来是弧度制），并且将其转成角度制 
        var aa=Math.round(180*Math.asin(a)/ Math.PI);  
        var bb=Math.round(180*Math.acos(b)/ Math.PI);  
        var cc=Math.round(180*Math.asin(c)/ Math.PI);  
        var dd=Math.round(180*Math.acos(d)/ Math.PI);  
         //return (aa+','+bb+','+cc+','+dd); 

        //选择合适的值以返回
        var deg=0; 
        if(aa==bb||-aa==bb){  
            deg=dd;  
        }else if(-aa+bb==180){  
            deg=180+cc;  
        }else if(aa+bb==180){  
            deg=360-cc||360-dd;  
        }  
        return deg>=360?0:deg;   
    } 
	/****2、暂停****/
	Player.prototype.pauseMusic = function(){
		// 将音乐播放器当期状态设置为暂停
		this.isPlaying = false
		// this.audio.src= "musicSource/"+this.musicModelList[this.playIndex].src
		// 将按钮改变成暂停按钮
		playBtn.src = "/static/source/play.png"
		// 将头像设置为不转
		// 【修复bug2】当暂停时头像回到原点
		header.style.transform = document.defaultView.getComputedStyle(header).transform
		header.setAttribute('class',"")
	
		// 【修复bug1】（暂停时时间回到原点）
		this.cTime = this.audio.currentTime
		// 让音乐播放器播放
		this.audio.pause()


	}

	/*** 3、更新进度条***/
	Player.prototype.rangeUpdate = function(){

		// 用变量p来记录当前player对象，以供后面不时之需
		var p = this

		// 监听audio元素的播放时间变化，一旦有时间变化的时候就调用相关的函数
		this.audio.ontimeupdate = function(){
			// 实时监听当前音乐，也就是说该函数时时刻刻在备调用
			// 设置进度条的最大值，即音乐的总时长
			range.max = this.duration
			// 设置音乐的总时间
			document.querySelector(".totalTime").innerHTML = (this.duration / 60).toFixed(2)
			// 根据音乐播放的当前时长，去设置进度条的值（即进度条上滑块的位置）
			range.value = this.currentTime
			document.querySelector(".currentTime").innerHTML = (this.currentTime / 60).toFixed(2)

			// 当进度条达到最右边时，切换下一曲
			if (this.currentTime == this.duration) {
				// 切换下一曲
				if (this.playMode == "S") {
					p.playMusic() //【注意】这里的this指的就是audio对象并不是Player对象，所以要提前在外面记录好Player对象
				}else{
					p.nextMusic()
				}
				

			}

		}

	}
	/**** 4、上一曲****/
	Player.prototype.preMusic = function(){
		// 根据当前的播放模式设置播放索引
		if (this.playMode=='R') {
			// 随机播放
			this.playIndex = Math.round(Math.random()*100000%this.musicModelList.length)
			// console.log(this.playIndex)

		}else {
			// 循环模式
			this.playIndex--
			// 循环播放
			if (this.playIndex < 0) {
				this.playIndex = this.musicModelList.length - 1
			}
		}

		// 将新的音乐的播放进度设置为0
		this.cTime = 0

		this.playMusic()

	}
	/*** 5、下一曲 ***/
	Player.prototype.nextMusic = function(){

		// this.playIndex++
		// 根据播放模式设置当前播放音乐的索引
		if (this.playMode=='R') {
			// 随机播放
			this.playIndex = Math.round(Math.random()*100000%this.musicModelList.length)
			// console.log(this.playIndex)

		}else {
			// 循环模式
			this.playIndex++
			if (this.playIndex >= this.musicModelList.length) {
				this.playIndex = 0
			}

		}

		// 将新的音乐的播放进度设置为0
		this.cTime = 0
		// this.isPlaying = true
		this.playMusic()
	}

	/*** 6、控制音乐的播放状态 **/
	Player.prototype.playStatus = function(){
		// 当前音乐是否处于播放状态
		if (this.isPlaying) {
			// 当前是播放状态需要暂停
			this.pauseMusic()

		} else{
			// 当前是暂停状态需要播放
			this.playMusic()
		}
	}

	/***7、单击某条音乐播放***/ 
	Player.prototype.listSelect = function(){
		// 选中所有的音乐DOM对象，存入数组musics中
		var musics = document.querySelectorAll(".music")
		// 用变量p记录当前Player对象，以备不时之需
		var p = this

		// 通过for循环遍历所有的音乐对象，并且给其绑定单击事件
		for (var i = musics.length - 1; i >= 0; i--) {
			musics[i].onclick = function(){
				// alert(this.id)
				// 根据当前的音乐的id值设置播放器的当前索引
				p.playIndex = this.id
				// 将音乐播放进度设置为0
				p.cTime = 0
				p.playMusic()
			}
		}
	}

	// 创建一个Player对象返回出去
	return new Player()

}
