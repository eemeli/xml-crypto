var crypto = require('../index');
var xmldom = require('xmldom');
var fs = require('fs');

exports['test with a document '] = function (test) {
  var xml = fs.readFileSync('./test/static/valid_saml.xml', 'utf-8');
  var doc = new xmldom.DOMParser().parseFromString(xml);
  var signature = new xmldom.DOMParser().parseFromString(crypto.xpath(doc, "/*/*[local-name(.)='Signature' and namespace-uri(.)='http://www.w3.org/2000/09/xmldsig#']")[0].toString());
  var sig = new crypto.SignedXml();
  sig.keyInfoProvider = new crypto.FileKeyInfo("./test/static/feide_public.pem");
  sig.loadSignature(signature);
  var result = sig.checkSignature(xml);
  test.equal(result, true);
  test.done();
};

exports['test with broken xml'] = function (test) {
  try {
    var doc = new xmldom.DOMParser().parseFromString('<a');
  } catch (e) {}
  test.done();
}
