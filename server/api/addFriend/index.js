'use strict';

// Check if user is already a friend
function searchUser(array, userNameSearch) {
	var res = array.indexOf(userNameSearch);
	if (res === -1) {
		return false;
	}
	return true;
}

exports.addFriend = function(req, res) {
	if (!req.body.key) {
		return res.json({ 'code' : '4343', 'error' : 'key required' });
	}
	if (!req.body.userName) {
		return res.json({ 'code' : '4343', 'error' : 'friend userName required' });
	}
	// Search for user
	req.app.db.models.User.findById({ _id: req.body.key }, function(err, user) {
		if (err) {
			return res.json({ 'code' : '4444', 'exception' : err });
		}
		if (!user) {
			return res.json({ 'code' : '4343', 'error' : 'unknow user' });
		}
		if (user.userName === req.body.userName) {
			return res.json({ 'code' : '4343', 'error' : 'invalid user' });
		}
		// Search for friend
		req.app.db.models.User.findOne({ userName: req.body.userName },
			function(err, friend) {
				if (err) {
					return res.json({ 'code' : '4444', 'exception' : err });
				}
				if (!friend) {
					return res.json({ 'code' : '4343', 'error' : 'unknow user' });
				}
				if (searchUser(user.friends, req.body.userName)) {
					return res.json({ 'code' : '4343', 'error' : 'already a friend' });
				}
				// Add friend
				req.app.db.models.User.update({ _id: user._id }, { $push: { friends: friend.userName }},
					function(err, response) {
					if (err) {
						return res.json({ 'code' : '4444', 'exception' : err });
					}
					if (!response) {
						return res.json({ 'code' : '4343', 'error' : 'friend not added' });
					}
					// Add friend the other way around
					req.app.db.models.User.update({ _id: friend._id }, { $push: { friends: user.userName }},
						function(err, response) {
							if (err) {
								return res.json({ 'code' : '4444', 'exception' : err });
							}
							if (!response) {
								return res.json({ 'code' : '4343', 'error' : 'friend not added' });
							}
							return res.json({ 'code' : '4242', 'response' : 'friend added' });
						});
				});
			});
	});
};
