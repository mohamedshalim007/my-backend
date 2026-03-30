exports.success = (res, data) => {
  res.status(200).json(data);
};

exports.error = (res, error) => {
  res.status(500).json(error);
};
