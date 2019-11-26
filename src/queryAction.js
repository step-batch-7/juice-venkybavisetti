const queryAction = function(path, readFile, args) {
  const data = readFile(path, "utf8");
  const record = JSON.parse(data);
  const indexOfEmpId = args.indexOf("--empId") + 1;
  const employeeID = args[indexOfEmpId];
  const empData = record[employeeID];
  const totalBeverages = empData.reduce(function(totalBeverages, obj) {
    return totalBeverages + parseInt(obj["Quantity"]);
  }, 0);
  const headings = Object.keys(empData[0]);
  const fields = empData.map(function(obj) {
    return Object.values(obj);
  });
  return (
    headings + "\n" + fields.join("\n") + "\nTotal Beverages: " + totalBeverages
  );
};

exports.queryAction = queryAction;
