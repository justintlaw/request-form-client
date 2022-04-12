import {
  Stack,
  StackProps,
  aws_s3,
  aws_cloudfront,
  aws_cloudfront_origins,
  aws_s3_deployment
} from 'aws-cdk-lib'
import { Construct } from 'constructs'
import * as path from 'path'

export class RequestFormClientStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    // website bucket
    const websiteBucket = new aws_s3.Bucket(this, 'FrontendBucket', {
      websiteIndexDocument: 'index.html',
      publicReadAccess: true
    })

    // cloudfront distribution
    const distribution = new aws_cloudfront.Distribution(this, 'CloudfrontDistribution', {
      defaultBehavior: {
        origin: new aws_cloudfront_origins.S3Origin(websiteBucket),
        allowedMethods: aws_cloudfront.AllowedMethods.ALLOW_GET_HEAD,
        viewerProtocolPolicy: aws_cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS
      },
      // prevent 404 errors on page refresh
      errorResponses: [{
        httpStatus: 404,
        responseHttpStatus: 200,
        responsePagePath: '/index.html'
      }]
    })

    // deploy bucket
    new aws_s3_deployment.BucketDeployment(this, 'DeployWebsite', {
      sources: [aws_s3_deployment.Source.asset(path.join(__dirname, '../src/react-app/build'))],
      destinationBucket: websiteBucket,
      distribution
    })
  }
}
