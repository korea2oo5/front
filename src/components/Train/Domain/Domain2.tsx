import { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faMinusSquare } from '@fortawesome/free-solid-svg-icons';
import * as XLSX from 'xlsx';

import 'components/Train/Domain/Domain2.css';

function Domain2() {
    const excelFile = useRef<any>();

    const [subject, setSubject] = useState();
    const [subjectErr, setSubjectErr] = useState(false);
    const [textAreaErr, setTextAreaErr] = useState(false);

    function onClickFileUpload() {
        excelFile.current.click();
    }

    // first, second 항목 추가, 삭제에 필요한 변수
    const colsCount = 0;
    let firstRowsCount = 0;
    let secondRowsCount = 0;

    // base first, second
    const baseCols = ['기본', '기본'];
    const baseFirstLows: any = [[], []];
    const baseSecondLows: any = [[], []];

    // 엑셀 json의 헤더부분
    const [cols, setCols] = useState(baseCols);
    // 엑셀 json의 바디부분
    const [firstRows, setFirstRows] = useState(baseFirstLows);
    const [secondRows, setSecondRows] = useState(baseSecondLows);
    // 상태 기본값 false, 버튼 클릭시 true로 변환
    const [trainState, setTrainState] = useState(false);
    const [runState, setRunState] = useState(false);
    const [buildState, setBuildState] = useState(false);
    const [fileState, setFileState] = useState(false);
    const [fileName, setFileName] = useState('파일을 올려주세요');
    // 사용자 입력
    const [userInput, setUserInput]: any = useState();
    // 엑셀 파일 업로드
    function excelExport(e: any) {
        setFileName(e.target.files[0].name);
        // base에서 입력한 값들을 초기화
        setCols([]);
        setFirstRows([]);
        setSecondRows([]);
        const input = e.target;
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
            const secondSheetJson: any = XLSX.utils.sheet_to_json(secondSheet);
            // json을 배열로 변환
            // console.log(firstSheetJson)
            const firstSheetJsonToArray: any = firstSheetJson.map((object: any) => {
                return Object.values(object);
            });
            const fsecondSheetJsonToArray: any = secondSheetJson.map((object: any) => {
                return Object.values(object);
            });
            // JSON의 헤더부분을 cols에 대입
            const newArr: any = [];
            newArr[0] = Object.keys(firstSheetJson[0])[0];
            newArr[1] = Object.keys(firstSheetJson[0])[1];
            setCols(newArr);
            // JSON의 바디부분을 ros에 대입
            setFirstRows(Object.entries(Object.fromEntries(firstSheetJsonToArray)));
            setSecondRows(Object.entries(Object.fromEntries(fsecondSheetJsonToArray)));
            console.log(fsecondSheetJsonToArray);
            setFileState(true);
        };
        reader.readAsBinaryString(input.files[0]);
    }

    // train 버튼 클릭시
    function train() {
        console.log('train');
    }
    // 헤더부분 수정시
    const colOnChange = (index: any) => (e: any) => {
        const newArr = [...cols];
        newArr[index] = e.target.value;
        setCols(newArr);
        setTrainState(false);
        setRunState(false);
        setBuildState(false);
    };

    // first 바디부분 수정시
    const firstRowOnChange = (rowIndex: any, colIndex: any) => (e: any) => {
        const newArr = [...firstRows];
        newArr[rowIndex][colIndex] = e.target.value;
        setFirstRows(newArr);
        setTrainState(false);
        setRunState(false);
        setBuildState(false);
    };
    // second 바디부분 수정시
    const secondRowOnChange = (rowIndex: any, colIndex: any) => (e: any) => {
        const newArr = [...secondRows];
        newArr[rowIndex][colIndex] = e.target.value;
        setSecondRows(newArr);
        setTrainState(false);
        setRunState(false);
        setBuildState(false);
    };
    // first 바디 항목 추가
    function firstRowAdd() {
        setFirstRows((firstRows: any) => [...firstRows, []]);
        setTrainState(false);
        setRunState(false);
        setBuildState(false);
    }
    // first 바디 항목 제거
    function firstRowRemove() {
        const newFirstRows = firstRows.filter((itme: any, index: any) => index !== firstRowsCount - 1);
        setFirstRows(newFirstRows);
        setTrainState(false);
        setRunState(false);
        setBuildState(false);
    }
    // second 바디 추가
    function secondRowAdd() {
        setSecondRows((secondRows: any) => [...secondRows, []]);
        setTrainState(false);
        setRunState(false);
        setBuildState(false);
    }
    // second 바디 제거
    function secondRowRemove() {
        const newSecondRows = secondRows.filter((itme: any, index: any) => index !== secondRowsCount - 1);
        setSecondRows(newSecondRows);
        setTrainState(false);
        setRunState(false);
        setBuildState(false);
    }

    // 사용자가 내용을 수정시
    function userInputOnChange(e: any) {
        setUserInput(e.target.value);
        setTextAreaErr(false);
    }
    // Run 버튼 클릭시
    function runOnClick() {
        console.log(userInput);
        const strSpace = /\s/;
        if (userInput === undefined || strSpace.exec(userInput) || userInput === '') {
            setTextAreaErr(true);
            return;
        }
        setRunState(true);
    }

    function subjectOnChange(e: any) {
        setSubject(e.target.value);
        setSubjectErr(false);
    }

    function buildOncilck(e: any) {
        setBuildState(true);
    }
    return (
        <div className="domainWrap">
            <div className="domainContent">
                <div className="domainTableWrap">
                    <div className="domainHeader">
                        <div className="domainTitle">
                            <input type="text" maxLength={30} onChange={subjectOnChange} placeholder="제목을 입력해주세요" autoFocus />
                        </div>
                        <div className="domainFileUpload">
                            <label className="file_msg" htmlFor="excelFile">
                                {fileName}
                            </label>
                            <input type="file" id="excelFile" hidden ref={excelFile} onChange={excelExport} accept=".xls, .xlsx" />
                            <button onClick={onClickFileUpload}>Upload</button>
                        </div>
                    </div>
                    <div className="domainTableContent">
                        <div>
                            <div>
                                <h2 className="domainH2">원인</h2>
                            </div>
                            <table className="domainTable">
                                <thead>
                                    {
                                        <tr>
                                            {cols.map((col, index) => {
                                                return (
                                                    <td className="th" key={index}>
                                                        <input className="tableInput" type="text" defaultValue={col} onChange={colOnChange(index)} />
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    }
                                </thead>
                                <tbody>
                                    {
                                        <>
                                            {firstRows.map((row: any, rowIndex: any) => {
                                                const tds = cols.map((col, colIndex) => {
                                                    if (colIndex === 0) {
                                                        return (
                                                            <td className="td">
                                                                <input
                                                                    className="tableInput"
                                                                    type="text"
                                                                    name="subject"
                                                                    value={row[colIndex]}
                                                                    onChange={firstRowOnChange(rowIndex, colIndex)}
                                                                />
                                                            </td>
                                                        );
                                                    } else if (colIndex === 1) {
                                                        return (
                                                            <td className="td">
                                                                <textarea
                                                                    className="tableTextarea"
                                                                    cols={20}
                                                                    rows={3}
                                                                    value={row[colIndex]}
                                                                    onChange={firstRowOnChange(rowIndex, colIndex)}
                                                                />
                                                            </td>
                                                        );
                                                    }
                                                });
                                                firstRowsCount++;
                                                return (
                                                    <tr className="tr" key={rowIndex}>
                                                        {tds}
                                                    </tr>
                                                );
                                            })}
                                        </>
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="btnCenter">
                            <FontAwesomeIcon className="icon" icon={faPlusSquare} />
                            <FontAwesomeIcon className="icon" icon={faMinusSquare} />
                        </div>
                    </div>
                    <div className="domainTableContent">
                        <div>
                            <div>
                                <h2 className="domainH2">결과</h2>
                            </div>
                            <table className="domainTable">
                                <thead>
                                    {
                                        <tr>
                                            {cols.map((col, index) => {
                                                return (
                                                    <td className="th" key={index}>
                                                        <input className="tableInput" type="text" defaultValue={col} />
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    }
                                </thead>
                                <tbody>
                                    {
                                        <>
                                            {secondRows.map((row: any, rowIndex: any) => {
                                                const tds = cols.map((col, colIndex) => {
                                                    if (colIndex !== 0 && row[colIndex] === 'O') {
                                                        return (
                                                            <td className="td">
                                                                <input className="tableInput" type="checkbox" checked={true} value="" />
                                                            </td>
                                                        );
                                                    } else if (colIndex !== 0 && row[colIndex] === 'X') {
                                                        return (
                                                            <td className="td">
                                                                <input className="tableInput" type="checkbox" checked={false} value="" />
                                                            </td>
                                                        );
                                                    } else {
                                                        if (colIndex === 0) {
                                                            return (
                                                                <td className="td">
                                                                    <input className="tableInput" type="text" name="subject" defaultValue={row[colIndex]} />
                                                                </td>
                                                            );
                                                        } else {
                                                            return (
                                                                <td className="td">
                                                                    <input className="tableInput" type="number" />
                                                                </td>
                                                            );
                                                        }
                                                    }
                                                });
                                                secondRowsCount++;
                                                return (
                                                    <tr className="tr" key={rowIndex}>
                                                        {tds}
                                                    </tr>
                                                );
                                            })}
                                        </>
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="btnCenter">
                            <FontAwesomeIcon className="icon" icon={faPlusSquare} />
                            <FontAwesomeIcon className="icon" icon={faMinusSquare} />
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <button>Train</button>
            </div>
            <div className="resultWrap"></div>
        </div>
    );
}

export default Domain2;
