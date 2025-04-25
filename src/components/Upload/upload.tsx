import React, { useRef } from 'react'
import Button, { ButtonType } from '../Button/button'
import UploadList from './uploadList'
import cn from 'classnames'
import axios from 'axios'

export interface UploadProps {
    action: string
    onProgress?: (percentage: number, file: File) => void
    onSuccess?: (data: any, file: File) => void
    onError?: (err: any, file: File) => void
    beforeUpload?: (file: File) => boolean | Promise<File>
    onChange?: (file: File) => void
    defaultFileList?: UploadFile[]
    onRemove?: (file: UploadFile) => void
}

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'

export interface UploadFile {
    uid: string
    size: number
    name: string
    status?: UploadFileStatus
    percent?: number
    raw?: File
    response?: any
    error?: any
}

const Upload: React.FC<UploadProps> = props => {
    const {
        action,
        onProgress,
        onSuccess,
        onError,
        beforeUpload,
        onChange,
        defaultFileList,
        onRemove,
    } = props
    const [fileList, setFileList] = React.useState<UploadFile[]>(
        defaultFileList || [],
    )

    const uploadFile = (
        uploadFile: UploadFile,
        uploadObj: Partial<UploadFile>,
    ) => {
        setFileList((prevFileList: UploadFile[]) => {
            return prevFileList.map(file => {
                if (file.uid === uploadFile.uid) {
                    return {
                        ...file,
                        ...uploadObj,
                    }
                }
                return file
            })
        })
    }

    const classes = cn('guns-upload')
    const fileInput = useRef<HTMLInputElement>(null)
    const handleClick = () => {
        if (fileInput.current) {
            fileInput.current.click()
        }
    }

    const post = (file: File) => {
        const _file: UploadFile = {
            uid: Date.now() + '-upload-file',
            status: 'ready',
            name: file.name,
            size: file.size,
            raw: file,
            percent: 0,
        }
        setFileList([_file, ...fileList])
        const formData = new FormData()
        formData.append(file.name, file)
        axios
            .post(action, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: e => {
                    const percentage = Math.round(
                        (e.loaded * 100) / (e.total || 100),
                    )
                    uploadFile(_file, {
                        status: 'uploading',
                        percent: percentage,
                    })
                    onProgress?.(percentage, file)
                },
            })
            .then(res => {
                uploadFile(_file, {
                    status: 'success',
                    response: res.data,
                })
                onSuccess?.(res, file)
                onChange?.(file)
            })
            .catch(res => {
                uploadFile(_file, {
                    status: 'error',
                    response: res.data,
                })
                onError?.(res, file)
                onChange?.(file)
            })
    }

    const uploadFiles = (files: FileList) => {
        for (let i = 0; i < files.length; i++) {
            if (!beforeUpload) {
                post(files[i])
            } else {
                const result = beforeUpload(files[i])
                if (result && result instanceof Promise) {
                    result.then(res => {
                        post(res)
                    })
                } else if (result !== false) {
                    post(files[i])
                }
            }
        }

        // const xhr = new XMLHttpRequest()
        // xhr.open('POST', action, true)
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files && files.length > 0) {
            uploadFiles(files)
            if (fileInput.current) {
                fileInput.current.value = ''
            }
        } else {
            return
        }
    }

    return (
        <div className={classes}>
            <Button
                btnType={ButtonType.Primary}
                onClick={handleClick}
                style={{ width: '200px' }}
            >
                Upload file
            </Button>
            <input
                className="guns-upload__input-file"
                style={{ display: 'none' }}
                ref={fileInput}
                type="file"
                onChange={handleFileChange}
            />
            <UploadList fileList={fileList} onRemove={onRemove}></UploadList>
        </div>
    )
}

export default Upload
