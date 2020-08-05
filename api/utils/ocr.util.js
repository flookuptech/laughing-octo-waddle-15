const { createReadStream } = require("fs");
const fetch = require("node-fetch");
const FormData = require("form-data");

const ocrUrl = process.env.OCR_SERVER;

exports.ocr = (file) => {
  return new Promise(async (resolve, reject) => {
    const stream = createReadStream(file.path);
    const form = new FormData();

    form.append("file", stream, {
      contentType: file.mimetype,
      filename: file.filename,
    });

    const options = {
      method: "POST",
      body: form,
    };

    fetch(ocrUrl, options)
      .then((res) => res.json())
      .then((json) => resolve(json))
      .catch((err) => reject(err));
  });
};
