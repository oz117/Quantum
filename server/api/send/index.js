'use strict';

// Send a message to a user using google cloud messaging
exports.send = function(req, res) {
	if (!req.body.key) {
		return res.json({ 'code' : '4343', 'error' : 'user name required' });
	}
	if (!req.body.from) {
		return res.json({ 'code' : '4343', 'error' : 'sender required' });
	}
	if (!req.body.to) {
		return res.json({ 'code' : '4343', 'error' : 'recipient required' });
	}
	if (!req.body.msg) {
		return res.json({ 'code' : '4343', 'error' : 'message required' });
	}
	// Checking if sender exists
	req.app.db.models.User.findById({ _id: req.body.key }, function(err, sender) {
		if (err) {
			return res.json({ 'code' : '4444', 'exception' : err });
		}
		if (!sender) {
			return res.json({ 'code' : '4343', 'error' : 'unknow sender' });
		}
		// Checking if recipient exists
		req.app.db.models.User.findOne({ userName: req.body.to }, function(err, recipient) {
			if (err) {
				return res.json({ 'code' : '4444', 'exception' : err });
			}
			if (!recipient) {
				return res.json({ 'code' : '4343', 'error' : 'unknow recipient' });
			}
			// Creation of the message
			var message = new req.app.gcm.Message({
				collapseKey: 'demo',
		    priority: 'high',
		    contentAvailable: true,
		    delayWhileIdle: true,
		    timeToLive: 3,
		    data: {
		      message: req.body.msg,
		      fromU: sender.userName
		    },
		    notification: {
		      title: "Quantum",
		      body: req.body.msg
		    }
			});
			req.app.sender.sendNoRetry(message, { registrationTokens: recipient.regId },
				function(err, response) {
					if (err) {
						return res.json({ 'code' : '4444', 'exception' : err });
					}
					return res.json(response);
				});
		});
	});
}
