// Attaches res.success() and res.error() helpers so every route
// returns the same { success, data, error } shape Frontend expects.
function responseWrapper(req, res, next) {
  res.success = (data, status = 200) => res.status(status).json({ success: true, data, error: null });
  res.error = (message, status = 400) => res.status(status).json({ success: false, data: null, error: message });
  next();
}

module.exports = { responseWrapper };
