function draw_rect(x1, y1, x2, y2) {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.rect(x1, y1, x2 - x1, y2 - y1);
    ctx.stroke();
}
  
function draw_filled_rect(x1, y1, x2, y2, color){
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fillRect(x1, y1, x2 - x1, y2 - y1);
}
  
function draw_line(x1, y1, x2, y2, color) {
    var c=document.getElementById("myCanvas");
    var ctx=c.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}
  
function draw_text(x, y, text="To be added..", font="25px Consolas", color="#000000") {    
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.fillStyle = color;
    ctx.font = font;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, x, y);
}
 

const margin_rate_reg = 0.17;
function draw_reg(x1, y1, x2, y2) {
    var wi = x2 - x1;
    var hi = y2 - y1;
    var mar_w = wi * margin_rate_reg;
    var blk_h = hi / (digits);
    draw_filled_rect(x1, y1, x2, y2, "#ffffff");
    draw_filled_rect(x1, y1, x1 + mar_w, y2, "#994c00");
    draw_filled_rect(x2 - mar_w, y1, x2, y2, "#994c00");
    draw_rect(x1, y1, x2, y2);
    for (var i = 1; i <= digits; ++i) {
        var y = y1 + i * blk_h;
        draw_line(x1, y, x2, y);
    }
}
  
  
var cv = document.getElementById("myCanvas");
const width = cv.width;
const height = cv.height;
const left_space = 0.5;
const middle_space = 0.8;
const num_w = store_size + 5 + 2 + middle_space + left_space * 2;
const per_pixw = width / num_w;
const blank_rate_reg = 0.075;
const umargin_rate = 0.13;
const dmargin_rate = 0.06;
  
  
function draw_canvas() {
    draw_filled_rect(0, 0, width, height, "#e5f9ff");
}
  
  
const umargin_rate_store = 0.15;
const dmargin_rate_store = 0.04;
function draw_store(words = true) {

    var l_start = (5 + 2 + middle_space + left_space) * per_pixw;
    var l_end = l_start + store_size * per_pixw;

    var hi = height * (1 - umargin_rate - dmargin_rate);
    var wi = l_end - l_start;

    if (words) draw_text((l_start + l_end) / 2, umargin_rate * height * 0.8, "store", font="28px Consolas");
    draw_filled_rect(l_start - per_pixw * blank_rate_reg * 2, umargin_rate * height, l_end + blank_rate_reg * per_pixw * 2, (1 - dmargin_rate) * height, "#e6e6e6");
    draw_rect(l_start - per_pixw * blank_rate_reg * 2, height * umargin_rate, l_end + blank_rate_reg * per_pixw * 2, height * (1 - dmargin_rate));

    var y1_reg = hi * umargin_rate_store + height * umargin_rate;
    var y2_reg = height - hi * dmargin_rate_store - height * dmargin_rate;

    var blk_h = (y2_reg - y1_reg) / digits;

    for (var i = 0; i < store_size; ++i) {
        draw_text(l_start + (i + 0.5) * per_pixw, (umargin_rate * height + y1_reg * 3) / 4, "v" + i, "18px Consolas");
        draw_reg(l_start + (i + blank_rate_reg) * per_pixw, y1_reg, l_start + (i + 1 - blank_rate_reg) * per_pixw, y2_reg);
        for (var j = 0; j < digits; ++j) {
            draw_text(l_start + (i + 0.5) * per_pixw, y1_reg + (j + 0.5) * blk_h, data.digits[i + 5][j]);
        }
    }
}

function draw_store_with_judgements() {

    var l_start = (5 + 2 + middle_space + left_space) * per_pixw;
    var l_end = l_start + store_size * per_pixw;

    var hi = height * (1 - umargin_rate - dmargin_rate);
    var wi = l_end - l_start;

    draw_text((l_start + l_end) / 2, umargin_rate * height * 0.8, "store", font="28px Consolas");
    draw_filled_rect(l_start - per_pixw * blank_rate_reg * 2, umargin_rate * height, l_end + blank_rate_reg * per_pixw * 2, (1 - dmargin_rate) * height, "#e6e6e6");
    draw_rect(l_start - per_pixw * blank_rate_reg * 2, height * umargin_rate, l_end + blank_rate_reg * per_pixw * 2, height * (1 - dmargin_rate));

    var y1_reg = hi * umargin_rate_store + height * umargin_rate;
    var y2_reg = height - hi * dmargin_rate_store - height * dmargin_rate;

    var blk_h = (y2_reg - y1_reg) / digits;

    for (var i = 0; i < store_size; ++i) {
        draw_text(l_start + (i + 0.5) * per_pixw, (umargin_rate * height + y1_reg * 3) / 4, "v" + i, "18px Consolas");
        draw_reg(l_start + (i + blank_rate_reg) * per_pixw, y1_reg, l_start + (i + 1 - blank_rate_reg) * per_pixw, y2_reg);
        for (var j = 0; j < digits; ++j) {
            draw_text(l_start + (i + 0.5) * per_pixw, y1_reg + (j + 0.5) * blk_h, data.digits[i + 5][j], "25px Consolas", 
            data.change.regs[i + 5] ? "#FF0000" : "#000000");
        }
    }
    setTimeout(function(){ draw_store(false); }, 350);
}

function draw_mill(words = true) {

    var l_start = (left_space) * per_pixw;
    var l_end = l_start + 7 * per_pixw;

    var hi = height * (1 - umargin_rate - dmargin_rate);
    var wi = l_end - l_start;

    if (words) draw_text((l_start + l_end) / 2, umargin_rate * height * 0.8, "mill", font="28px Consolas");
    draw_filled_rect(l_start - per_pixw * blank_rate_reg * 2, umargin_rate * height, l_end + blank_rate_reg * per_pixw * 2, (1 - dmargin_rate) * height, "#e6e6e6");
    draw_rect(l_start - per_pixw * blank_rate_reg * 2, height * umargin_rate, l_end + blank_rate_reg * per_pixw * 2, height * (1 - dmargin_rate));

    var y1_reg = hi * umargin_rate_store + height * umargin_rate;
    var y2_reg = height - hi * dmargin_rate_store - height * dmargin_rate;

    var txt = new Array("I1'", "I1", "I2", "E'", "E");
    var blk_h = (y2_reg - y1_reg) / digits;

    for (var i = 0; i < 5; ++i) {
        draw_text(l_start + (i + 2.5) * per_pixw, (umargin_rate * height + y1_reg * 3) / 4, txt[i], "18px Consolas");
        draw_reg(l_start + (i + 2 + blank_rate_reg) * per_pixw, y1_reg, l_start + (i + 3 - blank_rate_reg) * per_pixw, y2_reg);
        
        for (var j = 0; j < digits; ++j) {
            draw_text(l_start + (i + 2.5) * per_pixw, y1_reg + (j + 0.5) * blk_h, data.digits[i][j]);
        }
    }

    draw_text((l_start + blank_rate_reg * 5 * per_pixw + l_start + 1.55 * per_pixw) / 2, (umargin_rate * height + y1_reg * 3) / 4, "op", "18px Consolas");
    draw_filled_rect(l_start + blank_rate_reg * 5 * per_pixw, y1_reg, l_start + 1.55 * per_pixw, 0.85 * y1_reg + 0.15 * y2_reg, "#ffffff");
    draw_rect(l_start + blank_rate_reg * 5 * per_pixw, y1_reg, l_start + 1.55 * per_pixw, 0.85 * y1_reg + 0.15 * y2_reg);
    draw_text((l_start + blank_rate_reg * 5 * per_pixw + l_start + 1.55 * per_pixw) / 2, y1_reg * 0.925 + y2_reg * 0.075, data.op, "30px Consolas");

    draw_text((l_start + blank_rate_reg * 5 * per_pixw + l_start + 1.55 * per_pixw) / 2, 0.75 * y1_reg + 0.25 * y2_reg, "runup", "18px Consolas");
    draw_filled_rect(l_start + blank_rate_reg * 5 * per_pixw, 0.7 * y1_reg + 0.3 * y2_reg, l_start + 1.55 * per_pixw, 0.55 * y1_reg + 0.45 * y2_reg, "#ffffff");
    draw_rect(l_start + blank_rate_reg * 5 * per_pixw, 0.7 * y1_reg + 0.3 * y2_reg, l_start + 1.55 * per_pixw, 0.55 * y1_reg + 0.45 * y2_reg);
    draw_text((l_start + blank_rate_reg * 5 * per_pixw + l_start + 1.55 * per_pixw) / 2, y1_reg * 0.625 + y2_reg * 0.375, data.runup, "30px Consolas");

}

function draw_mill_with_judgements() {

    var l_start = (left_space) * per_pixw;
    var l_end = l_start + 7 * per_pixw;

    var hi = height * (1 - umargin_rate - dmargin_rate);
    var wi = l_end - l_start;

    draw_text((l_start + l_end) / 2, umargin_rate * height * 0.8, "mill", font="28px Consolas");
    draw_filled_rect(l_start - per_pixw * blank_rate_reg * 2, umargin_rate * height, l_end + blank_rate_reg * per_pixw * 2, (1 - dmargin_rate) * height, "#e6e6e6");
    draw_rect(l_start - per_pixw * blank_rate_reg * 2, height * umargin_rate, l_end + blank_rate_reg * per_pixw * 2, height * (1 - dmargin_rate));

    var y1_reg = hi * umargin_rate_store + height * umargin_rate;
    var y2_reg = height - hi * dmargin_rate_store - height * dmargin_rate;

    var txt = new Array("I1'", "I1", "I2", "E'", "E");
    var blk_h = (y2_reg - y1_reg) / digits;

    for (var i = 0; i < 5; ++i) {
        draw_text(l_start + (i + 2.5) * per_pixw, (umargin_rate * height + y1_reg * 3) / 4, txt[i], "18px Consolas");
        draw_reg(l_start + (i + 2 + blank_rate_reg) * per_pixw, y1_reg, l_start + (i + 3 - blank_rate_reg) * per_pixw, y2_reg);
        
        for (var j = 0; j < digits; ++j) {
            draw_text(l_start + (i + 2.5) * per_pixw, y1_reg + (j + 0.5) * blk_h, data.digits[i][j], "25px Consolas", 
            data.change.regs[i] ? "#FF0000" : "#000000");
        }
    }

    draw_text((l_start + blank_rate_reg * 5 * per_pixw + l_start + 1.55 * per_pixw) / 2, (umargin_rate * height + y1_reg * 3) / 4, "op", "18px Consolas");
    draw_filled_rect(l_start + blank_rate_reg * 5 * per_pixw, y1_reg, l_start + 1.55 * per_pixw, 0.85 * y1_reg + 0.15 * y2_reg, "#ffffff");
    draw_rect(l_start + blank_rate_reg * 5 * per_pixw, y1_reg, l_start + 1.55 * per_pixw, 0.85 * y1_reg + 0.15 * y2_reg);
    draw_text((l_start + blank_rate_reg * 5 * per_pixw + l_start + 1.55 * per_pixw) / 2, y1_reg * 0.925 + y2_reg * 0.075, data.op, "30px Consolas", 
    data.change.op ? "#FF0000" : "#000000");

    draw_text((l_start + blank_rate_reg * 5 * per_pixw + l_start + 1.55 * per_pixw) / 2, 0.75 * y1_reg + 0.25 * y2_reg, "runup", "18px Consolas");
    draw_filled_rect(l_start + blank_rate_reg * 5 * per_pixw, 0.7 * y1_reg + 0.3 * y2_reg, l_start + 1.55 * per_pixw, 0.55 * y1_reg + 0.45 * y2_reg, "#ffffff");
    draw_rect(l_start + blank_rate_reg * 5 * per_pixw, 0.7 * y1_reg + 0.3 * y2_reg, l_start + 1.55 * per_pixw, 0.55 * y1_reg + 0.45 * y2_reg);
    draw_text((l_start + blank_rate_reg * 5 * per_pixw + l_start + 1.55 * per_pixw) / 2, y1_reg * 0.625 + y2_reg * 0.375, data.runup, "30px Consolas", 
    data.change.runup ? "#FF0000" : "#000000");

    setTimeout(function(){ draw_mill(false); }, 350);

}