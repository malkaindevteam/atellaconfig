<template>
    <div class="wrapper">
        <div class="mb-8 fs-101rem">Price breakdown</div>
        <div class="flx column gap-24">
            <div class="flx gap-24 ai-c">
                <div class="flx-grow-1 br-16 centered gray-card">
                    <div>
                        <div class="fs-105rem">${{ computePrice(computedTotal) }}</div>
                        <span class="gray">Current configuration</span>
                    </div>
                </div>
                +
                <div class="flx-grow-1 br-16 centered gray-card">
                    <div>
                        <div class="fs-105rem">${{ computePrice(installation) }} <svg
                            @click="$store.commit('openInfoModal');"
                            width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect y="0.710938" width="21.1429" height="20.5714" rx="10.2857" fill="#97AAC0"/>
                            <path d="M10.1283 7.72454C9.95255 7.72454 9.79979 7.68687 9.67004 7.61154C9.5403 7.53202 9.43985 7.43157 9.3687 7.3102C9.29756 7.18464 9.26198 7.05699 9.26198 6.92725C9.26198 6.79332 9.29546 6.66357 9.36243 6.53802C9.43358 6.41246 9.53402 6.31201 9.66377 6.23668C9.79351 6.15716 9.94836 6.1174 10.1283 6.1174C10.3083 6.1174 10.4632 6.15716 10.5929 6.23668C10.7268 6.31201 10.8294 6.41246 10.9005 6.53802C10.9717 6.66357 11.0072 6.79332 11.0072 6.92725C11.0072 7.06117 10.9696 7.18883 10.8942 7.3102C10.8231 7.43157 10.7205 7.53202 10.5866 7.61154C10.4527 7.68687 10.2999 7.72454 10.1283 7.72454ZM9.4566 8.503H10.8063V15.4966H9.4566V8.503Z" fill="white"/>
                            </svg>
                            </div>
                        <span class="gray">Base installation cost</span>
                    </div>
                </div>
            </div>
            <div class="flx-grow-1 br-16 centered gray-card">
                <div>
                    <div class="fs-105rem">${{ computePrice(deposit) }} deposit</div>
                    <span class="gray">Feel free to change your mind. Reservations are fully refundable</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import priceMixin from '@/mixins/priceMixin';

export default {
    name: 'GrandTotalCard',
    mixins: [priceMixin],
    computed: {
        ...mapState({
            installation: (state) => state.installation,
            deposit: (state) => state.deposit
        })
    },
    methods: {
    goToCustom() {
        this.$router.push({
        name: "",
        
      });
      this.$router.push({
        name: "",
        query: { name: "a" },
      });
    },
  },
}
</script>
<style lang="scss" scoped>
.wrapper {
    container-type: inline-size;
}
@container(inline-size <= 500px) {
    .gap-24 {
        gap: 8px
    }
    .br-16 {
        border-radius: 9px
    }
    .gray-card{
        padding: 16px;
        span {
            font-size: 0.84rem;
            line-height: 1.3;
        }
    }
}
</style>