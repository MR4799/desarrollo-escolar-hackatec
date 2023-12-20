const { ImgurClient } = require('imgur');
const { createReadStream } = require('fs');
const fs = require('fs');
const client = new ImgurClient({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
});
const uploadImage = async (img) => {
  //Aqui viene el limite de la imagen y tipo de imagen
  // filesPayloadExists,
  // fileExtLimiter(['.png', '.jpg', '.jpeg'])
  // fileSizeLimiter
  const imageUploaded = await client.upload({
    image: createReadStream(img.path),
    type: 'stream',
    size: 1000 * 1000,
  });
  fs.unlinkSync(img.path);
  return imageUploaded;
};

module.exports = uploadImage;
