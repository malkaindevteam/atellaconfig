<template>
    <div id="overlay"  @click="handleClick"  ></div>
</template>

<script>

export default {
    name: 'BackdropOverlay',
    props: ['index', 'opacity'],
    computed: {
        computedIndex() {
            return this.index
        },
        computedOpacity() {
            return this.opacity
        }
    },
    methods: {
    handleClick() {
      this.firstClickFunction();
      this.secondClickFunction();
    },
    firstClickFunction() {
        this.$store.commit('closeCostModal')
    },
    secondClickFunction() {
        this.$store.commit('noInfoModal')
    }
  }
   
}
</script>
<style lang="scss" scoped>
#overlay{
    --opacity: v-bind(computedOpacity);
    background-color: rgba($color: #000000, $alpha: var(--opacity));
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: v-bind(computedIndex);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    cursor: pointer;
}
</style>