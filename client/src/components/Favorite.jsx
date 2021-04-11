import { useContext, useEffect } from 'react';
import context from '../context';
import { api } from '../helpers/api';
import { Image } from './Image';

function Favorite() {
  const {
    images,
    fetchFavorites,
    favorites,
    setView
  } = useContext(context)
  useEffect(() => {
    api
      .get(`/favorite`)
      .then(apiResponse => {
        fetchFavorites(apiResponse?.data?.data || [])
      })
      .catch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  if (images?.length) {
    return (
      <div className="right-2 top-0 bottom-2 left-2 md:left-auto fixed md:max-w-xl overflow-y-scroll rounded-lg shadow-lg p-8 bg-white md:m-3 md:right-14">
        <div className="flex w-full justify-between">
          <p className="text-3xl">⭐ Favorite Images</p>
          {
            (images?.length) &&
            <button
              onClick={() => {
                setView(null)
              }}
            >
              ❌
            </button>
          }
        </div>
        <br />
        <section id="photos" className="py-3 grid grid-cols-1 md:grid-cols-3 gap-4">
          {
            favorites.map((image) => {
              return (
                <Image
                  key={image?.id}
                  image={image}
                />
              )
            })
          }
        </section>
      </div >
    )
  }
  return null
}

export default Favorite
