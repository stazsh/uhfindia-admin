const columnConfiguration = [
  {
    label: "UID",
    fieldName: "_id",
    width: 8,
  },
  {
    label: "Name",
    fieldName: "name",
    width: 15,
  },
  {
    label: "Email",
    fieldName: "email",
    width: 15,
  },
  {
    label: "Phone",
    fieldName: "phone",
    width: 10,
  },
  {
    label: "Date of Posting (IST)",
    fieldName: "posted_at",
    width: 10,
  },
  {
    label: "Application Status",
    fieldName: "application_status",
    width: 10,
  },
];

export function getColumnConfig() {
  var sum = 0;
  for (var i = 0; i < columnConfiguration.length; i++)
    sum += columnConfiguration[i].width;

  var absoluteConfig = columnConfiguration,
    t = 0,
    absW;
  for (var j = 0; j < columnConfiguration.length - 1; j++) {
    absW = Math.floor((columnConfiguration[j].width / sum) * 100);
    t += absW;
    absoluteConfig[j].width = absW;
  }

  /**
   * HACK: Math.floor() will lead to incorrect total width (should be 100).
   * So, subtracting the floor of the computed width of the last element from
   * 100 to make the total width evenly sum up to 100.
   **/
  absoluteConfig[absoluteConfig.length - 1].width = 100 - t;
  return absoluteConfig;
}
