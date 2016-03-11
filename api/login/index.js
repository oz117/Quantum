'use strict';

// Logs a user and updates it s regId
exports.login = function(req, res) {
	if (!req.body.userName) {
		return res.json({ 'code' : '4343', 'error' : 'user name required' });
	}
	if (!req.body.password) {
		return res.json({ 'code' : '4343', 'error' : 'password required' });
	}
	if (!req.body.regId) {
		return res.json({ 'code' : '4343', 'error' : 'regId required' });
	}
	req._passport.instance.authenticate('local', { session: false },
		function(err, user, info) {
			if (err) {
				return res.json({ 'code' : '4444', 'exception' : err });
			}
			if (!user) {
				return res.json({ 'code' : '4343', 'error' : 'info' });
			}
			req.app.db.models.User.findByIdAndUpdate(user._id, { regId : req.body.regId },
				function(err, user){
					if (err) {
						return res.json({ 'code' : '4444', 'exception' : err });
					}
					if (!user) {
						return res.json({ 'code' : '4343', 'error' : 'Could not set regId' });
					}
					return res.json({ 'code' : '4242', 'response' : 'User logged in and regId set' });
			});
		})(req, res);
};
