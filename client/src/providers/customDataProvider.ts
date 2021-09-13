import { DataProvider, fetchUtils } from 'react-admin'
import { stringify } from 'query-string'

export default (apiUrl: string, httpClient = fetchUtils.fetchJson): DataProvider => ({
  getList: (resource, params) => {
    const { page, perPage } = params.pagination
    const { field, order } = params.sort
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify(params.filter)
    }
    const url = `${apiUrl}/${resource}?${stringify(query)}`

    return httpClient(url).then(({ json }) => ({
      data: json,
      total: json.length
    }))
  },

  getOne: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
      data: json
    })),

  getMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids })
    }
    const url = `${apiUrl}/${resource}?${stringify(query)}`
    return httpClient(url).then(({ json }) => ({ data: json }))
  },

  getManyReference: (resource, params) => {
    const { page, perPage } = params.pagination
    const { field, order } = params.sort
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify({
        ...params.filter,
        [params.target]: params.id
      })
    }
    const url = `${apiUrl}/${resource}?${stringify(query)}`

    return httpClient(url).then(({ json }) => ({
      data: json,
      total: json.length
    }))
  },

  update: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: 'PATCH',
      body: JSON.stringify(params.data)
    }).then(() => ({ data: params.data })),

  updateMany: () => Promise.reject(),

  create: (resource, params) =>
    httpClient(`${apiUrl}/${resource}`, {
      method: 'POST',
      body: JSON.stringify(params.data)
    }).then(({ json }) => ({
      data: { ...params.data, id: json.id }
    })),

  delete: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: 'DELETE'
    }).then(({ json }) => ({ data: json })),

  deleteMany: () => Promise.reject()
})
