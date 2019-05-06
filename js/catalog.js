var spData = null;
function doData(json) {
    spData = json.feed.entry;
}

function getValue(data, index){
    return {row: data[index]["gs$cell"]["row"], col: data[index]["gs$cell"]["col"], value: data[index]["gs$cell"]["$t"]};
}

function getCatalogID(element){
    var ids = {
        'Identificação de DTs': 'mtd01',
        'Baixa Cobertura de Código': 'std01',
        'Adiamento de testes': 'std02'
    };
    return ids[element];
}

function getCatalogObj(){
    return {
        'Identificação de DTs':{
            'Baixa Cobertura de Código': {actions: []},    
            'Adiamento de testes': {actions: []},
        }
    };
}

$(document).ready(function(){
    var data = spData;
    var catalogTable = getCatalogObj();
    var table = [], lines = getValue(data, data.length - 1).row - 1, columns = getValue(data, data.length - 1).col;

    for(l = 0; l < lines; l++)
        for(c = 0; c < columns; c++)
            table[l] = [];

    for(var index = 0; index < data.length; index++){
        var sData = getValue(data, index);
        if(sData.row == 1) continue;
        table[sData.row - 2][sData.col - 1] = sData.value;
    }

    for(l = 0; l < lines; l++){
        var action = [];
        for(c = 2; c < columns; c++){
            action.push(table[l][c])
        }
        catalogTable[table[l][0]][table[l][1]].actions.push(action); 
    }

    //console.log(catalogTable);

    for(var mtd in catalogTable){
        for(var std in catalogTable[mtd]){
            var table = createTable(catalogTable[mtd][std].actions);
            var card = createCard(getCatalogID(std).trim(), std.trim(), table);
            $('#accordionCatalog_' + getCatalogID(mtd).trim()).append($(card));
        }
    }
});