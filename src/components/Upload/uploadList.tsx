import React, { useRef } from 'react'
import { UploadFile } from './upload'
import Icon from '../Icon/icon'
import cn from 'classnames'

export interface UploadListProps {
    fileList: UploadFile[]
    onRemove?: (file: UploadFile) => void
}
const UploadList: React.FC<UploadListProps> = props => {
    const { fileList, onRemove } = props
    return (
        <ul className="guns-upload-list">
            {fileList.map(file => {
                const listItemTextClass = cn('file-name-block', {
                    'is-error': 'error' === file.status,
                    'is-success': 'success' === file.status,
                    'is-uploading': 'uploading' === file.status,
                })
                return (
                    <li className="guns-upload-list-item" key={file.uid}>
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
                    </li>
                )
            })}
        </ul>
    )
}

export default UploadList
