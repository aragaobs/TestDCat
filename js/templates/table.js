var tableTemplate  = '<div class="table-responsive"><table class="table table-hover">';
    tableTemplate += '<thead><tr class="d-flex"><th scope="col">#</th><th scope="col" class="col-2">What?</th><th scope="col" class="col-2">Why?</th><th scope="col" class="col-1">Where?</th>';
    tableTemplate += '<th scope="col" class="col-3">How?</th><th scope="col" class="col-1">Who?</th><th scope="col" class="col-2">When?</th><th scope="col" class="text-center"><img src="img/external-link.png" alt="Export"></th></tr></thead>';
    tableTemplate += '<tbody>{{=it.rows}}</tbody></table></div>';

var rowTemplate  = '<tr class="d-flex"><th scope="row">{{=it.index}}</th>';
    rowTemplate += '<td class="col-2">{{=it.what}}</td>';
    rowTemplate += '<td class="col-2">{{=it.why}}</td>';
    rowTemplate += '<td class="col-1">{{=it.where}}</td>';
    rowTemplate += '<td class="col-3">{{=it.how}}</td>';
    rowTemplate += '<td class="col-1">{{=it.who}}</td>';
    rowTemplate += '<td class="col-2">{{=it.when}}</td>';
    rowTemplate += '<td class="text-center"><input class="" type="checkbox" value="" id="{{=it.actionID}}"></td></tr>';

function createTable(actions){
    var rows = '';
    for(var index = 0; index < actions.length; index++){
        var rowTmp = doT.template(rowTemplate);
        var result = rowTmp({
            index: index + 1,
            what: actions[index][1],
            why: actions[index][2],
            where: actions[index][3],
            how: actions[index][4],
            who: actions[index][5],
            when: actions[index][6],
            actionID: actions[index][7],
        });
        rows += result;
    }
    var tableTmp = doT.template(tableTemplate);
    var tResult = tableTmp({
        rows: rows
    });
    return tResult;
}