// Generated by CoffeeScript 1.10.0
(function() {
  var IS_RE_CREATE_TEST_FILES, NodeUglifier, fs, fsExtra, packageUtils, path, relativeToDir, testMerge;

  fs = require('fs');

  fsExtra = require('fs-extra');

  NodeUglifier = require("../NodeUglifier");

  packageUtils = require('../libs/packageUtils');

  path = require('path');

  IS_RE_CREATE_TEST_FILES = true;

  exports.testMergeWithBothExportFilterTypes = function(test) {
    var error, main, me, mergedSource, nodeUglifier, testFile;
    testFile = "lib_compiled/test/resultFiles/simpleMergeWithBothExportFilterTypes.js";
    nodeUglifier = new NodeUglifier("lib_compiled/test/testproject/main.js", {
      rngSeed: "hello",
      mergeFileFilterWithExport: ["./lib_static/test/", "./depa/constants.js"],
      mergeFileFilter: ["./depDynamic/filename_used_in_dynamic_require.js"]
    });
    mergedSource = nodeUglifier.merge().toString();
    nodeUglifier.exportToFile(testFile);
    try {
      GLOBAL._loadDynamic = true;
      main = require(path.resolve(testFile));
    } catch (error) {
      me = error;
      test.fail("result file should run without throwing errors");
    }
    GLOBAL._loadDynamic = false;
    main = require(path.resolve(testFile));
    return test.done();
  };

  exports.testJsonImport = function(test) {
    var error, me, mergedSource, nodeUglifier, testFile;
    testFile = "lib_compiled/test/resultFiles/testJsonImport.js";
    nodeUglifier = new NodeUglifier("lib_compiled/test/testJsonImport/main.js", {
      rngSeed: "hello"
    });
    mergedSource = nodeUglifier.merge().toString();
    try {
      eval(mergedSource);
    } catch (error) {
      me = error;
      test.fail(me.toString(), "expected no error thrown from combined project");
    }
    if (IS_RE_CREATE_TEST_FILES) {
      nodeUglifier.exportToFile(testFile);
    } else {
      test.equals(packageUtils.readFile(testFile).toString(), mergedSource);
    }
    return test.done();
  };

  exports.testStuff = function(test) {
    var t0, t0_2, t1;
    t0 = "./test/test2";
    t0_2 = "onderscore";
    t1 = packageUtils.hexifyString(t0_2);
    console.log(t1);
    console.log("\n");
    return test.done();
  };

  relativeToDir = function(dir) {
    return path.relative(__dirname, dir);
  };

  exports.testPackageUtils = function(test) {
    var shouldBeResult1, shouldBeResult2;
    test.deepEqual(packageUtils.getMatchingFiles("lib_compiled/test/testproject/main.js", []), []);
    shouldBeResult1 = ['testproject\\depa\\constants.js', 'testproject\\depa\\constants.js.map'];
    test.deepEqual(packageUtils.getMatchingFiles("lib_compiled/test/testproject/", ["./depa/"]).map(relativeToDir), shouldBeResult1);
    test.deepEqual(packageUtils.getMatchingFiles("lib_compiled/test/testproject", ["./depa/"]).map(relativeToDir), shouldBeResult1);
    test.deepEqual(packageUtils.getMatchingFiles("lib_compiled/test/testproject/main.js", ["./depa/"]).map(relativeToDir), shouldBeResult1);
    shouldBeResult2 = ['testproject\\main\\main.js', 'testproject\\main\\main.js.map', 'testproject\\depb\\cryptoLoc.js', 'testproject\\depb\\depDeep\\deepModule\\deepModule.js', 'testproject\\depb\\depDeep\\deepModule\\deepModule.js.map'];
    test.deepEqual(packageUtils.getMatchingFiles("lib_compiled/test/testproject/main.js", ["main", "./depb/cryptoLoc.js", "./depb/depDeep/deepModule"]).map(relativeToDir), shouldBeResult2);
    return test.done();
  };

  exports.testDependenciesExport = function(test) {
    var constantsAfterSeparation, error, exportDir, me, nodeUglifier;
    exportDir = "lib_test_project_export/";
    nodeUglifier = new NodeUglifier("lib_compiled/test/testproject/main.js", {
      rngSeed: "hello"
    });
    nodeUglifier.exportDependencies(exportDir, {
      "coffee": {
        "src": "lib_compiled"
      }
    });
    test.ok(fsExtra.existsSync(path.resolve(exportDir)));
    test.ok(fsExtra.existsSync(path.resolve(exportDir + "/src")));
    test.ok(fsExtra.existsSync(path.resolve(exportDir + "/lib_compiled")));
    try {
      constantsAfterSeparation = require(path.resolve(exportDir) + "/lib_compiled/test/testproject/depa/constants.js");
    } catch (error) {
      me = error;
      test.fail("the new constants file should be proper requireable js");
    }
    return test.done();
  };

  testMerge = function(test) {
    var error, me, mergedSource, nodeUglifier, testFile;
    testFile = "lib_compiled/test/resultFiles/simpleMerge.js";
    nodeUglifier = new NodeUglifier("lib_compiled/test/testproject/main.js", {
      rngSeed: "hello"
    });
    mergedSource = nodeUglifier.merge().toString();
    try {
      eval(mergedSource);
    } catch (error) {
      me = error;
      test.fail(me.toString(), "expected no error thrown from combined project");
    }
    nodeUglifier.exportToFile(testFile);
    return test.done();
  };

  exports.testMergeWithExportFilter = function(test) {
    var error, main, me, mergedSource, nodeUglifier, testFile;
    testFile = "lib_compiled/test/resultFiles/simpleMergeWithFilter.js";
    nodeUglifier = new NodeUglifier("lib_compiled/test/testproject/main.js", {
      rngSeed: "hello",
      mergeFileFilterWithExport: ["./lib_static/test/", "./depa/constants.js"]
    });
    mergedSource = nodeUglifier.merge().toString();
    nodeUglifier.exportToFile(testFile);
    try {
      GLOBAL._loadDynamic = false;
      main = require(path.resolve(testFile));
    } catch (error) {
      me = error;
      test.fail("result file should run without throwing errors");
    }
    GLOBAL._loadDynamic = false;
    main = require(path.resolve(testFile));
    return test.done();
  };

  exports.testMergeWithFilterAndUglify = function(test) {
    var error, main, me, mergedSource, nodeUglifier, testFile, uglifySourceMap;
    testFile = "lib_compiled/test/resultFiles/simpleMergeWithFilterAndUglify.js";
    uglifySourceMap = "lib_compiled/test/resultFiles/sourcemaps/simpleMergeWithFilterAndUglify.js";
    nodeUglifier = new NodeUglifier("lib_compiled/test/testproject/main.js", {
      rngSeed: "hello",
      mergeFileFilterWithExport: ["./lib_static/test/", "./depa/constants.js"]
    });
    mergedSource = nodeUglifier.merge().uglify().toString();
    if (IS_RE_CREATE_TEST_FILES) {
      nodeUglifier.exportToFile(testFile);
    } else {
      test.equals(packageUtils.readFile(testFile).toString(), mergedSource);
    }
    nodeUglifier.exportSourceMaps(uglifySourceMap);
    try {
      GLOBAL._loadDynamic = false;
      main = require(path.resolve(testFile));
    } catch (error) {
      me = error;
      test.fail("result file should run without throwing errors");
    }
    return test.done();
  };

  exports.testMergeWithFilterAndUglifyAndStrProtection = function(test) {
    var error, main, me, mergedSource, nodeUglifier, testFile, uglifySourceMap;
    testFile = "lib_compiled/test/resultFiles/simpleMergeWithFilterAndUglifyAndStrProtection.js";
    uglifySourceMap = "lib_compiled/test/resultFiles/sourcemaps/simpleMergeWithFilterAndUglifyAndStrProtection.js";
    nodeUglifier = new NodeUglifier("lib_compiled/test/testproject/main.js", {
      rngSeed: "hello",
      mergeFileFilterWithExport: ["./lib_static/test/", "./depa/constants.js"]
    });
    mergedSource = nodeUglifier.merge().uglify({
      strProtectionLvl: 1
    }).toString();
    if (IS_RE_CREATE_TEST_FILES) {
      nodeUglifier.exportToFile(testFile);
    } else {
      nodeUglifier.exportSourceMaps(uglifySourceMap);
    }
    try {
      GLOBAL._loadDynamic = false;
      main = require(path.resolve(testFile));
    } catch (error) {
      me = error;
      test.fail("result file should run without throwing errors");
    }
    test.equals(packageUtils.readFile(testFile).toString(), mergedSource);
    return test.done();
  };

}).call(this);

//# sourceMappingURL=unitTest.js.map
