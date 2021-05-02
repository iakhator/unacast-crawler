const {dynamoDBResponseSerializer} = require('./helper');

module.exports = ({SendMessageCommand, PutItemCommand, sqs, GetItemCommand, dynamoDBClient, queueUrl}) => {
  return {
    async saveUrlToQueue(req, res) {
      try {
        const url = req.body['url'];
        let sqsUrlData = {
          MessageAttributes: {
            "url": {
              DataType: "String",
              StringValue: url
            }
          },
          MessageBody: JSON.stringify({url}),
          QueueUrl: queueUrl
        };
        const data = await sqs.send(new SendMessageCommand(sqsUrlData));

        const params = {
          Item: {
            "messageId": {
              S: data.MessageId
            }, 
            "processState": {
              S: 'Processing'
            }
          }, 
          TableName: "crawlerTable"
        };
        await dynamoDBClient.send(new PutItemCommand(params));
        res.send({
          identifier: data.MessageId
        });
      } catch (error) {
        res.send(error);
      }
    },

    async getContent(req, res) {
      const {identifierId} = req.params
      if(!identifierId) {
        return res.status(400).send(`Bad Request`);
      }
      try {
        const params = {
          TableName: "crawlerTable",
          Key: {
            messageId: { S: identifierId }
          },
          ProjectionExpression: "messageId, content, title, webUrl, createdAt, processState"
        };
        
        const contentObj = await dynamoDBClient.send(new GetItemCommand(params));
       
        if(!contentObj.Item) {
          return res.status(404).send({message: `content not found for ${identifierId}`})
        }
        const serializedResponse = dynamoDBResponseSerializer(contentObj)
        res.status(200).send({
          title: serializedResponse.title,
          content: serializedResponse.content,
          url: serializedResponse.webUrl,
          date: serializedResponse.createdAt,
          satus: serializedResponse.processState
        })
      } catch (error) {
        res.status(500).send(error)
      }
    }
  }
}
