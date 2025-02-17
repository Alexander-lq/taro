<template>
  <div id="upload-file">
    <a-form :model="ruleForm" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item label="公钥">
        <a-input v-model:value="ruleForm.path" placeholder="如hwaf.publicKey"/>
      </a-form-item>
      <a-form-item label="识别正则">
        <a-input v-model:value="ruleForm.regx" placeholder="如^HWAF\((.*)\)$"/>
      </a-form-item>
      <a-form-item label="替换内容">
        <a-input v-model:value="ruleForm.content" placeholder="如HWAF(%s)"/>
      </a-form-item>
      <a-form-item label="导出文件路径">
        <a-input v-model:value="ruleForm.exportPath" placeholder="如D:\\"/>
      </a-form-item>
      <a-form-item label="密钥模式">
        <a-radio-group v-model:value="ruleForm.mode" :defaultValue="0">
          <a-radio value="0">C1C3C2</a-radio>
          <a-radio value="1">C1C2C3</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="上传文件">
        <a-upload :file-list="fileList" :remove="handleRemove" :before-upload="beforeUpload">
          <a-button>
            <upload-outlined></upload-outlined>
            Upload
          </a-button>
        </a-upload>
      </a-form-item>
      <a-form-item :wrapper-col="{xs: { span: 24, offset: 0 },sm: { span: 16, offset: 8 }, }">
        <a-button type="primary" @click="onSubmit" style="font-size: 16px">Create</a-button>
        <a-button style="margin-left: 10px; font-size: 16px">Cancel</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts">


import {UploadOutlined} from '@ant-design/icons-vue';
import {defineComponent, ref, reactive, UnwrapRef} from 'vue';
import {ipcApiRoute} from '@/api/main';
import exchange from '@/api/modules/exchange';
import { message } from 'ant-design-vue';
import { ipc } from '@/utils/ipcRenderer';

interface RuleForm {
  path: string,
  mode: string,
  content: string,
  regx: string,
  exportPath: string
}


interface FileItem {
  uid: string;
  name?: string;
  status?: string;
  response?: string;
  url?: string;
  preview?: string;
  originFileObj?: any;
  file: string | Blob;
}


export default defineComponent({
  components: {
    UploadOutlined,
  },
  setup() {

    const fileList = ref<FileItem[]>([]);
    const uploading = ref<boolean>(false);

    const handleRemove = (file: FileItem) => {
      const index = fileList.value.indexOf(file);
      const newFileList = fileList.value.slice();
      newFileList.splice(index, 1);
      fileList.value = newFileList;
    };

    const beforeUpload = (file: FileItem) => {
      fileList.value = [...fileList.value, file];
      return false;
    };

    const onSubmit = async () => {
      const formData = new FormData();
      fileList.value.forEach((file: FileItem) => {
        formData.append('upload[]', file as any);
      });
      formData.append('path', ruleForm.path);
      formData.append('mode', ruleForm.mode);
      formData.append('content', ruleForm.content);
      formData.append('regx', ruleForm.regx);
      formData.append('exportPath', ruleForm.exportPath);

      let serverUrl = '';
      await ipc.invoke(ipcApiRoute.getCrossUrl, {name: 'goapp'}).then(url => {
        serverUrl = url;
        message.info(`服务地址: ${url}`);
      }).catch(error => {
        if (error.response) {
          const {status} = error.response;
          // 处理 500 错误
          message.error(`服务器错误(${status}): ${error.response.error}`)
        }
      });

      await exchange.upload(formData,serverUrl).then((res) => {
        if(res.data.code!=200){
          message.error(res.data.msg)
        }else {
          message.success(res.data.msg);
        }
      }).catch(error => {
        if (error.response) {
          const {status} = error.response;
          // 处理 500 错误
          message.error(`服务器错误(${status}): ${error.response.error}`);
        }
      });
      uploading.value = true;
    };

    const ruleForm: UnwrapRef<RuleForm> = reactive({
      path: '',
      mode: '0',
      content: '',
      regx: '',
      exportPath: ''
    });


    return {
      labelCol: {style: {width: '150px'}},
      wrapperCol: {span: 14},
      fileList,
      beforeUpload,
      handleRemove,
      ruleForm,
      onSubmit,
    };
  },
});
</script>
<style lang="less" scoped>
#upload-file {
  padding: 40px 10px;
  text-align: left;
  width: 100%;

  .one-block-1 {
    font-size: 16px;
    padding-top: 10px;
  }

  .one-block-2 {
    padding-top: 10px;
  }

  .footer {
    padding-top: 10px;
  }
}
</style>



