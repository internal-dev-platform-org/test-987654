import {useRef, useState} from 'react';
import {
    type FileAttributeProps,
    FileInputField,
    FileItem,
    halfWidthPositionMixin,
    type InputStatus,
} from '@admiral-ds/react-ui';

import styles from './InputFile.module.css';

export const InputFile = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [fileList, setFileList] = useState<File[]>([]);
    const [fileAttributesMap, setFileAttributesMap] = useState(new Map<File, FileAttributeProps>());
    const [status, setStatus] = useState<InputStatus | undefined>(undefined);

    const filesAreEqual = (file1: File, file2: File) =>
        file1.name === file2.name &&
        file1.size === file2.size &&
        file1.type === file2.type &&
        file1.lastModified === file2.lastModified;

    const accept = ['image/*', '.pdf', 'application/json'];
    const maxFilesNumber = 3;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const userSelectedFileList = Array.from(e.target.files || []);
        const updatedFileAttributesMap = new Map<File, FileAttributeProps>(fileAttributesMap);
        const updatedFileList = fileList.reduce((acc: File[], file) => {
            if (userSelectedFileList.findIndex(userFile => filesAreEqual(userFile, file)) === -1) {
                acc.push(file);
            } else {
                updatedFileAttributesMap.delete(file);
            }
            return acc;
        }, []);
        if (userSelectedFileList.length + updatedFileList.length > maxFilesNumber) {
            userSelectedFileList.splice(maxFilesNumber - updatedFileList.length);
            setStatus('error');
        } else {
            setStatus(undefined);
        }
        userSelectedFileList.forEach(file => {
            const imageURL = file.type.startsWith('image') ? URL.createObjectURL(file) : undefined;
            updatedFileAttributesMap.set(file, {
                fileId: Math.random().toString(),
                fileName: file.name.substring(0, file.name.lastIndexOf('.')),
                fileType: file.type,
                fileSize: file.size,
                status: 'Uploaded',
                errorMessage: 'Что-то явно пошло не так...',
                previewImageURL: imageURL,
            });
        });
        setFileList([...updatedFileList, ...userSelectedFileList]);
        setFileAttributesMap(updatedFileAttributesMap);
    };

    const handleRemoveFile = (fileToRemove: File) => {
        const updatedFileList = fileList.filter(file => !filesAreEqual(file, fileToRemove));
        const updatedFileAttributesMap = new Map<File, FileAttributeProps>(fileAttributesMap);
        const attributes = fileAttributesMap.get(fileToRemove);
        if (attributes && attributes.previewImageURL) {
            URL.revokeObjectURL(attributes.previewImageURL);
        }
        updatedFileAttributesMap.delete(fileToRemove);
        setFileList(updatedFileList);
        setFileAttributesMap(updatedFileAttributesMap);
        setStatus(undefined);
    };

    const renderFileList = () => {
        return fileList.map(file => {
            const attributes = fileAttributesMap.get(file);
            if (attributes) {
                return (
                    <FileItem
                        fileId={attributes.fileId}
                        key={attributes.fileId}
                        fileName={attributes.fileName}
                        fileType={attributes.fileType}
                        fileSize={attributes.fileSize}
                        status={attributes.status}
                        errorMessage={attributes.errorMessage}
                        previewImageURL={attributes.previewImageURL}
                        onCloseIconClick={() => handleRemoveFile(file)}
                        dimension="xl"
                        filesLayoutCssMixin={halfWidthPositionMixin}
                    />
                );
            }
        });
    };

    return (
        <>
            <FileInputField
                dimension="xl"
                title={`Загрузите не более 3-х файлов типа ${accept.join(', ')}`}
                ref={inputRef}
                onInput={handleChange}
                accept={accept.join(', ')}
                files={fileList}
                status={status}
            />
            <div className={styles.fileList}>{renderFileList()}</div>
        </>
    );
};
