const babel = require("@babel/core");

const transformedCode = babel.transform("code", {
    "presets": [
        [
            "@babel/env",
            {
                "targets": {
                    "edge": "17",
                    "firefox": "60",
                    "chrome": "67",
                    "safari": "11.1",
                },
                "useBuiltIns": "usage",
            }
        ]
    ]
});
console.log("transformedCode : ", JSON.stringify(transformedCode))