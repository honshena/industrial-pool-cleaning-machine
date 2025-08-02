// 使用node运行
// 1. 修改下面file变量的值改成最新的版本
// 2. 执行后会生成file变量 文件.js
// 3. 再将新的文件赋值到新的ota版本中

const fs = require("fs");
const path = require("path");

const file = "version2.txt";
const fileVar = file.split(".")[0];
const data = fs.readFileSync(path.join("./", file), "utf8");
const dataArray = data.split(" ");

const outputArray = dataArray.map((item) => {
  return `0X${item.toUpperCase()}`;
});

const output = `const ${fileVar} = [${outputArray.join(",")}];
module.exports = {
  ${fileVar},
}
`;

fs.writeFileSync(path.join("./", `${fileVar}.js`), output);
