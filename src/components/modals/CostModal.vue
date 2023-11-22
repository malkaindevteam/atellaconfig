<template>
  <div>
    <!-- <transition name="fade">
      <backdrop v-if="cost_modal" :index="300" :opacity="0.5"   />

    </transition> -->


    <div v-if="cost_modal" class="modal-container jc-c ai-c">
      <backdrop v-if="cost_modal" :index="300" :opacity="0.5" />
      <div class="modal br-16 bg-white" v-if="!hide_tab">
        <div class="modal-top flx jc-sb ai-c">
          <h3>{{ selected }} Options</h3>
          <button class="br-50" @click="$store.commit('closeCostModal')">
            <svg xmlns="http://www.w3.org/2000/svg" height="14.683" viewBox="0 0 14.647 14.683">
              <path
                d="M5648.416,3695.679l-5.629-5.655-5.6,5.59a1,1,0,1,1-1.412-1.415l5.6-5.592-5.584-5.61a1,1,0,1,1,1.418-1.411l5.583,5.608,5.623-5.61a1,1,0,1,1,1.412,1.417l-5.624,5.611,5.631,5.657a1,1,0,1,1-1.418,1.411Z"
                transform="translate(-5635.478 -3681.291)" fill="#6f7689" />
            </svg>
          </button>
        </div>
        <div class="flx column gap-24 mt-32">
          <tab-nav class="new" :hide_tab="!hide_tab" :tabs="['Finance', 'Rental Property', 'Retirement home']"
            :selected="selected" @selected="setSelected">


            <tab-config :isSelected="selected === 'Finance'">
              <section class="">
                <div class="mb-8">
                  Financing selection and terms will be confirmed after order
                </div>
                <div>
                  <div class="flx jc-sb table-head mb-8"></div>
                  <div class="table-row flx jc-sb">
                    <div class="mb-8">
                      <h4>Estimated cost</h4>


                    </div>

                    <h4>${{ computePrice(computedTotal + installation) }}</h4>
                  </div>

                  <div class="table-row flx jc-sb gray">
                    <div>Total</div>
                    <div>
                      ${{
                        computePrice(
                          this.computedTotal + this.installation - taxcredit
                        )
                      }}
                    </div>
                  </div>
                  <div class="mb-8">
                    <span class="gray">Down payment</span>
                    <div class="flx">
                      <div class="new-4 mb-4 flex-70">
                        <input class="new-4" type="number" id="tax-credit" name="input1" :value="taxcredit"
                          @input="change('taxcredit', $event.target.value)" />
                      </div>
                      <div class="flex-30">
                        <input class="new-3" type="text" id="down-payment-percent" name="input2"
                          :value="calculateDownPaymentPercentage()" disabled />
                      </div>
                    </div>
                    <div class="form-container">
                      <div class="input-container">
                        <span class="gray">Terms</span>
                        <input class="new-1" type="text" id="year" name="input1"
                          @input="change('years', $event.target.value)" :value="years" />

                      </div>
                      <div class="input-container pad-1">
                        <span class="gray">Interest rate</span>
                        <input class="new-1" type="number" id="Interest-rate" name="input2"
                          @input="change('interestrate', $event.target.value)" :value="interestrate" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="new4">
                  <h3 class="new4">
                    ${{
                      computePrice(Math.round(
                        calculateMonthlyPayment(
                          this.interestrate,
                          this.years * 12,
                          this.computedTotal + this.installation - taxcredit
                        )
                      ))
                    }}
                    /mo
                  </h3>
                  <span class="gray">Tax and insurance not included</span>
                </div>
              </section>
            </tab-config>

            <tab-config :isSelected="selected === 'Rental Property'">
              <section class="">

                <div>
                  <div class="flx jc-sb table-head mb-8"></div>
                  <div class="table-row flx jc-sb">
                    <div class="mb-8">
                      <h4>Monthly cost of an Atella</h4>
                    </div>

                    <h4>${{
                      computePrice(Math.round(
                        calculateMonthlyPayment(
                          this.interestrate,
                          this.years * 12,
                          this.computedTotal + this.installation - taxcredit
                        )
                      ))
                    }}
                      /mo</h4>
                  </div>
                  <div class="mb-8">
                    <span class="gray">Average rental income</span>
                    <div class="flx">
                      <div class="new-4 mb-4 flex-70">
                        <input class="new-1" type="number" id="monthly-cost-rental" name="input1"
                          :value="monthlycostrental" @input="change('monthlycostrental', $event.target.value)" />
                      </div>

                    </div>
                    <div class="form-container">
                      <div class="input-container">


                        <div class="table-row flx jc-sb">
                          <div class="mb-8">
                            <h4>Monthly Net profit</h4>
                          </div>

                          <h4>${{ computePrice(Math.round(this.monthlycostrental -
                            this.calculateMonthlyPayment(
                              this.interestrate,
                              this.years * 12,
                              this.computedTotal + this.installation - this.taxcredit
                            )
                          )) }}</h4>
                        </div>

                      </div>

                    </div>
                  </div>
                </div>

              </section>
            </tab-config>

            <tab-config :isSelected="selected === 'Retirement home'">
              <section>
                <section class="">

                  <div>
                    <div class="flx jc-sb table-head mb-8"></div>
                    <div class="table-row flx jc-sb">
                      <div class="mb-8">
                        <h4>Monthly cost of an Atella</h4>
                      </div>

                      <h4>${{
                        computePrice(Math.round(
                          calculateMonthlyPayment(
                            this.interestrate,
                            this.years * 12,
                            this.computedTotal + this.installation - taxcredit
                          )
                        ))
                      }}
                        /mo</h4>
                    </div>
                    <div class="mb-8">
                      <span class="gray">Average monthly cost of retirement home</span>
                      <div class="flx">
                        <div class="new-4 mb-4 flex-70">
                          <input class="new-1" type="number" id="monthly-cost" name="input1" :value="monthlycost"
                            @input="change('monthlycost', $event.target.value)" />
                        </div>

                      </div>
                      <div class="form-container">
                        <div class="input-container">


                          <div class="table-row flx jc-sb">
                            <div class="mb-8">
                              <h4>Monthly savings</h4>
                            </div>

                            <h4>${{ computePrice(Math.round(this.monthlycost -
                              this.calculateMonthlyPayment(
                                this.interestrate,
                                this.years * 12,
                                this.computedTotal + this.installation - this.taxcredit
                              )
                            )) }}</h4>
                          </div>

                        </div>

                      </div>
                    </div>
                  </div>

                </section>
              </section>
            </tab-config>
          </tab-nav>
        </div>
      </div>
      <div class="modal br-16 bg-white" v-if="hide_tab">
        <div class="flx jc-sb ai-c mb-16">
          <h2>Estimate your monthly payments <br />
            with our calculator.
          </h2>
          <button class="bg-white br-50" @click="$store.commit('closeCostModal')">
            <svg xmlns="http://www.w3.org/2000/svg" height="14.683" viewBox="0 0 14.647 14.683">
              <path
                d="M5648.416,3695.679l-5.629-5.655-5.6,5.59a1,1,0,1,1-1.412-1.415l5.6-5.592-5.584-5.61a1,1,0,1,1,1.418-1.411l5.583,5.608,5.623-5.61a1,1,0,1,1,1.412,1.417l-5.624,5.611,5.631,5.657a1,1,0,1,1-1.418,1.411Z"
                transform="translate(-5635.478 -3681.291)" fill="" />
            </svg>
          </button>
        </div>

        <div class="modal-top flx column">
          <span class="gray">Available rates, terms and product offerings will be based on your unique financial situation.
          </span>
        </div>
        <div>
          <div class="table-row flx jc-sb">
            <div class="mb-8 flx column">
              <h4>Estimated cost</h4>

            </div>

            <h4>${{ computePrice(computedTotal + installation) }}</h4>
          </div>
          <div class="table-row flx jc-sb gray">
            <div>Total</div>
            <div>
              ${{
                computePrice(
                  this.computedTotal + this.installation - taxcredit
                )
              }}
            </div>
          </div>
          <div class="mb-8">
            <span class="gray">Down payment</span>
            <div class="flx">
              <div class="new-4 mb-4 flex-70">
                <input class="new-4" type="number" id="tax-credit" name="input1" :value="taxcredit"
                  @input="change('taxcredit', $event.target.value)" />
              </div>
              <div class="flex-30">
                <input class="new-3" type="text" id="down-payment-percent" name="input2"
                  :value="calculateDownPaymentPercentage()" disabled />
              </div>
            </div>

            <div class="form-container">
              <div class="input-container">
                <span class="gray">Terms</span>
                <input class="new-1" type="text" id="year" name="input1" @input="change('years', $event.target.value)"
                  :value="years" />

              </div>
              <div class="input-container pad-1">
                <span class="gray">Interest rate</span>
                <input class="new-1" type="text" id="Interest-rate" name="input2"
                  @input="change('interestrate', $event.target.value)" :value="interestrate" />
              </div>
            </div>
          </div>
        </div>
        <div class="new4">
          <h3 class="new4">
            ${{
              computePrice(Math.round(
                calculateMonthlyPayment(
                  this.interestrate,
                  this.years * 12,
                  this.computedTotal + this.installation - taxcredit
                )
              ))
            }}
            /mo
          </h3>
          <span class="gray">Tax and insurance not included</span>
        </div>
      </div>
    </div>


    

    <div v-if="cost_modal2" class="modal-container jc-c ai-c">
      <backdrop v-if="cost_modal2" :index="300" :opacity="0.5" />
      <div class="modal-2 br-16 bg-white">
        <div class="flx jc-sb ai-c mb-16">
          <h1>
            What's included in the Base <br />
            Installation Cost?
          </h1>
          <button class="br-50 bg-white" @click="$store.commit('noInfoModal')">
            <svg xmlns="http://www.w3.org/2000/svg" height="14.683" viewBox="0 0 14.647 14.683">
              <path
                d="M5648.416,3695.679l-5.629-5.655-5.6,5.59a1,1,0,1,1-1.412-1.415l5.6-5.592-5.584-5.61a1,1,0,1,1,1.418-1.411l5.583,5.608,5.623-5.61a1,1,0,1,1,1.412,1.417l-5.624,5.611,5.631,5.657a1,1,0,1,1-1.418,1.411Z"
                transform="translate(-5635.478 -3681.291)" fill="#6f7689" />
            </svg>
          </button>
        </div>
        <div class="flx column gap-8">
          <div class="flx column mb-16">
            <h4 class="gray customh4">
              We are here to assist you with the seamless installation of your
              Atella
              into your home. Our team oversees our select group of
              bonded contractors in the completion of the following tasks:
            </h4>
          </div>
          <div class="grey-1 mb-16 customlh">
            <h4>The base installation cost includes</h4>
            <p>-Permits application</p>
            <p>-Site prep</p>
            <p>-Foundation installation</p>
            <p>-Utiliy trenching and hook up</p>
            <p>-Final cleaning before key hand over</p>
            <p>-Project management</p>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
import { mapState } from "vuex";
import Backdrop from "@/components/includes/Backdrop.vue";
import TabNav from "@/components/TabNav.vue";
import TabConfig from "@/components/TabConfig.vue";
import priceMixin from "@/mixins/priceMixin";

export default {
  components: { Backdrop, TabNav, TabConfig, },
  mixins: [priceMixin],
  data() {
    return {
      selected: "Finance",
      sliderValue: 20,
      taxcredit: 0,
      interestrate: 7.5,
      years: 30,
      monthlycost: 4500,
      monthlycostrental: 2500,
      monthlysavings: 0,
      annualsavings: 0,
      showModal: false,
    };
  },
  watch:{
    run_cal(value) {
      if(value){
    
        this.taxcredit =(30 / 100) *( this.computedTotal + this.installation)
      }
     
        }
  },
  methods: {
    setSelected(tab) {
      this.selected = tab;
    },

    calculateDownPaymentPercentage() {
      var totalr = this.computedTotal + this.installation;
      const downPaymentPercent = ((this.taxcredit / totalr) * 100).toFixed(2);
      return `${downPaymentPercent}%`;
      
    },
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },

    change(service, value) {

      if (value == '') {
        value = 0
      }
      const v = (value);

      switch (service) {
        case "taxcredit":
          this.taxcredit = v;
          break;
        case "interestrate":
          this.interestrate = v;
          break;

        case "years":
          this.years = v;
          break;
        case "monthlycostrental":
          this.monthlycostrental = v;
          this.monthlysavingsrental = this.computePrice(Math.round(this.monthlycostrental -
            this.calculateMonthlyPayment(
              this.interestrate,
              this.years * 12,
              this.computedTotal + this.installation - this.taxcredit
            )
          ));
          break;
        case "monthlycost":
          this.monthlycost = v;
          this.monthlysavings = this.computePrice(Math.round(this.monthlycost -
            this.calculateMonthlyPayment(
              this.interestrate,
              this.years * 12,
              this.computedTotal + this.installation - this.taxcredit,
             
            ),
           
          ));
          this.annualsavings = this.computePrice(12 * Math.round(this.monthlycost -
            this.calculateMonthlyPayment(
              this.interestrate,
              this.years * 12,
              this.computedTotal + this.installation - this.taxcredit,
          
            )
            
          ))

          break;

        default:
          break;
      }
    },

    calculateMonthlyPayment(interestRate, numberOfPayments, loanAmount) {

      const monthlyInterestRate = interestRate / 100 / 12;
      let a = (1 + monthlyInterestRate) ** numberOfPayments;
      let b = a - 1;
      let c = (monthlyInterestRate * a) / b;
      let d = loanAmount * c;
      return d;
        
    },
  },
  computed: {
    ...mapState({
      installation: (state) => state.installation,
      cost_modal: (state) => state.cost_modal,
      cost_modal2: (state) => state.cost_modal2,
      hide_tab: (state) => state.hide_tab,
      rental_modal: (state) => state.rental_modal,
      run_cal:(state) => state.run_cal,
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

  h2 {
    line-height: 25px;
  }
}

.box-80 {
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 3px;
}

.customh4 {
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-top: 11px;
}

.customlh {
  line-height: 2.2;
}

.box-40 {
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 3px;
}

.modal4 {
  max-height: 90vh;
  width: 480px;
  z-index: 601;
  padding: 16px 24px 32px 24px;

  h2 {
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

.pad-1 {
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

.modal-2 {
  max-height: 90vh;
  width: 550px;
  z-index: 301;
  padding: 25px;
  height: 600px;

  h1 {
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

.flx-3 {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.new-1 {
  border-radius: 10px;
  padding: 5px;
  width: 100%;

  p {
    color: grey;
    margin: 0;
  }
}

.new-3 {
  border-radius: 0 10px 10px 0;
  width: 100%;
  padding: 5px;

  input {
    padding: 5px;
  }
}

.new-4 {
  border-radius: 10px 0 0 10px;
  width: 100%;

  input {
    padding: 5px;
  }
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
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.slidecontainer {
  width: 100%;
}

.range-slider-rail {
  width: 100%;
  background-color: red;
}

.slider {
  -webkit-appearance: none;
  width: 100%;
  height: 10px;
  outline: none;
  opacity: 0.7;
  border-radius: 5px;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;

  .range-slider-knob {
    display: block;
    display: block;
    position: absolute;
    /* top: 50%; */
    left: 0;
    box-sizing: border-box;
    height: 20px;
    width: 20px;
    /* border: 1px solid #f5f5f5; */
    border-radius: 50%;
    background-color: #000000;
    /* box-shadow: 1px 1px rgba(0, 0, 0, 0.2); */
    transform: translate(-50%, -50%);
    cursor: pointer;
  }
}

.slider:hover {
  opacity: 1;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 15px;
  height: 15px;
  background: black;
  cursor: pointer;
  border-radius: 50%;
}

.slider::-moz-range-thumb {
  width: 20%;
  height: 5px;
  background: #000000;
  cursor: pointer;
}

@media screen and (max-width: 900px) {
  .modal {
    width: 90%;
  }
}
</style>
