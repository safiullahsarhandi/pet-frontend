<template>
    <div class="modal fade" id="success-popup" tabindex="-1" role="dialog" aria-labelledby="logoutWarningTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content loginPopup">
              <div class="closebtn">
                  <button @click="handleCancel()" type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                  </button>
              </div>
              <div class="pop-up-content text-center">
                  <img src="/assets/images/popup-header.png" alt="Login" draggable="false" class="mw-100 mb-4">
                  <h4 class="mb-1">{{title}}</h4>
                  <p class="mb-0">{{message}}</p>
              </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted, onUnmounted, ref, watch } from "vue";
import { Modal } from "bootstrap";
const props = defineProps({
  title: {
    type: String,
    default: "System Message!",
  },
  message: {
    type: String,
    default: "Successfully Done",
  },
  active: {
    type: Boolean,
    default: true,
  },
  cancelBtnText : {
    type : String,
    default : 'No',
  },
  confirmBtnText : {
    type : String,
    default : 'Yes',
  }
});
const emit = defineEmits(["closed"]);

const toggleModal = (value) => {
  const confirmModal = Modal.getOrCreateInstance(
    document.getElementById("success-popup")
  );
  if (value) {
    confirmModal.show();
  } else {
    confirmModal.hide();
    // confirmModal.hide();
  }
};

// this function handle the issues of modal backdrop as sometimes bootstrap modal
// don't remove backdrop which cause overlay

const handleModalHide = function (event) {
  document
    .querySelectorAll(".modal-backdrop.show")
    .forEach((el) => el.remove());
    emit('closed');
};
// listeners registeration for popup hide
const registerListener = () => {
  var myModalEl = document.getElementById("success-popup");
  if (myModalEl) {
    myModalEl.addEventListener("hide.bs.modal", handleModalHide);
  }
};
const unRegisterListener = () => {
  var myModalEl = document.getElementById("success-popup");
  if (myModalEl) {
    return myModalEl.removeEventListener("hide.bs.modal", handleModalHide);
  }
};
onMounted(() => {
  registerListener();
});

onUnmounted(() => {
  unRegisterListener();
});
watch(
  () => props.active,
  (newValue) => {
    console.log(newValue);
    toggleModal(newValue);
  }
);
</script>
