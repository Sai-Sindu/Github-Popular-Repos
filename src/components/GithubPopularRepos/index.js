import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class GithubPopularRepo extends Component {
  state = {
    activeId: languageFiltersData[0].id,
    repositoryList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getRepositoryList()
  }

  getRepositoryList = async () => {
    const {activeId} = this.state
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeId}`
    const response = await fetch(apiUrl)
    console.log(response)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.popular_repos.map(eachRepo => ({
        name: eachRepo.name,
        id: eachRepo.id,
        avatarUrl: eachRepo.avatar_url,
        forksCount: eachRepo.forks_count,
        issuesCount: eachRepo.issues_count,
        starsCount: eachRepo.stars_count,
      }))
      this.setState({
        repositoryList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else if (response.status === 401) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  getActiveIdLanguages = id => {
    this.setState({activeId: id}, this.getRepositoryList)
  }

  renderInProgressStatus = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderSuccessStatusRepositoryList = () => {
    const {repositoryList} = this.state
    return (
      <ul className="repository-list-container">
        {repositoryList.map(eachRepository => (
          <RepositoryItem
            repositoryItemDetails={eachRepository}
            key={eachRepository.id}
          />
        ))}
      </ul>
    )
  }

  renderFailureStatus = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-text">Something Went Wrong</h1>
    </div>
  )

  renderStatusContainer = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderInProgressStatus()
      case apiStatusConstants.success:
        return this.renderSuccessStatusRepositoryList()
      case apiStatusConstants.failure:
        return this.renderFailureStatus()
      default:
        return null
    }
  }

  render() {
    const {activeId} = this.state
    return (
      <div className="github-popular-repos-container">
        <h1 className="github-popular-repos-title">Popular</h1>
        <ul className="language-filter-item-container">
          {languageFiltersData.map(eachLanguage => (
            <LanguageFilterItem
              filteredLanguageDetails={eachLanguage}
              key={eachLanguage.id}
              getActiveIdLanguages={this.getActiveIdLanguages}
              isActive={activeId === eachLanguage.id}
            />
          ))}
        </ul>
        {this.renderStatusContainer()}
      </div>
    )
  }
}
export default GithubPopularRepo
