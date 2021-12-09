var namaEl = document.getElementById("filter-nama");
var periodeEl = document.getElementById("filter-periode");
var kasusEl = document.getElementById("filter-kasus");

function updateFilter(){

    console.log(namaEl.value)
    console.log(periodeEl.value)
    console.log(kasusEl.value)

      table.setFilter([
        {field:"Nama", type:"keywords", value:namaEl.value},
        {field:"Periode", type:"keywords", value:periodeEl.value},
        {field:"Kasus", type:"keywords", value:kasusEl.value},
    ]);
  }

document.getElementById("filter-nama").addEventListener("keyup", updateFilter);
document.getElementById("filter-periode").addEventListener("keyup", updateFilter);
document.getElementById("filter-kasus").addEventListener("keyup", updateFilter);

var table = new Tabulator('#table', {
    height:400, //set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
    data:tabledata, //assign set of data
    layout: "fitColumns", //fit columns to width of table (optional)
    columns:[ //Define Table Columns
        {title:"Nama", field:"Nama", width:150},
        {title:"Periode", field:"Periode", hozAlign:"left"},
        {title:"Kasus", field:"Kasus", hozAlign:"left"},
    ],
    rowClick:function(e,row){ //trigger an alert message when the row is clicked
        alert(row.getData().Nama +", "+ row.getData().Periode +", " + row.getData().Kasus)
    }
})



