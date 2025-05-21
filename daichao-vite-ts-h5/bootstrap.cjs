const fs = require("fs/promises");
const path = require("path");
const cheerio = require("cheerio");

const TRANSFER_URL = "http://8.210.203.190:8090/transfer.php#";

// 原混淆Key
const ORIGIN_KEY = "ph_vamo";
// 目标混淆Key
const DEST_KEY = "ph_vamo";

// 转换文件混淆
async function transferFile(file, workingDirectory, outputDirectory) {
  const filePath = path.join(workingDirectory, file);
  console.log("准备转换文件: ", filePath);

  const data = await fs.readFile(filePath, "utf8");
  // 替换所有"]为":]
  const newData = data.replace(/\"]/g, '":]');

  // 请求数据, FormData
  const formData = new FormData();
  // 当前混淆转到另一个混淆
  formData.append("project", `${ORIGIN_KEY} ${DEST_KEY}`);
  // 转义 0，反转义 1。一个混淆转另一个时，忽略
  formData.append("reverse", "0");
  // 混淆数据
  formData.append("origin", newData);

  const res = await fetch(TRANSFER_URL, {
    method: "POST",
    body: formData,
  });

  // 返回html并解析
  const html = await res.text();
  const $ = cheerio.load(html);
  // 获取id为right元素下的textarea的内容
  const result = $("#right textarea").text();
  // 替换所有":]为"]
  const finalData = result.replace(/\":]/g, '"]');
  const outputPath = path.join(outputDirectory, file);
  await fs.writeFile(outputPath, finalData);
  // 文件转换完成
  console.log(`转换完成 ${outputPath}`);
}

async function run(dir) {
  const workingDirectory = path.join(__dirname, `src/${dir}`);
  const outputDirectory = path.join(__dirname, `output/${dir}`);

  // 如果输出目录不存在，则创建
  try {
    await fs.mkdir(outputDirectory, { recursive: true });
    console.log("输出目录创建成功", outputDirectory);
  } catch {
    console.log("输出目录已存在");
  }

  const workingFiles = await fs.readdir(workingDirectory);
  console.log(workingFiles);

  for (let i = 0; i < workingFiles.length; i++) {
    const file = workingFiles[i];
    await transferFile(file, workingDirectory, outputDirectory);
  }
}

async function runFile(file, dir) {
  const workingDirectory = path.join(__dirname, `src/${dir}`);
  const outputDirectory = path.join(__dirname, `output/${dir}`);

  // 如果输出目录不存在，则创建
  try {
    await fs.mkdir(outputDirectory, { recursive: true });
    console.log("输出目录创建成功", outputDirectory);
  } catch {
    console.log("输出目录已存在");
  }

  await transferFile(file, workingDirectory, outputDirectory);
}

async function main() {
  await run("models");
  await run("api");
  await run("mock");
  await runFile("getMockPublicParams.js", "utils");
  await runFile("nativeUtils.js", "utils");
}

main();
