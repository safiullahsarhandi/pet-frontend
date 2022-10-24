<template>
    <section class="listing-page py-5">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-md-3">
                    <div class="back-page">
                        <nuxt-link :to="{name : 'pets-type',params : { type : route.params.pettype, id : data?.id } }" class="back-arrow"><i class="fa fa-arrow-left"></i></nuxt-link>
                    </div>
                </div>
                <div class="col-md-7">
                    <div class="listing-title text-center">
                        <h1 class="font-weight-bold">{{pageHeading}}</h1>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-9 mb-4 mb-md-0">
                    <div class="adopt-details shadow rounded-10 p-3">
                        <div class="row">
                            <div class="col-md-2 px-md-0">
                                <div class="thubnail-slide flex-shrink-0 slider-nav">
                                    <client-only>
                                        <carousel v-if="data?.files" :settings="settings" :items-to-show="1.5">
                                            <slide v-for="(slide,index) in data?.files" :key="index">
                                            <div class="vertical-thubnail">
                                                <img :src="slide.file_url" draggable="false" class="mw-100" alt="Slide 2">
                                            </div>
                                            </slide>
                                        </carousel>
                                    </client-only>
                                </div>
                            </div>
                            <div class="col-md-10 px-md-1">
                                <div class="slider-for mb-4">
                                    <client-only>
                                        <carousel :settings="settings" :items-to-show="1.5">                                    
                                            <slide :key="index" v-for="(slide,index) in data?.files">
                                                <div  class="feature-image">
                                                    <div class="additional-things align-items-center">
                                                        <div class="tag">
                                                            <span v-if="data.type == 'adoption'" class="bg-adopted">{{statusDetail}}</span>
                                                            <span v-else class="bg-red">{{statusDetail}}</span>
                                                        </div>
                                                        <div class="whislList">
                                                            <button @click="toggleWishlist(data?.id)"><i class="fa" :class="{'fa-heart' : (data?.is_wishlist),'fa-heart-o' : (!data?.is_wishlist)}"></i></button>
                                                        </div>
                                                    </div>
                                                    <div class="adjust-image-adopt">
                                                        <img :src="slide?.file_url" draggable="false" class="mw-100" alt="Slide 1">
                                                    </div>
                                                </div>
                                            </slide>
                                    </carousel>
                                    </client-only>
                                </div>
                                <div class="adopt-pet-detail mb-4 mx-10">
                                    <div class="row justify-content-between">
                                        <div class="col-md-5">
                                            <div class="title-pet-box">
                                                <h3 class="mb-0">{{data?.name}}</h3>
                                            </div>
                                            <div class="order-id">
                                            </div>
                                            <div class="date-time-box align-items-center d-flex flex-wrap gap-15 my-2">
                                                <div class="date">
                                                    <p class="mb-0 f-14"><i class="fa fa-calendar-o"></i> {{format_date(data?.created_at)}}</p>
                                                </div>
                                                |
                                                <div class="date">
                                                    <p class="mb-0 f-14"><i class="fa fa-clock-o"></i> 01 day ago</p>
                                                </div>
                                            </div>
                                            <div class="mile-box">
                                                <p class="mb-0">{{(data?.owner?.distance >= 0)? `${data?.owner?.distance} miles away`: ''}} </p>
                                            </div>
                                        </div>
                                        <div v-if="data?.type == 'purchase'" class="col-md-4 text-md-right">
                                            <h4 class="mb-0 text-theme-primary">${{data?.payable_cost}}</h4>
                                        </div>
                                    </div>
                                </div>
                                <div class="variation-box mb-4 mx-10">
                                    <div class="row">
                                        <div class="col-md-4 mb-3">
                                            <div class="variant-box">
                                                <div class="d-flex align-items-center flex-wrap gap-15">
                                                    <div class="variant-image">
                                                        <figure class="mb-0 image-wrapper">
                                                            <img src="/assets/images/age.png" alt="Age" draggable="false">
                                                        </figure>
                                                    </div>
                                                    <div class="variant-text">
                                                        <p class="text-secondary f-14 mb-0">Age</p>
                                                        <p class="mb-0">{{data?.age || 0}}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-4 mb-3">
                                            <div class="variant-box">
                                                <div class="d-flex align-items-center flex-wrap gap-15">
                                                    <div class="variant-image">
                                                        <figure class="mb-0 image-wrapper">
                                                            <img src="/assets/images/group.png" alt="Group" draggable="false">
                                                        </figure>
                                                    </div>
                                                    <div class="variant-text">
                                                        <p class="text-secondary f-14 mb-0">Group</p>
                                                        <p class="mb-0">{{data?.group?.name}}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-4 mb-3">
                                            <div class="variant-box">
                                                <div class="d-flex align-items-center flex-wrap gap-15">
                                                    <div class="variant-image">
                                                        <figure class="mb-0 image-wrapper">
                                                            <img src="/assets/images/color.png" alt="Color" draggable="false">
                                                        </figure>
                                                    </div>
                                                    <div class="variant-text">
                                                        <p class="text-secondary f-14 mb-0">Color</p>
                                                        <p class="mb-0">{{data?.color}}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-4 mb-3">
                                            <div class="variant-box">
                                                <div class="d-flex align-items-center flex-wrap gap-15">
                                                    <div class="variant-image">
                                                        <figure class="mb-0 image-wrapper">
                                                            <img src="/assets/images/breed.png" alt="Breed" draggable="false">
                                                        </figure>
                                                    </div>
                                                    <div class="variant-text">
                                                        <p class="text-secondary f-14 mb-0">Breed</p>
                                                        <p class="mb-0">{{data?.breed?.name}}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-4 mb-3">
                                            <div class="variant-box">
                                                <div class="d-flex align-items-center flex-wrap gap-15">
                                                    <div class="variant-image">
                                                        <figure class="mb-0 image-wrapper">
                                                            <img src="/assets/images/cate.png" alt="Pet Category" draggable="false">
                                                        </figure>
                                                    </div>
                                                    <div class="variant-text">
                                                        <p class="text-secondary f-14 mb-0">Pet Category</p>
                                                        <p class="mb-0">{{data?.category?.name}}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="behavior-box mb-4 mx-10 border-top pt-4">
                                    <div class="row justify-content-between">
                                        <div class="col-md-12">
                                            <div class="title-pet-box">
                                                <h3 class="mb-0">Behaviour Characteristics</h3>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="tag-title py-3">
                                                <p class="text-theme-primary font-weight-600 m-0">Temprament</p>
                                            </div>
                                            <div class="d-flex gap-15 align-items-center flex-wrap">
                                                <span :key="behaviourIndex" v-for="(behaviour,behaviourIndex) in tempraments" class="tag-btn shadow">{{behaviour}}</span>
                                                <no-record :data="tempraments">No Tempraments</no-record>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="tag-title py-3">
                                                <p class="text-theme-primary font-weight-600 m-0">Training</p>
                                            </div>
                                            <div class="d-flex gap-15 align-items-center flex-wrap">
                                                <span :key="behaviourIndex" v-for="(behaviour,behaviourIndex) in trainings" class="tag-btn shadow">{{behaviour}}</span>
                                                <no-record :data="trainings">No Traninings</no-record>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="behavior-box mb-4 mx-10 border-top pt-4">
                                    <div class="row justify-content-between">
                                        <div class="col-md-12">
                                            <div class="title-pet-box">
                                                <h3 class="mb-0">About {{data?.name}}</h3>
                                                <p>{{data?.description}}</p>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div v-if="!data?.report?.id" class="reportAd text-center">
                                                <p><a @click="showCreatorPopup('/v1/reports', '',{})" class="text-danger" href="javascript:void()" data-toggle="modal" data-target="#reportAd"><i class="fa fa-warning pr-1"></i> Report Your Ad</a></p>
                                            </div>
                                            <div v-if="data?.report?.id" class="reportAd">
                                                <strong for="">Your Reported Reason:</strong>
                                                <p>{{data?.report?.detail}}</p>

                                                <strong for="">Admin Remarks On Report:</strong>
                                                <p>{{data?.report?.admin_note || 'Waiting for remarks'}}</p>
                                            </div>
                                            <div v-if="data?.type == 'adoption'" class="viewPin text-center mt-4">
                                                <nuxt-link v-if="data?.has_offered" :to="{name : `offers-detail-id`,params : {id : data?.offer?.id }}" class="secondary-theme-button shadow btn bg-brown py-2" id="bgAdopted">View Offer!</nuxt-link>
                                                <nuxt-link v-else-if="!data?.has_offered && data?.status == 'active'" :to="{name : `pets-pettype-detail-id-adoption`,params : {pettype : 'adoption', id : data?.id }}" class="secondary-theme-button shadow btn bg-brown py-2" id="bgAdopted">Adopt Now!</nuxt-link>
                                            </div>
                                            <div v-if="data?.type == 'purchase' && data?.status == 'active'" class="viewPin text-center mt-4">
                                                <nuxt-link v-if="data?.status == 'active'" :to="{name : `pets-pettype-detail-id-purchase`,params : {pettype : 'purchase', id : data?.id }}" class="secondary-theme-button shadow btn bg-brown py-2" id="bgAdopted">Purchase Now!</nuxt-link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 mb-4 mb-md-0">
                    <card-owner :owner="owner"/>
                </div>
            </div>
        </div>
        <client-only>
            <popup-creator
                :additional-fields="{reportable_id : data?.id,reportable_type : 'ad'}"
                :title="popupParams.title"
                :active="popupParams.active"
                :fields="popupParams.fields"
                :api-url="popupParams.apiUrl"
                :validation-schema="popupParams.schema"
                :data="popupParams.data"
                @closed="hidePopup"
                submit-btn-text="Report"
                :show-icon="true"
            ></popup-creator>
        </client-only>
    </section>
</template>
<script setup>
import * as yup from 'yup';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import { purchaseOrders,adoptionOrders, shopOrders } from '~~/content/tableHeader';
import { getOffer } from '~~/services/offer';
import { getOrder } from '~~/services/order';
import { getPet } from '~~/services/pet';
import {updateWishlist} from '~~/services/wishlist';
const route = useRoute();
const {format_date} = useHelper();
const type = route.params.pettype || 'pet';


const settings = {
  itemsToShow: 1,
  itemsToScroll: 1,
  wrapAround: true,
};
const {
  showCreatorPopup,
  hideCreatorPopup,
  popupParams,
  setSchema,
  setFields,
} = useCreatorPopup();

const pageHeading = computed(()=> {
        return type == 'adoption'?'Adopt Pet Details':'Purchase Pet Details';
});

const statusDetail = computed(()=> (
        (route.params.pettype == 'adoption')?
        ((data.value?.status == 'active')?'Available to Adopt':data.value?.status):
        ((data.value?.status == 'active')?'Available for Sale':(data.value?.status == 'sold'?'Sold Out':data.value?.status))
        )
);
const {fetch,data} = useApi(()=> getPet(route.params.id,{type,...filterValues.value }));
const {setFilter,filterValues} = useTableFilter(fetch);
const {toggleWishlist} = useWishlist(data);


const tempraments = computed(()=> {
    let values =  data?.value?.behaviours?.filter((item)=>item?.pivot?.type == 'tempraments');
    return values?.map((item)=> item.name);
});

const trainings = computed(()=> {
    let values =  data?.value?.behaviours?.filter((item)=>item?.pivot?.type == 'trainings');
    values = values?.map((item)=> item.name);
});
const owner = computed(()=> data.value.owner);

const hidePopup = ()=> {
    hideCreatorPopup();
    fetch();
};

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