import React from 'react'
import { Link } from 'react-router-dom'
import "./styles/index.scss"
import { classNames } from 'shared/lib/classNames/classNames'
import {useTheme} from "app/providers/ThemeProvider"
import { AppRouter } from './providers/router'

const App = () => {
  const {theme, toogleTheme} = useTheme()

  return (
    <div className={classNames('app', {}, [theme])}>
      <button onClick={toogleTheme}>Смена Темы</button>
      <Link to={'./'}>Главная страница</Link>
      <Link to={'./about'}>О сайте</Link>
      <AppRouter />
    </div>
  )
}

export default App