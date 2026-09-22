// @see https://github.com/tomickigrzegorz/leaflet-examples/blob/1c10e0f8f7daefaa1b3abe2d67aaf4ed4c09e72e/docs/67.add-data-attribute-to-marker/script.js#L30
L.PiegeIcon = L.DivIcon.extend({
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

export function selectPoint(point) {
  const allPoints = document.querySelectorAll(".leaflet-marker-poste");
  allPoints.forEach((p) => p.classList.remove("leaflet-marker-poste-selected"));

  if (!point) {
    return;
  }

  const marker = document.querySelector('[data-id="' + point.id + '"]');
  L.DomUtil.addClass(marker, "leaflet-marker-poste-selected");
}

export function toLeafletMarker(point) {
  return L.marker([point.coordonnees.lat, point.coordonnees.lng], {
    icon: new L.PiegeIcon({
      iconSize: [25, 25],
      className: "leaflet-marker-poste",
      html: `<div>${point.idPiege}</div>`,
      data: { id: point.id },
    }),
  });
}
