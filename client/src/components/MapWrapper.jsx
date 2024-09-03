import GoogleMapReact from "google-map-react";

const MapWrapper = () => {
	const defaultProps = {
		center: {
			lat: 10.99835602,
			lng: 77.01502627,
		},
		zoom: 0,
	};
	return (
		<div className="">
			<GoogleMapReact bootstrapURLKeys={{ key: "" }} defaultCenter={defaultProps.center} defaultZoom={defaultProps.zoom}></GoogleMapReact>
		</div>
	);
};

export default MapWrapper;
