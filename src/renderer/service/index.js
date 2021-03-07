import { request, VERSION } from '../../utils'

export async function getPatchList () {
  const { patch } = VERSION
  if (patch) return patch
  const res = await request({
    url: 'http://www.mhtw.org/updates/PatchList',
    method: 'GET'
  })
  const data = res.data.split('\n')
  VERSION.patch = {
    downloadUrl: data[1],
    latestTime: data[0]
  }
  return VERSION.patch
}

export async function getVersion () {
  const { exe } = VERSION
  if (exe) return exe
  const res = await request({
    url: 'http://www.mhtw.org/updates/version',
    method: 'GET'
  })
  const data = res.data.split('\n')
  VERSION.exe = {
    latestTime: data[0],
    downloadUrl: data[1]
  }
  return VERSION.exe
}
