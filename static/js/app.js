console.log('loaded app.js');

d3.json('../../samples.json').then((importedData) => {
    console.log(importedData);

    // starting by plotting just patient zero
    console.log(importedData.names[0]);

    // picking a patient to work with
    var patientZeroNum = importedData.names[0];

    // pulling out data for patient zero
    var patientZero = importedData.samples.filter(s => s.id === patientZeroNum);


    // console.log(patientZeroSorted);

    console.log(patientZero);

    // pulling out labels
    var otuIds = patientZero.map(e => e.otu_ids);
    var otuIdsSlice = otuIds[0].slice(0,10);
    console.log('otu_ids');
    console.log(otuIdsSlice);

    // adding OTU to labels
    for (i=0; i < otuIdsSlice.length; i++) {
        otuIdsSlice[i] = `OTU ${otuIdsSlice[i]}`;
    }

    // pulling out values 
    var sampleValues = patientZero.map(e => e.sample_values);
    var sampleValuesSlice = sampleValues[0].slice(0,10);
    console.log('sample_values');
    console.log(sampleValuesSlice);


    var traceZero = {
        x: sampleValuesSlice.reverse(),
        y: otuIdsSlice.reverse(),
        type: 'bar',
        orientation: 'h'
    };

    var data = [traceZero];

    var layout = {
        title: 'belly button'
    };

    Plotly.newPlot('bar', data, layout);


});