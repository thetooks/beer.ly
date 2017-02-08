const fs = require('fs');
const path = require('path');

// SSL Certificates for HTTPS

// key: fs.readFileSync(path.join(__dirname, '../..', 'key.pem')),
// cert: fs.readFileSync(path.join(__dirname, '../..', 'cert.pem')),

module.exports = {
  key: process.env.KEY_PEM,
  cert: process.env.CERT_PEM,
  passphrase: 'beerly'
};
