import React from 'react'
import classNames from 'classnames'
import { Component, PropTypes } from 'react'
import Match from 'react-router/Match'
import Miss from 'react-router/Miss'
import Redirect from 'react-router/Redirect'

import Sidebar from './Sidebar'

class Home extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    menu: PropTypes.array.isRequired,
    pathname: PropTypes.string.isRequired,
    children: PropTypes.node,
  }

  static defaultProps = {
    isLoading: false,
    menu: [
      { label: 'Home' },
      { to: '/app', icon: 'dashboard', label: 'dashboard', activeOnlyWhenExact: true },
      {
        to: '/admin/orders',
        icon: 'inbox',
        label: 'orders',
        sub: [
          { to: '/admin/orders', label: 'orders', activeOnlyWhenExact: true },
        ],
      },
    ],
  }

  state = {
    collapsed: false,
    open: false,
  }

  handleToggleCollapsed = (event) => {
    event.preventDefault()
    this.setState({ collapsed: !this.state.collapsed }, () => {
      setTimeout(() => window.dispatchEvent(new Event('resize')), 300)
    })
  }

  handleToggleOffCanvas = (event) => {
    event.preventDefault()
    this.setState({ open: !this.state.open })
  }

  handleCloseOffCanvas = (event) => {
    event.preventDefault()
    this.setState({ open: false })
  }

  handleLinkClick = (event) => {
    const target = event.target

    let node
    if (target.tagName === 'A') {
      node = target
    }
    if (!node && target.parentNode.tagName === 'A') {
      node = target.parentNode
    }
    if (!node.parentNode.classList.contains('uk-parent')) {
      this.setState({ open: false })
    }
  }

  render() {
    const {
      handleToggleCollapsed,
      handleToggleOffCanvas,
      handleCloseOffCanvas,
      handleLinkClick,
    } = this
    const {
        user,
        isLoading,
        pathname,
        menu,
        children,
      } = this.props
    const { collapsed, open } = this.state
    return (
      <div
        className={classNames('tm-admin uk-flex uk-flex-column', {
          'sidebar-toggled': collapsed,
          'sidebar-open': open,
        })}
      >
        <div className="main uk-flex-item-1 uk-flex">
          <Sidebar
            isCollapsed={collapsed}
            menus={menu}
            onClick={open && handleLinkClick}
          />
          {/* {open && <div className="main-sidebar-shadow" onClick={handleCloseOffCanvas} />} */}
          <div className="main-content main-scroll uk-flex-item-1 uk-flex uk-flex-column uk-flex-space-between">
            <div className="uk-flex-item-auto">
              Something is coming up
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
