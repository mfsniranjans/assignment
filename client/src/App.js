import { useContext } from 'react'
import { MapContainer, TileLayer, Marker, useMapEvent } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import Search from './components/Search';
import Gallery from './components/Gallery';
import context from './context';
import { REACT_APP_DEFAULT_ZOOM } from './config/constants';
import Favorite from './components/Favorite';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

function SetViewOnClick({
  centerCoordinates,
  setCoordinates,
  setSearchInput,
  setView
}) {
  const map = useMapEvent('click', async (e) => {
    map.setView(e.latlng, map.getZoom(), {
      animate: true,
    })
    await setCoordinates([e.latlng.lat, e.latlng.lng])
    await setSearchInput('')
    await setView('gallery')
  })
  return null
}

function App() {
  const { coordinates, setMap, setCoordinates, setSearchInput, view, setView } = useContext(context)
  return (
    <>
      <MapContainer
        center={coordinates}
        zoom={REACT_APP_DEFAULT_ZOOM}
        className='fixed w-screen h-screen'
        zoomControl={false}
        whenCreated={setMap}
        maxBoundsViscosity={0.75}
        worldCopyJump={true}
        minZoom={3}
      >
        <SetViewOnClick
          centerCoordinates={coordinates}
          setCoordinates={setCoordinates}
          setSearchInput={setSearchInput}
          setView={setView}
        />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={coordinates} />
      </MapContainer>
      <div className="fixed">
        <Search />
        {view === 'gallery' && <Gallery />}
        {view === 'favorite' && <Favorite />}
        <div className="grid rounded-lg shadow-lg bg-white p-1 fixed right-2 top-20 md:top-2">
          <button
            className="px-3 py-2 border-b-2 border-gray-100"
            onClick={() => setView('favorite')}
            title="Favorite Photos"
          >⭐</button>
          <button
            className="px-3 py-2"
            onClick={() => setView('gallery')}
            title="Location Photos"
          >🌎</button>
        </div>
      </div>
    </>
  );
}

export default App;
