import React , {useState} from 'react';
import { uploadFile } from 'react-s3';


const S3_BUCKET ='mekeilia-image-upload-1';
const REGION ='eu-west-1';
const ACCESS_KEY ='AKIA4KAVR24BS5NMGEHA';
const SECRET_ACCESS_KEY ='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';

const config = {
    bucketName: S3_BUCKET,
    region: REGION,
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
}

const UploadImageToS3WithReactS3 = () => {

    const [selectedFile, setSelectedFile] = useState(null);
    const [fileURL, setFileURL] = useState(null);

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const handleUpload = async (file) => {
        uploadFile(file, config)
            .then(data => {
                console.log(data)
                setFileURL(data.location)
            })
            .catch(err => console.error(err))
    }

    return <div>
        <div>React S3 File Upload</div>
        <input type="file" onChange={handleFileInput}/>
        <button onClick={() => handleUpload(selectedFile)}> Upload to S3</button>
        <br/>
        <img src={fileURL} alt="Girl in a jacket" width="60%" height="30%"></img>
    </div>
}

export default UploadImageToS3WithReactS3;