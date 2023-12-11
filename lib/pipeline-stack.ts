import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodeBuildStep, CodePipeline, CodePipelineSource } from 'aws-cdk-lib/pipelines';

export class PipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, 'Pipeline', {
      pipelineName: 'MyPipeline',
      synth: new CodeBuildStep('SynthStep', {
        input: CodePipelineSource.connection('zachbeeler/multi-stack-app', 'main', {
          connectionArn: 'arn:aws:codestar-connections:us-east-1:268548213468:connection/74821dde-bd0e-4234-92c3-24796340e366',
        }),
        installCommands: [
          'npm install -g aws-cdk'
        ],
        commands: [
          'npm ci',
          'npm run build',
          'npx cdk synth'
        ]
      })
    })
  }
}