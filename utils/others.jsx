export function urlEncodedStringToJson(urlEncodedString) {
  const keyValuePairs = urlEncodedString.split("&");
  const jsonObject = {};

  for (let pair of keyValuePairs) {
    const [key, value] = pair.split("=");
    const decodedKey = decodeURIComponent(key);
    const decodedValue = decodeURIComponent(value);

    jsonObject[decodedKey] = decodedValue;
  }

  return jsonObject;
}

export function jsonToUrlEncodedString(jsonObject) {
  return Object.entries(jsonObject)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");
}
