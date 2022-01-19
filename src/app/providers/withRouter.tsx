import { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import TheLoader from '../../components/TheLoader/TheLoader'

export const withRouter = (component: () => React.ReactNode) => () =>
  (
    <BrowserRouter>
      <Suspense fallback={<TheLoader />}>{component()}</Suspense>
    </BrowserRouter>
  )
