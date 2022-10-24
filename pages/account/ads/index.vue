<template>
  <section class="listing-page py-5">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="listing-title text-center">
            <h1 class="font-weight-bold">My Ads</h1>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <table-search/>
          <!-- ad listing  -->
          <table-main :data="data" :fields="fields">
            <template #extra-heads>
                <th>Adoption Status</th>
                <th>Ad Status</th>
                <th>Action</th>
            </template>
            <template #extra-cells="item">
                <td :class="{[getAdoptionColor(item.status)] : true}">{{getAdoptionStatus(item.status)}}</td>
                <td class="status">
                    <select v-if="item.status != 'adopted'" v-model="item.status" name="adoopton-status" id="" class="border-0 bg-transparent">
                        <option value="active">Active</option>
                        <option value="inactive">In Active</option>
                    </select>
                    <span v-else>{{item.status == 'adopted'?'Not Available':item.status }}</span>
                </td>
                <td class="dropdown">
                    <button id="dropdownMenuButton" data-toggle="dropdown" aria-expanded="false" class="border-0 bg-transparent"><i class="fa fa-ellipsis-v"></i></button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <nuxt-link class="dropdown-item viewPage" :to="{name: 'offers-id',params : {id : item.id}}"><i class="fa fa-eye pr-2"></i> View Offers</nuxt-link>
                        <nuxt-link class="dropdown-item" :to="{name: 'account-ads-detail-id',params : {id : item.id} }"><i class="fa fa-bullhorn pr-2"></i> View Ad</nuxt-link>
                    </div>
                </td>
            </template>
        </table-main>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import {ads as fields} from '~~/content/tableHeader';
import { getAds } from '~~/services/ad';
const {data} = useApi((page = 1)=> getAds({page, type : 'adoption',},'/account'));

const getAdoptionStatus = (status)=> {
    if(status == 'adopted')
        return 'Adopted';
    else
        return 'Pending';
};

const getAdoptionColor = (status)=> {
    if(status == 'adopted')
        return 'text-theme-secondary';
    else
        return 'text-theme-primary';
};
</script>

