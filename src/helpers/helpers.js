const getOffset = (map, offsetx, offsety) => {

    const scale = Math.pow(2, map.zoom)
    const worldCoordinateCenter = map.getProjection().fromLatLngToPoint(map.center)
    const pixelOffset = new google.maps.Point((offsetx/scale) || 0,(offsety/scale) ||0)

    const worldCoordinateNewCenter = new google.maps.Point(
        worldCoordinateCenter.x - pixelOffset.x,
        worldCoordinateCenter.y + pixelOffset.y
    );

    const newCenter = map.getProjection().fromPointToLatLng(worldCoordinateNewCenter)

    return newCenter

}

export default getOffset