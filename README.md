# Request Form Client
The front end code for the request form app.

## Description
This repo has two parts. First, the infrastructure as code which was written using the AWS CDK. You can see that code under the lib folder. In there a fully functioning code pipeline has been written, which includes a deployment step that uploads the React app to s3 and fronts it with a cloudfront distribution. The React app is located in the `src/react-app` directory.

This is a blank project for TypeScript development with CDK.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## AWS cdk commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template

## Information
* `aws codestar-connections create-connection --provider-type GitHub --connection-name RequestFormBackendCode` Create a codestar connection via the aws cli
