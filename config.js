const {
  SQSClient,
  SendMessageCommand
} = require("@aws-sdk/client-sqs");
const {
  DynamoDBClient,
	GetItemCommand,
  PutItemCommand
} = require("@aws-sdk/client-dynamodb");
const sqs = new SQSClient({apiVersion: '2012-11-05', region: 'us-east-1'});
const queueUrl = "https://sqs.us-east-1.amazonaws.com/396647905834/crawlerQueue";
const dynamoDBClient = new DynamoDBClient({ region: 'us-east-1' });

module.exports = {
  sqs,
  queueUrl,
  dynamoDBClient,
  GetItemCommand,
  PutItemCommand,
  SendMessageCommand
}
