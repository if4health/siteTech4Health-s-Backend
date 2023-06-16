var express = require('express');
var router = express.Router();
const { ROOT } = process.env;

router.get('/', async (req, res) => {
	if (req.isAuthenticated()) {
		res.render('index', {});
	} else {
		res.redirect(ROOT + '/login');
	}
});

module.exports = router;
