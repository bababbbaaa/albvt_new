import gql from 'graphql-tag'

export default async function ({ app, redirect }) {
  const hasToken = !!app.$apolloHelpers.getToken()

  try {
    const {
      data: { customer }
    } = await app.apolloProvider.defaultClient.query({
      query: gql`
        query {
          me {
            id
            FIO_user
            username
            email
            Stavka
            RoleUser
          }
        }
      `
    })
  } catch (e) {
    try {
      const result = await app.$apolloHelpers.onLogout()
      return redirect('/')
    } catch (e) {
      console.error(e)
    }
  }
}
