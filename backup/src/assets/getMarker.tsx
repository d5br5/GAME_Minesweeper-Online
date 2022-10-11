const {naver} = window;

export const getMarker = (latlngs: string[][]) => {
	let geolocations = [];
	for (let i = 0; i < latlngs.length; i++) {
		let [lat, lng] = latlngs[i];
		const latF = parseFloat(lat);
		const lngF = parseFloat(lng);
		let latlng = new naver.maps.LatLng(latF, lngF);
		geolocations.push(latlng);
	}
	return geolocations;
};
