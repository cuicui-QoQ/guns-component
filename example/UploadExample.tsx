import axios from 'axios'
import React from 'react'

import Upload, { UploadFile } from '../src/components/Upload/upload'

const actionUrl = 'https://jsonplaceholder.typicode.com/posts'

const defaultFileList: UploadFile[] = [
    {
        uid: '1',
        size: 1234,
        name: 'xxx.png',
        status: 'uploading',
        percent: 30,
    },
    {
        uid: '2',
        size: 1234,
        name: 'yyy.png',
        status: 'success',
    },
    {
        uid: '3',
        size: 1234,
        name: 'yyy.png',
        status: 'error',
    },
]
function UploadExample() {
    const handleOnProgress = () => {
        console.log('触发了onProgress')
    }

    const handleOnChange = () => {
        console.log('触发了onChange')
    }

    const handleOnSuccess = () => {
        console.log('触发了onSuccess')
    }

    const handleOnError = () => {
        console.log('触发了onError')
    }

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
            <h5>下面这是自定义的更新组件-beforeUpload返回Promise</h5>
            <Upload
                action={actionUrl}
                onProgress={handleOnProgress}
                beforeUpload={(file: File) => {
                    const newFile = new File([file], 'new_file.docx', {})
                    return Promise.resolve(newFile)
                }}
                onSuccess={handleOnSuccess}
                onError={handleOnError}
            ></Upload>
            <h5>下面这是自定义的更新组件-beforeUpload有校验</h5>
            <Upload
                action={actionUrl}
                onProgress={handleOnProgress}
                onChange={handleOnChange}
                onSuccess={handleOnSuccess}
                beforeUpload={(file: File) => {
                    if (Math.floor(file.size / 1024) >= 50) {
                        alert('文件大小不能超过50kb')
                        return false
                    }
                    return true
                }}
                onError={handleOnError}
            ></Upload>
            <h5>下面这是自定义的更新组件-default</h5>
            <Upload
                action={actionUrl}
                onProgress={handleOnProgress}
                onChange={handleOnChange}
                onSuccess={handleOnSuccess}
                onError={handleOnError}
                defaultFileList={defaultFileList}
            ></Upload>
        </div>
    )
}

export default UploadExample
