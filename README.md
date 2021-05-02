# Unacast web Crawler

## Introduction

**Unacast Crawler**  is a web crawler for crawling web page using url that leverage on serverless, express, AWS cloud functions, simple message queue and dynamodb.

## Setup

This project is built using AWS Lambda function so there are a few steps that needs to be taking before running/deploying this project.

- Create an account on **[AWS](https://aws.amazon.com/resources/create-account/)**  platform
- Create an **[IAM](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html)** user  and get the credentials for the IAM user because this will be the access details for serverless.

## Start

- Clone the repository `git clone <repository>`
- Run `npm install`
- setup aws credentials by

`export AWS_ACCESS_KEY_ID=<your-key-here>`
`export AWS_SECRET_ACCESS_KEY=<your-secret-key-here>`

check [AWS Credential Guide](https://www.serverless.com/framework/docs/providers/aws/guide/credentials/) to see other alternatives of using AWS credentials

## Deploy

- Run `sls deploy` in the terminal.
- Deploying serverless will create the required api-gateway, lambda, dynamodb and sqs .
- On the console there are two endpoints.
  - one for scheduling crawling
  - for retrieving result by identifier id.
  - Navigate to AWS check that lamda, api-gateway, SQS and dynamoDb are created using the `serverless.yml`. Configure it to your choice.
There is one more thing that need to be done before using the endpoints.
- Navigate to the Simple Service Queue(SQS) services on AWS , open the Queue created then copy the arn `arn:aws:sqs:us-east-1:1123353635:Queue_Name
- Now you can start using the endpoints to schedule the url for crawling and also getting the results.
