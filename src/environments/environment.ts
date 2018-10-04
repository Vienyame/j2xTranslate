// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  gaTrackingCode: 'UA-117353136-3',
  googleAnalytics: false,
  backend: {
    protocol: 'http',
    host: '127.0.0.1',
    port: '8000',
    endpoints: {
      upload: '/api/upload',
      template: '/api/template',
      vien2json: '/api/vien2json'
    }
  }
};
