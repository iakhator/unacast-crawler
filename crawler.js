const { PutItemCommand, dynamoDBClient} = require('./config')
const { crawlUrl } = require('./helper');

module.exports.process = async (sqsEvent, context) => {
	try {
	  const messages = sqsEvent.Records
    if (messages) {
	  	for(const message of messages){
			  const messageBody = JSON.parse(message.body)
  	 		const pageObj = await crawlUrl(messageBody.url);
	
  	 		const params = {
				  Item: {
				   "messageId": {
				     S: message.messageId
				    }, 
				   "title": {
				     S: pageObj.title
				    }, 
				   "content": {
				     S: pageObj.content
				    },
				    "createdAt": {
				     S: pageObj.date
				    },
						"webUrl": {
							S: messageBody.url
						},
						"processState": {
							S: "Completed"
						}
				  }, 
				  TableName: "crawlerTable"
		 		};

		 		await dynamoDBClient.send(new PutItemCommand(params));
				
	  	}
			
    } else {
      console.log("No messages to write");
    }
  } catch (err) {
    console.log("Receive Error", err);
  }
}
