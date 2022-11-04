<template>
  <div class="img-upload-box">
    <!-- <h5 class="img-upload-box-label" v-if="!editing">{{label}}</h5> -->
    <!-- edit label input -->
    <!-- <input
      v-if="editing"
      type="text"
      @blur="saveName(index)"
      v-model="certificateName"
      :name="`other-picture-${index}`"
      :id="`other-picture-${index}`"
      placeholder="ادخل اسم الشهادة هنا"
      :class="`form-control edit-inp ${errorLabel ? 'edit-inp-error' : ''}`"
    /> -->
    <!-- file uploader input -->
    <input type="file" class="d-none" :id="`file-uploader-${data.id}`" :name="`file-uploader-${data.id}`" @change="addFile"/>
    <!-- box  -->
    <label class="m-0 w-100" :for="`file-uploader-${data.id}`">
      <div class="img-box  d-flex align-items-center justify-content-center flex-column" :style="{backgroundImage: `url(${fileUrl})`, backgroundSize: 'cover'}">
        <div class="img-inner" v-if="!fileUrl">
          <i class="las la-image icon"></i>
          <!-- <i class="las la-plus-square icon" v-else></i> -->
        </div>
        <span class="types" v-if="!fileUrl">( {{data.type}} )</span>
      </div>
      <div class="img-upload-box-btn mt-1 text-center py-1">اختر الصورة</div>
    </label>
  </div>
</template>

<script>
export default {
  props: ['data', 'index'],
  data () {
    return {
      file: null,
      fileUrl: null
    }
  },
  methods: {
    addFile (e) {
      const targetFile = e.target.files[0]
      this.file = targetFile
      this.fileUrl = URL.createObjectURL(targetFile)
    }
  }
}
</script>
