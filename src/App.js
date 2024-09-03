import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './App.css'

class App extends Component {
  state = {travelList: {}, showLoader: true}

  componentDidMount() {
    this.getTravelingPlaces()
  }

  getTravelingPlaces = async () => {
    const apiUrl = 'https://apis.ccbp.in/tg/packages'
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = response.json()
    console.log(data)
    const updatedData = data.packages.map(eachOne => ({
      id: eachOne.id,
      name: eachOne.name,
      imageUrl: eachOne.image_url,
      description: eachOne.description,
    }))
    this.setState({
      travelList: updatedData,
      showLoader: false,
    })
  }

  render() {
    const {travelList, showLoader} = this.state
    console.log(showLoader)
    console.log(travelList)

    return (
      <>
        {showLoader ? (
          <div data-testid="loader">
            <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
          </div>
        ) : (
          <div className="bg-container">
            <h1 className="heading">Travel Guide</h1>
            <ul className="tarvel-list">
              {travelList.map(each => (
                <li className="list" key={each.id}>
                  <img src={each.imageUrl} key={each.id} alt={each.name} />
                  <div className="about">
                    <h1 className="sub-head">{each.name}</h1>
                    <p className="description">{each.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </>
    )
  }
}

export default App
