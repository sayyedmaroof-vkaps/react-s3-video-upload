# React S3 video Uploader

You can upload videos directly from your React App to an S3 Bucket

## Setup Project on local environment

- ### `npm install`

  In the root directory, To install the dependencies of app

- ### create a .env.local file

  Create a .env.local file and add the contents mentioned in .env.example file in the root directory

- ### `npm start`

  Runs the Project in the development mode.

  If you want to deploy this on a server, then you also need to specify the environment variables there.

### .env contents

REACT_APP_S3_BUCKET="your S3 bucket name"
REACT_APP_ACCESS_KEY="your aws IAM role access key"
REACT_APP_SECRET_ACCESS_KEY="your IAM role secret access key"
REACT_APP_REGION="your bucket region"

## Create S3 Bucket

- Sign in to the AWS Management Console and open the Amazon S3 console at https://console.aws.amazon.com/s3/.
- Choose Create bucket.
- In Bucket name, enter a DNS-compliant name for your bucket.
- Uncheck the option: "Block all public access" to make it publically accessible
- Choose Create bucket.
