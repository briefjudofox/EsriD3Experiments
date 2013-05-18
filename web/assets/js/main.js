

var quantize = d3.scale.quantize()
    .domain([0,1])
    .range(d3.range(9).map(function(i) { return "q" + i + "-9"; }));
var jsonStates = null;
var statesSvg = null;

function initMainMap(elementId){
    var width = 900;
    var height = 500;

    var svg = d3.select(elementId).append('svg')
        .attr('width', width)
        .attr('height', height);

    var projection = d3.geo.albersUsa();
    statesSvg = svg.append('g')
        .attr('id', 'states');
    statesSvg.attr('transform', 'scale(.7, .7)');


    statesSvg.selectAll('path')
            .data(jsonStates.features)
            .enter().append('path')
            .attr('d', d3.geo.path().projection(projection));
        onPopFieldChange();
}

function loadJSONData(files,onDataLoad){
    var q = queue(1);
    files.forEach(function(f) { q.defer(d3.json,f); });
    q.await(onDataLoad);
}

 //Init Handlers for Population Fieldset Checkbox Changes
function initPopFieldCbxHandlers(){
        $('#raceFieldSet input').change(onPopFieldChange);
}

function onPopFieldChange(){
    var popFields = [];
    $('#raceFieldSet :checked').each(function() {
        popFields.push($(this).val());
    });
    $('#mapTitle').text('Percentage ' + popFields)
    styleMapForPercentPop(popFields)
}

function styleMapForPercentPop(popFields){
    statesSvg.selectAll('path')
            .attr("class", function(path) {
                var sumPopFields = 0;
                for (var i = 0; i < popFields.length; i++) {
                    sumPopFields += path.properties[popFields[i]];
                }
                return quantize(sumPopFields/path.properties.POP2007); })
}


function log(obj){
    console.log(obj)
}
 /*            $.each($(this), function(key, element) {
                 $.each(element, function(key2, element2) {
                     alert('key: ' + key2 + '\n' + 'value: ' + element2);
                 });
             });*/


