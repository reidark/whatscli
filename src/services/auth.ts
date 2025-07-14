const _auth = {
	isAuthenticated: true,
};

function authenticate() {
	_auth.isAuthenticated = true;
}

function isAuthenticated() {
	return _auth.isAuthenticated;
}

export { authenticate, isAuthenticated };
