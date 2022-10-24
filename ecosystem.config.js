module.exports = {
    apps: [
      {
        name: 'DalePetAdopt',
        exec_mode: 'cluster',
        instances: 'max',
        script: './.output/server/index.mjs',
        port: 5050,
        host: 'custom-dev.onlinetestingserver.com'
      }
    ]
  }