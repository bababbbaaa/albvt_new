import GET_BIOMATERIALS_QL from '../graphql/get-bio-ql.gql'

export const state = () => ({
  biomaterials: [],
  cart: [],
  cartID: []
})

export const getters = {
  GET_ALL_BIOMATERIALS: state => state.biomaterials,
  CART: state => state.cart,
  CART_IDS: state => state.cartID
}

export const mutations = {
  // set biomaterials
  SET_PRODUCTS_BIOMATERIALS (state, biomaterials) {
    state.biomaterials = biomaterials
  },

  // set cart ID in store
  SET_CART (state, index) {
    state.cart.push(index)
    if (index.attributes.DopAnalizes.data.length > 0) {
      index.attributes.DopAnalizes.data.forEach(element => {
        state.cartID.push(element)
      })
    }
    state.cartID.push(index.id)
  }, // set cart in store

  // remove cart item in store
  REMOVE_FROM_CART (state, index) {
    state.cart.splice(index, 1), 
    state.cartID.splice(index, 1)
  },
  // remove cart item in store
  REMOVE_All_CART (state) {
    ;(state.cart = []), (state.cartID = [])
  }
}

export const actions = {
  // get biomaterials
  async GET_BIOMATERIALS_FROM_API ({ commit }) {
    let client = this.app.apolloProvider.defaultClient
    const biomaterials = await client
      .query({ query: GET_BIOMATERIALS_QL })
      .then(({ data }) => data.biomaterialies.data)
    commit('SET_PRODUCTS_BIOMATERIALS', biomaterials)
  },

  // add to cart item
  ADD_TO_CART ({ commit }, item) {
    commit('SET_CART', item)
  },
  // delete to cart item
  DELETE_FROM_CART ({ commit }, index) {
    commit('REMOVE_FROM_CART', index)
  },
  // delete to cart item
  RESET_CART ({ commit }) {
    commit('REMOVE_All_CART')
  }
}
