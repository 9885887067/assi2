import {Component} from 'react'
import {v4} from 'uuid'

import './App.css'
const colourList = ['yellow', 'green', 'orange', 'brown', 'blue']

class App extends Component {
  state = {
    isTrue: false,
    latestList: [],
    username: '',
    password: '',
    website: '',
    isShow: false,
  }

  listenWebsite = e => {
    this.setState({
      website: e.target.value,
    })
  }

  listenUsername = e => {
    this.setState({
      username: e.target.value,
    })
  }

  listenPassword = e => {
    this.setState({
      password: e.target.value,
    })
  }
  
  addContent = event => {
    event.preventDefault()
    
    const {website, username, password} = this.state
    
    const initial = website.slice(0, 1).toUpperCase()
    
    const classValue = colourList[Math.floor(Math.random() * 5)]

    const newValues = {
      id: v4(),
      initialValue: initial,
      userName: username,
      webSite: website,
      passWord: password,
      classAdd: classValue,
    }
    
    
    this.setState(prevState => ({
      latestlist: [prevState.latestList, newValues],
      website: '',
      username: '',
      password: '',
      isTrue: true,
      searchInput: '',
    }))
  }

  showPassword = e => {
    if (e.target.checked) {
      this.setState({isShow: true})
    } else {
      this.setState({
        isShow: false,
      })
    }
  }

  searchList = e => {
    this.setState({
      searchInput: e.target.value,
    })
  }

  deleteItem = id => {
    const {latestList} = this.state
    const newList = latestList.filter(value => value.id !== id)
    const caseOf = newList.length !== 0
    this.setState({
      latestList: newList,
      isTrue: caseOf,
    })
  }

  render() {
    const {website, username, password, latestList, isShow, searchInput} =
      this.state
    let {isTrue} = this.state
    const newList = latestList.filter(value =>
      value.webSite.toLowerCase().includes(searchInput.toLowerCase()),
    )

    if (newList.length === 0) {
      isTrue = false
    } else {
      isTrue = true
    }

    return (
      <div className="app-container">
        <div className="responsive-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="image"
          />

          <div className="password-card-container">
            <form className="add-new-password" onSubmit={this.addContent}>
              <h1 className="heading">Add New Password</h1>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="webiste"
                  className="input-image"
                />
                <input
                  type="text"
                  className="input"
                  placeholder="Enter Website"
                  onChange={this.listenWebsite}
                  value={website}
                />
              </div>

              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="input-image"
                />
                <input
                  type="text"
                  className="input"
                  placeholder="Enter Username"
                  onChange={this.listenUsername}
                  value={username}
                />
              </div>

              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="input-image"
                />
                <input
                  type="password"
                  className="input"
                  placeholder="Enter Password"
                  onChange={this.listenPassword}
                  value={password}
                />
              </div>
              <button className="add-button" type="submit">
                Add
              </button>
            </form>

            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
              className="password-manager-image"
            />
          </div>

          <div className="sub-div2">
            <div className="first-div">
              <div className="your-password">
                <h1 className="heading-name">Your Passwords</h1>
                <p className="colored-text">{newList.length}</p>
              </div>
              <div className="search-holder">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  className="input-search"
                  alt="search"
                />
                <input
                  type="search"
                  placeholder="Search"
                  onChange={this.searchList}
                  value={searchInput}
                />
              </div>
            </div>
            <hr />
            <div className="show-passwords">
              <input
                type="checkbox"
                className="check-box"
                id="check"
                onChange={this.showPassword}
              />
              <label htmlFor="check">Show Passwords</label>
            </div>
            {isTrue && (
              <div className="empty-state">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  alt="no passwords"
                />
                <p>No Passwords</p>
              </div>
            )}

            {isTrue && (
              <ul>
                {newList.map(eachValue => (
                  <li
                    className="item-list"
                    id={eachValue.id}
                    key={eachValue.id}
                  >
                    <p className={`initial ${eachValue.classAdd}`}>
                      {eachValue.initialValue}
                    </p>
                    <div className="list-content">
                      <p>{eachValue.webSite}</p>
                      <p>{eachValue.userName}</p>
                      {!isShow && (
                        <img
                          src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                          alt="stars"
                        />
                      )}
                      {isShow && <p>{eachValue.passWord}</p>}
                    </div>
                    <button
                      type="button"
                      data-testid="delete"
                      onClick={() => this.deleteItem(eachValue.id)}
                    >
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                        alt="delete"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }
}
export default App
