import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    rotation: 150,
    zoom: 20,
    configuration: { 
        type: {
          id: 1, name: 'Atella studio',mymy: 'Studio', sub_title: '455 Gross sq. fe.', price: 125000, image: require('@/assets/images/houses/atella_type_studio.png'), rotation: 100 
        },
        color: {},
        exterior: {},
        blind: {},
    },
    installation: 10000,
    deposit: 1000,
    user: { address: '', info: {}},
    configTab: { page: '', title: '', sub_title: ''},
    types: [
      {id: 1, name: 'Atella studio', filezname: 'Studio', sub_title: '455 Gross sq. fe.', price: 125000, image: require('@/assets/images/houses/atella_type_studio.png'), rotation: 180 },
      {id: 2, name: 'Atella one', filezname: 'OneBed', sub_title: '455 Gross sq. fe.', price: 150000, image: require('@/assets/images/houses/atella_type_one.png'), rotation: 360}
    ],
    colors: [
      {id: 1, name: 'light', fileznameme: 'Light', image: require('@/assets/images/houses/color_light.png'), rotation: 150},
      {id: 2, name: 'dark', filezname: 'Dark', image: require('@/assets/images/houses/color_dark.png'), rotation: 150},
      {id: 3, name: 'neutral', filezname: 'Neutral', image: require('@/assets/images/houses/color_neutral.png'), rotation: 150}
    ],
    exterior_decks: [
      {id: 1, name: 'Standard', filezname: 'Regular', price: 0, image: require('@/assets/images/houses/appliance_standard.png'), rotation: 150},
      {id: 2, name: 'Extra wide', filezname: 'Extended', price: 2500, image: require('@/assets/images/houses/appliance_extended.png'), rotation: 150}
    ],
    
    blinds: [
      {id: 1, name: 'No blinds', filezname: 'noblinds', price: 0, image: require('@/assets/images/houses/no_blinds.png'), rotation: 150},
      {id: 2, name: 'Roller blinds', filezname: 'rollerblinds', price: 2500, image: require('@/assets/images/houses/roller_blinds.png'), rotation: 150}
    ],
    cost_modal: false,
    cost_modal2:false,
    hide_tab:false,
    rental_modal:false,
    appointment_modal: false
  },
  mutations: {
    setSelected(state, payload) {
      if(payload.name === 'type') {
        state.configuration.type = payload.item
      }else if(payload.name === 'color') {
        state.configuration.color = payload.item
        // const i = state.configuration.color
        // if(i.id === payload.item.id) {
        //   state.configuration.color = ''
        // }else {
        // }
      }else if(payload.name === 'exterior') {
        state.configuration.exterior = payload.item
        // const i = state.configuration.exterior
        // if(i.id === payload.item.id) {
        //   state.configuration.exterior = ''
        // }else {
        //   state.configuration.exterior = payload.item
        // }
      }else if(payload.name === 'blind') {
        state.configuration.blind = payload.item
        // const i = state.configuration.blind
        // if(i.id === payload.item.id) {
        //   state.configuration.blind = ''
        // }else {
        //   state.configuration.blind = payload.item
        // }
      }
      state.rotation = payload.item.rotation
    },
    setAddress(state, payload) {
      state.user.address = payload
    },
    setUserInfo(state, payload) {
      state.user.info = payload
    },
    openCostModal(state) {
      state.cost_modal = true
      state.hide_tab=false;
      state.rental_modal=false;
    },
    noTabModal(state) {
      state.cost_modal = true
      state.hide_tab=true;
      state.rental_modal=false;

    },
    openInfoModal(state) {
      state.cost_modal2 = true
      state.hide_tab=false;
      state.rental_modal=false;
    },
    openRentalModal(state) {
     
      state.rental_modal=true;
    },
    closeRentalModal(state){
      state.rental_modal=false;
    },
    noInfoModal(state) {
      state.cost_modal2 = false
      state.hide_tab=false;
      state.rental_modal=false;

    },
    closeCostModal(state) {
      state.cost_modal = false
     
    },
    openAppointmentModal(state) {
      state.appointment_modal = true
    },
    closeAppointmentModal(state) {
      state.appointment_modal = false
    },
    setRotation(state, payload) {
      state.rotation = payload
    },
    setConfigTab(state, payload) {
      state.configTab.page = payload.page
      state.configTab.title = payload.title
      state.configTab.sub_title = payload.sub_title
    }
  },
  actions: {
  },
  getters: {
  }
})
