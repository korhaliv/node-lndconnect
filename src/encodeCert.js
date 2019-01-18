import path from 'path'
import base64url from 'base64url'
import querystring from 'querystring'
import untildify from 'untildify'

/**
 * Encode a tls certificate as a base64 encoded url string.
 * @param  {String} certPath Path to vertificate file.
 * @return {Promise} Encoded certificate
 */
const encodeCert = (input, format = 'utf8') => {
  if (!input) {
    return ''
  }

  var cert = new Buffer.from(input, format).toString('utf8')

  let lines = cert.split(/\n/)
  lines = lines.filter(line => line != '')

  // If its a cert, strip out the header and footer and bes64url encode it.
  if (lines[0] === '-----BEGIN CERTIFICATE-----') {
    lines.pop()
    lines.shift()
    return base64url.fromBase64(lines.join(''))
  }
  // Otherwise assume it is a filepath and encode it as a file url.
  return querystring.escape(untildify(lines[0]))
}

export default encodeCert
