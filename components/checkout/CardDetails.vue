<template>
  <div class="delivery-details shadow px-md-5 p-4 mb-5">
    <div class="titleBox d-flex align-items-center justify-content-between">
      <h4 class="mb-0">Payment Details</h4>
      <button v-if="validated" @click="validated = false" class="btn border-0 bg-transparent" type="button">
        <h4 class="mb-0"><i class="fa fa-edit"></i></h4>
      </button>
    </div>
    <div v-if="!validated" class="pt-4 wizard">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label for="name"> Name <span class="required">*</span> </label>
            <input
              v-model="name"
              type="text"
              placeholder="Enter Name"
              class="form-control bg-light rounded-pill"
              id="name"
            />
            <span>{{nameError}}</span>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="cardnumber">
              Card Number <span class="required">*</span>
            </label>
            <input
              v-model="number"
              type="text"
              placeholder="Enter Card Number"
              class="form-control bg-light rounded-pill"
              id="cardnumber"
            />
            <span>{{numberError}}</span>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="cvv">
              CVV Number <span class="required">*</span>
            </label>
            <input
              v-model="cvc"
              type="number"
              placeholder="Enter CVV"
              class="form-control bg-light rounded-pill"
              id="cvv"
            />
            <span>{{cvcError}}</span>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="vDate">
              Validity Date <span class="required">*</span>
            </label>
            <input
              v-model="expiry"
              type="text"
              placeholder="Enter Validity Date"
              class="form-control bg-light rounded-pill"
              id="vDate"
            />
            <span>{{expiryError}}</span>
          </div>
        </div>
      </div>
      <div class="form-group text-center mb-0 mt-3">
        <button
          @click="validateFields"
          class="btn bg-brown rounded-pill border-0 px-5 text-white showFileds"
          type="button"
        >
          Continue
        </button>
      </div>
    </div>
    <!-- payment fields  -->
    <div class="payment-feild showBox" v-if="validated">
      <p class="mb-1">Name: <span class="pname">{{name}}</span></p>
      <p class="mb-1">
        Card Number: <span class="cardNum">{{getCardMasked(number)}}</span>
      </p>
      <p class="mb-1">Validity Date: <span class="validDate">{{expiry}}</span></p>
      <p class="mb-1">CVV: <span class="cvv">***</span></p>
    </div>
  </div>
</template>
<script setup>
import { useField } from "vee-validate";
const validated = ref(false);
const emit = defineEmits(['validated']);
const {getCardMasked} = useHelper();
const {value: name,errorMessage : nameError,validate : nameValidate} = useField('card_details.name');
const {value: number,errorMessage : numberError, validate : numberValidate, setValue : setNumber} = useField('card_details.number');
const {value: expiry,errorMessage : expiryError, validate : expiryValidate,setValue : setExpiry} = useField('card_details.expiry');
const {value: cvc,errorMessage : cvcError, validate : cvcValidate} = useField('card_details.cvc');

const data = {
  name,
  number,
  expiry,
  cvc,
};
const { formatCard, formatExpiry } = useCardFormatter(data);

watch(
  () => data.number.value,
  (val) => {
    val = formatCard(val);
    setNumber(val);
    data.number.value = val;
  },
  { deep: true }
);

watch(
  () => data.expiry.value,
  (val) => {
    val = formatExpiry(val);
    data.expiry.value = val;
    setExpiry(val);
  },{ deep: true });

watch(validated,(value)=> {
        emit('validated',{card_details: value});
});

const validateFields = async ()=> {
    Promise.all([
        nameValidate(),
        numberValidate(),
        expiryValidate(),
        cvcValidate(),
    ]).then((result)=>{
        let validatedFields = result.map((item)=> item.valid).filter(Boolean);        
        if(validatedFields.length >= 4)
        {
            validated.value = true;
        }
    });
}
</script>