export default ({ graphQLErrors, networkError, operation, forward }, nuxtContext) => {
    console.log('Ошибки')
    console.log(graphQLErrors, networkError, operation, forward)
  }