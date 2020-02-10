 /* run once the page Document Object Model (DOM) is
     ready for JavaScript code to execute. */

$(document).ready(
    function() { 
   
    if(localStorage.length == 0)
    {
        alert("No storaged items...");
        return;
    }
    let table = $("#tablica tbody"); //gets table with CSS selector
    for( let i=0; i< localStorage.length; i++)
    {
        let row = $('<tr></tr>');  //creates new element
        var key = localStorage.key(i);
        var item = localStorage.getItem(key);
        var myObject = JSON.parse(item);    
        // $.each - for each collection
        $.each(myObject, function(index,value) {
            row.append($(`<td>${value}</td>`));
        });
        
        table.append(row);
    }
    }
);

$('')