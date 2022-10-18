<template>
    <div class="modal fade" id="confirm-popup" tabindex="-1" role="dialog" aria-labelledby="logoutWarningTitle" aria-hidden="true">
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
            <div class="loginBtn text-center mt-3 d-flex justify-content-center gap-15">
                <button @click="handleConfirm()" class="secondary-theme-button shadow btn bg-brown">Yes</button>
                <button @click="handleCancel()" class="secondary-theme-button shadow btn borderBtn">No</button>
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
    default: "Are you sure you want to perform this action?",
  },
  active: {
    type: Boolean,
    default: true,
  },
});
const emit = defineEmits(["cancelled", "confirmed"]);

const toggleModal = (value) => {
  const confirmModal = Modal.getOrCreateInstance(
    document.getElementById("confirm-popup")
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
};
// listeners registeration for popup hide
const registerListener = () => {
  var myModalEl = document.getElementById("confirm-popup");
  if (myModalEl) {
    myModalEl.addEventListener("hide.bs.modal", handleModalHide);
  }
};
const unRegisterListener = () => {
  var myModalEl = document.getElementById("confirm-popup");
  if (myModalEl) {
    return myModalEl.removeEventListener("hide.bs.modal", handleModalHide);
  }
};
const handleCancel = () => {
  toggleModal(false);
  emit("cancelled");
};
const handleConfirm = () => {
  toggleModal(false);
  emit("confirmed");
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
    toggleModal(newValue);
  }
);
</script>
