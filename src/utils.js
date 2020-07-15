export function uuid () {
  return Math.random().toString(16).slice(2)
}
/* saveStatePlugin helps us to listen for  mutations being mande to our VuexStore
and store them in the local browser storage, This way if we refresh our browser our board won't reset
*/
export function saveStatePlugin (store) {
  store.subscribe(
    (mutation, state) => localStorage.setItem('boards', JSON.stringify(state.boards))
  )
}
