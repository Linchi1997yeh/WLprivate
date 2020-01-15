const userExcludeKeys = ['__v', 'password', 'date']

function response(res, success, message, code = 200, err = null) {
  res.status(code)
  const result = {
    success,
    message
  }
  if (err) {
    console.log(err)
    result.err = err
  }
  res.json(result)
}

function filterEntity(data, excludeKeys) {
  if (Array.isArray(data)) {
    return data.map(entity => filterEntity(entity, excludeKeys))
  } else {
    const obj = data._doc || data
    for (const key of excludeKeys) {
      delete obj[key]
    }
    return obj
  }
}

function arrayToObject(arr, keyField) {
  if (typeof keyField === 'string') {
    return Object.assign({}, ...arr.map(item => ({
      [item[keyField]]: item
    })));
  } else {
    return Object.assign({}, ...arr.map(item => ({
      [keyField(item)]: item
    })));
  }
}

function uniqueArray(arr, keyField) {
  const result = [];
  const unique = {};
  for (const item of arr) {
    const value = item[keyField];
    if (value && unique[value] === undefined) {
      result.push(value);
    }
    unique[value] = 0;
  }
  return result;
}

function uniqueArrayFn(arr, keyFieldFn) {
  const result = [];
  const unique = {};
  for (const item of arr) {
    const value = keyFieldFn(item);
    if (value && unique[value] === undefined) {
      result.push(value);
    }
    unique[value] = 0;
  }
  return result;
}

// 假設來源array的資料key是unique
// 將來源的array資料放到到目標array的property
function mapArrayToObjects(
  sourceArr,
  souKeyField,
  targetArr,
  tarKeyField,
  tarObjField,
) {
  const source = arrayToObject(sourceArr, souKeyField);

  for (const item of targetArr) {
    const souObj = source[item[tarKeyField]];
    item[tarObjField] = souObj;
  }
}

function mapArrayToObjectsFn(
  sourceArr,
  souKeyFieldFnFn,
  targetArr,
  tarKeyFieldFnFn,
  tarObjFn,
) {
  const source = arrayToObject(sourceArr, souKeyFieldFn);

  for (const item of targetArr) {
    const souObj = source[tarKeyFieldFn(item)];
    tarObjFn(souObj, item);
  }
}
module.exports = {
  response,
  filterEntity,
  arrayToObject,
  uniqueArray,
  uniqueArrayFn,
  mapArrayToObjects,
  mapArrayToObjectsFn,
  userExcludeKeys,
}
