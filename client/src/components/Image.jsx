import { useContext } from "react"
import context from "../context"
import { getFlickrPhotoUrl, isFavorite } from "../helpers"
import { api } from "../helpers/api"

export const Image = ({
  image
}) => {
  const {
    favorites,
    updateFavorites
  } = useContext(context)
  const imageTitle = image?.title || image?.id
  return (
    <div
      className="relative"
    >
      <a
        href={getFlickrPhotoUrl(image, 'b')}
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="w-full h-40 object-cover rounded-md"
          src={getFlickrPhotoUrl(image, 'q')}
          alt={imageTitle} />
      </a>
      <button
        className={`absolute right-1 top-2 p-1 ${isFavorite(image?.id, favorites) ? 'bg-yellow-500 text-white' : 'bg-white text-yellow-500'} text-center transition border border-yellow-500 rounded-full hover:bg-yellow-500 focus:outline-none hover:text-white`}
        onClick={() => {
          api
            .post(`/favorite/${image?.id}`, image)
            .then(async apiResponse => {
              updateFavorites(apiResponse?.data?.data || [])
            })
            .catch()
        }}
      >
        <svg
          className="w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
          />
        </svg>
      </button>
    </div>
  )
}
