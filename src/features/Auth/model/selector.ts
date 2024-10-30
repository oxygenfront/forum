// biome-ignore lint/correctness/noUndeclaredVariables: <explanation>
export const selectUserData = ({ userSlice }: RootState) => userSlice.userData
// biome-ignore lint/correctness/noUndeclaredVariables: <explanation>
export const selectIsLogin = ({ userSlice }: RootState) => userSlice.isLogin
