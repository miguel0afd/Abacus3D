
//var plot;
//var chartdiv;
//var externdiv;
//var clonediv;
//var newdiv;

$(document).ready(function(){
    //window.alert("createplots.js loaded");
    //var tmpOne = document.getElementById('j_idt30:pollForm:hiddenOne').value;
    //var tmpOne = document.getElementById('j_idt30:pollForm:hiddenOne').value;
    //tmpOne = [3,7,9,1,4,6,8,2,5];
    //var tmpTwo = document.getElementById('j_idt30:pollForm:hiddenTwo').value;
    //$.jqplot('externdiv',  [$('#j_idt30:pollForm:hiddenOne').val()]);    
    //$.jqplot('externdiv',[[3,7,9,1,4,6,8,2,5]]);
    //window.alert("String: "+tmpOne);   
    //var array = tmpOne.split(",");
    //window.alert("Array: "+array);
    var tmp = document.getElementById('chartdiv');
    var number = document.createTextNode("Number="+Math.random());
    tmp.appendChild(number);
    //if(!plot){
        //window.alert("if"); 
        //plot = $.jqplot('chartdiv',  [array]);
        //window.alert("$.jqplot"); 
        //chartdiv = document.getElementById("chartdiv");  
        //window.alert("chartdiv: "+chartdiv);
        //clonediv = $('#externdiv').clone().attr('id', 'clonediv'); 
        //window.alert("clonediv: "+clonediv);
        //chartdiv.appendChild(clonediv);
        //window.alert(plot.series[0].data);
    //} else {           
        //window.alert("else");
        
        //plot = $.jqplot('chartdiv',  [array]);
        //window.alert("new plot");
        
        ///////////////////////////////////
        //tmpArray = plot.series[0].data;
        //window.alert(plot.series[0].data);
        //tmpArray[2] = '3,70';  
        //tmpArray[3] = '4,25';        
        //plot.series[0].data = tmpArray;
        //window.alert(plot.series[0].data);
        //plot.redraw();
        //window.alert("redraw");
        //plot = plot.replot();
        //window.alert("replot");
        ///////////////////////////////////
        
        
        //newdiv = $('#externdiv').clone().attr('id', 'clonediv'); 
        //window.alert("newdiv: "+newdiv);
        
        //chartdiv.replaceChild(newdiv, clonediv);
        
        //clonediv = newdiv;
        
        //window.alert(plot.series[0].data);                                      
    //}        
});

function buildplots(strOne, strTwo){
    
    //window.alert("Building plots");        
    
    $.jqplot('externdiv',  [strOne]);
    var div = document.getElementById("chartdiv");  
    var plot = document.getElementById("externdiv");    
    div.appendChild(plot);
    
    $.jqplot ('piechart', [strTwo], { 
        seriesDefaults: {
            // Make this a pie chart.
            renderer: jQuery.jqplot.PieRenderer, 
            rendererOptions: {
              // Put data labels on the pie slices.
              // By default, labels show the percentage of the slice.
              showDataLabels: true
            }
        }, 
        legend: {show:false, location: 'e'}
    });      
    
    var piechart = document.getElementById("piechart");  
    var piediv = document.getElementById("piediv");    
    piediv.appendChild(piechart);
}


