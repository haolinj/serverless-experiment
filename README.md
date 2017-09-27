# Vendor Manager Lambda Function

This project is set up with auto deployment on AWS based on this tutorial: http://docs.aws.amazon.com/lambda/latest/dg/automating-deployment.html

- buildspec.yml: This file defines the build process on AWS CodePipeline.
- sample-event.json: Contains sample event JSON data that will be used to invoke the Lambda function.
- vendor-manager.yml: Template file for the AWS CloudFormation for Lambda function, see http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lambda-function.html
- index.js: AWS Lambda function with nodejs, see http://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-handler.html

To invoke the deployed Lambda function, See http://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/browser-invoke-lambda-function-full.html

You can invoke this function locally by using https://github.com/awslabs/aws-sam-local

e.g. 
```
sam local invoke -e sample-event.json -t vendor-manager.yml
```