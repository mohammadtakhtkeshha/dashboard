import React, {useState} from 'react';
import {FileManager, FileUploader} from 'reactjs-file-uploader'


export default function CenteredGrid() {
    const [files, setFiles] = useState([]);
        const uploadFiles = (files) => {
            return files.map(uploadFile);
        };

        const uploadFile = (file) => {
            return (
                <FileUploader
                    key={file.key}
                    file={file}
                    url='https://api.cloudinary.com/v1_1/dpdenton/upload'
                    formData={{
                        file,
                        upload_preset: 'public',
                        tags: 'vanilla',
                    }}
                    readFile
                >
                    {fileProgress}
                </FileUploader>
            )
        }

        const fileProgress = ({

                                  /*
                                  References to the Event objects.
                                  Initial state is null and each propert gets assigned on Event.
                                   */
                                  uploadReady,
                                  uploadStart,
                                  uploadProgress,
                                  uploadComplete,
                                  downloadStart,
                                  downloadProgress,
                                  downloadComplete,
                                  error,
                                  abort,
                                  timeout,

                                  /*
                                  The sequential state of the request
                                  enum {
                                      uploadReady, uploadStart, uploadProgress, uploadComplete, downloadStart
                                      downloadStart, downloadProgress, downloadComplete
                                  }
                                   */
                                  requestState,

                                  /*
                                  Function references to start / abort request
                                    */
                                  startUpload,
                                  abortRequest,

                                  /*
                                  Request Object reference (XMLHttpReqeust)
                                   */
                                  request,

                                  /*
                                  Response text Object (JSON)
                                   */
                                  response,

                                  /*
                                  Data of the file being uploaded (if readData props is true)
                                   */
                                  fileData,

                              }) => {
            return (
                <div>
                    {fileData && <img src={fileData} width={200} alt="Preview"/>}
                    {startUpload && <button onClick={startUpload}>Upload File</button>}
                    {requestState && requestState}
                </div>
            )
        }


    return (
        <div>
            <input
                type="file"
                accept="image/*"
                onChange={event => setFiles(files.concat(Array.from(event.target.files)))}
            />
            <FileManager
                files={files}
            >
                {uploadFiles}
            </FileManager>
        </div>
    );
}




