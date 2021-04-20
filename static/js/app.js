console.log('loaded app.js');


// Function for plotting Bargraph
function barGraph(patientId) {
    d3.json('../../samples.json').then((importedData) => {
        // pulling out patient sample data
        samples = importedData.samples;
        sample = samples.filter(o => o.id === patientId);
        // console.log('sample');
        // console.log(sample);

        // getting arrays of the data for plotting
        // this is for the y axis (since this vertical)
        otuIds = sample[0].otu_ids;
        // console.log(otuIds);

        // this is for the x axis
        sampleValues = sample[0].sample_values;
        // console.log(sampleValues);

        // this is for the hover text
        otuLabels = sample[0].otu_labels;


        // This makes a String out of the number Otu for the ticks
        var otuIdsSlice = otuIds.slice(0,10).reverse();
        var otuIdsSliceStr = [];
        // adding OTU to labels
        for (i=0; i < otuIdsSlice.length; i++) {
            otuIdsSliceStr[i] = `OTU ${otuIdsSlice[i]}`;
        }

        var traceBar = {
            // I want only the first tenn (top) and i them in descenting order
            y: otuIdsSliceStr,
            x: sampleValues.slice(0,10).reverse(),
            text: otuLabels.slice(0,10).reverse(),
            type: 'bar',
            orientation: 'h'
        };

        var data = [traceBar];

        var layout = {
            title: `Patient ${patientId}'s Belly Button Bacteria`
        };

        Plotly.newPlot('bar', data, layout);
    });
}

function bubbleGraph(patientId) {
    console.log(`Patient is ${patientId}`);
    d3.json('../../samples.json').then((importedData) => {
        // pulling out patient sample data
        samples = importedData.samples;
        sample = samples.filter(o => o.id === patientId);

        // for x values and colors
        otuIds = sample[0].otu_ids;
        // console.log(otuIds);

        // y values and size
        sampleValues = sample[0].sample_values;
        // console.log(sampleValues);

        // this is for the hover text
        otuLabels = sample[0].otu_labels;


        var traceBubble = {
            x: otuIds,
            y: sampleValues,
            text: otuLabels,
            mode: 'markers',
            marker: {
                color: otuIds,
                size: sampleValues
            }
        };

        var data = [traceBubble];

        var layout = {
            title: `Patient ${patientId}'s Bacteria Breakdown`
        };

        Plotly.newPlot('bubble', data, layout);
    });
}

function demographicInfo(patientId) {
    console.log(`Patient is ${patientId}`);

    // selecting panel to put demographic metadata in
    var demoPanel = d3.select('.panel-body');

        d3.json('../../samples.json').then((importedData) => {
            // pulling out patient sample data
            metadatas = importedData.metadata;
            // console.log(metadatas);
            metadata = metadatas.filter(o => parseInt(o.id) === parseInt(patientId))[0];
            // console.log(metadata);
            
            // string for putting into demographics table
            var htmlString = '';
            // iterating over key and value and printing out
            Object.entries(metadata).forEach(([key, value]) => {
                console.log(`${key}: ${value}`);

                // place holder string to put into htmlString
                var string = `<p>${key}: ${value}</p>`;
                
                // combining into one long string to pass into demoPanel
                htmlString = htmlString + string;

            });

            // putting demographic metadata into panel
            demoPanel.html(htmlString);
            

        });
}



// got help of this from dom's talk on homework
function optionChanged(patientId) {
    console.log(`Current Patient is ${patientId}`);
    // console.log('replot');
    barGraph(patientId);
    bubbleGraph(patientId);
    demographicInfo(patientId);
}

function init() {

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
        var patientZero = importedData.names[0];

        console.log('original plot');
        barGraph(patientZero);

        bubbleGraph(patientZero);

        demographicInfo(patientZero);
        // // pulling out data for patient zero
        // var patientZero = importedData.samples.filter(s => s.id === patientZeroNum);
    
    
        // // console.log(patientZeroSorted);
    
        // console.log(patientZero);
        
        // // how many slices of pie i want
        // var pieces = 10;

        // // pulling out labels
        // var otuIds = patientZero.map(e => e.otu_ids);
        // var otuIdsSlice = otuIds[0].slice(0,pieces);
        // console.log('otu_ids');
        // console.log(otuIdsSlice);
        
        // var otuIdsSliceStr = [];
        // // adding OTU to labels
        // for (i=0; i < otuIdsSlice.length; i++) {
        //     otuIdsSliceStr[i] = `OTU ${otuIdsSlice[i]}`;
        // }
    
        // // pulling out values 
        // var sampleValues = patientZero.map(e => e.sample_values);
        // var sampleValuesSlice = sampleValues[0].slice(0,pieces);
        // console.log('sample_values');
        // console.log(sampleValuesSlice);

        // // pulling out labels
        // var otuLabels = patientZero.map(e => e.otu_labels);
        // var otuLabelsSlice = otuLabels[0].slice(0,pieces);
        // console.log('otu_labels');
        // console.log(otuLabelsSlice);
    
        // // making my trace
        // var traceZero = {
        //     // reversing so high values are on top
        //     x: sampleValuesSlice.reverse(),
        //     y: otuIdsSliceStr.reverse(),
        //     type: 'bar',
        //     // making horizontal
        //     orientation: 'h',
        //     text: otuLabelsSlice
        // };
    
        // var data = [traceZero];
    
        // var layout = {
        //     title: 'belly button'
        // };
    
        // Plotly.newPlot('bar', data, layout);


        // var traceBubble = {
        //     x: otuIds[0],
        //     y: sampleValues[0],
        //     text: otuLabels[0],
        //     mode: 'markers',
        //     marker: {
        //         color: otuIds[0],
        //         size: sampleValues[0]
        //     }
        // };

        // var dataBubble = [traceBubble];

        // Plotly.newPlot('bubble', dataBubble);


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






init();
