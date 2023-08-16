<template>
  <div>
    <transition name="fade">
      <backdrop v-if="cost_modal" :index="300" :opacity="0.5" />
    </transition>
    <transition name="zoom">
      <div v-if="cost_modal" class="modal-container jc-c ai-c">
        <div class="modal br-16 bg-white" v-if="!hide_tab">
          <div class="modal-top flx jc-sb ai-c">
            <h3>{{ selected }} Options</h3>
            <button class="br-50" @click="$store.commit('closeCostModal')">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="14.683"
                viewBox="0 0 14.647 14.683"
              >
                <path
                  d="M5648.416,3695.679l-5.629-5.655-5.6,5.59a1,1,0,1,1-1.412-1.415l5.6-5.592-5.584-5.61a1,1,0,1,1,1.418-1.411l5.583,5.608,5.623-5.61a1,1,0,1,1,1.412,1.417l-5.624,5.611,5.631,5.657a1,1,0,1,1-1.418,1.411Z"
                  transform="translate(-5635.478 -3681.291)"
                  fill="#6f7689"
                />
              </svg>
            </button>
          </div>
          <div class="flx column gap-24 mt-32">
            <tab-nav
              class="new"
              :hide_tab="!hide_tab"
              :tabs="['Cash', 'Finance', 'Rental Property', 'Retirement home']"
              :selected="selected"
              @selected="setSelected"
            >
              <tab-config :isSelected="selected === 'Cash'">
                <section class="">
                  <div class="mag">
                    Financing selection and terms will be confirmed after order
                  </div>
                  <div>
                    <div class="flx jc-sb table-head">
                      <h4>Reservation price</h4>
                      <h4>$192,000</h4>
                    </div>
                    <div class="table-row flx jc-sb gray">
                      <div>Federal Tax Credit</div>
                      <div>-$11,500</div>
                    </div>
                    <div class="table-row flx jc-sb gray">
                      <div>California Incentive</div>
                      <div>-$750</div>
                    </div>
                    <div class="table-row flx jc-sb gray">
                      <div>6 years savings range</div>
                      <div>-$1,750</div>
                    </div>
                    <div class="table-row flx jc-sb gray">
                      <div>Destination Fee</div>
                      <div>$70,050</div>
                    </div>
                  </div>
                </section>
              </tab-config>

              <tab-config :isSelected="selected === 'Finance'">
                <section class="">
                  <div class="mag">
                    Financing selection and terms will be confirmed after order
                  </div>
                  <div>
                    <div class="flx jc-sb table-head mb-16"></div>
                    <div class="table-row flx jc-sb">
                      <div class="mb-8">
                        <h4>Estimated cost</h4>
                        <span class="gray"
                          >CA$246,500 current configuration - CA$246,500 <br />
                          base installation cost</span
                        >
                      </div>

                      <h4>CA$246,500</h4>
                    </div>
                    <div class="mb-8">
                        <span class="gray">Down payment</span>
                        <div class="flx">
                          <div class="new-4 mb-4 flex-70">
                              <input  class="new-4" type="text" id="input1" name="input1" placeholder="CA$">
                          </div>
                          <div class="flex-30">
                              <input class="new-3" type="text" id="input2" name="input2" placeholder="%">
                          </div>
                        </div>
                        <div class="form-container">
                            <div class="input-container">
                              <span class="gray">Terms</span>
                              <input  class="new-1" type="text" id="input1" name="input1" placeholder="Years">
                            </div>
                            <div class="input-container pad-1">
                             <span class="gray">Interest rate</span>
                              <input class="new-1" type="text" id="input2" name="input2" placeholder="%">
                            </div>
                          </div>
                    </div>
                  </div>
                  <div class="new4">
                    <h3 class="new4">CA$246,500/mon</h3>
                    <p class="new4">CA$246,500</p>
                    <span class="gray">Tax and insurance not included</span>
                  </div>
                </section>
              </tab-config>

              <tab-config :isSelected="selected === 'Rental Property'">
                <section class="">
                  <div class="mag">
                    Pay only a portion of the full price with low down payment
                    and low monthly payments for the term of your lease
                  </div>
                  <div class="fix2 mag">
                    <div class="new-2">
                      <p class="grey">Rental income</p>
                      <div>$2000</div>
                    </div>

                    <div class="new-2">
                      <p class="grey">Monthly payment</p>
                      <div>$250</div>
                    </div>
                  </div>

                  <div class="fix2 mag">
                    <div class="new-2">
                      <p class="grey">Monthly cost of Atella</p>
                      <div>$1290</div>
                    </div>

                    <div class="new-2">
                      <p class="grey">Net profit</p>
                      <div>$2000</div>
                    </div>
                  </div>

                  <div>
                    <div class="flx jc-sb table-head">
                      <h4>Estimated amount</h4>
                      <h4>$350/mon</h4>
                    </div>
                    <div class="table-row flx jc-sb gray">
                      <div>Rental after saving</div>
                      <div>$150/mon</div>
                    </div>
                    <div class="table-row flx jc-sb gray">
                      <div>Destination fee</div>
                      <div>$750</div>
                    </div>
                  </div>
                </section>
              </tab-config>

              <tab-config :isSelected="selected === 'Retirement home'">
                <section>

                  <a>Coming soon</a>
                </section>
              </tab-config>
            </tab-nav>
          </div>
        </div>
        <div class="modal br-16 bg-white " v-if="hide_tab">
          <div class="flx jc-sb ai-c mb-16">
            <h2>
              Estimate monthly payments <br />
              with our calculator
            </h2>
            <button
              class="bg-white br-50"
              @click="$store.commit('closeCostModal')"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="14.683"
                viewBox="0 0 14.647 14.683"
              >
                <path
                  d="M5648.416,3695.679l-5.629-5.655-5.6,5.59a1,1,0,1,1-1.412-1.415l5.6-5.592-5.584-5.61a1,1,0,1,1,1.418-1.411l5.583,5.608,5.623-5.61a1,1,0,1,1,1.412,1.417l-5.624,5.611,5.631,5.657a1,1,0,1,1-1.418,1.411Z"
                  transform="translate(-5635.478 -3681.291)"
                  fill=""
                />
              </svg>
            </button>
          </div>

          <div class="modal-top flx column">
            <span class="gray">There are many ways to finance Backyard. and we’ll help you find
              the </span>
              <span class="gray"> best choice for you, Available rates, terms and products offerings
              will be</span>
              <span class="gray"> based on your unique financial situation</span>
          </div>
          <div>
            <div class="table-row flx jc-sb">
              <div class="mb-8 flx column">
                <h4>Estimated cost</h4>
                <span class="gray">CA$246,500 current configuration - CA$246,500</span>
                  <span class="gray"> base installation cost</span>
              </div>

              <h4>CA$246,500</h4>
            </div>
            <div class="mb-8">   
              <span class="gray">Down payment</span>
              <div class="flx">
                <div class="new-4 mb-4 flex-70">
                    <input  class="new-4" type="text" id="input1" name="input1" placeholder="CA$">
                </div>
                <div class="flex-30">
                    <input class="new-3" type="text" id="input2" name="input2" placeholder="%">
                </div>
              </div>

              <div class="form-container">
                <div class="input-container">
                  <span class="gray">Terms</span>
                  <input  class="new-1" type="text" id="input1" name="input1" placeholder="Years">
                </div>
                <div class="input-container pad-1">
                 <span class="gray">Interest rate</span>
                  <input class="new-1" type="text" id="input2" name="input2" placeholder="%">
                </div>
              </div>
            </div>
          </div>
          <div class="new4">
            <h3 class="new4">CA$246,500/mon</h3>
            <p class="new4">CA$246,500</p>
            <span class="gray">Tax and insurance not included</span>
          </div>
        </div>
      </div>
    </transition>
    <transition name="zoom">
      <div v-if="cost_modal2" class="modal-container jc-c ai-c">
        <div class="modal-2 br-16 bg-white">
          <div class="flx jc-sb ai-c mb-16">
            <h1>
              What's included in the base <br />
              installation cost? Everything
            </h1>
            <button
              class="br-50 bg-white"
              @click="$store.commit('noInfoModal')"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="14.683"
                viewBox="0 0 14.647 14.683"
              >
                <path
                  d="M5648.416,3695.679l-5.629-5.655-5.6,5.59a1,1,0,1,1-1.412-1.415l5.6-5.592-5.584-5.61a1,1,0,1,1,1.418-1.411l5.583,5.608,5.623-5.61a1,1,0,1,1,1.412,1.417l-5.624,5.611,5.631,5.657a1,1,0,1,1-1.418,1.411Z"
                  transform="translate(-5635.478 -3681.291)"
                  fill="#6f7689"
                />
              </svg>
            </button>
          </div>
          <div class="flx column gap-8">
              <div class="flx column mb-16">
                <h4 class="gray">We are here to assist you with the seamless installation of your Atella</h4>
                <h4 class="gray"> into your home. Our team oversees our select group of</h4>
                <h4 class="gray">bonded contractors in the completion of the following tasks:</h4>
              </div>
            <div class="grey-1 mb-16">
              <h4>The base installation cost includes</h4>
              <p>-Permits application</p>
              <p>-Site prep</p>
              <p>-Foundation installation</p>
              <p>-Utiliy trenching and hook up</p>
              <p>-Final cleaning before key hand ov</p>
              <p>-Final cleaning before key hand ov</p>
              <p>-Project management</p>
            </div>

            <!-- <div>
                                <span class="blue">Learn more about pricing and construction</span>
                            </div> -->
          </div>
        </div>
      </div>
    </transition>

    <transition name="zoom">
      <div v-if="rental_modal" class="modal-container jc-c ai-c">
        <div class="modal br-16 bg-white">
          <div class="flx-2  ai-c mb-16">
           
            <button
              class="br-50 bg-white"
              @click="
                $store.commit('closeRentalModal');
                this.selected = 'Cash';
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="14.683"
                viewBox="0 0 14.647 14.683"
              >
                <path
                  d="M5648.416,3695.679l-5.629-5.655-5.6,5.59a1,1,0,1,1-1.412-1.415l5.6-5.592-5.584-5.61a1,1,0,1,1,1.418-1.411l5.583,5.608,5.623-5.61a1,1,0,1,1,1.412,1.417l-5.624,5.611,5.631,5.657a1,1,0,1,1-1.418,1.411Z"
                  transform="translate(-5635.478 -3681.291)"
                  fill="#6f7689"
                />
              </svg>
            </button>
          </div>
          <div class="flx-3 column gap-8">
            <h1>You Could Earn</h1>
            <h1 class="gray mb-16">
             $2543
            </h1>
            <span class="blue2 mb-8">19 Days</span>
            <span class="fw-600">At an estimate of $234 a day</span>

            
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Backdrop from "@/components/includes/Backdrop.vue";
import TabNav from "@/components/TabNav.vue";
import TabConfig from "@/components/TabConfig.vue";

export default {
  components: { Backdrop, TabNav, TabConfig },
  data() {
    return {
      selected: "Cash",
    };
  },
  methods: {
    setSelected(tab) {
      this.selected = tab;
      if (tab == "Rental Property") {
        this.selected = "Cash";
             this.$store.commit("closeCostModal");
        this.$store.commit("openRentalModal");
      }
    },
  },
  computed: {
    ...mapState({
      cost_modal: (state) => state.cost_modal,
      cost_modal2: (state) => state.cost_modal2,
      hide_tab: (state) => state.hide_tab,
      rental_modal: (state) => state.rental_modal,
    }),
  },
};
</script>

<style lang="scss" scoped>
.modal {
  max-height: 90vh;
  width: 550px;
  z-index: 301;
  padding: 16px 24px 32px 24px;
  
  h2{
    line-height: 25px;
  }
}
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
  }
}
.table-row {
  margin-top: 8px;
}

.mag {
  margin-bottom: 20px;
}
.new4 {
  text-align: center;
  margin: 0;
}
.grey-1 {
  background-color: #f6f6f6;
  padding: 25px;
  border-radius: 20px;
  p {
    margin: 0;
  }
}

.pad-1{
    padding-left: 20px;
}
.blue {
  background-color: #f6f6f6;
  color: #0eb6f3;
  padding: 10px;
  border-radius: 10px;
}
span {
  font-size: 12px;
}
.modal-2[data-v-4b003be7] {
    max-height: 90vh;
    width: 578px;
    z-index: 301;
    padding: 16px 24px 32px 24px;

    h1{
        line-height: 32px;
      }
}

.blue2 {
    background-color: #f6f6f6;
    color: #0eb6f3;
    padding: 10px;
    border-radius: 10px;
    width: 82px;
    text-align: center;
}
.flex-70 {
  flex: 70;
}

.flex-30 {
  flex: 30;
}
.new-2 {
  border: 1px solid #8f8f8f;
  border-radius: 10px;
  padding: 10px;
  width: 300px;
  p {
    color: grey;
    margin: 0;
  }
}
.flx1 {
  display: flex;
  gap: 20px;
}
.flx-3{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.new-1 {
  
  border-radius: 10px;
  
  width: 100%;
  p {
    color: grey;
    margin: 0;
  }
}
.new-3 {
 
  border-radius: 0 10px 10px 0;
  width: 100%;
}

.new-4 {
 
  border-radius: 10px 0 0 10px;
  width: 100%;
}

.fix2 {
  display: flex;
  justify-content: space-between;
}

.mb-4 {
  margin-bottom: 4px;
}
.mb-8 {
  margin-bottom: 8px;
}
.mb-16 {
  margin-bottom: 16px;
}
.mb-24 {
  margin-bottom: 24px;
}
.mb-32 {
  margin-bottom: 32px;
}
.form-container {
    display: flex;
    flex-direction: row;
  }

  .input-container {
    flex: 70%;
    
  }

  .input-container:last-child {
    flex: 30%;
   
  }

  input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
@media screen and (max-width: 900px) {
  .modal {
    width: 90%;
  }
}
</style>
