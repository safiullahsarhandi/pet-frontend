<template>
  <section class="donate-form listing-page p-70">
    <div class="container">
      <div class="row">
        <div class="col-md-10 m-auto">
          <div class="form-area shadow p-md-5 p-3">
            <div class="form-head text-center">
              <h1>Post to Donate</h1>
            </div>
            <div class="form-body pt-4">
              <Form ref="form" :validation-schema="schema" @submit="onSubmit">
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="name">
                        Name <span class="required">*</span>
                      </label>
                      <Field
                        name="name"
                        type="text"
                        placeholder="Enter Name"
                        class="form-control bg-light rounded-pill"
                        id="name"
                      />
                      <error-message name='name'/>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="petCategory"> Pet Category </label>
                      <Field 
                        @change="onSelectCategory($event.target.value)"
                        as="select"                       
                        name="category_id"
                        id="petCategory"
                        class="form-control bg-light rounded-pill"
                      >
                        <option value="">Select</option>
                        
                        <option :key="categoryIndex" v-for="(category,categoryIndex) in store?.categories" :value="category?.id">{{category?.name}}</option>
                        </Field>
                        <error-message name='category'/>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="color"> Pet Color </label>
                        <Field
                          name="color"
                          type="text"
                          placeholder="Enter Name"
                          class="form-control bg-light rounded-pill"
                          id="name"
                        />
                        <error-message name='color'/>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="gender"> Gender </label>
                      <Field
                        name="gender"
                        id="gender"
                        class="form-control bg-light rounded-pill"
                        as="select"
                      >
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </Field>
                      <error-message name='gender'/>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="age"> Age </label>
                      <Field
                        as="select"
                        name="age"
                        id="age"
                        class="form-control bg-light rounded-pill"
                      >
                        <option value="">Select</option>
                        <option :key="ageIndex" v-for='(age,ageIndex) in data?.ages' :value="age">{{age == '5+'?'Over 5 years':age}}</option>
                      </Field>
                      <error-message name='age'/>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="group"> Group </label>
                      <Field
                        as="select"
                        name="group_id"
                        id="group"
                        class="form-control bg-light rounded-pill"
                      >
                        <option value="">Select</option>
                        <option :key="groupIndex" v-for='(group,groupIndex) in data?.groups' :value="group?.id">{{group?.name}}</option>
                    </Field>
                    <error-message name='group_id'/>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="training">Temprament</label>
                      
                      <div :key="tempramentIndex" v-for="(temprament,tempramentIndex) in tempraments" class="form-check">

                            <Field
                            v-slot="{field}"
                            :name="`tempraments[${tempramentIndex}]`"
                            class="form-check-input"
                            type="checkbox"
                            :value="temprament?.id"
                            :id="`temprament${tempramentIndex}`"
                          >
                            <input v-bind="field" :id="`temprament${tempramentIndex}`" type="checkbox" name="tempraments" :value="temprament?.id"/>
                            <label class="form-check-label" :for="`temprament${tempramentIndex}`">
                              {{temprament?.name}}
                            </label>
                          </Field>
                        </div>
                        <error-message name="tempraments"/>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="training">Training</label>
                      <div :key="trainingIndex" v-for="(training,trainingIndex) in trainings" class="form-check">
                        <Field                          
                          :name="`trainings[${trainingIndex}]`"
                          class="form-check-input"
                          type="checkbox"
                          :value="training?.id"
                          :id="`trainings${trainingIndex}`"
                        />
                        <label class="form-check-label" :for="`trainings${trainingIndex}`">
                          {{training?.name}}
                        </label>
                      </div>
                      <error-message name='trainings'/>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group">
                      <label for="breed"> Breed </label>
                      <Field
                        as="select"
                        name="breed_id"
                        id="breed"
                        class="form-control bg-light rounded-pill"
                      >
                        <option value="">Select</option>
                        <option :key="breedIndex" v-for='(breed,breedIndex) in breeds' :value="breed?.id">{{breed?.name}}</option>                      
                      </Field>
                      <error-message name='breed'/>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group">
                      <label for="discription"> Description </label>
                      <Field
                        as="textarea"
                        name="description"
                        id="discription"
                        class="form-control bg-light rounded-20"
                        placeholder="Enter Description"
                        value=""
                        rows="5"
                      >
                      </Field>
                      <error-message name='description'/>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group">
                      <label for="upload">
                        Upload Media <span class="required">*</span>
                      </label>
                      <Field name="images" type="file" :validateOnChange="true" v-slot="{field}" multiple>
                        <input @change="setFiles" ref="uploader" v-bind="field" type="file" id="upload" class="d-none" multiple />
                      </Field>
                      <error-message name='images'/>
                      <div class="gallery">
                        <div class="uploadBtn">
                          <button @click="uploader.click()" type="button">
                            <i class="fa 
                            fa-upload"></i>
                          </button>
                        </div>
                        <div class="position-relative" :key="imageIndex" v-for="(image,imageIndex) in images">
                         <!--  <button type="button" @click="removeImage(imageIndex)" class="remove-btn position-absolute">
                            <i class="fa fa-times"></i>
                          </button> -->
                          <img draggable="false" :src="image?.file_url"/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="loginBtn text-center my-4">
                  <button
                    class="secondary-theme-button shadow btn bg-brown py-2"
                  >
                    Submit
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import {Form,Field, ErrorMessage,FieldArray} from 'vee-validate';
import { getGeneralData } from '~~/services/general';
import * as yup from 'yup';
import { useCategoryStore } from '~~/stores/category';
import { donate } from '~~/services/pet';

const {data} = useApi(()=> getGeneralData()); 
const store = useCategoryStore();
const {getThumbnail} = useFileReader();
const {notification} = useHelper();
const breeds = ref([]);
const form = ref(null);
const uploader = ref(null);
const images = ref([]);

const arrayValidator = (value)=> {
  const filteredValues = value?.filter(Boolean);
  return !(filteredValues == undefined || filteredValues.length == 0);
};
const schema = yup.object().shape({
  name : yup.string().required(),
  category_id : yup.string().required().label('category'),
  breed_id : yup.string().required().label('breed'),
  group_id : yup.string().required().label('group'),
  color : yup.string().required(),
  description : yup.string().required(),
  gender : yup.string().required(),
  age : yup.string().required(),
  tempraments : yup.array().required().test('validateArray','tempraments are required',arrayValidator),
  trainings : yup.array().required()
  .transform((value)=> {
    return value?.filter(Boolean);
  })
  .test('array','trainings are required',arrayValidator),
  images : `yup.array().of(yup.mixed().required('images are required')).test('validateArray','images are required',arrayValidator),`
});
const tempraments = computed(()=> {
  let values = data.value?.behaviours?data.value?.behaviours[0]:[];
  return values?.sub_behaviours;
});

const trainings = computed(()=> {
  let values = data.value?.behaviours?data.value?.behaviours[1]:[];
  return values?.sub_behaviours;
});
const onSubmit = async (values)=> {
  try {
    values.tempraments = values.tempraments?.filter(Boolean)
    values.trainings = values.trainings?.filter(Boolean)
    let {message} = await donate(values);
    notification(message);
    navigateTo({
      name : 'account-ads'
    })
  } catch (error) {
    let {errors,message} = error?.response?.data;
    if(message) notification(message,'error');
           
  }
};
const removeImage = (imageIndex)=> {
  images.value.splice(imageIndex,1);
};
const onSelectCategory = (val)=> {
        let selectedCategory = store.categories.find(elem=> elem.id == val);
        // breedOptions
        breeds.value = selectedCategory?.breed_types;
        form.value.setFieldValue('breed','');
}

const setFiles = async (e)=> {
    const files = e.target.files;
    const selectedFiles = [];
    for (let file of files){
        let file_url = await getThumbnail(file);
        selectedFiles.push({file_url, file});
    }
    images.value = selectedFiles;
     
};


onBeforeMount(()=>{
  store.get({type : ['pet','other_pet'],});
});
</script>