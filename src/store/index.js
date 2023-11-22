import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    rotation: 150,
    zoom: 20,
    configuration: { 
        type: {
          id: 1, name: 'Atella Studio',mymy: 'Studio', sub_title: '266 Gross sq. ft.', price: 185000, image: require('@/assets/images/houses/atella_type_studio.png'), rotation: 100 
        },
        color: {},
        exterior: {
          id: 1, name: 'Standard', filezname: 'Regular', price: 0, image: require('@/assets/images/houses/appliance_standard.png'), rotation: 150
        },
        blind: {},
    },
    installation: 0,
    deposit: 1000,
    user: { address: '', info: {}},
    configTab: { page: '', title: '', sub_title: ''},
    types: [
      {id: 1, name: 'Atella Studio', filezname: 'Studio', sub_title: '266 Gross sq. ft.', price: 185000, image: require('@/assets/images/houses/atella_type_studio.png'), rotation: 180 },
      {id: 2, name: 'Atella One', filezname: 'OneBed', sub_title: '373 Gross sq. ft.', price: 195000, image: require('@/assets/images/houses/atella_type_one.png'), rotation: 360}
    ],
    colors: [
      {id: 1, name: 'Light', fileznameme: 'Light', image: require('@/assets/images/houses/color_light.png'), rotation: 150},
      {id: 2, name: 'Dark', filezname: 'Dark', image: require('@/assets/images/houses/color_dark.png'), rotation: 150},
      {id: 3, name: 'Neutral', filezname: 'Neutral', image: require('@/assets/images/houses/color_neutral.png'), rotation: 150}
    ],
    exterior_decks: [
      {id: 1, name: 'Standard', filezname: 'Regular', price: 0, image: require('@/assets/images/houses/appliance_standard.png'), rotation: 150},
      {id: 2, name: 'Extra Wide', filezname: 'Extended', price: 2500, image: require('@/assets/images/houses/appliance_extended.png'), rotation: 150}
    ],
    
    blinds: [
      {id: 1, name: 'No Blinds', filezname: 'noblinds', price: 0, image: require('@/assets/images/houses/no_blinds.png'), rotation: 150},
      {id: 2, name: 'Roller Blinds', filezname: 'rollerblinds', price: 2500, image: require('@/assets/images/houses/roller_blinds.png'), rotation: 150}
    ],
    cost_modal: false,
    cost_modal2:false,
    hide_tab:false,
    rental_modal:false,
    appointment_modal: false,
    run_cal:false
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
      state.run_cal= true;
    },
    noTabModal(state) {
      state.cost_modal = true
      state.hide_tab=true;
      state.rental_modal=false;
      state.run_cal= true;
   

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
      state.run_cal= false;
    },
    closeCostModal(state) {
      state.cost_modal = false
      state.run_cal= false;
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
