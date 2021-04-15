console.log('loaded app.js');

d3.json('../../samples.json').then((importedData) => {
    console.log(importedData);

    // starting by plotting just patient zero
    console.log(importedData.names[0]);
    var patientZero = importedData.names[0];


    // pulling out labels
    var otuIds = importedData.samples.filter(e => e.id === patientZero).map(e => e.otu_ids);
    console.log('otu_ids');
    console.log(otuIds);

    // adding OTU to labels
    for (i=0; i < otuIds[0].length; i++) {
        otuIds[0][i] = `OTU ${otuIds[0][i]}`;
    }

    console.log(otuIds);
    // pulling out values 
    var sampleValues = importedData.samples.filter(e => e.id === patientZero).map(e => e.sample_values);
    console.log('sample_values');
    console.log(sampleValues);

    // pulling out hover text
    var otuLabels = importedData.samples.filter(e => e.id === patientZero).map(e => e.otu_labels);
    console.log('otu_labels');
    console.log(otuLabels);



    var traceZero = {
        y: sampleValues,
        x: otuIds,
        hoverText: otuLabels,
        type: 'bar',
        orientation: 'h'
    };

    var data = [traceZero];

    Plotly.newPlot('bar', data);


});