import ObjectCreator from './source/first-task';
import StringReverser from './source/second-task';

const str = 'Wake up, Neo. The Matrix has you... Follow the white rabbit. Knock, knock, Neo.';

const resultOne = ObjectCreator(str);
console.log(resultOne);

const resultTwo = ObjectCreator(str, true);
console.log(resultTwo);

//-----------------------------------------------//

const str2 = 'foobar';

const reversedStr = StringReverser(str2);
console.log(reversedStr);