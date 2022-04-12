import { aws_codebuild, pipelines, Stack, StackProps } from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { RequestFormClientPipelineStage } from './request-form-client-pipeline-stage'

export class RequestFormClientPipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    const pipeline = new pipelines.CodePipeline(this, 'FrontendPipeline', {
      synth: new pipelines.ShellStep('Synth', {
        input: pipelines.CodePipelineSource.connection('justintlaw/request-form-client', 'main', {
          connectionArn: 'arn:aws:codestar-connections:us-west-2:256343118501:connection/140bfd92-70b8-474c-bc79-42c432c97c0c'
        }),
        commands: [
          'cd src/react-app && npm install --production',
          'npm run build',
          'cd ../..',
          'npm install',
          'npm run build',
          'npx cdk synth'
        ]
      })
    })

    const devStage = pipeline.addStage(new RequestFormClientPipelineStage(this, 'dev', {
      env: {
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: process.env.CDK_DEFAULT_REGION
      }
    }))

    const prodStage = pipeline.addStage(new RequestFormClientPipelineStage(this, 'prod', {
      env: {
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: process.env.CDK_DEFAULT_REGION
      }
    }))
    prodStage.addPre(new pipelines.ManualApprovalStep('approval'))
  }
}
