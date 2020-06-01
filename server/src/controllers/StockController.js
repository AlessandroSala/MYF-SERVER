const y = require('yahoo-stock-prices')

module.exports = {
	async getPrices(req, res) {
		let currDate = new Date()
        let fMonth = currDate.getMonth() - 11
        let yearToRetrive = currDate.getFullYear()
		const ISIN = req.params.isin
		if(fMonth<0) {
            fMonth += 12
            yearToRetrive = currDate.getFullYear() - 1
        } else {
            yearToRetrive = currDate.getFullYear()
        }
		console.log(ISIN)
		let response = {}
		try {
			y.getHistoricalPrices(fMonth, 1, yearToRetrive, currDate.getMonth(), 1, currDate.getFullYear(), ISIN, '1mo', function(err, prices){
				if(!err){
					prices.forEach((r, i) => {
						response[r.date] = r.open
					})
					res.send(response)
				} else {
					res.status(404).send({
						error: "error"
					})
				}

			});
		} catch(err) {
			res.status(404).send({
				error: "error"
			})
		}
	}
}