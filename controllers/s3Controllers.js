const s3Models = require("../models/s3Model");

exports.getMp3Url = async (req, res) => {
  try {
    const { fileName } = req.params;
    const url = await s3Model.getFileUrl(fileName);
    res.status(200).json({ url });
  } catch (error) {
    res.status(500).json({ message: "Error getting file URL", error });
  }
};
