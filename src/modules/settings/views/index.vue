<template>
  <div>
    <dashboard-page-title :showSearch="false" :showFilter="false" :showMainActions="false" @addEvent="$router.push({name: 'addMerchant'})">
      الاعدادات
    </dashboard-page-title>
    <ValidationObserver v-slot="{ handleSubmit }">
      <b-form @submit.prevent="handleSubmit(onSubmit)">
        <b-row>
          <b-col md="10">
            <div>
              <b-card class="iq-border-radius-10 mb-4">
                <template v-slot:header>
                  <h5 class="text-primary">البيانات الشخصية</h5>
                </template>
                <b-row>
                  <b-col lg="3">
                    <img src="@/assets/images/ibbil/images/user-profile.jpg" class="img-fluid rounded-circle settings-user-profile" />
                  </b-col>
                  <b-col lg="9">
                    <b-row>
                      <b-col  xl="6">
                        <input-form
                            class="mb-3 joining-label"
                            v-model="userData.full_name"
                            validate="required"
                            name="name"
                            placeholder="محمود سيد" label="الاسم بالكامل"
                        />
                      </b-col>
                      <b-col  xl="6">
                        <input-form
                            class="mb-3 joining-label"
                            v-model="userData.primary_phone_number"
                            validate="required|numeric"
                            name="phone"
                            placeholder="433423556232" label="رقم الهاتف"
                        />
                      </b-col>
                      <b-col  xl="6">
                        <input-form
                          class="mb-3 joining-label"
                          v-model="userData.email"
                          :validate="'required|email'"
                          name="id"
                          placeholder="Mahmoudsayed@gmail.com" label="البريد الالكترونى"
                        />
                      </b-col>
                      <b-col  xl="6">
                        <input-form
                          class="mb-3 joining-label"
                          v-model="userData.secondary_phone_number"
                          :validate="'numeric'"
                          name="phone2"
                          placeholder="991348741947" label="رقم هاتف اخر"
                        />
                      </b-col>
                      <b-col  md="12">
                        <input-form
                          class="mb-3 joining-label"
                          v-model="userData.clinic_address"
                          :validate="'required'"
                          name="address"
                          placeholder="مدينة الصفا - شارع الأمل مبني 18" label="عنوان العيادة"
                        />
                      </b-col>
                      <b-col  md="12">
                        <input-form
                          class="mb-3 joining-label"
                          v-model="userData.iban"
                          :validate="'numeric'"
                          name="iban"
                          placeholder="349257295729875928745024" label="رقم IBAN"
                        />
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
              </b-card>
              <b-card class="iq-border-radius-10 mb-4">
                <template v-slot:header>
                  <h5 class="text-primary">قم بتحديد الخدمات التى تقوم بتقديمها</h5>
                </template>
                <div class="dashboard-custom-checkbox">
                  <b-form-checkbox-group
                    v-model="doctorServiceSelected"
                    :options="doctorServiceOptions"
                    class="dashboard-custom-checkbox-inner  d-flex align-items-center flex-wrap"
                    value-field="item"
                    text-field="name"
                  ></b-form-checkbox-group>
                </div>
              </b-card>
              <b-card class="iq-border-radius-10 mb-4">
                <template v-slot:header>
                  <div class="d-flex align-items-center flex-wrap gap_2">
                    <h5 class="text-primary">طريقة الكشف</h5>
                    <div class="d-flex align-items-center justify-content-between flex-wrap gap_1">
                      <b-form-radio-group
                        id="etectionMethod"
                        v-model="selectedDetectionMethod"
                        :options="optionsDetectionMethod"
                        aria-describedby="ariaDescribedby"
                        name="detectionMethod"
                        class="detection-custom-radio d-flex align-items-center"
                      ></b-form-radio-group>
                      <div class="d-flex align-items-center gap_2 setting-box-inp-detection-time" v-if="selectedDetectionMethod === 'appointment'">
                        <h6 class="setting-box-title setting-box-title-detection-time font-size-16">مدة الكشف</h6>
                        <div class="d-flex align-items-center gap_2">
                          <div class="d-flex align-items-center gap_1">
                            <input-form
                              class="text-center m-0 matone-value"
                              placeholder="1"
                              v-model="examination_duration.hours"
                              validate="required|numeric"
                              name="hours" />
                            <span class="small-text">ساعة</span>
                          </div>
                          <div class="d-flex align-items-center gap_1">
                            <input-form
                              class="text-center m-0 matone-value"
                              placeholder="30"
                              v-model="examination_duration.minutes"
                              validate="required|numeric"
                              name="minutes" />
                            <span class="small-text">دقيقة</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
                <div class="" v-if="work_times.length">
                  <h5 class="text-primary">مواعيد العمل</h5>
                  <div class="p-4">
                    <div class="d-flex align-items-center gap_1 time-of-work-item flex-wrap" v-for="(timeOfWork, index) in work_times" :key="index">
                      <div class="time-of-work-item-controls d-flex align-items-center gap_1">
                        <span class="time-of-work-item-controls-label font-size-20">{{timeOfWork.day}}</span>

                        <b-form-checkbox
                          :id="`time-of-work-item-controls-checkbox-${index}`"
                          v-model="timeOfWork.is_active"
                          :name="`time-of-work-item-controls-checkbox-${index}`"
                          class="d-flex align-items-center dashboard-custom-checkbox time-of-work-item-controls-checkbox"
                          :value="false"
                          :unchecked-value="true"
                          ariaDescribedby="item-checkbox-day"
                        >
                          مغلق
                        </b-form-checkbox>
                      </div>
                      <div  v-if="timeOfWork.is_active && timeOfWork.working_periods.length" class="d-flex flex-column gap_1">
                        <div class="d-flex align-items-center gap_4  flex-wrap" v-for="(timeItem, idx) in timeOfWork.working_periods" :key="idx">
                          <div class="d-flex align-items-center gap_1">
                            <h6 class="setting-box-title time-of-work-item-label font-size-20">من</h6>
                            <flat-pickr
                              v-model="timeItem.from"
                              :config="config"
                              class="form-control time-of-work-item-controls-date"
                              placeholder="Select time"
                              name="time-of-work-item-controls-date"
                            />
                          </div>
                          <div class="d-flex align-items-center gap_1">
                            <h6 class="setting-box-title time-of-work-item-label font-size-20">الى</h6>
                            <flat-pickr
                              v-model="timeItem.to"
                              :config="config"
                              class="form-control time-of-work-item-controls-date"
                              placeholder="Select time"
                              name="time-of-work-item-controls-date-to"
                            />
                          </div>
                          <b-button v-if="idx === timeOfWork.working_periods.length - 1" class="d-flex align-items-center d-flex align-items-center bg-transparent border-0 p-0 time-of-work-item-add-btn" @click="addTimeOfWork(index)">
                            <i class="las la-clock icon"></i>
                            <span>اضافة فترة عمل اخرى</span>
                          </b-button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </b-card>
              <b-card class="iq-border-radius-10 mb-4">
                <template v-slot:header>
                  <h5 class="text-primary">الاسعار</h5>
                </template>
                <b-row class="">
                  <b-col xl="12">
                    <div class="setting-box-inner d-flex align-items-center gap_2">
                      <h6 class="setting-box-title font-size-20">كشف العيادة</h6>
                      <div class="d-flex align-items-center gap_1">
                        <input-form
                          class="text-center m-0 matone-value"
                          placeholder="200"
                          v-model="prices.clinic_examine"
                          validate="required|numeric"
                          name="clinic_examine" />
                        <span class="small-text">ريال سعودى</span>
                      </div>
                    </div>
                  </b-col>
                  <b-col sm="12">
                    <div class="setting-box-inner d-flex align-items-center gap_2">
                      <h6 class="setting-box-title font-size-20">زيارة منزلية</h6>
                      <div class="d-flex align-items-center gap_1">
                        <input-form
                          class="text-center m-0 matone-value"
                          placeholder="50"
                          v-model="prices.outdoor_examine"
                          validate="required|numeric"
                          name="outdoor_examine" />
                        <span class="small-text">ريال سعودى</span>
                      </div>
                    </div>
                  </b-col>
                  <b-col sm="12">
                    <div class="setting-box-inner d-flex align-items-center gap_2">
                      <h6 class="setting-box-title font-size-20">استشارة</h6>
                      <div class="d-flex align-items-center gap_1">
                        <input-form
                          class="text-center m-0 matone-value"
                          placeholder="100"
                          v-model="prices.consulting"
                          validate="required|numeric"
                          name="consulting" />
                        <span class="small-text">ريال سعودى</span>
                      </div>
                    </div>
                  </b-col>
                </b-row>
              </b-card>
            </div>
            <div>
              <b-row>
                <b-col md="4" class="mb-4" v-for="(itemFile, index) in requiredDocuments" :key="index">
                  <img-upload-box :data="itemFile" :index="index" @uploadDocument="uploadDocument" />
                </b-col>
              </b-row>
            </div>
            <div class="d-flex justify-content-center">
              <b-button variant="primary" class="vete-save-btn m-auto" type="submit" v-if="!loadingButtonSubmit"> حفظ </b-button>
              <b-button variant="primary" class="vete-save-btn m-auto" v-else> <spinner-loading :text="'يتم التحميل'"></spinner-loading> </b-button>
            </div>
          </b-col>
        </b-row>
      </b-form>
    </ValidationObserver>
  </div>
</template>
<script>
import { core } from '@/config/pluginInit'
import doctorApi from '../services/settings'
import imgUploadBox from '../components/imgUploadBox'
import axios from 'axios'
export default {
  mounted () {
    core.index()
  },
  components: { imgUploadBox },
  data () {
    return {
      loadingButtonSubmit: false,
      userData: {},
      userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).data.user : {},
      doctorServiceSelected: [],
      doctorServiceOptions: [
        { item: { allow_clinic_examine: true }, name: 'كشف عيادة' },
        { item: { allow_outdoor_examine: true }, name: 'زيارة منزلية' },
        { item: { allow_consulting: true }, name: 'استشارة هاتفية' }
      ],
      prices: {
        clinic_examine: '',
        consulting: '',
        outdoor_examine: ''
      },
      selectedDetectionMethod: '',
      optionsDetectionMethod: [
        { text: 'بأولوية الحضور', value: 'first-come-first-served' },
        { text: 'ميعاد محدد', value: 'appointment' }
      ],
      examination_duration: {
        hours: '',
        minutes: '',
        seconds: '00'
      },
      work_times: [],
      config: {
        enableTime: true,
        noCalendar: true,
        dateFormat: 'H:i',
        time_24hr: false,
        defaultDate: '14:30'
      },
      requiredDocuments: null,
      uploadedDcouments: []
    }
  },
  methods: {
    addTimeOfWork (idx) {
      this.work_times[idx].working_periods.push({ from: '', to: '' })
    },
    getUserInfo () {
      doctorApi.getDoctorInfo().then(response => {
        this.userData = response.data
      })
    },
    getRequiredDocuments () {
      doctorApi.getRequiredDocuments().then(response => {
        this.requiredDocuments = response.data.data
      })
    },
    uploadDocument (file) {
      const fileExist = this.uploadedDcouments.find(f => f.doc_id === file.doc_id)
      if (fileExist) {
        const docs = this.uploadedDcouments.filter(item => item.doc_id === file.doc_id)
        this.uploadedDcouments = docs
      } else {
        this.uploadedDcouments.push(file)
      }
    },
    onSubmit () {
      this.loadingButtonSubmit = true
      // handle doctor services
      const doctorServices = {
        allow_clinic_examine: false,
        allow_outdoor_examine: false,
        allow_consulting: false
      }
      this.doctorServiceSelected.forEach(item => {
        doctorServices[Object.keys(item)] = true
      })
      // handle work times
      const workOfTimes = this.work_times.map(item => {
        if (item.is_active) {
          return item
        } else {
          return {
            ...item,
            working_periods: []
          }
        }
      })
      const payload = {
        full_name: this.userData.full_name,
        email: this.userData.email,
        primary_phone_number: this.userData.primary_phone_number,
        secondary_phone_number: this.userData.secondary_phone_number,
        clinic_address: this.userData.clinic_address,
        prices: this.prices,
        examination_duration: `${this.examination_duration.hours}:${this.examination_duration.minutes}:${this.examination_duration.seconds}`,
        work_times: workOfTimes,
        examine_method: this.selectedDetectionMethod,
        ...doctorServices
      }
      if (this.requiredDocuments && this.requiredDocuments.length === this.uploadedDcouments.length) {
        axios.all([
          doctorApi.updateDoctorInfo(payload),
          doctorApi.updateDoctorDocuments({ documents: this.uploadedDcouments })
        ]).then(axios.spread((reponse1, response2) => {
          core.showSnackbar('success', reponse1.data.message)
          core.showSnackbar('success', response2.data.message)
        })).finally(() => {
          this.loadingButtonSubmit = false
        })
      } else {
        core.showSnackbar('error', 'please upload your all documents')
        this.loadingButtonSubmit = false
      }
    }
  },
  watch: {
    userData (val) {
      if (val) {
        this.doctorServiceSelected = [
          { allow_clinic_examine: Boolean(val.allow_clinic_examine) },
          { allow_outdoor_examine: Boolean(val.allow_outdoor_examine) },
          { allow_consulting: Boolean(val.allow_consulting) }
        ]
        // examination method
        this.selectedDetectionMethod = val.examine_method
        // examination duration
        const splitDuration = val.examination_duration.split(':')
        this.examination_duration = {
          hours: splitDuration[0],
          minutes: splitDuration[1],
          seconds: '00'
        }
        // work times
        this.work_times = val.work_times
        // prices
        this.prices = {
          clinic_examine: val.prices.clinic_examine,
          consulting: val.prices.consulting,
          outdoor_examine: val.prices.outdoor_examine
        }
      } else {
        this.doctorServiceSelected = [
          { allow_clinic_examine: false },
          { allow_outdoor_examine: false },
          { allow_consulting: false }
        ]
      }
    }
  },
  created () {
    this.getUserInfo()
    this.getRequiredDocuments()
  }
}
</script>
