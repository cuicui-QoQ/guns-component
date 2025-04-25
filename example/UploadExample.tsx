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
            <h4>下面这是自定义的更新组件</h4>
            <h5>beforeUpload返回Promise</h5>
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
            <h5>网络请求中带上额外参数</h5>
            <Upload
                action={actionUrl}
                onProgress={handleOnProgress}
                onSuccess={handleOnSuccess}
                onError={handleOnError}
                name="testFileName"
                data={{ key: 'value' }}
                headers={{
                    'X-Powered-By': 'Guns',
                }}
            ></Upload>
            <h5>只允许上传一个或者多个html文件</h5>
            <Upload action={actionUrl} accept=".html" multiple={true}></Upload>
            <h5>beforeUpload有校验</h5>
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
            <h5>defaultFileList 看样式</h5>
            <Upload
                action={actionUrl}
                onProgress={handleOnProgress}
                onChange={handleOnChange}
                onSuccess={handleOnSuccess}
                onError={handleOnError}
                defaultFileList={defaultFileList}
            ></Upload>
            <h5>defaultFileList 看样式</h5>
            <Upload
                action={actionUrl}
                onProgress={handleOnProgress}
                onChange={handleOnChange}
                onSuccess={handleOnSuccess}
                onError={handleOnError}
                defaultFileList={defaultFileList}
            ></Upload>
            <h5>支持拖动文件</h5>
            <Upload
                action={actionUrl}
                onProgress={handleOnProgress}
                onChange={handleOnChange}
                onSuccess={handleOnSuccess}
                onError={handleOnError}
                drag
            >
                {
                    <div
                        style={{
                            height: '100px',
                            backgroundColor: '#ccc',
                        }}
                    >
                        拖动文件到这里上传
                    </div>
                }
            </Upload>
        </div>
    )
}

export default UploadExample
