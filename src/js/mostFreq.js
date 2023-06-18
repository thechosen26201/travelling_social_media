/**
 * Hàm tìm phần tử có tần suất xuất hiện cao nhất
 * @param {Mảng} arr 
 * @param {Độ dài mảng} n 
 * @returns phần tử có tần suất xuất hiện cao nhất
 */
const maxFreq = (arr, n) => {
    //using moore's voting algorithm
    var res = 0;
    var count = 1;
    for (var i = 1; i < n; i++) {
        if (arr[i] === arr[res]) {
            count++;
        } else {
            count--;
        }

        if (count === 0) {
            res = i;
            count = 1;
        }
    }

    return arr[res];
}

export {maxFreq}