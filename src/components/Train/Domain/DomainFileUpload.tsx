import { useState, useRef } from 'react';
import styled from 'styled-components';

const FileMsg = styled.label`
    float: left;
    line-height: 30px;
    border: 1px dashed #1890ff;
    padding: 0 5px;
`;
const DomainFileUploadButton = styled.button`
    line-height: 30px;
    background-color: #7d67ff;
    color: #fff;
    font-weight: bold;
`;

interface Props {
    excelUpload: any;
    fileName: string;
}

function DomainFileUpload({ excelUpload, fileName }: Props) {
    const excelFile = useRef<any>();

    function onClickFileUpload() {
        excelFile.current.click();
    }

    return (
        <>
            <FileMsg htmlFor="excelFile">{fileName}</FileMsg>
            <input type="file" id="excelFile" hidden ref={excelFile} accept=".xls, .xlsx" onChange={excelUpload} />
            <DomainFileUploadButton onClick={onClickFileUpload}>Upload</DomainFileUploadButton>
        </>
    );
}

export default DomainFileUpload;
