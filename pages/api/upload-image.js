import AWS from "aws-sdk";
import Cors from "micro-cors";
import { v4 as uuidv4 } from "uuid";
import { IncomingForm } from "formidable";
// you might want to use regular 'fs' and not a promise one
import { promises as fs } from "fs";
import { getFileExtension } from "../../server/utils/fileUtils";
const cors = Cors();
// first we need to disable the default body parser

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadHandler = async (req, res) => {
  // console.log('req', req)
  const { method, files, body } = req;
  console.log("method", method);

  // parse form with a Promise wrapper
  const data = await new Promise((resolve, reject) => {
    const form = new IncomingForm();
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });
  // read file from the temporary path
  const fsReadFile = await fs.readFile(data?.files?.file.path);
  const fileExtension = getFileExtension(data?.files?.file)
  const fileType = data?.files?.file.type
  // console.log('data', data?.files?.file)
  const randFileName = uuidv4()
  const do_key = `blog-images/${randFileName}${fileExtension}`
  const spacesEndpoint = new AWS.Endpoint(`${process.env.SPACES_REGION}.digitaloceanspaces.com`);
  // console.log("do_key", do_key);
  // console.log('key', process.env.SPACES_KEY)
  // console.log('secret', process.env.SPACES_SECRET)
  const s3 = new AWS.S3({
    endpoint: spacesEndpoint,
    accessKeyId: process.env.SPACES_KEY,
    secretAccessKey: process.env.SPACES_SECRET,
  });
  var params = {
    Bucket: process.env.SPACES_BUCKET,
    Key: do_key,
    Body: fsReadFile,
    ContentType: fileType,
    ACL: "public-read",
  };
  const response = await s3.putObject(params).promise();
  console.log("success data", response);
  const url = `https://${process.env.SPACES_BUCKET}.${process.env.SPACES_REGION}.cdn.digitaloceanspaces.com/${do_key}`;
  res.status(200).json({ url });
};

export default cors(uploadHandler);
