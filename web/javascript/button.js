var timer=null;
var btn_play = document.getElementById("play");
var btn_stop = document.getElementById("stop");
var btn_prev = document.getElementById("prev");
var btn_next = document.getElementById("next");


var touchstartHanderPlay = function(event){
    timer=setTimeout(LongPressPlay,500);
}

var touchstartHanderStop = function(event){
    timer=setTimeout(LongPressStop,500);
}

var touchstartHanderNext = function(event){
    timer=setTimeout(LongPressNext,500);
}

var touchstartHanderPrev = function(event){
    timer=setTimeout(LongPressPrev,500);
}

var touchmoveHander = function(event){
    event.preventDefault();
    clearTimeout(timer);
    timer=null;
}

var touchendHander = function(event){
    event.preventDefault();
    clearTimeout(timer);
    return false;
}

function LongPressPlay(){
    pauseit();
    var input = prompt("请输入每秒运行几步 (1 ~ 30)", 1); 
    if (!input) return;
    input = parseInt(input);
    if (input < 1 || input > 30) {
        window.alert("错误输入！");
        return;
    }
    else {
        interval = parseInt(1000 / input);
        interval_red = parseInt(interval * 0.3);
        
    }
}

function LongPressStop(){
    pauseit();
    msg = "CurrentStep / Total : "
    msg += (curStep - 1).toString();
    msg += " / ";
    msg += data_set.size.toString();
    window.alert(msg);
}

function LongPressNext(){
    pauseit();
    var input = prompt("请输入需要向后移动几步", 1); 
    if (!input) return;
    input = parseInt(input);    
    if (input < 0) {
        window.alert("错误输入！");
        return;
    }
    curStep += input - 1;
    if (curStep < 0) curStep = 0;
    if (curStep > data_set.size) curStep = data_set.size;
    
    get_previous_output(curStep);
    get_data();
    get_output();
    draw_canvas();
    draw_store_with_judgements();
    draw_mill_with_judgements();
    
}

function LongPressPrev(){
    pauseit();
    var input = prompt("请输入需要向前移动几步", 1); 
    if (!input) return;
    input = parseInt(input);    
    if (input < 0) {
        window.alert("错误输入！");
        return;
    }
    curStep -= input + 1;
    if (curStep < 0) curStep = 0;
    if (curStep > data_set.size) curStep = data_set.size;
    
    get_previous_output(curStep);
    get_data();
    get_output();
    draw_canvas();
    draw_store_with_judgements();
    draw_mill_with_judgements();
    
}

// 移动端
btn_play.addEventListener("touchstart", touchstartHanderPlay,false);
btn_play.addEventListener("touchmove", touchmoveHander,false);
btn_play.addEventListener("touchend", touchendHander,false);
btn_stop.addEventListener("touchstart", touchstartHanderStop,false);
btn_stop.addEventListener("touchmove", touchmoveHander,false);
btn_stop.addEventListener("touchend", touchendHander,false);
btn_next.addEventListener("touchstart", touchstartHanderNext,false);
btn_next.addEventListener("touchmove", touchmoveHander,false);
btn_next.addEventListener("touchend", touchendHander,false);
btn_prev.addEventListener("touchstart", touchstartHanderPrev,false);
btn_prev.addEventListener("touchmove", touchmoveHander,false);
btn_prev.addEventListener("touchend", touchendHander,false);

// PC端
btn_play.addEventListener("mousedown", touchstartHanderPlay, false);
//btn_play.addEventListener("mousemove", touchmoveHander, false);
btn_play.addEventListener("mouseup", touchendHander, false);
btn_stop.addEventListener("mousedown", touchstartHanderStop, false);
//btn_stop.addEventListener("mousemove", touchmoveHander, false);
btn_stop.addEventListener("mouseup", touchendHander, false);
btn_next.addEventListener("mousedown", touchstartHanderNext, false);
//btn_next.addEventListener("mousemove", touchmoveHander, false);
btn_next.addEventListener("mouseup", touchendHander, false);
btn_prev.addEventListener("mousedown", touchstartHanderPrev, false);
//btn_prev.addEventListener("mousemove", touchmoveHander, false);
btn_prev.addEventListener("mouseup", touchendHander, false);



function playit() {
    $('#play').attr('onclick', 'pauseit();');
    $('#icon').attr('class', 'glyphicon glyphicon-pause');
    auto = true;
    if (!isExecuting) {
        isExecuting = true;
        excecute(1000);
    }
}

function pauseit() {
    $('#play').attr('onclick', 'playit();');
    $('#icon').attr('class', 'glyphicon glyphicon-play');
    auto = false;
    get_output();
}

function stopit() {
    pauseit();
    if (confirm("确定要回到初始状态吗？")){
        curStep = 0;
        t = document.getElementById("text");
        t.innerHTML = "&nbspOutput:<br>";
        get_data();
        get_output();
        draw_canvas();
        draw_store();
        draw_mill();
    }
}

function nextstep() {
    pauseit();
    if (curStep <= data_set.size){
        get_data();
        get_output();
        draw_canvas();
        draw_store_with_judgements();
        draw_mill_with_judgements();
    }
}

function prevstep() {
    pauseit();
    curStep -= 2;
    if (curStep < 0) curStep = 0;
    if (curStep <= data_set.size){
        get_previous_output(curStep);
        get_data();
        get_output();
        draw_canvas();
        draw_store_with_judgements();
        draw_mill_with_judgements();
    }
}