// 1) https://gist.github.com/foxvision/e39d8cac1d339d1966b5bb7e8aaabac0

export default class ObjectCreator {
    constructor(convertedString, ignoreCapitalLetter = false) {
        this.__convertedString = convertedString;
        this.ignoreCapitalLetter = ignoreCapitalLetter;
        this.__objectFromArray = {};
        this.__convertedStringChanged = true;
    }

    get convertedString() {
        return this.__convertedString;
    }

    set convertedString(convertedString) {
        if (!convertedString || typeof(convertedString ) !== 'string') {
            throw new Error('please setup correct String')
        }
        this.__convertedStringChanged = true;
        this.__convertedString = convertedString;
    }

    getObject() {
        if (!this.convertedString || typeof(this.convertedString ) !== 'string') {
            throw new Error('no String for getting Object!')
        }

        if (!this.__convertedStringChanged) {
            return this.__objectFromArray;
        }

        const cleanArr = this.__convertedString.split(' ').map(str => this.getCleanString(str));

        this.__convertedStringChanged = false;
        return this.convertToObjectFromArray(cleanArr);
    }

    getCleanString(str) {
        return str.replace(new RegExp(/[\u0021-\u002e]/, 'g'), '');
    }

    convertToObjectFromArray(arr) {

        if (this.ignoreCapitalLetter) {
            arr = arr.map(string => string.toLowerCase());
        }

        arr.forEach(string => {
            if (!this.__objectFromArray [string]) {
                this.__objectFromArray [string] = 1;
                return;
            }
            this.__objectFromArray [string] += 1;
        });
        return this.__objectFromArray;
    }
}