var isExecuting = false;
var auto = false;
var curStep = 0;

function excecute(i) {
    if (!auto) {
        isExecuting = false;
        return;
    }
    if (curStep <= data_set.size) {
        get_data();
        get_output();
        draw_canvas();
        draw_store_with_judgements();
        draw_mill_with_judgements();
        setTimeout(function(a){ excecute(a); }, 1200, i - 1);
    }
    else {
        isExecuting = false;
        pauseit();
    }
}

readin();
get_data();
draw_canvas();
draw_store();
draw_mill();