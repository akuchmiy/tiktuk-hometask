import React, { Suspense } from 'react'
import { HashRouter } from 'react-router-dom'
import Loader from 'shared/ui/Loader'

export const withRouter = (component: () => React.ReactNode) => () =>
  (
    <HashRouter>
      <Suspense fallback={<Loader />}>{component()}</Suspense>
    </HashRouter>
  )
