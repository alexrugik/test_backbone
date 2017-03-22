// 1) https://gist.github.com/foxvision/e39d8cac1d339d1966b5bb7e8aaabac0

export default function (sentence, ignoreCapitalLetter = false) {

    if (!sentence || typeof(sentence) !== 'string') {
        throw new Error('No sentence for converting to object!');
    }

    const cleanArr = sentence.split(' ').map(str => getCleanString(str));
    return convertToObjectFromArray(cleanArr, ignoreCapitalLetter);
}

function convertToObjectFromArray(arr, ignoreCapitalLetter) {
    const objectFromArray = {};

    if (ignoreCapitalLetter) {
        arr = arr.map(string => string.toLowerCase());
    }

    arr.forEach(string => {
        if (!objectFromArray [string]) {
            objectFromArray [string] = 1;
            return;
        }
        objectFromArray [string] += 1;
    });
    return objectFromArray;
}


function getCleanString(str) {
    return str.replace(new RegExp(/[\u0021-\u002e]/, 'g'), '');
}
