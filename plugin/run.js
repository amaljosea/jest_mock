const babel = require("@babel/core");
const generate = require('@babel/generator');

const code = `
import count1 from "./count1";
import count2 from "./count2";
import count3 from "./count3";


jestDemo.mockDemo("./count1",100);
jestDemo.mockDemo("./count2",200);

console.log(count1, count2, count3)
`

const ast = babel.transform(code, {
    "plugins": ["./demoMockPlugin"]
});

const output = generate.default(ast, {sourceMaps:true /* options */ }, code);

console.log("output", output)

console.log("transformedCode : ", JSON.stringify(transformedCode))

