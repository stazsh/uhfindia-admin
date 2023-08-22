const columnConfiguration = [
  {
    label: "Name",
    fieldName: "user_name",
    width: 8,
  },
  {
    label: "Email",
    fieldName: "user_email",
    width: 8,
  },
  {
    label: "Comment",
    fieldName: "comment",
    width: 35,
  },
  {
    label: "Created At",
    fieldName: "created_at",
    width: 8,
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
