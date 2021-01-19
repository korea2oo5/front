import DomainFileUpload from 'components/Train/Domain/DomainFileUpload';
import DomainTitle from 'components/Train/Domain/DomainTitle';
import { useState } from 'react';
import * as XLSX from 'xlsx';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { setCols, setFirstRows, setSecondRows } from 'features/domain/domainSlice';

const DomainHeaderWrap = styled.div`
    padding: 10px;
`;

function DomainHeader() {
    const dispatch = useDispatch();
    const [title, setTitle] = useState();
    const [fileName, setFileName] = useState('파일을 올려주세요');
    function titleOnChange(e: any) {
        setTitle(e.target.value);
    }
    function excelExport(e: any) {
        setFileName(e.target.files[0].name);
        const input: any = e.target;
        const reader = new FileReader();
        reader.onload = function () {
            const fileData = reader.result;
            const wb = XLSX.read(fileData, { type: 'binary' });
            // 시트 이름 목록
            const sheetNameList = wb.SheetNames;
            // 시트명
            const firstSheetName = sheetNameList[0];
            const secondSheetName = sheetNameList[1];
            // 시트
            const firstSheet = wb.Sheets[firstSheetName];
            const secondSheet = wb.Sheets[secondSheetName];
            // 엑셀 자료를 json 형식으로 변환
            const firstSheetJson: any = XLSX.utils.sheet_to_json(firstSheet);
            const secondSheetJson = XLSX.utils.sheet_to_json(secondSheet);
            // json을 배열로 변환
            const firstSheetJsonToArray: any = firstSheetJson.map((object: any) => {
                return Object.values(object);
            });
            const fsecondSheetJsonToArray: any = secondSheetJson.map((object: any) => {
                return Object.values(object);
            });
            // JSON의 헤더부분을 cols에 대입
            // setCols(Object.keys(firstSheetJson[0]));
            dispatch(setCols(Object.keys(firstSheetJson[0])));
            // // JSON의 바디부분을 ros에 대입
            // setFirstRows(firstSheetJsonToArray);
            dispatch(setFirstRows(firstSheetJsonToArray));
            // setSecondRows(fsecondSheetJsonToArray);
            dispatch(setSecondRows(fsecondSheetJsonToArray));
            // setFileState(true);
        };
        reader.readAsBinaryString(input.files[0]);
    }
    return (
        <DomainHeaderWrap>
            <DomainTitle title={title} titleOnChange={titleOnChange} />
            <DomainFileUpload fileName={fileName} excelUpload={excelExport} />
        </DomainHeaderWrap>
    );
}

export default DomainHeader;
