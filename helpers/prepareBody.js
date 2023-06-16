module.exports = function prepareBody(body){
	function dateFormatParser(data) {
		const dateParts = data.split('-');
		return dateParts[2] + '/' + dateParts[1] + '/' + dateParts[0];
	}

	let bodyKeys = [];
	let bodyValues = [];
	let members = [];
	let scholars = [];

	for(let i in body){
	  bodyKeys.push(i);
	  bodyValues.push(body[i])
	}

	bodyKeys.forEach((e) => {
	  if(e.charAt(0) == 'm'){
		members.push(
		  {
			"name" :  bodyValues[bodyKeys.indexOf(e)]
		  }
		)
	  }
	})

	bodyKeys.forEach((e) => {
	  if(e.charAt(1) == 'c'){
		scholars.push(
		  {
			"name" :  bodyValues[bodyKeys.indexOf(e)]
		  }
		)
	  }
	})

	body.members = members;
	body.scholars = scholars;
	body.beginDate = dateFormatParser(body.beginDate);
	body.endDate = dateFormatParser(body.endDate);

	console.log("------------------------------------------------------------------------");
	console.log("data de inicio: " + dateFormatParser(body.beginDate));
	console.log("------------------------------------------------------------------------");

	return body;	
}