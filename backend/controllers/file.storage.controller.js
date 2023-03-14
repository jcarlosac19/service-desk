const stream = require('stream');
const { GoogleAuth } = require('google-auth-library');
const { google } = require('googleapis');
const configs = require('../gdrive/config');
const authenticator = require('../gdrive/index');
const fileStorageModel = require('../models/files.storage.model');

exports.uploadFile = async (req, res) => {
  const auth = await authenticator.authorize();
  const service = google.drive({version: 'v3', auth});
  const fileObject = req.body.file;
  const bufferStream = new stream.PassThrough();
  bufferStream.end(fileObject.buffer);
  const { data } = await service.files.create({
    media: {
      mimeType: fileObject.mimeType,
      body: bufferStream,
    },
    requestBody: {
      name: fileObject.originalname,
      parents: [configs.keys.folderId],
    },
    fields: 'id,name',
  });
  console.log(`Uploaded file ${data.name} ${data.id}`);
};

exports.downloadFile = async function (req, res) {
  const auth = await authenticator.authorize();
  const service = google.drive({version: 'v3', auth});
  const id = req.params.id;
  try{
    const fileInStorage = await fileStorageModel.findOne({_id: id}).lean().exec();
    await service.files.get(
      { fileId: fileInStorage.gDriveFileId, alt: 'media'},
      { responseType: 'arraybuffer' }
    ).then(content => {
      res.set({
        'Content-Type': fileInStorage.fileContentType,
        'Content-Disposition': `attachment; filename="${fileInStorage.fileNameAndExtension}"`,
        'Cache-Control' : 'private'
      })
      .status(content.status)
      .send(Buffer.from(content.data));
    }).catch(err =>{
      console.log(err);
      res.status(500).send({error: err, message: "No se pudo obtener el archivo."})
    });
  } catch(err){
    res.status(500).send({message: "No se encontro el archivo."}); 
  }
};

exports.getListOfFiles = async (req, res) =>{
  const id = req.params.id;
  await fileStorageModel.find({ticketId: id}).then(data => {
    res.status(201).send(data);
  })
  .catch(err =>{
    res.status(500).send({message: "No se pudo obtener la lista de archivos."})
  });
}