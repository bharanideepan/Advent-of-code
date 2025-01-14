let length = 3014603
let arr = []
for (let i = 1; i <= length; i++) {
    arr.push({ number: i, present: 1 })
}
while (arr.length != 1) {
    const evenLength = arr.length % 2 == 0;
    const tempArr = evenLength ? [] : [arr[arr.length - 1]];
    for (let i = 0; i < arr.length - (evenLength ? 0 : 1); i += 2) {
        tempArr.push({ ...arr[i], present: arr[i].present + arr[i + 1].present })
    }
    arr = tempArr
    console.log(arr.length)
}
console.log(arr)