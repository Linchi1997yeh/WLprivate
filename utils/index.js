function response(res, success, message, code=200, err=null) {
  res.status(code)
  const result = { success, message }
  if(err) {
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

module.exports = {
  response,
  filterEntity,
}
