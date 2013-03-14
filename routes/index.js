/*
 * GET index/landing view.
 */

exports.index = function(req, res) {
	res.render('views/blank', { title: 'KDD', dev: true });
};