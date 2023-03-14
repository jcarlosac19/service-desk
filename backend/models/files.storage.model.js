const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const files = new mongoose.Schema(
  {
    ticket         : { type: ObjectId, defualt: null},
    gDriveFileId : { type: String, defualt: null, unique: true },
    fileNameAndExtension : { type: String, default: null },
    fileContenType : { type: String, default: null }
  },
  {
    timestamps: 
      {
        createdAt: "creado_a",
        updatedAt: "actualizado_a"
      }
  }
);

module.exports = mongoose.model("files", files);