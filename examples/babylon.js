const ast = require("babylon").parse("code", {
  // parse in strict mode and allow module declarations
  sourceType: "module",

  plugins: [
    // enable jsx and flow syntax
    "jsx",
    "flow"
  ]
});
const val = ""

console.log(JSON.stringify(ast), JSON.stringify(val))