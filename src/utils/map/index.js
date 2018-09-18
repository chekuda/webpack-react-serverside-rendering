export const getOffset = (map, offsetx, offsety) => {
  const scale = Math.pow(2, map.zoom)
  const worldCoordinateCenter = map.getProjection().fromLatLngToPoint(map.center)
  const pixelOffset = new google.maps.Point((offsetx / scale) || 0, (offsety / scale) || 0) // eslint-disable-line

  const worldCoordinateNewCenter = new google.maps.Point( // eslint-disable-line
    worldCoordinateCenter.x - pixelOffset.x,
    worldCoordinateCenter.y + pixelOffset.y
  )

  const newCenter = map.getProjection().fromPointToLatLng(worldCoordinateNewCenter)

  return newCenter
}

export const spotsWithinBounds = (bounds, spots) => {
  return spots.filter(ele =>
    ele.lat < bounds.ne.lat &&
    ele.lat > bounds.se.lat &&
    ele.lng > bounds.nw.lng &&
    ele.lng < bounds.se.lng
  )
}
