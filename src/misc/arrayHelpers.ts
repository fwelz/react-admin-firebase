import { get, filter } from "lodash";

function isEmptyObj(obj) {
  if (!obj) {
    return true;
  }
  return JSON.stringify(obj) === "{}";
}

function isDate(value) {
  if (value instanceof Date) {
    return true;
  }

  if (typeof value === "object") {
    if (value.seconds) {
      return true;
    }
  }

  return false;
}

function getSeconds(value) {
  if (!value) {
    return 0;
  }

  if (typeof value === "object") {
    if (value.seconds) {
      return value.seconds;
    }
  }

  if (value instanceof Date) {
    return value.getTime() / 1000;
  }

  return 0;
}

function compareDates(dir, valueA, valueB) {
  const aValue = getSeconds(valueA);
  const bValue = getSeconds(valueB);

  if (aValue > bValue) {
    return dir === "asc" ? 1 : -1;
  }

  if (aValue < bValue) {
    return dir === "asc" ? -1 : 1;
  }

  return 0;
}

export function sortArray(
  data: Array<{}>,
  field: string,
  dir: "asc" | "desc"
): void {
  data.sort((a: {}, b: {}) => {
    const rawA = get(a, field);
    const rawB = get(b, field);
    const isNumberField = Number.isFinite(rawA) && Number.isFinite(rawB);
    const isDateField = isDate(rawA) && isDate(rawB);

    let aValue: string, bValue: string;

    if (isDateField) {
      return compareDates(dir, rawA, rawB);
    } else if (isNumberField) {
      aValue = rawA;
      bValue = rawB;
    } else {
      aValue = (a[field] || "").toString().toLowerCase();
      bValue = (b[field] || "").toString().toLowerCase();
    }

    if (aValue > bValue) {
      return dir === "asc" ? 1 : -1;
    }

    if (aValue < bValue) {
      return dir === "asc" ? -1 : 1;
    }

    return 0;
  });
}

export function filterArray(
  data: Array<{}>,
  filterFields: { [field: string]: string }
): Array<{}> {
  if (isEmptyObj(filterFields)) {
    return data;
  }

  return filter(data, filterFields);

  // const fieldNames = Object.keys(filterFields);
  // return data.filter(item =>
  //   fieldNames.reduce((previousMatched, fieldName) => {
  //     let fieldVal = filterFields[fieldName];
  //     if (fieldVal == null || fieldVal == undefined) {
  //       fieldVal = "";
  //     }
  //     const fieldSearchText = fieldVal.toString().toLowerCase();
  //     const dataFieldValue = item[fieldName];
  //     if (dataFieldValue == null) {
  //       return false;
  //     }
  //     const currentIsMatched = dataFieldValue
  //       .toString()
  //       .toLowerCase()
  //       .includes(fieldSearchText);
  //     return previousMatched || currentIsMatched;
  //   }, false)
  // );
}
