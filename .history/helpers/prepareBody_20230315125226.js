module.exports = {

	prepareBody: function prepareBody(reqBody){
		let body = this.prepareArrays(reqBody);
		let status = this.prepareStatus(reqBody);
	},

	prepareStatus: function prepareStatus(body){
		let status;
		let end = new Date(body.dataFim);
		let today = new Date();

		dateEnd = {
			"day": end.getDate(),
			"month": end.getMonth() + 1,
			"year": end.getFullYear(),
			"value": end.getDate() + (end.getMonth() + 1)
		}

		dateToday = {
			"day": today.getDate(),
			"month": today.getMonth() + 1,
			"year": today.getFullYear(),
			"value": today.getDate() + (today.getMonth() + 1)
		}

		if(this.dateToday.value > this.dateEnd.value){ // já passo do fim
			status = "Concluído";
		}

		if(this.dateToday.value < this.dateEnd.value){ 
			status = "Em Andamento";
		}
	}
}