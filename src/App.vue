<template>
  <div>
    <router-view></router-view>
    <cost-modal />
  </div>
</template>
<script>
import CostModal from './components/modals/CostModal.vue'
export default {
  components: { CostModal },
  
}
</script>

<style lang="scss">
*,
*:after,
*:before,
* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

.range-slider-fill {
    background-color: #888888 !important;
}

.range-slider-knob {
    display: block;
    position: absolute;
    top: 50%;
    left: 0;
    box-sizing: border-box;
    height: 20px;
    width: 20px;
    border: 1px solid #888888;
    border-radius: 50%;
    background-color: #888888 !important;
    box-shadow: 1px 1px rgba(0, 0, 0, 0.2);
    transform: translate(-50%, -50%);
    cursor: pointer;
}
</style>
