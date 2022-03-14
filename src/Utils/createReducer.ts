export default function createReducer(initialState: any, fnMap: any) {
  return (state = initialState, { type, payload, meta }: any) => {
    const handle = fnMap[type]
    return handle ? handle(state, payload, meta) : state
  }
}