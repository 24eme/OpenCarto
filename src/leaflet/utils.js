// @see https://github.com/tomickigrzegorz/leaflet-examples/blob/1c10e0f8f7daefaa1b3abe2d67aaf4ed4c09e72e/docs/67.add-data-attribute-to-marker/script.js#L30
L.PosteIcon = L.DivIcon.extend({
  createIcon: function (oldIcon) {
    const divElement = L.DivIcon.prototype.createIcon.call(this, oldIcon);

    if (this.options.data) {
      for (const key in this.options.data) {
        divElement.dataset[key] = this.options.data[key];
      }
    }
    return divElement;
  },
});

export function selectPoste(map, poste) {
  map.eachLayer((layer) => {
    if (!(layer instanceof L.Marker)) {
      return;
    }

    const icon = layer._icon;
    L.DomUtil.removeClass(icon, "leaflet-marker-poste-selected");

    if (!poste) {
      return;
    }

    if (icon.dataset.id === poste.id) {
      L.DomUtil.addClass(layer._icon, "leaflet-marker-poste-selected");

      // Center avec offset
      // @see https://github.com/Leaflet/Leaflet/issues/859#issuecomment-7411258
      const zoom = map.getZoom();
      const size = map.getSize();
      const offset = size.y * 0.3; // centre au tier de la carte

      const projectedLatLng = map
        .project(layer.getLatLng(), zoom)
        .add([0, offset]);
      const unprojectedLatLng = map.unproject(projectedLatLng, zoom);
      map.setView(unprojectedLatLng, zoom);
    }
  });
}

export function toLeafletMarker(poste) {
  return L.marker([poste.coordonnees.lat, poste.coordonnees.lng], {
    icon: new L.PosteIcon({
      iconSize: [25, 25],
      className: "leaflet-marker-poste",
      html: `<div>${poste.idPoste}</div>`,
      data: { id: poste.id },
    }),
  });
}

export function leafletAddClass(el, className) {
  if (el === undefined) return;
  L.DomUtil.addClass(el, className);
}
