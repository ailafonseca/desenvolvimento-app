import axios from 'axios'

const defaultHeaders = {
  Accept: 'application/json, */*',
  'Content-type': 'application/json'
}

const executeAxios = async ({
  r200,
  r204,
  e404,
  e400,
  e403,
  eTimeOut,
  eConnectionAbort,
  eServerNotFound,
  eGeneric,
  beginLoading,
  endLoading,
  config
}) => {
  try {
    if (beginLoading) {
      beginLoading()
    }

    const result = await axios(config)

    console.log('result axios request', result)

    if (result.status === 200) {
      if (r200) {
        r200(result.data)
      }
    } else if (result.status === 204) {
      if (r204) {
        r204(result.data)
      }
    }
  } catch (error) {
    console.log('error axios request', error)
    const networkError =
      error
        .toString()
        .toLowerCase()
        .indexOf('network error') > -1

    if (error && error.code === 'ECONNABORTED') {
      if (eConnectionAbort) eConnectionAbort(error)
    } else if (networkError) {
      if (eServerNotFound) eServerNotFound(error)
    } else if (error.response !== undefined) {
      const status = error.response.status
      if (status === 400) {
        if (e400) e400(error)
      } else if (status === 403) {
        if (e403) e403(error)
      }
    } else {
      let e = error

      if (error.code === 'ERR_INVALID_ARG_TYPE') e = 'Argumentos inválidos'

      if (eGeneric) eGeneric(e)
    }
  } finally {
    if (endLoading) {
      endLoading()
    }
  }
}

const createConfig = (method, endpoint, header, body) => {
  return {
    url: endpoint,
    method: method,
    data: body,
    headers: {
      ...defaultHeaders,
      ...header
    }
  }
}

export const Fetch = async ({
  endpoint,
  body,
  header,
  r200,
  r204,
  e404,
  e400,
  e403,
  eTimeOut,
  eConnectionAbort,
  eServerNotFound,
  eGeneric,
  beginLoading,
  endLoading
}) => {
  const config = createConfig('GET', endpoint, header, body)
  await executeAxios({
    r200,
    r204,
    e404,
    e400,
    e403,
    eTimeOut,
    eConnectionAbort,
    eServerNotFound,
    eGeneric,
    beginLoading,
    endLoading,
    config
  })
}

export const Post = async ({
  endpoint,
  body,
  header,
  r200,
  r204,
  e404,
  e400,
  e403,
  eTimeOut,
  eConnectionAbort,
  eServerNotFound,
  eGeneric,
  beginLoading,
  endLoading
}) => {
  const config = createConfig('POST', endpoint, header, body)
  await executeAxios({
    r200,
    r204,
    e404,
    e400,
    e403,
    eTimeOut,
    eConnectionAbort,
    eServerNotFound,
    eGeneric,
    beginLoading,
    endLoading,
    config
  })
}

export const Put = async ({
  endpoint,
  body,
  header,
  r200,
  r204,
  e404,
  e400,
  e403,
  eTimeOut,
  eConnectionAbort,
  eServerNotFound,
  eGeneric,
  beginLoading,
  endLoading
}) => {
  const config = createConfig('PUT', endpoint, header, body)
  await executeAxios({
    r200,
    r204,
    e404,
    e400,
    e403,
    eTimeOut,
    eConnectionAbort,
    eServerNotFound,
    eGeneric,
    beginLoading,
    endLoading,
    config
  })
}
