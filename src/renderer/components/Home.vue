<template>
  <div class="home">
      <div style="background:#ECECEC; padding:30px">
    <a-card title="写入文件" :bordered="false" style="width: 300px">
      <a-input v-model="filename" addon-before="文件名"></a-input>
      <a-input v-model="data" addon-before="内容"></a-input>
      <a-button @click="add" type="primary">新增</a-button>
    </a-card>
    <a-input v-model="exeName" addon-before="exe"></a-input>
    <a-button type="danger" @click="launch">启动</a-button>
  </div>

      <a-card title="结果">
          <a-list>
              <a-list-item v-for="(p,i) in paths" :key="i">{{p}}</a-list-item>
          </a-list>
      </a-card>
  </div>
</template>

<script>
// const { getAppPath } = require('../api/index').default
const { ipcRenderer } = require('electron')
export default {
  data () {
    return {
      filename: '',
      data: '',
      paths: [],
      exeName: ''
    }
  },
  mounted () {
    ipcRenderer.on('write-file-result', (event, arg) => {
      this.paths.push(arg)
    })
    ipcRenderer.on('launch-exe-result', (event, arg) => {
      this.paths.push(arg)
    })
  },
  methods: {
    add () {
      ipcRenderer.send('write-file', {
        filename: this.filename,
        data: this.data
      })
    },
    launch () {
      ipcRenderer.send('launch-exe', {
        name: this.exeName
      })
    }
  }
}
</script>

<style>

</style>