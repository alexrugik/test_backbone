// 1) https://gist.github.com/foxvision/e39d8cac1d339d1966b5bb7e8aaabac0

export default function (sentence, ignoreCapitalLetter = false) {

    if (!sentence || typeof(sentence) !== 'string') {
        throw new Error('No sentence for converting to object!');
    }

    return convertToObjectFromArray(sentence.split(' '), ignoreCapitalLetter);
}

function convertToObjectFromArray(arr, ignoreCapitalLetter) {
    const objectFromArray = {};

    if (ignoreCapitalLetter) {
        arr = arr.map(word => word.toLowerCase());
    }

    arr.forEach(word => {

        word = getCleanString(word);

        if (!objectFromArray [word]) {
            objectFromArray [word] = 1;
            return;
        }
        objectFromArray [word] += 1;
    });
    return objectFromArray;
}


function getCleanString(str) {
    return str.replace(new RegExp(/[\u0021-\u002e]/, 'g'), '');
}
