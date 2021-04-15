console.log('loaded app.js');
function initialBar() {
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
        
        var otuIdsSliceStr = [];
        // adding OTU to labels
        for (i=0; i < otuIdsSlice.length; i++) {
            otuIdsSliceStr[i] = `OTU ${otuIdsSlice[i]}`;
        }
    
        // pulling out values 
        var sampleValues = patientZero.map(e => e.sample_values);
        var sampleValuesSlice = sampleValues[0].slice(0,10);
        console.log('sample_values');
        console.log(sampleValuesSlice);

        // pulling out labels
        var otuLabels = patientZero.map(e => e.otu_labels);
        var otuLabelsSlice = otuLabels[0].slice(0,10);
        console.log('otu_labels');
        console.log(otuLabelsSlice);
    
        // making my trace
        var traceZero = {
            // reversing so high values are on top
            x: sampleValuesSlice.reverse(),
            y: otuIdsSliceStr.reverse(),
            type: 'bar',
            // making horizontal
            orientation: 'h',
            text: otuLabelsSlice
        };
    
        var data = [traceZero];
    
        var layout = {
            title: 'belly button'
        };
    
        Plotly.newPlot('bar', data, layout);


        // making plot for bubbles



    });
}

// d3.json('../../samples.json').then((importedData) => {
//     console.log(importedData);
//     // selecting dropdown menu
//     var dropdownMenu = d3.select("#selDataset");

// });






initialBar();
