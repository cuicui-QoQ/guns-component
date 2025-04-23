import React, { useRef } from 'react'
import Button, { ButtonType } from '../Button/button'
import cn from 'classnames'
import axios from 'axios'

export interface UploadProps {
    action: string
    onProgress?: (percentage: number, file: File) => void
    onSuccess?: (data: any, file: File) => void
    onError?: (err: any, file: File) => void
    beforeUpload?: (file: File) => boolean | Promise<File>
    onChange?: (file: File) => void
}

const Upload: React.FC<UploadProps> = props => {
    const { action, onProgress, onSuccess, onError, beforeUpload, onChange } =
        props
    const classes = cn('guns-upload')
    const fileInput = useRef<HTMLInputElement>(null)
    const handleClick = () => {
        if (fileInput.current) {
            fileInput.current.click()
        }
    }

    const post = (file: File) => {
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
                    console.log('onUploadProgress', percentage)
                    onProgress?.(percentage, file)
                },
            })
            .then(res => {
                onSuccess?.(res, file)
                onChange?.(file)
            })
            .catch(res => {
                onError?.(res, file)
                onChange?.(file)
            })
    }

    const uploadFiles = (files: FileList) => {
        for (let i = 0; i < files.length; i++) {
            console.log(i, files[i].name)
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
            <Button btnType={ButtonType.Primary} onClick={handleClick}>
                Upload file
            </Button>
            <input
                className="guns-upload__input-file"
                style={{ display: 'none' }}
                ref={fileInput}
                type="file"
                onChange={handleFileChange}
            />
        </div>
    )
}

export default Upload
