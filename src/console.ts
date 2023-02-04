import { BootstrapConsole } from 'nestjs-console'
import { AppModule } from './app.module'
// import * as admin from 'firebase-admin'

const bootstrap = new BootstrapConsole({
  module: AppModule,
  useDecorators: true,
})
bootstrap.init().then(async app => {
  try {
    // Initialize the firebase admin app
    // const serviceAccount = require('../private/serviceAccountKey.json')
    // admin.initializeApp({
    //   credential: admin.credential.cert(serviceAccount),
    // })

    // init your app
    await app.init()
    // boot the cli
    await bootstrap.boot()
    process.exit(0)
  } catch (e) {
    process.exit(1)
  }
})
