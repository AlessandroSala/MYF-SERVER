const y = require('yahoo-finance')

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
				y.historical({
			  symbol: ISIN,
			  from: `${yearToRetrive}-${fMonth}-01`,
			  to: `${currDate.getFullYear()}-${currDate.getMonth()}-01`,
			  period: 'm'  // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only)
			}, function (err, quotes) {
			  res.send(quotes)
			});
		} catch(err) {
			res.status(404).send({
				error: "error"
			})
		}
	}
}