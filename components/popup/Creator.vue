<template>
  <!-- change password -->
  <div
    class="modal fade"
    id="creator-popup"
    tabindex="-1"
    aria-labelledby="creator-popup"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content loginPopup">
        <div class="closebtn">
          <button
            @click="toggleModal(false)"
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="pop-up-content px-md-4 px-3">
          <div v-if="showIcon" class="text-center">
            <img src="/assets/images/popup-header.png" alt="Login" draggable="false" class="mw-100 mb-4"/>
          </div>
          <h4 class="mb-3 text-center">{{title}}</h4>
          <Form v-slot="{setFieldValue}" :initial-values="{...data}" ref="form" @submit="onSubmit" :validation-schema="validationSchema">
            <div :key="fieldIndex" v-for="(field, fieldIndex) in fields" class="form-group">
              <label for="password">
                {{ field.label }}
              </label>
              <div v-if="field?.component" v-bind="field?.attrs" >
                <Field :name="field?.name" as="div">
                  <component :key="fieldIndex" v-on:[field?.event]="setFieldValue(field?.name,$event)"  v-bind="field?.componentProps" :is="field.component"></component>
                </Field>
              </div>
              <Field :name="field?.name" v-slot="{field}" v-else-if="field?.type == 'textarea'">
                  <textarea  rows="8"  class="form-control bg-light rounded-10" v-bind="field" :placeholder="field.placeholder"></textarea>
              </Field>
              <div v-else-if="field?.type == 'password'" class="password-box">
                <Field
                  :type="field.type"
                  :name="field.name"
                  :placeholder="field.placeholder"
                  class="form-control rounded-pill"
                  :id="field.id || `field${fieldIndex}`"
                />
                <button @click="switchType($event,`#${field.id || `field${fieldIndex}`}`)" type="button"><i class="fa fa-eye-slash"></i></button>
              </div>
              <Field
                v-else
                :type="field.type"
                :name="field.name"
                :placeholder="field.placeholder"
                class="form-control rounded-pill"
                :id="field.id || `field${fieldIndex}`"
                />
                <ErrorMessage :name="field?.name"></ErrorMessage>
            </div>
            <div class="loginBtn text-center my-4">
              <button
                class="secondary-theme-button shadow btn bg-brown py-2"
                type="submit">
              {{submitBtnText}}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { Form, Field, ErrorMessage } from "vee-validate";
import { onMounted, onUnmounted, ref, watch } from "vue";
import { create } from "~~/services/general";
import { Modal } from "bootstrap";
const { notification,switchType } = useHelper();
const form = ref(null);
const props = defineProps({
  showIcon: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: null,
  },
  fields: {
    type: Array,
    default: () => [],
  },
  additionalFields: {
    type: Object,
    default: () => ({}),
  },
  data: {
    type: Object,
    default: () => ({}),
  },
  validationSchema: {
    type: Object,
    default: () => ({}),
  },
  active: {
    type: Boolean,
    default: true,
  },
  apiUrl: {
    type: String,
    default: null,
  },
  modalClass: {
    type: [String, Array],
    default: "modal-sm",
  },
  submitBtnText: {
    type: String,
    default: "Continue",
  },
});

const emit = defineEmits(["closed"]);

const apiCalled = ref(false);
const toggleModal = (value) => {
  const creatorModal = Modal.getOrCreateInstance(
    document.getElementById("creator-popup")
  );
  if (value) {
    creatorModal.show();
  } else {
    creatorModal.hide();
  }
};
// this function handle the issues of modal backdrop as sometimes bootstrap modal
// don't remove backdrop which cause overlay

const handleModalHide = function (event) {
  emit("closed",apiCalled.value);
  document
    .querySelectorAll(".modal-backdrop.show")
    .forEach((el) => el.remove());
    apiCalled.value = false;
};
// listeners registeration for popup hide
const registerListener = () => {
  var myModalEl = document.getElementById("creator-popup");
  if (myModalEl) {
    myModalEl.addEventListener("hide.bs.modal", handleModalHide);
  }
};
const unRegisterListener = () => {
  var myModalEl = document.getElementById("creator-popup");
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
    toggleModal(newValue);
  }
);

const onSubmit = async (values) => {
  try {
    let { message } = await create(props.apiUrl, {
      ...values,
      ...props.additionalFields,
    });
    notification(message);
    toggleModal(false);
    apiCalled.value = true;
  } catch (error) {
    let { errors, message } = error?.response?.data;
    notification(message,'error');
    if (errors?.length > 0) {
      form.value.setErrors(errors);
    }
  }
};
const showTest = (fieldValue,fieldRef)=> {
  // fieldRef.value = fieldValue
    console.log();
};
</script>