const bcrypt = require('bcryptjs');

const encrypt = async (text) => {
	const hash = await bcrypt.hash(text, 10);
	return hash;
};

const compare = async (passText, passHash) => {
	return await bcrypt.compare(passText, passHash);
};

module.exports = { encrypt, compare };
