<template>
    <div>
        <div class="mb-24">
            <div class="input-wrapper relative mb-4">
                <i>
                    <svg xmlns="http://www.w3.org/2000/svg" height="19" viewBox="0 0 19.658 19.661">
                        <path d="M10.248,19.051a9.373,9.373,0,1,1,9.373-9.373A9.386,9.386,0,0,1,10.248,19.051Zm0-17.374a8,8,0,1,0,8,8A8.01,8.01,0,0,0,10.248,1.676Zm9.6,18.29a.678.678,0,0,1-.485-.2l-1.829-1.829a.685.685,0,0,1,.969-.969L20.334,18.8a.69.69,0,0,1,0,.969A.678.678,0,0,1,19.85,19.966Z" transform="translate(-0.875 -0.305)"/>
                    </svg>
                </i>
                <input v-model="address" @input="clearRes" class="w-100" id="search_input" type="search" data-type="icon" placeholder="Enter your current address">
            </div>
            <div v-if="response.active" class="flx gap-4 ai-c">
                
            </div>
        </div>
        <div id="map" class="map mb-24"></div>
        <div id="infowindow-content" ref="infowindow_content">
            <img src="" width="16" height="16" id="place-icon" />
            <span id="place-name" ref="name" class="title"></span><br />
            <span id="place-address"></span>
        </div>
        <div class="flx jc-sb">
            <button @click="$emit('go-back')" class="button-outline br-32 btn-md icon-btn icon-left gap-4 scale-in">
                <!-- <svg xmlns="http://www.w3.org/2000/svg" height="13.501" viewBox="0 0 15.243 13.501">
                    <path d="M15.216,11.51a.919.919,0,0,1,.007,1.294l-4.268,4.282H22.218a.914.914,0,0,1,0,1.828H10.955L15.23,23.2a.925.925,0,0,1-.007,1.294.91.91,0,0,1-1.287-.007L8.142,18.647h0a1.026,1.026,0,0,1-.19-.288.872.872,0,0,1-.07-.352.916.916,0,0,1,.26-.64l5.794-5.836A.9.9,0,0,1,15.216,11.51Z" transform="translate(-7.882 -11.252)"/>
                </svg> -->
                Back
            </button>
            <button @click="$emit('toggle', address)" class="button-primary br-32 btn-md gap-4 icon-btn icon-right scale-in" :class="{ 'button-disabled' : address == '' || !response.available }" :disabled="!address && !response.available ? true : false">
                Continue
                <!-- <svg xmlns="http://www.w3.org/2000/svg" height="13.501" viewBox="0 0 15.243 13.501">
                    <path d="M15.791,11.51a.919.919,0,0,0-.007,1.294l4.268,4.282H8.789a.914.914,0,0,0,0,1.828H20.052L15.777,23.2a.925.925,0,0,0,.007,1.294.91.91,0,0,0,1.287-.007l5.794-5.836h0a1.026,1.026,0,0,0,.19-.288.872.872,0,0,0,.07-.352.916.916,0,0,0-.26-.64l-5.794-5.836A.9.9,0,0,0,15.791,11.51Z" transform="translate(-7.882 -11.252)" fill="#fff"/>
                </svg> -->
            </button>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'AddressPicker',
    computed: {
        ...mapState({
            old_address: (state) => state.user.address
        })
    },
    data() {
        return {
            marker: null,
            infowindow: null,
            address: '',
            latitude: '',
            longitude: '',
            response: { active: false, available: false, message: ''},            
        }
    },
    address(newAddress) {
        this.resetInput(newAddress)
    },
    methods: {
        clearRes() {
            if(this.response.active) {
                this.response.active = false
                this.response.available = false
                this.message = ''
            }
        },
        resetInput(input) {
            if(input == '') {
                this.resetInput()
            }
        },
        setAddress() {
            // console.log(this.old_address)
            // this.address = this.old_address
            // this.response.available = true
        },
        initializeMap() {
            const google = window.google
            const input = document.querySelector('#search_input')
            const map = new google.maps.Map(document.getElementById('map'), {
                center: { lat: 43.70, lng: -79.40 }, // Center the map on Greater Toronto
                scrollwheel: true,
                zoom: 10, // Set an appropriate zoom level for the area
                disableDefaultUI: true, // Disable the default UI controls

            });
            const marker = new google.maps.Marker({
                map: map,
            });
            const options = {
                componentRestrictions: { country: 'ca' }, // Restrict to Canada
                fields: ['address_components', 'geometry', 'icon', 'name'],
                strictBounds: false,  // Ensure the place results are within the specified bounds
                types: ['address',],
            };
            const autocomplete = new google.maps.places.Autocomplete(input, options);
            autocomplete.bindTo('bounds', map)
            const infowindow = new google.maps.InfoWindow();
            const infowindowContent = document.getElementById("infowindow-content");

            infowindow.setContent(infowindowContent);


            autocomplete.addListener('place_changed', () => {
                
                marker.setVisible(false)
                let place = autocomplete.getPlace();
                if(!place.geometry || !place.geometry.location) {
                    this.response.active = true
                    this.response.available = false
                    this.response.message = 'Sorry, we are not available in this location yet'
                    return
                }
                if(place.geometry.viewport) {
                    map.fitBounds(place.geometry.viewport);
                }else {
                    map.setCenter(place.geometry.location);
                    map.setZoom(17);
                }
                marker.setPosition(place.geometry.location);
                marker.setVisible(true);
                this.response.active = true
                this.response.available = true
                this.response.message = 'Congrats! We\'re available in this location'
                let address = "";
                if (place.address_components) {
                    address = [
                        (place.address_components[0] &&
                        place.address_components[0].short_name) || "",
                        (place.address_components[1] &&
                        place.address_components[1].short_name) || "",
                        (place.address_components[2] &&
                        place.address_components[2].short_name) || "",
                    ].join(" ");
                }
                infowindowContent.children["place-icon"].src = place.icon;
                infowindowContent.children["place-name"].textContent = place.name;
                infowindow.open(map, marker);

                this.address = address
                this.latitude = place.geometry.location.lat()
                this.longitude = place.geometry.location.lng()
            })
        }
    },
    mounted() {
        this.initializeMap()
        this.old_address ? this.setAddress() : ''
    }
}
</script>

<style lang="scss" scoped>
input {
    height: 54px;
}

.button-primary {
    background-color: #0071E3;
    color: white;
}
.map {
    height: 250px;
    border: 1px solid #F0F0F0;
    border-radius: 16px;

}
#infowindow-content {
  display: none;
}
#map #infowindow-content {
  display: inline;
}
#infowindow-content .title {
  font-weight: bold;
}
</style>