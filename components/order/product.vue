<template>
  <section class="cart py-5">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-md-3">
          <div class="back-page">
            <nuxt-link :to="{name : 'account-orders-type',params : {type : 'product'}}" class="back-arrow"
              ><i class="fa fa-arrow-left"></i
            ></nuxt-link>
          </div>
        </div>
        <div class="col-md-6">
          <div class="listing-title text-center">
            <h1 class="font-weight-bold mb-0">Order Details</h1>
          </div>
        </div>
        <div class="col-md-3">
          <p class="mb-0 font-weight-bold f-18">
            Status: <span class="text-capitalize text-theme-primary">{{data?.status_detail}}</span>
          </p>
        </div>
        <div class="col-md-12 mt-3">
          <div class="order-no">
            <h5>
              Order ID:
              <span class="font-weight-bold text-theme-primary"
                >#{{data?.id}}</span
              >
            </h5>
            <p>
              Order Date: <span class="font-weight-bold">{{format_date(data?.created_at)}}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-9">
          <div class="cart-detail shadow p-3 h-100">
            <order-detail-products :products="data?.products"/>
            <!-- total  -->
            <order-detail-summary 
            :products="data?.products" 
            :delivery="data?.delivery" 
            :commission="data?.commission">
            <template #report-link>
                <div v-if="!data?.report?.id && data?.status == 'delivered'" class="reportAd text-center">
                    <p><a @click="showCreatorPopup('/v1/reports', '',{})" class="text-danger" href="javascript:void()" data-toggle="modal" data-target="#reportAd"><i class="fa fa-warning pr-1"></i> Report Your Order</a></p>
                </div>
                <div v-if="data?.report?.id" class="reportAd">
                    <strong for="">Your Reported Reason:</strong>
                    <p>{{data?.report?.detail}}</p>

                    <strong for="">Admin Remarks On Report:</strong>
                    <p>{{data?.report?.admin_note || 'Waiting for remarks'}}</p>
                </div>
            </template>
        </order-detail-summary>
          </div>
        </div>
        <div class="col-md-3 mb-4 mb-md-0">
            <card-owner :owner="data?.user" title="Customer Details"></card-owner>
            <card-owner :owner="data?.owner" title="Vendor Details"></card-owner>
        </div>
      </div>
        <client-only>

            <popup-creator
            :additional-fields="{reportable_id : data?.id,reportable_type : 'order'}"
            :title="popupParams.title"
            :active="popupParams.active"
            :fields="popupParams.fields"
            :api-url="popupParams.apiUrl"
            :validation-schema="popupParams.schema"
            :data="popupParams.data"
            @closed="hideCreatorPopup"
            submit-btn-text="Report"
            :show-icon="true"
            ></popup-creator>
        </client-only>
    </div>
  </section>
</template>
<script setup>
import * as yup from 'yup';
import { getOrder } from "~~/services/order";
const route = useRoute();
const {data} = useApi(()=> getOrder(route.params.id));
const {format_date} = useHelper();
const {
  showCreatorPopup,
  hideCreatorPopup,
  popupParams,
  setSchema,
  setFields,
} = useCreatorPopup();

onBeforeMount(() => {
  setFields([
    {
      label: "Reason",
      name: "detail",
      placeholder: "Enter Here",
      type : 'textarea',
      id : 'reason',
    },
  ]);
  setSchema({
    detail: yup.string().required().label('reason'),
  });
});
</script>