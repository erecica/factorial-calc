import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as elbv2 from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as targets from 'aws-cdk-lib/aws-route53-targets';

export class FactorialCalcStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    
    // Create an VPC
    const vpc = new ec2.Vpc(this, 'VPC');

    // Create an ECS cluster
    const cluster = new ecs.Cluster(this, 'Cluster', {
      vpc
    });

    // Add/Define capacity to it
    cluster.addCapacity('DefaultAutoScalingGroupCapacity', {
      instanceType: new ec2.InstanceType("t2.small"),
      desiredCapacity: 1,
    });
    
    // Add ESC Task
    const taskDefinition = new ecs.Ec2TaskDefinition(this, 'TaskDef');
    
    // Add container
    const container = taskDefinition.addContainer('web', {
      image: ecs.ContainerImage.fromAsset(__dirname + "/../app"),
      memoryLimitMiB: 256,
      });
      
      // Add container properties
      container.addPortMappings({
        containerPort: 80,
        hostPort: 8080,
        protocol: ecs.Protocol.TCP
        });

    // Instantiate an Amazon ECS Service
    const ecsService = new ecs.Ec2Service(this, 'Service', {
      cluster,
      taskDefinition,
    });

    // Create a Load Balancer (ALB)
    const lb = new elbv2.ApplicationLoadBalancer(this, 'LB', { 
      vpc, 
      internetFacing: true,
    });

    // Default redirect 80 > 443
    lb.addRedirect();

    // Https / 443 port lisner
    const listener = lb.addListener('PublicListener', { 
      port: 443,
    });

    // Add SSL Certifcate. In this case static    
    const listenerCertificate = elbv2.ListenerCertificate.fromArn(
      'arn:aws:acm:eu-west-1:674190436136:certificate/c9fc930c-d695-40d8-a0aa-4d5fc02cfd30'
    );
    listener.addCertificates('DefaultCertificat',[
      listenerCertificate
    ]);
  
    // Attach ALB to ECS Service
    listener.addTargets('ECS', {
      port: 80,
      targets: [ecsService],
    });

    // Point DNS record to load the new loadbalancer
    const route53_hosted_zone = route53.HostedZone.fromLookup(this, 'Zone', {
      domainName: 'recica.tf'
    })

    // Add a alias record to the zone and point it to the Public DNS of the Load Balancer
    new route53.ARecord(this, 'AliasRecord', {
      zone: route53_hosted_zone,
      target: route53.RecordTarget.fromAlias(new targets.LoadBalancerTarget(lb)),
      recordName: 'cdk'
    })
  }
}
