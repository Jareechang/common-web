/*
 *
 * External node_modules plugin
 *
 * **/
function isInNodeModules(args, external = []) {
  const patterns = [new RegExp('node_modules')];
  const hasMatch = patterns.some((p) => {
    let packagePath = args.path;

    if (external.includes(packagePath)) {
      return true;
    }

    /*
     * Use require to look up path (incase we missed any external packages)
     *
     * **/
    try {
      packagePath = require.resolve(args.path);
    } catch (error) {}

    return !!(p.test(packagePath) || p.test(args.resolveDir));
  });
  return hasMatch;
}

function hasExternalDefintions(build) {
  return build.external || (
    Array.isArray(build.external) && build.external.length > 0
  );
}

function requireExternalsCheck(build) {
  if (build.bundle) {
    if (!hasExternalDefintions(build)) {
      throw new Error(
        `[@common-web/esbuild] - nodeExternalsPlugin - requires "external" field on the esbuild configuration if "bundle" is true.
        Found: "${JSON.stringify(build.external)}"`
      );
    }
  }
}

function nodeExternalsPlugin() {
  return {
    name: `external`,
    setup(build) {
      requireExternalsCheck(build);
      build.onResolve({ filter: /.*/ }, (args) => {
        const external = isInNodeModules(args, build.external);
        if (external) {
          return { path: args.path, external }
        }
      })
    }
  };
}

module.exports = {
  nodeExternalsPlugin
};
