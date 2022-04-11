import { Stage, StageProps } from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { RequestFormClientStack } from './request-form-client-stack'

export class RequestFormClientPipelineStage extends Stage {
  constructor(scope: Construct, id: string, props?: StageProps) {
    super(scope, id, props)

    new RequestFormClientStack(this, 'RequestFormFrontendStack')
  }
}
