module.exports = errorHandler;

function errorHandler(err, req, res, next) {
  if (typeof err === "string") return res.status(400);

  if (
    err.name === "UnauthorizedError" ||
    err.message === "Username or password is incorrect"
  )
    return res.status(401).json({ message: err.message });

  return res.status(500).json({ message: err.message });
}
