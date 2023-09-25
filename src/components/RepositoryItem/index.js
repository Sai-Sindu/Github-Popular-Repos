// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {repositoryItemDetails} = props
  const {
    name,
    issuesCount,
    forksCount,
    starsCount,
    avatarUrl,
  } = repositoryItemDetails

  return (
    <li className="repository-item-card">
      <img src={avatarUrl} alt={name} className="avatar-img" />
      <h1 className="repository-item-name">{name}</h1>
      <div className="count-container">
        <div className="count-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
            className="icon-img"
          />
          <p className="count-text">{`${starsCount} stars`}</p>
        </div>
        <div className="count-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
            className="icon-img"
          />
          <p className="count-text">{`${forksCount} forks`}</p>
        </div>
        <div className="count-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
            className="icon-img"
          />
          <p className="count-text">{`${issuesCount} open issues`}</p>
        </div>
      </div>
    </li>
  )
}
export default RepositoryItem
