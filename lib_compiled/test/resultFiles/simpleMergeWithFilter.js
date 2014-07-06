var cachedModules=[];
cachedModules[183]={exports:{}};
(function(module,exports) {// Generated by CoffeeScript 1.7.1
(function() {
  module.exports.boothDeepAndShalow = function(strIn) {
    return "DEEP_TEST" + strIn;
  };

}).call(this);

//# sourceMappingURL=deepModule.map
}).call(this,cachedModules[183],cachedModules[183].exports);
cachedModules[3565]={exports:{}};
(function(module,exports) {// Generated by CoffeeScript 1.7.1
(function() {
  var GibberishAES, cryptoLoc, deepModule;

  GibberishAES = require('./lib_external/gibberish-aes');

  deepModule = cachedModules[183].exports;

  cryptoLoc = module.exports;

  cryptoLoc.enc = function(data, key) {
    var enc;
    enc = GibberishAES.enc(data, deepModule.boothDeepAndShalow(key));
    return enc;
  };

  cryptoLoc.dec = function(data, key) {
    var dec;
    dec = GibberishAES.dec(data, deepModule.boothDeepAndShalow(key));
    return dec;
  };

}).call(this);

//# sourceMappingURL=cryptoLoc.map
}).call(this,cachedModules[3565],cachedModules[3565].exports);
cachedModules[6804]={exports:{}};
(function(module,exports) {// Generated by CoffeeScript 1.7.1
(function() {
  module.exports.theNonTrivialFunction = function(strIn) {
    return "ROOT_TEST_" + strIn;
  };

}).call(this);

//# sourceMappingURL=rootDependency.map
}).call(this,cachedModules[6804],cachedModules[6804].exports);
cachedModules[1326]={exports:{}};
(function(module,exports) {// Generated by CoffeeScript 1.7.1
(function() {
  var SomeClass;

  SomeClass = (function() {
    function SomeClass(initStr) {
      this.initStr = initStr;
    }

    SomeClass.prototype.get = function() {
      return this.initStr;
    };

    return SomeClass;

  })();

  module.exports = SomeClass;

}).call(this);

//# sourceMappingURL=SomeClass.map
}).call(this,cachedModules[1326],cachedModules[1326].exports);
cachedModules[4102]={exports:{}};
(function(module,exports) {// Generated by CoffeeScript 1.7.1
(function() {
  var SomeClass2;

  SomeClass2 = (function() {
    function SomeClass2(initStr) {
      this.initStr = initStr;
    }

    SomeClass2.prototype.get = function() {
      return this.initStr;
    };

    return SomeClass2;

  })();

  module.exports = SomeClass2;

}).call(this);

//# sourceMappingURL=SomeClass2.map
}).call(this,cachedModules[4102],cachedModules[4102].exports);// Generated by CoffeeScript 1.7.1
(function() {
  var C, SomeClass, SomeClass2, crypto, cryptoLoc, deepModule, message, r, rootDependency, shasum, sugar, _;

  _ = require('underscore');

  sugar = require('sugar');

  C = require('./lib_external/constants');

  cryptoLoc = cachedModules[3565].exports;

  rootDependency = cachedModules[6804].exports;

  crypto = require('crypto');

  deepModule = cachedModules[183].exports;

  SomeClass = new (cachedModules[1326].exports)("test1");

  SomeClass2 = cachedModules[4102].exports;

  message = cryptoLoc.dec(cryptoLoc.enc(C.PART_A + C.PART_B, "secret"), "secret");

  shasum = crypto.createHash('sha1');

  r = shasum.update(message).digest("hex");

  console.log(rootDependency.theNonTrivialFunction(r));

  if (!_.isEqual(rootDependency.theNonTrivialFunction(r), "ROOT_TEST_6af9b2faa8ae8e408decd4f7121888af71597a90")) {
    throw new Error("ups did not work we got: " + rootDependency.theNonTrivialFunction(r) + "  instead");
  }

  if (!_.isEqual(deepModule.boothDeepAndShalow(r), deepModule.boothDeepAndShalow("6af9b2faa8ae8e408decd4f7121888af71597a90"))) {
    throw new Error("ups did not work we got: " + r + "  instead");
  }

  if (!_.isEqual(SomeClass.get(), "test1")) {
    throw new Error("ups did not work we got: " + SomeClass.get() + "  instead test1 ");
  }

  if (!_.isEqual(new SomeClass2("test2").get(), "test2")) {
    throw new Error("ups did not work we got: " + (new SomeClass2("test2").get() + "  instead test2 "));
  }

}).call(this);

//# sourceMappingURL=main.map
