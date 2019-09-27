//菜单初始化或展示菜单
function createOrShowMenu(video,x,y){
    if(!video.hasMenuFlag){
        video.hasMenuFlag = 1;

        //菜单
        video.controlMenu = document.createElement("div");
        video.controlMenu.id='controlMenu';

        //播放按钮
        video.playButton = document.createElement("button");
        if(video._video.paused || video._video.ended){
            video.playButton.innerHTML ="播放";
        }
        else{
            video.playButton.innerHTML ="暂停";
        }
        video.playButton.onclick = playOrPauseVideo.bind(this,video);

        //静音按钮
        video.voiceButton = document.createElement("button");
        if(video._video.muted){
            video.voiceButton.innerHTML = "取消静音";
        }
        else{
            video.voiceButton.innerHTML = "静音";
        }
        video.voiceButton.onclick = setVoiceStatus.bind(this,video);

        //标记按钮,测试传入为视频的20%-50%部分
        video.labelButton = document.createElement("button");
        if(video.labelFlag){
            video.labelButton.innerHTML ="取消标注";
        }
        else{
            video.labelButton.innerHTML ="标注";
        }
        video.labelButton.onclick = labelMyVideo.bind(this,video,0.2,0.5);
        if(!video.labelFlag){
            video.labelTime.beginTime = 0;
            video.labelTime.endTime = video._video.duration;
        }

        video.progressWrap = document.createElement("div");
        video.progressWrap.id='progressWrap';
        bindEvent(video.progressWrap,'mousedown',videoSeek.bind(this,video))

        video.playProgress = document.createElement("div");
        video.playProgress.id='playProgress';

        video.showtime = document.createElement("div");
        video.showtime.innerHTML = formatTime(video._video.currentTime - video.labelTime.beginTime) + '/' + formatTime(video.labelTime.endTime-video.labelTime.beginTime);

        video.controlMenu.appendChild(video.playButton);
        video.controlMenu.appendChild(video.voiceButton);
        video.controlMenu.appendChild(video.labelButton);
        video.controlMenu.appendChild(video.progressWrap);
        video.controlMenu.appendChild(video.showtime);
        video.progressWrap.appendChild(video.playProgress);
        document.body.appendChild(video.controlMenu);
        video.controlMenu.style.position = "absolute";
        video.controlMenu.style.top = (x+video.showStyle.y+video.showStyle.height-80)+'px';
        video.controlMenu.style.left = (y+video.showStyle.x+video.showStyle.width/2-120)+'px';
        video.controlMenu.style.zIndex = '1';
        bindEvent(video.controlMenu,'mouseover',createOrShowMenu.bind(this,video))
    }
    else{
        video.controlMenu.style.display = 'block';
    }
}

//控制进度条
function beginChangeMenu(video){
    video.menuFlag = setInterval(changeMenuIndex.bind(this,video), 0);
}
function changeMenuIndex(video,x,y){
    video.controlMenu.style.top = (x+video.showStyle.y+video.showStyle.height-80)+'px';
    video.controlMenu.style.left = (y+video.showStyle.x+video.showStyle.width/2-120)+'px';
}
function endChangeMenu(video,x,y){
    video.controlMenu.style.top = (x+video.showStyle.y+video.showStyle.height-80)+'px';
    video.controlMenu.style.left = (y+video.showStyle.x+video.showStyle.width/2-120)+'px';
    clearInterval(video.menuFlag);
}

//改变播放
function playOrPauseVideo(video){
    if(video._video.paused || video._video.ended){
        video._video.play();
        video.playButton.innerHTML = "暂停";
        video.progressFlag = setInterval(getProgress.bind(this,video), 60);
    }
    else{
        video._video.pause();
        video.playButton.innerHTML = "播放";
    }
}

//改变声音
function setVoiceStatus(video){
    if(video._video.muted){
        video._video.muted = false;
        video.voiceButton.innerHTML = "静音";
    }
    else{
        video._video.muted = true;
        video.voiceButton.innerHTML = "取消静音";
    }
}

//标注视频
function labelMyVideo(video,begin,end){
    if(video.labelFlag){
        video._video.currentTime=0;
        video.labelFlag = 0;
        video.labelTime.beginTime = 0;
        video.labelTime.endTime = video._video.duration;
        video.menuFlag = 0;
        createOrShowMenu(video);
        video.labelButton.innerHTML = '标注';
    }
    else{
        video.labelFlag = 1;
        video.labelTime.beginTime = begin*video._video.duration;
        video._video.currentTime = video.labelTime.beginTime;
        video.labelTime.endTime = end*video._video.duration;
        video.menuFlag = 0;
        createOrShowMenu(video);
        video.labelButton.innerHTML = '取消标注';
    }
}

//隐藏菜单
function hiddenMenu(video){
    video.controlMenu.style.display = 'none';
}

// 原生的JavaScript事件绑定函数
function bindEvent(ele, eventName, func){
    if(window.addEventListener){
        ele.addEventListener(eventName, func);
    }
    else{
        ele.attachEvent('on' + eventName, func);
    }
}

// 鼠标在播放条上点击时进行捕获并进行处理
function videoSeek(video,e){
    if(video._video.paused || video._video.ended){
        video._video.play();
        video.playButton.innerHTML = "暂停";
        enhanceVideoSeek(video,e);
    }
    else{
        enhanceVideoSeek(video,e);
    }
}

// video的播放条
function getProgress(video){
    var duration = video.labelTime.endTime - video.labelTime.beginTime;
    var currentTime = video._video.currentTime - video.labelTime.beginTime;
    let percent = currentTime / duration;
    if(percent>=1){
        video._video.pause();
    }
    video.playProgress.style.width = percent * (video.progressWrap.offsetWidth) + "px";
    video.showtime.innerHTML = formatTime(currentTime)+'/'+formatTime(duration);
    if(video._video.ended || video._video.paused){
        video.playButton.innerHTML = "播放";
    }
}

//改变视频进度
function enhanceVideoSeek(video,e){
    let length = e.pageX - video.controlMenu.offsetLeft- video.progressWrap.offsetLeft;
    let percent = length / video.progressWrap.offsetWidth;
    video.playProgress.style.width = percent * (video.progressWrap.offsetWidth) + "px";
    video._video.currentTime = percent * (video.labelTime.endTime - video.labelTime.beginTime);
    video.progressFlag = setInterval(getProgress.bind(this,video), 60);
}

// 格式化时间函数
function formatTime(s) {
    s = Math.ceil(s);
    var t;
    if(s > -1) {
        var hour = Math.floor(s / 3600);
        var min = Math.floor(s / 60) % 60;
        var sec = s % 60;
        if(hour < 0 || hour == 0) {
            t = '';
        }else if(0 < hour < 10) {
            t = '0' + hour + ":";
        }else {
            t = hour + ":";
        }

        if(min < 10) {
            t += "0";
        }
        t += min + ":";
        if(sec < 10) {
            t += "0";
        }
        t += sec;
    }
    return t;
}

export {playOrPauseVideo,beginChangeMenu,endChangeMenu,createOrShowMenu,hiddenMenu}