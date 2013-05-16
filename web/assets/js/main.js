

var quantize = d3.scale.quantize()
    .domain([0,1])
    .range(d3.range(9).map(function(i) { return "q" + i + "-9"; }));
var states = null;

function initMainMap(elementId){
    var width = 900;
    var height = 500;

    var svg = d3.select(elementId).append('svg')
        .attr('width', width)
        .attr('height', height);

    var projection = d3.geo.albersUsa();
    states = svg.append('g')
        .attr('id', 'states');
    states.attr('transform', 'scale(.7, .7)');

    d3.json('assets/json/us-esri-states.json', function(collection) {
        json = collection;
        states.selectAll('path')
            .data(collection.features)
        .enter().append('path')
            .attr('d', d3.geo.path().projection(projection))
            .attr("class", function(d) {return quantize(d.properties.AGE_65_UP/d.properties.POP2007); })
    });

}

 //Init Handlers for Population Fieldset Checkbox Changes
function initPopFieldCbxHandlers(){
        $('#raceFieldSet input').change(function () {
            var popFields = [];
            $('#raceFieldSet :checked').each(function() {
                popFields.push($(this).val());
            });
            $('#mapTitle').text('Percentage ' + popFields)
            styleMapForPercentPop(popFields)
         });
}

function styleMapForPercentPop(popFields){
    states.selectAll('path')
            .attr("class", function(path) {
                var sumPopFields = 0;
                for (var i = 0; i < popFields.length; i++) {
                    sumPopFields += path.properties[popFields[i]];
                }
                return quantize(sumPopFields/path.properties.POP2007); })
}


 /*            $.each($(this), function(key, element) {
                 $.each(element, function(key2, element2) {
                     alert('key: ' + key2 + '\n' + 'value: ' + element2);
                 });
             });*/


