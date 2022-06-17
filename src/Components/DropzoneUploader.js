import React, { useState } from 'react'
import Dropzone from 'react-dropzone-uploader'
import { ToastContainer, toast } from 'react-toastify'

import { uploadFile } from 'react-s3'

window.Buffer = window.Buffer || require('buffer').Buffer

const S3_BUCKET = process.env.REACT_APP_S3_BUCKET
const REGION = process.env.REACT_APP_REGION
const ACCESS_KEY = process.env.REACT_APP_ACCESS_KEY
const SECRET_ACCESS_KEY = process.env.REACT_APP_SECRET_ACCESS_KEY

const config = {
  bucketName: S3_BUCKET,
  region: REGION,
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_ACCESS_KEY,
}

const DropzoneUploader = () => {
  const [name, setName] = useState(null)
  const [email, setEmail] = useState(null)
  const [phone, setPhone] = useState(null)
  const [location, setLocation] = useState(null)

  const getUploadParams = () => {
    return { url: 'https://httpbin.org/post' }
  }

  const handleChangeStatus = async ({ meta, remove, file }, status) => {
    if (status === 'headers_received') {
      console.log(file)
      await uploadFile(file, config)
        .then(data => {
          console.log(data)
          toast.success(`uploaded to ${data.location}!`)
        })
        .catch(err => {
          console.error(err)
          toast.error(`${meta.name}, upload failed...`)
        })
      remove()
    } else if (status === 'aborted') {
      toast.error(`${meta.name}, upload failed...`)
    }
  }
  return (
    <>
      <ToastContainer />
      <div className="form-box">
        <div className="field1">
          <label>Enter Details Here</label>
          <input
            placeholder="Name"
            type="text"
            onChange={e => setName(e.target.value)}
          />
          <input
            placeholder="Phone 000-000-0000"
            type="text"
            onChange={e => setPhone(e.target.value)}
          />
          <input
            type="email"
            placeholder="E-mail"
            onChange={e => setEmail(e.target.value)}
          />
        </div>
      </div>
      <Dropzone
        accept="video/*"
        getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        maxFiles={1}
        multiple={false}
        canCancel={false}
        inputContent="Upload a video"
        styles={{
          dropzone: { width: 400, height: 200 },
          dropzoneActive: { borderColor: 'green' },
        }}
      />

      <button type="button" id="submitBtn" className="submitBtn">
        submit
      </button>
    </>
  )
}

export default DropzoneUploader
