import axios from 'axios'
import React from 'react'

import Upload from '../src/components/Upload/upload'

const actionUrl = 'https://jsonplaceholder.typicode.com/posts'
function UploadExample() {
    return (
        <div>
            <form
                method="post"
                encType="multipart/form-data"
                action={actionUrl}
            >
                <input type="file" name="myFile" />
                <button type="submit">Form表单默认提交</button>
            </form>
            <input
                placeholder="qqq"
                type="file"
                name="myFile"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const files = e.target.files
                    if (files) {
                        const uploadedFile = files[0]
                        const formData = new FormData()
                        formData.append(uploadedFile.name, uploadedFile)
                        axios.post(actionUrl, formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            },
                        })
                    }
                }}
            />
            <h1>下面这是自定义的更新组件-beforeUpload返回Promise</h1>
            <Upload
                action={actionUrl}
                onProgress={() => {
                    console.log('触发了onProgress')
                }}
                beforeUpload={(file: File) => {
                    const newFile = new File([file], 'new_file.docx', {})
                    return Promise.resolve(newFile)
                }}
                onSuccess={() => {
                    console.log('触发了onSuccess')
                }}
                onError={() => {
                    console.log('触发了onError')
                }}
            ></Upload>
            <h1>下面这是自定义的更新组件-beforeUpload有校验</h1>
            <Upload
                action={actionUrl}
                onProgress={() => {
                    console.log('触发了onProgress')
                }}
                onChange={() => {
                    console.log('触发了onChange')
                }}
                onSuccess={() => {
                    console.log('触发了onSuccess')
                }}
                beforeUpload={(file: File) => {
                    if (Math.floor(file.size / 1024) >= 50) {
                        alert('文件大小不能超过50kb')
                        return false
                    }
                    return true
                }}
                onError={() => {
                    console.log('触发了onError')
                }}
            ></Upload>
        </div>
    )
}

export default UploadExample
