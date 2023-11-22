<template>
  <section class="">
    <div class="container d-flex justify-content-between mb-4">
      <div class="col-12">
        <ul v-if="hide_tab" class="flx gap-8 mag">
          <li v-for="tab in tabs" :key="tab" class="br-32">
            <a
              class="br-32"
              :class="{ active: tab === selected }"
              @click="setTab(tab)"
            >
              {{ tab }}
            </a>
          </li>
        </ul>

        <slot></slot>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    tabs: {
      type: Array,
      required: true,
    },
    selected: {
      type: String,
      required: true,
    },
    hide_tab: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    ...mapState({
      cost_modal: (state) => state.cost_modal,
      cost_modal2: (state) => state.cost_modal2,
    }),
  },
  // mounted() {
  //   if (this.selected == "Rental Property") {
  //     this.$store.commit("closeCostModal");
  //     this.$store.commit("openRentalModal");
  //   }
  // },

  // watch: {
  //   selected(r) {
  //     if (r == "Rental Property") {
  //       this.$store.commit("closeCostModal");
  //       this.$store.commit("openRentalModal");
  //     }
  //   },
  // },
  methods: {
    setTab(tab) {
      this.$emit("selected", tab);
    },
  },
};
</script>

<style lang="scss" scoped>
ul {
  flex-wrap: wrap;
}
li {
  a {
    color: #8f8f8f;
    padding: 8px 16px;
    border: 1px solid #8f8f8f;
    height: 40px;
    display: inline-block;
    cursor: pointer;
  }
  .active {
    border: 1px solid #8f8f8f;
    background: #d2b486;
    color: white;
  }
}
.flx {
  display: flex;
}

.mag {
  margin-bottom: 20px;
}
.gray {
  color: var(--gray);
}
</style>
