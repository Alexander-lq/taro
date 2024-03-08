<template>
  <div>
  <el-row :gutter="10">
    <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
      <el-button type="primary" @click="dialogIs()">上传<i class="el-icon-upload el-icon--right"></i>
      </el-button>
    </el-col>
  </el-row>
  <el-dialog title="文件上传" :visible.sync="uploadVisible" width="650px">
    <el-form ref="ruleForm" :model="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="上传附件" prop="annexFile">
        <el-upload
            ref="upload"
            class="upload-demo"
            action="/api/boAnnex/addBoAnnex"
            :http-request="httpRequest"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :on-exceed="handleExceed"
            multiple
            :limit="10"
            :auto-upload="false"
            :on-change="getFile"
            :data="ruleForm"
            :file-list="fileList"
            name="annexFile"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="公钥" prop="path" >
        <el-input v-model="ruleForm.path" type="textarea" rows="1" placeholder="如hwaf.publicKey" maxlength="300" style="width: 400px;" />
      </el-form-item>
      <el-form-item label="识别正则" prop="regx" >
        <el-input v-model="ruleForm.regx" type="textarea" rows="1" placeholder="如^HWAF\((.*)\)$" maxlength="300" style="width: 400px;" />
      </el-form-item>
      <el-form-item label="替换内容" prop="content" >
        <el-input v-model="ruleForm.content" type="textarea" rows="1" placeholder="如HWAF(%s)" maxlength="300" style="width: 400px;" />
      </el-form-item>
      <el-form-item label="导出文件路径" prop="exportPath" >
        <el-input v-model="ruleForm.exportPath" type="textarea" rows="1" placeholder="如D:\\" maxlength="300" style="width: 400px;" />
      </el-form-item>
      <el-form-item label="密钥模式" prop="mode" >
        <el-select v-model="ruleForm.mode" placeholder="请选择">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="resetForm('ruleForm')">取 消</el-button>
      <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
    </div>
  </el-dialog>
  </div>
</template>

<script>
import {uploadTempImage} from "@/api/upload";

export default {
  name: 'singleFormData',
  data() {
    return {
      uploadVisible: false,
      ruleForm: {
        path: '',
        mode: null,
        content: '',
        regx: '',
        exportPath:''
      },
      options: [{
        value: '0',
        label: 'C1C3C2'
      }, {
        value: '1',
        label: 'C1C2C3'
      }],
      fileList: [],
      fd: {}
    }
  },

  methods: {
    dialogIs(){
      this.uploadVisible = true
    },
    getFile(file, fileList) {
      // FormData 对象
      this.fd = new FormData()
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 10 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    resetForm(formName) {
      this.uploadVisible = false
      this.$refs[formName].resetFields()
      this.$refs.upload.clearFiles()
    },
    httpRequest(param) {
      const fileObj = param.file // 相当于input里取得的files
      this.fd.append('upload', fileObj)// 文件对象
    },
    submitForm(file) {
      this.$refs.upload.submit()
      this.fd.append('regx', this.ruleForm.regx);
      this.fd.append('path', this.ruleForm.path);
      this.fd.append('mode', this.ruleForm.mode);
      this.fd.append('content', this.ruleForm.content);
      this.fd.append('exportPath', this.ruleForm.exportPath);
      console.log("2222"+this.fd)
      uploadTempImage(this.fd).then(res => {
        this.uploadVisible = false
        this.$message({
          message: '上传成功',
          type: 'success'
        })
      })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
  }
}
</script>

<style lang='less'>

</style>