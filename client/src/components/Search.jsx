
import { useState, useContext, useEffect } from 'react';
import context from '../context';
import { api } from '../helpers/api';

function Search() {
  const { map, setCoordinates, setSearchInput, searchInput, setView } = useContext(context)
  const [value, setValue] = useState('')
  const [searchResponse, setSearchResponse] = useState([])
  useEffect(() => {
    if (searchInput) {
      api
        .get(`/search/${searchInput}`)
        .then(apiResponse => {
          setSearchResponse(apiResponse?.data?.data)
        })
        .catch(() => {
          setSearchResponse([])
        })
    } else {
      setSearchResponse([])
    }
  }, [searchInput])
  const [timeoutF, setTimeoutF] = useState(null)
  return (
    <div className="grid grid-cols-1 m-4 md:grid-cols-2 lg:grid-cols-4">
      <div className="relative">
        <input
          type="text"
          name="search"
          placeholder="Type and enter"
          value={value}
          onChange={(e) => {
            const val = e.target.value
            setValue(val)
            if (timeoutF) clearTimeout(timeoutF);
            setTimeoutF(setTimeout(() => {
              setSearchInput(val);
            }, 1000))
          }}
          className="bg-white w-full h-12 px-12 rounded-full focus:outline-none shadow-lg text-lg"
        />
        <div className='absolute left-4 top-0 mt-3 mr-4'>
          🔍
      </div>
        {
          (value || searchInput) &&
          <button
            className='absolute right-4 top-0 mt-3 mr-4'
            onClick={() => {
              setSearchResponse([])
              setValue('')
              setSearchInput('')
            }}
          >
            ❌
      </button>
        }
        {
          searchResponse.length > 0 &&
          <div className="w-full rounded-lg shadow-lg px-4 pb-3 flex md:flex-row flex-col bg-white mt-3">
            <ul className="bg-white w-full mt-2 ">
              {searchResponse.map((item) => {
                return (
                  <li
                    key={item?.osm_id}
                    className="pl-8 pr-2 py-2 border-b-2 border-gray-100 relative cursor-pointer hover:bg-gray-100 hover:text-gray-900 last:border-b-0"
                    onClick={() => {
                      const coordinates = [item?.lat, item?.lon]
                      setCoordinates(coordinates)
                      map.setView(coordinates, 13)
                      setView('gallery')
                    }}
                  >
                    <p className="stroke-current absolute w-4 h-4 left-1 top-3">
                      📍
                  </p>
                    {item?.display_name}
                  </li>
                )
              })}
            </ul>
          </div>
        }
      </div>
    </div>
  )
}

export default Search
