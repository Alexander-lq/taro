<template>
  <div id="encrty-file">
    <a-form :model="ruleForm" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item label="文件目录">
        <a-input v-model:value="ruleForm.path" placeholder=""/>
      </a-form-item>
      <a-form-item label="输出文件目录">
        <a-input v-model:value="ruleForm.outPath" placeholder=""/>
      </a-form-item>
      <a-form-item label="输出压缩包名称">
        <a-input v-model:value="ruleForm.name" placeholder="如.zip之前的名字"/>
      </a-form-item>
      <a-form-item label="排除加密的文件后缀">
        <a-input
          v-model:value="ruleForm.exportList"
          @input="handleExportListInput"
          placeholder="如qcow2, doc, pdf"
        />
      </a-form-item>
      <a-form-item :wrapper-col="{xs: { span: 24, offset: 0 },sm: { span: 16, offset: 8 }, }">
        <a-button type="primary" @click="onSubmit" style="font-size: 16px">Create</a-button>
        <a-button style="margin-left: 10px;font-size: 16px">Cancel</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts">


import {UploadOutlined} from '@ant-design/icons-vue';
import {defineComponent, inject, reactive, UnwrapRef} from 'vue';
import { message } from 'ant-design-vue';
import imagesEncrty from '@/api/modules/imagesEncrty'
import { ipc } from '@/utils/ipcRenderer';
import { ipcApiRoute } from '@/api/main';

interface RuleForm {
  path: string,
  outPath: string,
  name: string,
  exportList: any[]
}


export default defineComponent({
  components: {
    UploadOutlined,
  },
  setup() {
    const handleExportListInput = (event) => {
      ruleForm.exportList = event.target.value.split(',').map(item => item.trim());
    };

    const onSubmit = async () => {
      const requestData = {
        fileDecory: ruleForm.path,
        outDecory: ruleForm.outPath,
        name: ruleForm.name,
        excludeExtensions: Array.isArray(ruleForm.exportList) ? ruleForm.exportList : [],
      };
      let serverUrl = '';
      const jsonData = JSON.stringify(requestData);
      await ipc.invoke(ipcApiRoute.getCrossUrl, {name: 'javaapp'}).then(url => {
        serverUrl = url;
        message.info(`服务地址: ${url}`);
      }).catch(error => {
        if (error.response) {
          const {status} = error.response;
          // 处理 500 错误
          message.error(`服务器错误(${status}): ${error.response.error}`);
        }
      });

      await imagesEncrty.upload(jsonData,serverUrl).then((res) => {
        console.log(res)
        if(res.data.code!=200){
          message.error(res.data.message)
        }else {
          message.success(res.data.message);
        }
      }).catch(error => {
          if (error.response) {
            const {status} = error.response;
            // 处理 500 错误
            message.error(`服务器错误(${status}): ${error.response.error}`);
          }
        });
    };
    const ruleForm: UnwrapRef<RuleForm> = reactive({
      path: '',
      outPath: '',
      name: '',
      exportList: []
    });



    return {
      handleExportListInput,
      labelCol: {style: {width: '150px'}},
      wrapperCol: {span: 14},
      onSubmit,
      ruleForm,
      serverUrl: ''
    };
  },
});
</script>
<style lang="less" scoped>
#encrty-file {
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



