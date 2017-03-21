import ObjectCreator from './source/first-task';
import StringReverser from './source/second-task';

const str = 'Wake up, Neo. The Matrix has you... Follow the white rabbit. Knock, knock, Neo.';

const obj = new ObjectCreator(str, true);
const resultOne = obj.getObject();
console.log(resultOne);

const obj2 = new ObjectCreator();
obj2.convertedString = str;
const resultTwo = obj2.getObject();
console.log(resultTwo);

//-----------------------------------------------//

const str2 = 'foobar';

const reversedStr = StringReverser(str2);
console.log(reversedStr);