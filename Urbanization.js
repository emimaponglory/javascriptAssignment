var fs = require('fs');
var content =[];
var indiaContent=[];
var allAsianContries=[];
var arg;
var asia=[];
var indiaValues= [];
var bool;
var asianCountries=["China","India","Indonesia","Pakistan","Bangladesh","Russia","Japan","Iran","Turkey","Thailand","Myanmar","SouthKorea","Iraq","SaudiArabia","Uzbekistan","Malaysia","Nepal","Afghanistan","Yemen","NorthKorea","Taiwan","Syria","SriLanka","Kazakhstan","Cambodia","Azerbaijan","United Arab Emirates","Tajikistan","Israel","Hong Kong"," Jordan","Singapore","Turkmenistan","Lebanon","Kuwait","Georgia","Mongolia","Armenia","Qatar","Bahrain","Timor-Leste","Bhutan","Brunei","Maldives"]
var header=[];
var ns=fs.createReadStream('Indicators.csv','utf-8');
ns.on('data',function(test){
      var lines=test.split("\n");
  for(var i=0;i<lines.length;i++){
        content.push(lines[i].toString());
         }
});
console.log("hi");
ns.on("end",function(){
  function search(arg)
  {
  for(var i=0;i<asianCountries.length;i++)
  {
    if(arg===asianCountries[i]){

    return true;
  }
  }
  }
  header=content[0].split(",");
  var indexOfCountryName=header.indexOf("CountryName");
  var indexOfIndicatorName=header.indexOf("IndicatorName");
    for(var i=1,len=content.length;i<len-1;i++){
    var India={};
    var temp=content[i].split(",");
    if(temp[indexOfCountryName]==="India" && (temp[indexOfIndicatorName]==="Urban population (% of total)"||temp[indexOfIndicatorName]==="Rural population (% of total population)")){
    for(var j=0;j<header.length;j++){
      India[header[j]]=temp[j];
  }
  indiaContent.push(India);
  }}
    var newList = groupByYear(indiaContent);
    function groupByYear(indiaContent) {
    var uniqueYears = getUniqueYear(indiaContent);
    for (var oIndex = 0; oIndex < uniqueYears.length; oIndex++) {
        var row = { year: uniqueYears[oIndex] };
        for (var iIndex = 0; iIndex <indiaContent.length; iIndex++) {
        if (indiaContent[iIndex].Year === uniqueYears[oIndex]) {
          if(indiaContent[iIndex].IndicatorName==="Rural population (% of total population)")
          row.Rval=indiaContent[iIndex].Value;
          if(indiaContent[iIndex].IndicatorName==="Urban population (% of total)")
          row.Uval=indiaContent[iIndex].Value;
          }
          }
          indiaValues.push(row);
          }
        }
function getUniqueYear(cont) {
    var temp = {};
    var years = [];
    for (var index = 0; index <indiaContent.length; index++) {
    if (!(temp[indiaContent[index].Year]) && indiaContent[index].Year%10==0) {
    temp[indiaContent[index].Year] = true;
    years.push(indiaContent[index].Year);
    }
    }
    return years;
    }
  for(var i=1,len=content.length;i<len-1;i++){
    var Asia={};
    var temp=content[i].split(",");
     bool=search(temp[indexOfCountryName]);
    if(bool){
      if(temp[indexOfIndicatorName]==="Urban population"||temp[indexOfIndicatorName]==="Rural population"){
    for(var j=0;j<header.length;j++){
      Asia[header[j]]=temp[j];
  }
  asia.push(Asia);
}}}
var uniqueYear = getUniqueYear(indiaContent);
for(var i=0;i<uniqueYear.length;i++)
{
var Uval=0;
var Rval=0;
for(var j=0;j<asia.length;j++)
{
  if(uniqueYear[i]===asia[j].Year)
  {
    if(asia[j].IndicatorName==="Urban population")
    {
      Uval=parseInt(Uval)+parseInt(asia[j].Value);
    }
    else if (asia[j].IndicatorName==="Rural population") {
      Rval=parseInt(Rval)+parseInt(asia[j].Value);
    }
  }
}
  allAsianContries.push({"year":uniqueYear[i],"Ruralpop":Rval,"Urbanpop":Uval});
}
var json_convert=JSON.stringify(indiaValues);
  fs.appendFile('India.json',json_convert);
  console.log("done");
 var json_con=JSON.stringify(allAsianContries);
  fs.appendFile('Asia.json',json_con);
  console.log("done");
});
