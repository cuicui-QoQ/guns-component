import React, { useRef } from 'react'
import { UploadFile } from './upload'
import Icon from '../Icon/icon'
import cn from 'classnames'
import Progress from '../Progress/Progress'

export interface UploadFileListProps {
    fileList: UploadFile[]
    onRemove: (file: UploadFile) => void
}
const UploadFileList: React.FC<UploadFileListProps> = props => {
    const { fileList, onRemove } = props
    return (
        <ul className="guns-upload-file-list">
            {fileList.map(file => {
                const listItemTextClass = cn('file-name-block', {
                    'is-error': 'error' === file.status,
                    'is-success': 'success' === file.status,
                    'is-uploading': 'uploading' === file.status,
                })
                return (
                    <li className="guns-upload-file-list-item" key={file.uid}>
                        <span className={listItemTextClass}>
                            <Icon icon="file-alt" theme="secondary" />
                            <span className="file-name">{file.name}</span>
                        </span>
                        <span className="file-status">
                            {'uploading' === file.status && (
                                <Icon
                                    icon="spinner"
                                    spin
                                    theme="primary"
                                ></Icon>
                            )}
                            {'success' === file.status && (
                                <Icon
                                    icon="check-circle"
                                    theme="success"
                                ></Icon>
                            )}
                            {'error' === file.status && (
                                <Icon icon="times-circle" theme="danger"></Icon>
                            )}
                        </span>
                        <span className="file-actions">
                            <Icon
                                icon="times"
                                onClick={() => onRemove?.(file)}
                            ></Icon>
                        </span>
                        {'uploading' === file.status && (
                            <Progress percent={file.percent || 0} />
                        )}
                    </li>
                )
            })}
        </ul>
    )
}

export default UploadFileList
