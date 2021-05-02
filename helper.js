const cheerio = require('cheerio');
const request = require('axios');

function crawlUrl(url) {
	return request(url)
	.then(({data}) => {
		const page = extractListingsFromHTML(data);
		return page;
	})
	.catch(error => console.log(error));
}

function extractListingsFromHTML (html) {
	const $ = cheerio.load(html, {
    normalizeWhitespace: false
  });

	$('script').each(function( index ) {
		$(this).remove();
	});
	return {
		title:  $('title').text(),
		date: new Date().toJSON().slice(0,10).replace(/-/g,'/'),
		content: $.html()
	}
}

function dynamoDBResponseSerializer(dynamoDBResponse) {
    let serializedResponse = {}

    for(const attribute of Object.keys(dynamoDBResponse.Item)) {
      const attributeValue = Object.values(dynamoDBResponse.Item[attribute])[0];
      serializedResponse[attribute] = attributeValue;
    }

    return serializedResponse;
  }

module.exports = {
	crawlUrl,
	dynamoDBResponseSerializer
}
