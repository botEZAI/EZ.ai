import {GoogleApiWrapper, InfoWindow, Map, Marker} from "google-maps-react";
import React from "react";
import "./GoogleMapPresenter.css"

class GoogleMapPresenter extends React.Component {

    render() {
        return (
            <div className={"GoogleMapPresenter"}>
                <Map google = {this.props.google}
                     zoom = {14}
                     initialCenter={{
                         lat: 40.854885,
                        lng: -88.081807
                     }}
                     onClick = {this.onMapClicked}
                >
                    <Marker name = {"Current location"} />
                    <InfoWindow>
                        <div>
                            <h1>test</h1>
                        </div>
                    </InfoWindow>
                </Map>
            </div>
            )

    }
}

export default GoogleApiWrapper ({
    apikey : "AIzaSyDcvQUQaNKEFF3Wu-m4pEdjbp5BR8u0ig4"
})(GoogleMapPresenter);