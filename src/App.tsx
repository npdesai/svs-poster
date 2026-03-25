import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Loader } from 'components'
import { FourOhFour } from 'pages/404'

const Home = React.lazy(() => import('pages/Home'))

const App = () => {
    return (
        <Suspense fallback={<Loader />}>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='*' element={<FourOhFour />} />
            </Routes>
        </Suspense>
    )
}

export default App
