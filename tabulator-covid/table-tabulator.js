function numberParam() {
    return {
        decimal:",",
        thousand:".",
        symbol:"",
        symbolAfter:"p",
        precision:false,
    }
}

var table = new Tabulator('#table', {
    height:258, //set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
    data:tabledata, //assign set of data
    layout: "fitColumns", //fit columns to width of table (optional)
    resizableColumns:false,
    columns:[ //Define Table Columns
        {title:"Provinsi", field:"Provinsi"},
        {title:"Jumlah RS", field:"Jumlah RS", hozAlign:"right",formatter:"money", formatterParams:numberParam},
        {title:"Bed Kosong IGD", field:"Bed Kosong IGD",hozAlign:"right",formatter:"money", formatterParams:numberParam},
        {title:"Antrian Pasien IGD", field:"Antrian Pasien IGD",hozAlign:"right",formatter:"money", formatterParams:numberParam},
        {title:"Kasus Baru", field:"Kasus Baru Covid-19",hozAlign:"right",formatter:"money", formatterParams:numberParam},
        {title:"Kasus Meninggal", field:"Kasus Meninggal",hozAlign:"right",formatter:"money", formatterParams:numberParam},
    ]
})
