// use this after token middleware
module.exports = (roles = null) => {
  return (req, res, next) => {
    if (!req.user) {
      res.status(401)
      res.json({
        message: 'Not Logged In'
      })
      return
    }

    const user = req.user
    console.log(user)
    if (!roles) {
      next()
      return
    }

    if (roles.some(role => user.position === role)) {
      next()
    } else {
      res.status(403)
      res.json({
        message: 'No Auth to Access'
      })
    }
  }
}
