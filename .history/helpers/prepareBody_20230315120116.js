module.exports = {
	
	prepareBody: function prepareBody(reqBody){
		// let body = this.prepareArrays(reqBody);
		// return body;
		this.prepareStatus(reqBody);
	},

	prepareArrays: function prepareArrays(body){
		// let bodyKeys = [];
		// let bodyValues = [];
		// let members = [];
		// let scholars = [];

		// for(let i in body){
		// 	bodyKeys.push(i);
		// 	bodyValues.push(body[i])
		// }

		// bodyKeys.forEach((e) => {
		// 	if(e.charAt(1) == 'e'){
		// 		members.push({ "name" :  bodyValues[bodyKeys.indexOf(e)] })
		// 	}
		// })

		// bodyKeys.forEach((e) => {
		// 	if(e.charAt(1) == 'c'){
		// 		scholars.push({ "name" :  bodyValues[bodyKeys.indexOf(e)] })
		// 	}
		// })

		// body.members = members;
		// body.scholars = scholars;
		// body.mypic = req.files.mypic.name;

		// return new Project(body);
	},

	prepareStatus: function prepareStatus(body){
		let = status;
		let start = new Date(body.dataInicio);
		let end = new Date(body.dataFim);
		let today = new Date();

		dateStart = {
			"day": start.getDate(),
			"month": start.getMonth() + 1,
			"year": start.getFullYear()
		}

		dateEnd = {
			"day": end.getDate(),
			"month": end.getMonth() + 1,
			"year": end.getFullYear()
		}

		dateToday = {
			"day": end.getDate(),
			"month": end.getMonth() + 1,
			"year": end.getFullYear()
		}

		calculate = {
			year: {
				 
			}
		}

		// calculate = {
		// 	"sameYear?": dateStart.year - dateEnd.year > 0 ? true : false,
		// 	"nextYears?": dateToday.year < dateEnd.year > 0 ? true : false,
		// 	"lastYears?": dateToday.year - dateEnd.year > 0 ? true : false,
		// }
	}
}