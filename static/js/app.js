console.log('loaded app.js');







function initialBar() {

    var selection = d3.select('#selDataset');

    d3.json('../../samples.json').then((importedData) => {
        console.log(importedData);

        var patientNames = importedData.names;

        // this part I got from Dom's talk on this homework
        patientNames.forEach(patient => {
            selection.append('option')
            .text(patient)
            .property('value', patient);
        });

        

        
        
        // starting by plotting just patient zero
        console.log(importedData.names[0]);
    
        // picking a patient to work with
        var patientZeroNum = importedData.names[0];
    
        // pulling out data for patient zero
        var patientZero = importedData.samples.filter(s => s.id === patientZeroNum);
    
    
        // console.log(patientZeroSorted);
    
        console.log(patientZero);
        
        // how many slices of pie i want
        var pieces = 10;

        // pulling out labels
        var otuIds = patientZero.map(e => e.otu_ids);
        var otuIdsSlice = otuIds[0].slice(0,pieces);
        console.log('otu_ids');
        console.log(otuIdsSlice);
        
        var otuIdsSliceStr = [];
        // adding OTU to labels
        for (i=0; i < otuIdsSlice.length; i++) {
            otuIdsSliceStr[i] = `OTU ${otuIdsSlice[i]}`;
        }
    
        // pulling out values 
        var sampleValues = patientZero.map(e => e.sample_values);
        var sampleValuesSlice = sampleValues[0].slice(0,pieces);
        console.log('sample_values');
        console.log(sampleValuesSlice);

        // pulling out labels
        var otuLabels = patientZero.map(e => e.otu_labels);
        var otuLabelsSlice = otuLabels[0].slice(0,pieces);
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


        var traceBubble = {
            x: otuIds[0],
            y: sampleValues[0],
            text: otuLabels[0],
            mode: 'markers',
            marker: {
                color: otuIds[0],
                size: sampleValues[0]
            }
        };

        var dataBubble = [traceBubble];

        Plotly.newPlot('bubble', dataBubble);


        // making plot for bubbles



    });
}

// d3.json('../../samples.json').then((importedData) => {
//     console.log(importedData);
//     // selecting dropdown menu
//     var dropdownMenu = d3.select("#selDataset");
//     dropdownMenu.selectAll('li').data(importedData.names)
//     .enter()
//     .append('li')
//     .merge

// });






initialBar();
