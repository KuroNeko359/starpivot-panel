
let url = new URL("hdfs://hadoop102:8080/starpivot");

console.log(url.pathname)

for (let sKey of encodeURIComponent("/hadoop/starpivot-panel.html")) {
    console.log(sKey)
}