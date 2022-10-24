<template>
    <section class="listing-page py-5">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="listing-title text-center">
                        <h1 class="font-weight-bold">My Orders</h1>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <table-search @on-change="setFilter"></table-search>
                    <ul class="nav nav-pills mb-3 justify-content-center gap-15" id="pills-tab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <nuxt-link :to="{name :'account-orders-type'}" class="nav-link border-0" :class="{active : (!route.params.type)}" type="button">Purchased</nuxt-link>
                        </li>
                        <li class="nav-item" role="presentation">
                            <nuxt-link :to="{name :'account-orders-type',params : {type : 'offers'}}" :class="{active : (route.params.type == 'offers')}" class="nav-link border-0 btn-link">Adopted</nuxt-link>
                        </li>
                        <li class="nav-item" role="presentation">
                            <nuxt-link :to="{name :'account-orders-type',params : {type : 'product'}}" :class="{active : (route.params.type == 'product')}" class="nav-link border-0 btn-link">Shop Order</nuxt-link>
                        </li>
                    </ul>
                    <div class="tab-content" id="pills-tabContent">
                        <div class="tab-pane fade show active" id="purchase" role="tabpanel" aria-labelledby="purchase-tab">
                            <div class="table-responsive ads-listing">
                                    <table-main :data="data" :fields="fields" class="table table-borderless text-center">
                                        <template #extra-heads>
                                            <th>Action</th>
                                        </template>
                                        <template #extra-cells="item">
                                            <td>
                                                <p class="mb-0">
                                                    <nuxt-link class="text-secondary" :to="{name : 'account-orders-detail-type-id',params : {type : type,id : item.id}}"><i class="fa fa-eye pr-2"></i></nuxt-link>
                                                </p>
                                            </td>
                                        </template>
                                    </table-main>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup>
import { purchaseOrders,adoptionOrders, shopOrders } from '~~/content/tableHeader';
import { getOffers } from '~~/services/account';
import { getOrders } from '~~/services/order';
const route = useRoute();
const type = route.params.type || 'pet';
const fields  = computed(()=> {
    return type == 'pet'?purchaseOrders:(type == 'offers'?adoptionOrders:shopOrders);
});
const {fetch,data} = useApi((page = 1)=> type == 'offers'?getOffers({page,...filterValues.value}):getOrders({page,...filterValues.value,type}));
const {setFilter,filterValues} = useTableFilter(fetch);
</script>