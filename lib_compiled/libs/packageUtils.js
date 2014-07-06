// Generated by CoffeeScript 1.7.1
/*!
 * node-uglifier
 * Copyright (c) 2014 Zsolt Szabo Istvan
 * MIT Licensed
 *
 */
(function() {
  var UglifyJS, fs, fsExtra, packageUtils, path;

  fsExtra = require('fs-extra');

  fs = require('fs');

  UglifyJS = require('uglify-js');

  path = require('path');

  packageUtils = module.exports;

  packageUtils.isNative = function(module) {
    var err;
    try {
      return require.resolve(module) === module;
    } catch (_error) {
      err = _error;
      return false;
    }
  };

  packageUtils.readFile = function(pathAbs, encoding) {
    var options;
    if (encoding == null) {
      encoding = 'utf8';
    }
    options = {
      encoding: encoding
    };
    return fs.readFileSync(pathAbs, options);
  };

  packageUtils.getAst = function(code) {
    return UglifyJS.parse(code);
  };

  packageUtils.getMatchingFiles = function(rootPath, dirAndFileArray) {
    var destination, dirOrFile, fileName, filestats, me, r, rootDir, _i, _len;
    r = [];
    rootDir = fs.lstatSync(rootPath).isDirectory() ? path.resolve(rootPath) : path.dirname(path.resolve(rootPath));
    for (_i = 0, _len = dirAndFileArray.length; _i < _len; _i++) {
      dirOrFile = dirAndFileArray[_i];
      destination = path.resolve(rootDir, dirOrFile);
      try {
        filestats = fs.lstatSync(destination);
      } catch (_error) {
        me = _error;
        filestats = null;
      }
      if (filestats && filestats.isDirectory()) {
        fs.readdirSync(destination).reduce((function(prev, curr) {
          prev.push(path.join(destination, curr));
          return prev;
        }), r);
      } else {
        if (path.extname(destination) === "") {
          fileName = path.basename(destination);
          fs.readdirSync(path.dirname(destination)).filter(function(fileNameLoc) {
            return fileNameLoc.indexOf(fileName) !== -1;
          }).reduce((function(prev, curr) {
            prev.push(path.join(destination, curr));
            return prev;
          }), r);
        } else {
          r.push(destination);
        }
      }
    }
    return r;
  };

  packageUtils.getIfNonNativeNotFilteredNonNpm = function(fileAbs, filters, possibleExtensions) {
    var existingExtensions, r;
    r = null;
    if (path.extname(fileAbs) === "") {
      existingExtensions = possibleExtensions.filter(function(ext) {
        return fs.existsSync(fileAbs + "." + ext);
      });
      if (existingExtensions.length > 1) {
        throw new Error(" multiple matching extensions problem for " + fileAbs);
      }
      r = existingExtensions.length === 1 ? fileAbs + "." + existingExtensions[0] : null;
    } else {
      r = fs.existsSync(fileAbs) ? fileAbs : null;
    }
    if (r) {
      if (filters.filter(function(fFile) {
        return path.normalize(fFile) === path.normalize(r);
      }).length > 0) {
        r = null;
        console.log(fileAbs + " was filtered ");
      }
    }
    return r;
  };

  packageUtils.getRequireStatements = function(ast, file, possibleExtensions, isOnlyNonNativeNonNpm) {
    var fileDir, handleRequireNode, r;
    if (possibleExtensions == null) {
      possibleExtensions = ["js", "coffee"];
    }
    if (isOnlyNonNativeNonNpm == null) {
      isOnlyNonNativeNonNpm = true;
    }
    handleRequireNode = function(text, args) {
      var me, pathOfModule, pathOfModuleLoc, pathOfModuleLocStats, pathOfModuleRaw, rs;
      if (args.length !== 1) {
        throw new Error("in file: " + file + " require supposed to have 1 argument: " + text);
      }
      pathOfModuleRaw = args[0].value;
      pathOfModuleLoc = path.resolve(fileDir, pathOfModuleRaw);
      pathOfModuleLocStats = (function() {
        try {
          return fs.lstatSync(pathOfModuleLoc);
        } catch (_error) {
          me = _error;
        }
      })();
      if (pathOfModuleLocStats && pathOfModuleLocStats.isDirectory()) {
        throw new Error("in file: " + file + " require for a directory not supported " + text);
      }
      pathOfModule = packageUtils.getIfNonNativeNotFilteredNonNpm(pathOfModuleLoc, [], possibleExtensions);
      rs = {
        text: text,
        path: pathOfModule
      };
      if (!isOnlyNonNativeNonNpm || pathOfModule) {
        return r.push(rs);
      }
    };
    r = [];
    fileDir = path.dirname(file);
    ast.walk(new UglifyJS.TreeWalker(function(node) {
      var a, args, me, text;
      if ((node instanceof UglifyJS.AST_Call) && (node.start.value === 'require' || (node.start.value === 'new' && node.expression.print_to_string() === "require"))) {
        text = node.print_to_string({
          beautify: true
        });
        args = node.args;
        try {
          handleRequireNode(text, args);
        } catch (_error) {
          me = _error;
          a = 1 + 2;
        }
        return true;
      } else if ((node instanceof UglifyJS.AST_Call) && (node.start.value === 'new' && node.expression.start.value === "(" && node.expression.print_to_string().indexOf("require") !== -1)) {
        args = node.expression.args;
        text = "require" + "('" + args[0].value + "')";
        handleRequireNode(text, args);
        console.log("second " + text);
        return true;
      } else {

      }
    }));
    return r;
  };

  packageUtils.replaceRequireStatement = function(textIn, orig, replacement) {
    var isReplaced, text, withTheOtherQuotation;
    text = textIn;
    isReplaced = false;
    text = text.replace(orig, function(token) {
      isReplaced = true;
      return replacement;
    });
    if (!isReplaced) {
      withTheOtherQuotation = orig;
      if (withTheOtherQuotation.indexOf("'") !== -1) {
        withTheOtherQuotation = withTheOtherQuotation.replace(/[']/ig, '"');
      } else {
        withTheOtherQuotation = withTheOtherQuotation.replace(/["]/ig, "'");
      }
      text = text.replace(withTheOtherQuotation, function(token) {
        isReplaced = true;
        return replacement;
      });
    }
    if (!isReplaced) {
      throw new Error(orig + " was not replaced with " + replacement);
    }
    return text;
  };

}).call(this);

//# sourceMappingURL=packageUtils.map
