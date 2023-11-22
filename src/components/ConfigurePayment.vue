<template>
    <div class="user-info-wrapper">
        <div v-if="!makePayment" class="flx column gap-40">
            <div class="br-16 centered gray-card">
                <div>
                    <div class="fs-105rem">Fill in your details</div>
                    <span class="gray">Feel free to change your mind. Reservations can be changed at any time.</span>
                </div>
            </div>
            <form ref="form" @submit.prevent="sendEmail" class="flx column gap-16">
                <div class="form-row grid grid-col-2 gap-24">
                    <div class="form-col">
                        <label for="first_name">First name</label>
                        <div class="input-wrapper">
                            <input v-model="form.fname" type="text" name="first_name" id="first_name">
                        </div>
                    </div>
                    <div class="form-col">
                        <label for="last_name">Last name</label>
                        <div class="input-wrapper">
                            <input v-model="form.lname" type="text" name="last_name" id="last_name">
                        </div>
                    </div>
                </div>

                <div class="form-row grid grid-col-2 gap-24">
                    <div class="form-col">
                        <label for="phone_number">Phone number</label>
                        <div class="input-wrapper">
                            <input v-model="form.phone" type="tel" name="phone_number" id="phone_number">
                        </div>
                    </div>
                    <div class="form-col">
                        <label for="email">Email</label>
                        <div class="input-wrapper">
                            <input v-model="form.email" type="email" name="email" id="email">
                        </div>
                    </div>
                </div>
                <div class="form-row grid grid-col-2 gap-24">
                    <div class="form-col">
                        <label for="referee_name">Who referred you?</label>
                        <div class="input-wrapper">
                            <input v-model="form.referee_name" type="text" name="referee_name" id="referee_name">
                        </div>
                    </div>
                    <div class="form-col">
                        <label for="referee_email">Referee Email</label>
                        <div class="input-wrapper">
                            <input v-model="form.referee_email" type="email" name="referee_email" id="referee_email">
                        </div>

                    </div>
                </div>



                <div class="flx jc-sb">
                    <button @click="goBack" class="button-outline br-32 btn-md icon-btn icon-left gap-4 scale-in">

                        Back
                    </button>

                    <button @click="submit" type="submit" name="" value="Continue "
                        class="button-primary br-32 btn-md gap-4 icon-btn icon-right scale-in"
                        :class="{ 'button-disabled': !computedCheck }" :disabled="!computedCheck ? true : false"> Continue
                    </button>
                </div>


            </form>
            <!-- <div class="flx jc-sb">
                <button @click="goBack" class="button-outline br-32 btn-md icon-btn icon-left gap-4 scale-in">
                    <svg xmlns="http://www.w3.org/2000/svg" height="13.501" viewBox="0 0 15.243 13.501">
                        <path d="M15.216,11.51a.919.919,0,0,1,.007,1.294l-4.268,4.282H22.218a.914.914,0,0,1,0,1.828H10.955L15.23,23.2a.925.925,0,0,1-.007,1.294.91.91,0,0,1-1.287-.007L8.142,18.647h0a1.026,1.026,0,0,1-.19-.288.872.872,0,0,1-.07-.352.916.916,0,0,1,.26-.64l5.794-5.836A.9.9,0,0,1,15.216,11.51Z" transform="translate(-7.882 -11.252)"/>
                    </svg>
                    Back
                </button>
                <button @click="toggle" class="button-primary br-32 btn-md gap-4 icon-btn icon-right scale-in" :class="{ 'button-disabled' : !computedCheck}" :disabled="!computedCheck ? true : false">
                    Continue
                    <svg xmlns="http://www.w3.org/2000/svg" height="13.501" viewBox="0 0 15.243 13.501">
                        <path d="M15.791,11.51a.919.919,0,0,0-.007,1.294l4.268,4.282H8.789a.914.914,0,0,0,0,1.828H20.052L15.777,23.2a.925.925,0,0,0,.007,1.294.91.91,0,0,0,1.287-.007l5.794-5.836h0a1.026,1.026,0,0,0,.19-.288.872.872,0,0,0,.07-.352.916.916,0,0,0-.26-.64l-5.794-5.836A.9.9,0,0,0,15.791,11.51Z" transform="translate(-7.882 -11.252)" fill="#fff"/>
                    </svg>
                </button>
            </div> -->
        </div>
        <div v-else class="flx column gap-40">
            <div class="br-16 centered gray-card">
                <div>
                    <div class="fs-105rem">$1,000 Commitment fee</div>
                    <span class="gray">Fully refundable deposit</span>
                </div>
            </div>
            <i>
                Amount would be deducted from total cost of your Atella configuration
            </i>
            <div class="flx jc-sb">
                <button @click="toggle" class="button-outline br-32 btn-md gap-4 icon-btn icon-left scale-in">

                    Back
                </button>
                <button @click="payNow" class="button-primary br-32 btn-md scale-in">Pay $1,000</button>
            </div>
        </div>
        <stripe-checkout ref="checkoutRef" mode="payment" :pk="publishableKey" :line-items="lineItems"
            :success-url="successUrl" :cancel-url="cancelUrl" @loading="v => loading = v" />
    </div>
</template>

<script>
import { StripeCheckout } from '@vue-stripe/vue-stripe'
import { mapState } from 'vuex'
import emailjs from 'emailjs-com';

export default {
    name: 'ConfigurePayment',
    computed: {
        ...mapState({
            userAddress: (state) => state.user.address,
            user: (state) => state.user.address,
            type: (state) => state.configuration.type,
            color: (state) => state.configuration.color,
            exterior: (state) => state.configuration.exterior,
            blind: (state) => state.configuration.blind,
        }),
        computedCheck() {
            const form = this.form
            if (!form.fname || !form.lname || !form.email || !form.phone)
                return false
            else
                return true
        },
        exterior_decks: {
            get() {
                return this.$store.state.exterior
            },
            set(value) {
                this.$store.commit('updateExterior', value)
            }
        }
    },
    components: {
        StripeCheckout
    },
    data() {
        this.publishableKey = 'pk_test_51NSSJwCuOvqvm7g1PNnpxkG5K7TuEmcLI651LAVJ7544MglXSxRgpCD3EDHEFNmRkwOKKB3h0DQKexxHNr2DdS5u00F4wk0s7x'
        return {
            loading: false,
            lineItems: [{
                price: 'price_1NtwoFCuOvqvm7g1Kv5UqrGv',
                quantity: 1
            }],
            successUrl: 'https://configure.atella.ca/#/book-appointment',
            cancelUrl: 'https://configure.atella.ca/#/payment',
            makePayment: false,
            form: {
                fname: '',
                lname: '',
                email: '',
                phone: '',
                referee_name: '',
                referee_email: '',
                exterior: '',

            }
        }
    },
    watch: {
        makePayment(newMakePayment) {
            this.setMakePayment(newMakePayment)
        }
    },
    methods: {
        submit() {
            // You will be redirected to Stripe's secure checkout page
            this.$refs.checkoutRef.redirectToCheckout();
        },
        async sendEmail() {
            emailjs.send('service_bqq2kne', 'template_a7aowd9',

                {
                    fname: this.form.fname,
                    lname: this.form.lname,
                    email: this.form.email,
                    phone: this.form.phone,
                    referee_name: this.form.referee_name,
                    referee_email: this.form.referee_email,
                    type: this.type.name,
                    exterior: this.exterior.name,
                    blind: this.blind.name,
                    color: this.color.name,
                    address: this.user,

                }, '6jUfs0z1-tW0u635L')
                .then((result) => {
                    console.log('SUCCESS!', result.text);
                    // this.$router.push({ name: 'Checkout' })
                }, (error) => {
                    // this.$router.push({ name: 'Checkout' })
                    console.log('FAILED...', error.text);
                });
            try {
                const response = await fetch('https://configure.atella.ca/savedata.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: new URLSearchParams({
                        fname: this.form.fname,
                        lname: this.form.lname,
                        email: this.form.email,
                        phone: this.form.phone,
                        referee_name: this.form.referee_name,
                        referee_email: this.form.referee_email,
                        type: this.type.name,
                        exterior: this.exterior.name,
                        blind: this.blind.name,
                        color: this.color.name,
                        address: this.user,
                    }),
                });
                const data = await response.text();
                console.log(data); // Optional: handle the response from the server
            } catch (error) {
                console.error('Error:', error);
            }
        },

        setUser() {
            this.form.fname = this.user.fname
            this.form.lname = this.user.lname
            this.form.email = this.user.email
            this.form.phone = this.user.phone
            this.form.referee_name = this.user.referee_name
            this.form.referee_email = this.user.referee_email
        },
        setPage() {
            const data = { page: 3, title: 'Reserve Your Atella', sub_title: '' }
            this.$store.commit('setConfigTab', data)
        },
        setMakePayment(payload) {
            const data = { page: 3, title: 'Atella Reservation Deposit', sub_title: 'Your deposit is fully refundable.' }
            payload ? this.$store.commit('setConfigTab', data) : this.setPage()
        },
        toggle() {

            // this.makePayment = !this.makePayment
            // if(this.computedCheck) {
            //     this.$store.commit('setUserInfo', this.form)
            // }

        },
        goBack() {
            this.$router.push({ name: 'ConfigureAddress' })
        },
    },
    mounted() {
        this.setPage()
        this.user ? this.setUser() : ''
    },

}
</script>

<style lang="scss" scoped>
input {
    height: 48px;
    padding: 8px 12px;
    width: 100%;
}

.button-primary {
    background-color: #0071E3;
    color: white;
}

.user-info-wrapper {
    container-type: inline-size;
}

@container(inline-size <=500px) {
    .gap-24 {
        gap: 16px
    }
}
</style>