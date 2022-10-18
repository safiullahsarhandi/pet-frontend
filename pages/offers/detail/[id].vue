<template>
  <section class="listing-page py-5">
    <client-only>
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-3">
            <div class="back-page">
              <a href="javascript:void(0)" @click="router.go(-1)" class="back-arrow">
                <i class="fa fa-arrow-left"></i>
              </a>
            </div>
          </div>
          <div class="col-md-7">
            <div class="listing-title text-center">
              <h1 class="font-weight-bold">Offer Details</h1>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-9 mb-4 mb-md-0">
            <div class="adopt-details shadow rounded-10 p-3">
              <div class="behavior-box mb-4 mx-10">
                <div class="row justify-content-between">
                  <div class="col-md-8">
                    <div
                      :key="index"
                      v-for="(submission, index) in data?.form_data"
                      class="offer-detail-section mb-3"
                    >
                      <div class="tag-title question py-3">
                        <p class="m-0">{{ submission.text }}</p>
                      </div>
                      <div class="answer">
                        <span class="tag-btn shadow">{{
                          submission.selected_value
                        }}</span>
                      </div>
                    </div>
                  </div>
                  <div v-if="user?.id == data?.pet?.owner_id" class="col-md-4">
                    <div
                      class="
                        form-group
                        d-flex
                        align-items-center
                        justify-content-end
                        gap-15
                        mb-0
                      "
                    >
                      <label for="status" class="flex-shrink-0 mb-md-0">
                        Status
                      </label>
                      <select
                        @change="updateStatus(data?.id, $event.target.value)"
                        ref="statusDropdown"
                        name="pet-status"
                        id="status"
                        class="
                          form-control
                          rounded-pill
                          serachFiled
                          flex-shrink-0
                        "
                      >
                        <option value="pending">Pending</option>
                        <option value="accepted">Accept</option>
                        <option value="rejected">Reject</option>
                      </select>
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
    </client-only>
  </section>
</template>
<script setup>
import { validate } from "vee-validate";
import { getOffer, updateOfferStatus } from "~~/services/offer";
import { useUserStore } from "~~/stores/user";
let { fetch, data } = useApi(() => getOffer(route.params.id));
const store = useUserStore();
const route = useRoute();
const router = useRouter();
const { confirmPopup } = usePopup();
const { notification } = useHelper();
const error = useError()
const user = computed(() => store.user);
const owner = computed(() => data.value?.pet?.owner);
const allowedUsers = computed(()=> [data.value?.pet?.owner_id,data.value?.user_id]);
const statusDropdown = ref(null);
const updateStatus = (id, status) => {
  let newStatusDetail = status == "accepted" ? "Accept" : "Reject";
  confirmPopup({
    message: `Are you sure! do you want to ${newStatusDetail} this offer?`,
    onConfirm: async () => {
      try {
        let { message } = await updateOfferStatus(id, status);
        notification(message);
        fetch();
      } catch (error) {
        let {
          data: { message },
        } = error.response;
        notification(message, "error");
      }
    },
    onCancel: ()=> {
      statusDropdown.value.value = 'pending';
    },
  });
};
const validateAccess = async ()=> {
  
  // if(allowedUsers.value.indexOf(user.value?.id))
    // throw showError({ statusCode: 404, statusMessage: 'Page Not Found' });
    // throw createError({ statusCode: 404, statusMessage: 'Page Not Found' });
};

onBeforeMount(() => {
  fetch();
  validateAccess();
});
</script>