<template>
  <section class="about default-bg p-70">
    <div class="container">
      <div class="row">
        <div class="col-md-10 m-auto">
          <div class="form-area shadow p-md-5 p-3">
            <div class="form-head text-center">
              <h1 class="font-weight-bold">Payment Details</h1>
            </div>
            <div class="form-body pt-4">
              <Form ref="form" @submit="onSubmit" :validation-schema="schema">
                <div class="pt-4 wizard">
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="name">
                          Cardholder Name <span class="required">*</span>
                        </label>
                        <Field
                          keepValue
                          v-model="data.card_holder"
                          name="card_holder"
                          type="text"
                          placeholder="Enter Cardholder Name"
                          class="form-control bg-light rounded-pill"
                          id="name"
                        />
                        <ErrorMessage name="card_holder" />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="cardnumber">
                          Card Number <span class="required">*</span>
                        </label>
                        <Field
                          type="text"
                          v-model="data.number"
                          name="number"
                          id="cardnumber"
                          v-slot="{ field }"
                        >
                          <input
                            placeholder="Enter Card Number"
                            class="form-control bg-light rounded-pill"
                            v-bind="field"
                          />
                        </Field>
                        <ErrorMessage name="number" />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="vDate">
                          Expiry Date <span class="required">*</span>
                        </label>
                        <Field
                          name="expiry"
                          v-model="data.expiry"
                          type="text"
                          placeholder="Enter Validity Date"
                          class="form-control bg-light rounded-pill"
                          id="vDate"
                        />
                        <ErrorMessage name="expiry" />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="cvv">
                          CVV <span class="required">*</span>
                        </label>
                        <Field
                          name="cvc"
                          v-model="data.cvc"
                          type="number"
                          placeholder="Enter CVV Number"
                          class="form-control bg-light rounded-pill"
                          id="cvv"
                        />
                        <ErrorMessage name="cvc" />
                      </div>
                    </div>
                  </div>
                  <div class="form-group text-center mb-0 mt-3">
                    <button
                      class="btn bg-brown rounded-pill border-0 px-5 text-white"
                    >
                      Proceed
                    </button>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { purchasePet } from "~~/services/pet";
import { onBeforeMount, ref, watch } from "vue";
import { useUserStore } from "~~/stores/user";
const { notification } = useHelper();
const route = useRoute();
const data = ref({
  card_holder: "",
  number: "",
  expiry: "",
  cvc: "",
});
const { formatCard, formatExpiry } = useCardFormatter(data);
watch(
  () => data.value.number,
  (val) => {
    val = formatCard(val);
    form.value.setFieldValue("number", val);
    data.value.number = val;
  },
  { deep: true }
);

watch(
  () => data.value.expiry,
  (val) => {
    val = formatExpiry(val);
    data.value.expiry = val;
    form.value.setFieldValue("expiry", val);
  },
  { deep: true }
);

const form = ref(null);
const schema = yup.object({
  card_holder: yup.string().required().label("card holder name"),
  number: yup.string().required().label("card number"),
  cvc: yup.string().required().max(4).min(1),
  expiry: yup.string().required(),
});
const store = useUserStore();
const user = computed(() => store.user);
const onSubmit = async (values) => {
  let [exp_month, exp_year] = values.expiry.split("/");
  try {
    let { message } = await purchasePet(route.params.id, {
      user_id: user.value.id,
      card_details: { ...values, exp_month, exp_year },
    });
    notification(message);
    let {pettype,id} = route.params;
    navigateTo({name : 'pets-pettype-detail-id',params : {pettype, id } })
  } catch (error) {
    console.log(error);
    let { errors, message } = error;
    if ( message ) notification(message, "error");
    if (errors) form.value.setErrors(errors);
  }
};
</script>