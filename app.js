// app.js
import {
  requestGet,
  requestPost,
  requestPut,
  requestDelete
} from './utils/request'

App({

  $Http: {
    get: requestGet,
    post: requestPost,
    put: requestPut,
    delete: requestDelete
  }

})