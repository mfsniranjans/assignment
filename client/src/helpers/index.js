import _ from "lodash"

export function getFlickrPhotoUrl(image, size) {
  return `https://live.staticflickr.com/${image?.server}/${image?.id}_${image?.secret}_${size}.jpg`
}

export function isFavorite(imageId, favoriteImages) {
  return Boolean(_.find(favoriteImages, { id: imageId }))
}
