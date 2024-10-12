import axiosClient from '@/utils/http/axios'
import { FileApiPath } from './paths'

export class FileApi {
  // 1. 上传文件
  static async upload(file: File): Promise<string> {
    const formData = new FormData()
    formData.append('file', file)
    return axiosClient.post(FileApiPath.UPLOAD, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }

  static async deleteFile(fileUid: string) {
    return axiosClient.delete(`FileApiPath.DELETE_FILE/${fileUid}`)
  }

  static async uploadFileChunk(file: File, chunk: Blob, chunkIndex: number, totalChunks: number) {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('chunk', chunk)
    formData.append('chunkIndex', chunkIndex.toString())
    formData.append('totalChunks', totalChunks.toString())
    return axiosClient.post(FileApiPath.UPLOAD_CHUNK, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }
}
