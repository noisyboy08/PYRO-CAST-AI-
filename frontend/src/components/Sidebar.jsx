import React from 'react'
import { Home, Target, Info } from 'lucide-react'
import { TubelightNavbar } from './ui/TubelightNavbar'

const Sidebar = () => {
  const navItems = [
    { name: 'Home', url: '/', icon: Home },
    { name: 'Predict', url: '/predict', icon: Target },
    { name: 'About', url: '/about', icon: Info }
  ]

  return <TubelightNavbar items={navItems} />
}

export default Sidebar
