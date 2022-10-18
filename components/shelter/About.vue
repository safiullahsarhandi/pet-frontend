<template>
  <div class="row">
    <div class="col-md-9">
      <div class="shelter-discription shadow rounded-10 p-3">
        <h3 class="font-weight-bold">About Shelter</h3>
        <p>
          {{shelter?.description}}
        </p>
      </div>
    </div>
    <div class="col-md-3">
        <card-owner :title="``" :owner="shelter">
            <li class="nav-item icon-red">
              <a href="#"><i class="fa fa-map-marker"></i>Pasadena,Texas</a>
              <p class="mb-0 mt-3">10 miles away</p>
            </li>
        </card-owner>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
    shelter : {
        type  : Object,
        default : ()=> ({}),
    }
});
</script>