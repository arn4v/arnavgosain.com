export const csvToJson = (csvString: string) => {
  const lineArr = csvString.split("\n");
  const columns = lineArr.shift();
  const jsonArr = [];
  for (const line of lineArr) {
    const colArr = line.split(",").map((i) => i.replace(/"/g, ""));
    const json = {};
    for (const col of columns) {
      const idx = columns.indexOf(col);
      json[col] = colArr[idx];
    }
    jsonArr.push(json);
  }
  return jsonArr;
};
