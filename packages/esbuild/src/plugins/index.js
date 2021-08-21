/*
 *
 * External node_modules plugin
 *
 * **/

function nodeExternalsPlugin() {
  const patterns = ['node_modules'];
  return {
    name: `external`,
    setup(build) {
      if (!patterns || patterns.length === 0) return
      build.onResolve({ filter: /.*/ }, (args) => {
        const external = patterns.some((p) => {
          if (p instanceof RegExp) {
            return p.test(args.path)
          }
          return args.path === p
        })
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
