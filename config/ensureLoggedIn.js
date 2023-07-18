module.exports = function (req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
};

// http://localhost:3003/profile/index
