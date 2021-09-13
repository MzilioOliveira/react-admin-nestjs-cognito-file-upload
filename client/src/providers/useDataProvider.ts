import { useState, useEffect } from 'react'
import { fetchUtils } from 'react-admin'
import { Auth } from '@aws-amplify/auth'

import crudProvider from './customDataProvider'

const useDataProvider = () => {
  const [dataProvider, setDataProvider] = useState<any>({})

  useEffect(() => {
    const buildDataProvider = async () => {
      const user = await Auth.currentAuthenticatedUser()

      if (!user) {
        return
      }

      const fetchJson = (url, options: any = {}) => {
        if (!options.headers) {
          options.headers = new Headers({ Accept: 'application/json' })
        }

        options.headers.set('Authorization', `Bearer ${user.signInUserSession.idToken.jwtToken}`)
        return fetchUtils.fetchJson(url, options)
      }

      const dataProvider = crudProvider(process.env.REACT_APP_API_URL, fetchJson)

      setDataProvider(() => dataProvider)
    }
    buildDataProvider()
  }, [])

  return { dataProvider }
}

export default useDataProvider
