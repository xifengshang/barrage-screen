/*
 * send:function(val,container){  //val弹幕值，container弹幕墙容器
    //暴露给外层调用的方法    
}

add:function(){
        //用于创建弹幕,    设置样式（绝对定位，随机颜色），并添加到容器右侧
}

move:function(){
    //定时改变弹幕的位置（right+1）,到达左侧时清除弹幕，清除定时任务
}

clear:function(){
    //清除弹幕墙上的所有弹幕
}
 * */
(function($){
    $.bulletScreen={
        timers:[],
        add:function(val,container){
            var odiv = $("<div class='bullet'></div>");
            odiv.html(val);
            odiv.css({
                position:'absolute',
                fontSize:'20px',
                display:'block',
                whiteSpace:'nowrap'
            });
            var r = Math.floor(Math.random() * 254);
            var g = Math.floor(Math.random() * 254);
            var b = Math.floor(Math.random() * 254);
            odiv.css({
                color: "rgb(" + r + "," + g + "," + b + ")",
                top: (Math.floor(Math.random() * container.height())-24) + "px",
                width:odiv.width(),
                right: 0
            });
            container.append(odiv);
            this.move(odiv,container);
        },
        
        send:function(val,container){
            this.add(val,container);
        },
        
        move:function(odiv,container){
            var i = 0;
            var timer = setInterval(function() {
                odiv.css({
                    right: (i += 1) + "px"
                });
                if ((odiv.offset().left + odiv.width()) < container.offset().left) {
                    odiv.remove();
                    clearInterval(timer)
                }
            }, 10);
            this.timers.push(timer);
        },
        
        clear:function(container){
            for (var i = 0; i < this.timers.length; i++) {
                clearInterval(this.timers[i])
            }
            container.find('.bullet').remove();
        }
    }
})(jQuery);