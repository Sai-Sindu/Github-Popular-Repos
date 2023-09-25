// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {filteredLanguageDetails, getActiveIdLanguages, isActive} = props
  const {id, language} = filteredLanguageDetails

  const activeButtonClassName = isActive ? 'active-button' : 'not-active-button'

  const onClickGetActiveIdLanguage = () => {
    getActiveIdLanguages(id)
  }

  return (
    <li className="language-filter-item-card">
      <button
        className={activeButtonClassName}
        type="button"
        onClick={onClickGetActiveIdLanguage}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
