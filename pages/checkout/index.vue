<template>
    
<section class="listing-page cart py-5">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="listing-title text-center mb-4">
                    <h1 class="font-weight-bold">Checkout</h1>
                </div>
            </div>
        </div>
        <div v-if="cartItems.length > 0" class="row">
            <div class="col-md-9">
                <Form ref="form" @submit="onSubmit" :validation-schema="schema">
                    <checkout-delivery @validated="onValidate" />
                    <checkout-contact-details @validated="onValidate"/>
                    <checkout-card-details @validated="onValidate"/>
                    <div v-if="placeOrderBtn" class="submitButn">
                        <div class="form-group text-center mb-0 mt-3">
                            <button class="btn bg-brown rounded-pill border-0 px-5 text-white showFileds">Place Order</button>
                        </div>
                    </div>
                </Form>
            </div>
            <div class="col-md-3">
                <cart-summary :show-products="true" :show-checkout-btn="false" :show-shopping-btn="false"></cart-summary>
            </div>
        </div>
        <div v-if="cartItems.length == 0" class="row text-center">
            <div class="col-md-12">
                <img :style="{width : '250px'}" src="/assets/images/basket.svg"/>
                <h1>Cart Is Empty!</h1>
            </div>
        </div>
    </div>
</section>
</template>
<script setup>
import {Form} from 'vee-validate';
import * as yup from 'yup';
import { createOrder } from '~~/services/order';
const { notification } = useHelper();
const {cartItems,flushCart} = useCart();
const {successPopup} = usePopup();
let validations = {
        address : false,
        card_details : false,
        contact_detail : false,
    };
const placeOrderBtn = ref(false);
const form = ref(null); 
const schema = yup.object({
    address : yup.object({
                text: yup.string().required().label('address'),
            }),
    contact_detail : yup.object({
        first_name: yup.string().required().label('first name'),
        last_name: yup.string().required().label('last name'),
        phone: yup.string().required().label('phone'),
        email : yup.string().required().label('email'),
    }),
    card_details : yup.object({
        name: yup.string().required().label('name'),
        number: yup.string().required().label('number'),
        expiry: yup.string().required().label('expiry'),
        cvc : yup.string().required().label('cvc'),
    }),
});

const onValidate = (value)=> {
    validations = {...validations,...value};
    let validationStatuses = Object.values(validations);
    validationStatuses = validationStatuses.filter(Boolean);
    if(validationStatuses.length == 3){
        placeOrderBtn.value = true;
    }
}
const onSubmit = async (values)=> {
    try {
        let [exp_month, exp_year] = values.card_details.expiry.split("/");
        let item = cartItems[0];
        // let {vendor_id} = item;
        let products = new Array(cartItems.value.length);
        let vendor_id;
        cartItems.value.forEach((element,index) => {
            if(index == 0){
                vendor_id = element.product?.vendor_id;
            }
            products[element.product_id]= {qty : element.qty,price : element?.product?.price}; 
        });
        const {message, detail} = await createOrder({
            ...values,
            vendor_id,
            products,
            card_details: { ...values.card_details, exp_month, exp_year }
        });
        // notification(message);
        flushCart();
        successPopup({
            title :`${message}. your order ID is ${detail?.order_id}`,
        });
        navigateTo({
            name : 'shops',
        });
    } catch (error) {
        console.log(error);
        let { errors, message } = error;
        if (message) notification(message, "error");
        if (errors) form.value.setErrors(errors);
    }
};
</script>