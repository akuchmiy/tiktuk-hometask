import React, { FC } from 'react'
import Routing from 'pages'
import { withProviders } from './providers'
import 'app/styles/index.css'
import 'shared/config/registerFontAwesome'

const App: FC = () => {
  return <Routing />
}

export default withProviders(App)
