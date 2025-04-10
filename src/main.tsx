import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.scss'
// import App from './App.tsx'
// import ButtonExample from '../example/ButtonExample.tsx'
// import IconExample from '../example/IconExample.tsx'
// import AlertExample from '../example/AlertExample.tsx'
// import MenuExample from '../example/MenuExample.tsx'
import InputExample from '../example/InputExample.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <InputExample />
    </StrictMode>,
)
