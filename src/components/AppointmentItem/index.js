// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {eachDetail, onClick} = props
  const {id, titleText, formatDate, isStarred} = eachDetail
  const starImage = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onFavorite = () => {
    onClick(id)
  }
  return (
    <li className="list">
      <div>
        <div className="flex">
          <p>{titleText}</p>
          <button type="button" data-testid="star" className="btn">
            <img
              src={starImage}
              alt="star"
              className="starImage"
              onClick={onFavorite}
            />
          </button>
        </div>
        <p>{formatDate}</p>
      </div>
    </li>
  )
}
export default AppointmentItem
