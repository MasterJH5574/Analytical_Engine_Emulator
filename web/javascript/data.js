//window.buildinfo = document.querySelector("div.container-fluid pre").innerHTML;
window.buildinfo = 
"Step 1\n\
~ 0\n\
1\n\
5 25\n\
-1\n\
Step 2\n\
~ 0\n\
1\n\
6 17\n\
-1\n\
Step 3\n\
+ 0\n\
0\n\
-1\n\
Step 4\n\
+ 0\n\
1\n\
1 25\n\
-1\n\
Step 5\n\
+ 0\n\
1\n\
2 17\n\
-1\n\
Step 5\n\
+ 0\n\
4\n\
3 0\n\
4 42\n\
1 0\n\
2 0\n\
-1\n\
Step 6\n\
+ 0\n\
1\n\
7 42\n\
-1\n\
Step 7\n\
+ 0\n\
0\n\
42"

const store_size = 10;
const digits = 8;

//Initializing data_set
var data = new Object();
var data_set = new Object();
data_set.size = 0;
data_set.content = new Array();
data_set.content[0] = new Object();
data_set.content[0].change = new Object();
data_set.content[0].op = "~";
data_set.content[0].change.op = false;
data_set.content[0].runup = 0;
data_set.content[0].change.runup = false;
data_set.content[0].digits = new Array();
data_set.content[0].change.regs = new Array();
for (var i = 0; i < 5 + store_size; ++i) {
    data_set.content[0].digits[i] = new Array();
    data_set.content[0].change.regs[i] = false;
    for (var j = 0; j < digits; ++j) {
        data_set.content[0].digits[i][j] = 0;
    }
}
data_set.content[0].output = "";


function cal_digit(num) {
    ans = 0;
    while (num) {
        ans++;
        num = parseInt(num / 10);
    }
    return ans;
}

function readin() {
    input_length = buildinfo.length;
    read_length = 0;
    while (read_length < input_length) {
        data_set.size++;

        // Get the substring for information of Step(data_set.size).
        var start = read_length + 10 + cal_digit(data_set.size);
        var sub = buildinfo.slice(start, input_length);
        var end = sub.search("Step");
        var run_time_error = false;
        if (end == -1) {
            end = sub.search("Line");
            if (end == -1) end = input_length;
            else {
                run_time_error = true;
            }
        }
        sub = sub.slice(0, end);
        read_length = start + end;
        
        // Collecting data.
        data_set.content[data_set.size] = new Object();
        var data_cur = data_set.content[data_set.size];
        var data_pre = data_set.content[data_set.size - 1];
        data_cur.change = new Object();

        data_cur.op = buildinfo[start - 4];
        data_cur.change.op = (data_cur.op == data_pre.op) ? false : true;
        data_cur.runup = buildinfo[start - 2];
        data_cur.change.runup = (data_cur.runup == data_pre.runup) ? false : true;
        data_cur.digits = new Array();
        data_cur.change.regs = new Array();

        for (var i = 0; i < 5 + store_size; ++i) {
            data_cur.digits[i] = new Array();
            data_cur.change.regs[i] = false;
            for (var j = 0; j < digits; ++j) {
                data_cur.digits[i][j] = data_pre.digits[i][j];
            }
        }

        var numbers = sub.match(/[+-]?\d+(?:\.\d+)?/g);
        for (var i = 0; i < numbers.length - 1; ++i) numbers[i] = parseInt(numbers[i]);
        for (var i = 0; i < numbers[0]; ++i) {
            data_cur.change.regs[numbers[2 * i + 1]] = true;
            var tmp = numbers[2 * i + 2];
            for (var j = digits - 1; j >= 0; --j) {
                data_cur.digits[numbers[2 * i + 1]][j] = tmp % 10;
                tmp = parseInt(tmp / 10);
            }
        }
        
        data_cur.output = (numbers[numbers.length - 1] == "-1") ? "" : numbers[numbers.length - 1];
    }
}


function get_data(){
    data = data_set.content[curStep];
    output_added += data.output;
    curStep++;
}

var output_added = "";

function get_previous_output(curStep){
    t = document.getElementById("text");
    t.innerHTML = "Output:<br>"
    for (var i = 0; i < curStep; ++i) {
        if (data_set.content[i].output) {
            t.innerHTML += data_set[i].content.output;
            t.innerHTML += "<br>";
        }
        output_added = "";
    }
}


function get_output() {
    t = document.getElementById("text");
    if (output_added) {
        t.innerHTML += output_added;
        t.innerHTML += "<br>";
    }
    output_added = "";
}