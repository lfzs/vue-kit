import Vue from 'vue'
import * as Sentry from '@sentry/browser'
import * as Integrations from '@sentry/integrations'

if (process.env.NODE_ENV === 'development') {
  Vue.config.errorHandler = (error, vm, info) => console.error(error, info)//eslint-disable-line no-console
} else {
  Sentry.init({
    dsn: '',
    integrations: [
      new Integrations.Vue({ Vue, attachProps: true }),
    ],
  })
}
