<template>
    <div>
      
      <div>
     
        <form>
        <div ref="cardElement" class="custom-card-element"></div>
        
        
          <label for="name">Name on Card</label>
          <input type="text" id="name" name="name" placeholder="John Doe" />
    
          <label for="email">Email</label>
          <input type="email" id="email" name="email" placeholder="johndoe@example.com" />
    
         
          <button @click="submitPayment">Pay</button>
          <div class="spinner hidden" id="spinner"></div>
          <div id="payment-message" class="hidden"></div>
        </form>
      </div>
    
      
    </div>

    
  </template>
  
  <script>
  import { loadStripe } from '@stripe/stripe-js';
  
  export default {
    data() {
      return {
        card: null,
        stripe: null,
        response: null,
   
      };
    },
    methods: {
      async initializeStripe() {
        this.response = await fetch("/create-payment-intent", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
   
  });
        if (!this.stripe) {
          this.stripe = await loadStripe('pk_test_51NSSJwCuOvqvm7g1PNnpxkG5K7TuEmcLI651LAVJ7544MglXSxRgpCD3EDHEFNmRkwOKKB3h0DQKexxHNr2DdS5u00F4wk0s7x');
          const elements = this.stripe.elements();
           // Customize the card element's appearance
        const cardStyles = {
          base: {
            fontSize: '16px',
            color: '#333',
            // Customize other CSS properties as needed
            
          },
        };

        

        this.card = elements.create('card', { style: cardStyles });
        this.card.mount(this.$refs.cardElement);
        }
      },
      async submitPayment() {
        if (this.stripe) {
          const result = await this.stripe.createPaymentMethod({
            type: 'card',
            card: this.card,
          });
  
          if (result.error) {
            console.error(result.error);
          } else {
            // Handle successful payment (e.g., send payment method ID to your server)
            this.$router.push({ name: 'ConfigureAppointment' });
          }
        }
      },
    },
    mounted() {
    this.initializeStripe();
    
  },
  };
  </script>
  

  <style scoped>
/* Customize the styles for the card element and form */
.custom-card-element {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  /* Add additional styles as needed */
}

/* Customize other form elements and styles */
form {
  margin-top: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="text"],
input[type="email"] {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  /* Add additional input styles as needed */
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  /* Add additional button styles as needed */
}


/* Variables */
* {
    box-sizing: border-box;
  }
  
  body {
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    display: flex;
    justify-content: center;
    align-content: center;
    height: 100vh;
    width: 100vw;
  }
  
  form {
    width: 30vw;
    min-width: 500px;
    align-self: center;
    box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
      0px 2px 5px 0px rgba(50, 50, 93, 0.1), 0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
    border-radius: 7px;
    padding: 40px;
  }
  
  .hidden {
    display: none;
  }
  
  #payment-message {
    color: rgb(105, 115, 134);
    font-size: 16px;
    line-height: 20px;
    padding-top: 12px;
    text-align: center;
  }
  
  #payment-element {
    margin-bottom: 24px;
  }
  
  /* Buttons and links */
  button {
    background: #5469d4;
    font-family: Arial, sans-serif;
    color: #ffffff;
    border-radius: 4px;
    border: 0;
    padding: 12px 16px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    display: block;
    transition: all 0.2s ease;
    box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
    width: 100%;
  }
  button:hover {
    filter: contrast(115%);
  }
  button:disabled {
    opacity: 0.5;
    cursor: default;
  }
  
  /* spinner/processing state, errors */
  .spinner,
  .spinner:before,
  .spinner:after {
    border-radius: 50%;
  }
  .spinner {
    color: #ffffff;
    font-size: 22px;
    text-indent: -99999px;
    margin: 0px auto;
    position: relative;
    width: 20px;
    height: 20px;
    box-shadow: inset 0 0 0 2px;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
  }
  .spinner:before,
  .spinner:after {
    position: absolute;
    content: "";
  }
  .spinner:before {
    width: 10.4px;
    height: 20.4px;
    background: #5469d4;
    border-radius: 20.4px 0 0 20.4px;
    top: -0.2px;
    left: -0.2px;
    -webkit-transform-origin: 10.4px 10.2px;
    transform-origin: 10.4px 10.2px;
    -webkit-animation: loading 2s infinite ease 1.5s;
    animation: loading 2s infinite ease 1.5s;
  }
  .spinner:after {
    width: 10.4px;
    height: 10.2px;
    background: #5469d4;
    border-radius: 0 10.2px 10.2px 0;
    top: -0.1px;
    left: 10.2px;
    -webkit-transform-origin: 0px 10.2px;
    transform-origin: 0px 10.2px;
    -webkit-animation: loading 2s infinite ease;
    animation: loading 2s infinite ease;
  }
  
  @-webkit-keyframes loading {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes loading {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  
  @media only screen and (max-width: 600px) {
    form {
      width: 80vw;
      min-width: initial;
    }
  }
</style>