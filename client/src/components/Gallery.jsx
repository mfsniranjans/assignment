import { useContext, useEffect, useState } from 'react';
import context from '../context';
import { api } from '../helpers/api';
import { Image } from './Image';

function Gallery() {
  const {
    images,
    coordinates,
    addImages,
    purgeImages,
    setImagesPages,
    imagesPage,
    setView,
    fetchFavorites
  } = useContext(context)
  const [resPage, setResPage] = useState(1)
  useEffect(() => {
    api
      .get(`/favorite`)
      .then(apiResponse => {
        fetchFavorites(apiResponse?.data?.data || [])
      })
      .catch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    api
      .get(`/search/${coordinates[0]}/${coordinates[1]}/1`)
      .then(async apiResponse => {
        await purgeImages()
        addImages(apiResponse?.data?.data?.photos?.photo || [])
        setResPage(apiResponse?.data?.data?.photos?.pages || 1)
      })
      .catch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coordinates])
  useEffect(() => {
    if (imagesPage > 1) {
      api
        .get(`/search/${coordinates[0]}/${coordinates[1]}/${imagesPage}`)
        .then(async apiResponse => {
          addImages(apiResponse?.data?.data?.photos?.photo || [])
          setResPage(apiResponse?.data?.data?.photos?.pages || 1)
        })
        .catch()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imagesPage])
  if (images?.length) {
    return (
      <div className="right-2 top-0 bottom-2 left-2 md:left-auto fixed md:max-w-xl overflow-y-scroll rounded-lg shadow-lg p-8 bg-white md:m-3 md:right-14">
        <div className="flex w-full justify-between">
          <p className="text-3xl">🌎 Images around this place</p>
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
            images.map((image) => {
              return (
                <Image
                  image={image}
                  key={image?.id}
                />
              )
            })
          }
        </section>
        {
          imagesPage < resPage &&
          <div className="flex justify-center pt-4">
            <button
              onClick={() => {
                setImagesPages(imagesPage + 1)
              }}
              className="cursor-pointer bg-blue-400 transition hover:bg-blue-600 text-white hover:bg-teal-500 text-teal-100 py-2 px-4 rounded inline-flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span className='px-2'>Load more</span>
            </button>
          </div>
        }
      </div>
    )
  }
  return null
}

export default Gallery
