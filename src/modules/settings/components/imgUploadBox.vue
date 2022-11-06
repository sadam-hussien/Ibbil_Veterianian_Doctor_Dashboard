<template>
  <div class="img-upload-box">
    <!-- file uploader input -->
    <input type="file" class="d-none" :id="`file-uploader-${data.id}`" :name="`file-uploader-${data.id}`" @change="addFile"/>
    <!-- box  -->
    <label class="m-0 w-100" :for="`file-uploader-${data.id}`">
      <div class="img-box  d-flex align-items-center justify-content-center flex-column" :style="{backgroundImage: currentDoc ? `url(${currentDoc.url})` : null, backgroundSize: 'cover'}">
        <div class="img-inner">
          <i class="las la-image icon"></i>
        </div>
        <span class="types">( {{data.type}} )</span>
      </div>
      <div class="img-upload-box-btn mt-1 text-center py-1">اختر الصورة</div>
    </label>
  </div>
</template>

<script>
import doctorApi from '../services/settings'

export default {
  props: ['data', 'index'],
  data () {
    return {
      currentDoc: null,
      loading: false
    }
  },
  methods: {
    addFile (e) {
      this.loading = true
      const targetFile = e.target.files[0]
      const fileFormData = new FormData()
      fileFormData.append('file', targetFile)
      doctorApi.uploadDotorDocument(fileFormData).then(res => {
        this.currentDoc = { url: res.data.url, doc_id: this.data.id }
        this.$emit('uploadDocument', { url: res.data.url, doc_id: this.data.id })
        this.loading = false
      })
    }
  }
}
</script>
