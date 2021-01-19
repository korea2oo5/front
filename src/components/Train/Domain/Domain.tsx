import { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faMinusSquare } from '@fortawesome/free-solid-svg-icons';
import * as XLSX from 'xlsx';
// import { createModel, createResult } from 'components/views/Train/Domain/machineLearning';
import { createModel, createResult } from 'features/domain/domainSlice';
import { useAppDispatch } from 'store/index';
import 'components/Train/Domain/Domain.css';
function Domain() {
    const dispatch = useAppDispatch();
    const excelFile = useRef<any>();

    const [subject, setSubject] = useState();
    const [subjectErr, setSubjectErr] = useState(false);

    // 사용자가 입력한 값에 대한 머신러닝 결과값
    const [userResult, setUserResult] = useState([{}]);

    // first, second 항목 추가, 삭제에 필요한 변수
    let colsCount = 0;
    let firstRowsCount = 0;
    let secondRowsCount = 0;

    // base first, second
    const baseCols = ['항목', '기본', '기본', '기본'];
    const baseFirstLows = [[], [], [], []];
    const baseSecondLows = [[], [], [], []];

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
    const [userInput, setUserInput] = useState([]);
    // 머신러닝 관련
    const [model, setModel] = useState();
    const [data_label, setLabelData] = useState();

    // 엑셀 파일 업로드
    function excelExport(e: React.ChangeEvent<HTMLInputElement>) {
        // base에서 입력한 값들을 초기화
        setCols([]);
        setFirstRows([]);
        setSecondRows([]);
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
            setCols(Object.keys(firstSheetJson[0]));
            // JSON의 바디부분을 ros에 대입
            setFirstRows(firstSheetJsonToArray);
            setSecondRows(fsecondSheetJsonToArray);
            setFileState(true);
        };
        reader.readAsBinaryString(input.files[0]);
    }
    // first 바디 열 항목을 더블 클릭시
    const firstDblclick = (index: any) => (e: any) => {
        const newArr: any = [...firstRows];
        firstRows.map((rowItem, rowIdx) => {
            if (index === rowIdx) {
                // 배열 1번째 인덱스 값이 O 이거나 X이면 input type = checkbox 이므로 input type = text로 바꾸어야 한다.
                if (rowItem[1] === 'O' || rowItem[1] === 'X') {
                    cols.map((colItem, colIdx) => {
                        // 배열 0번째 인덱스에 기존 값을 대입
                        if (colIdx === 0) {
                            newArr[index][colIdx] = newArr[index][colIdx];
                            // 배열 0번째 인덱스가 아닌 값에는 빈칸으로 변환 (체크박스 소멸)
                        } else {
                            newArr[index][colIdx] = '';
                        }
                    });
                    // 반대로 input type = text이면 checkbox로 바꾸어야 한다.
                } else {
                    cols.map((colItem, colIdx) => {
                        // 배열 0번째 인덱스에 기존 값을 대입
                        if (colIdx === 0) {
                            newArr[index][colIdx] = newArr[index][colIdx];
                            // 배열 0번째 인덱스가 아닌 값에는 X으로 변환 (체크박스 생성)
                        } else {
                            newArr[index][colIdx] = 'X';
                        }
                    });
                }
            }
        });
        setFirstRows(newArr);
        setTrainState(false);
        setRunState(false);
        setBuildState(false);
    };
    // second 바디 열 항목을 더블 클릭시
    const secondDblclick = (index: any) => (e: any) => {
        const newArr: any = [...secondRows];
        secondRows.map((rowItem, rowIdx) => {
            if (index === rowIdx) {
                // 배열 1번째 인덱스 값이 O 이거나 X이면 input type = checkbox 이므로 input type = text로 바꾸어야 한다.
                if (rowItem[1] === 'O' || rowItem[1] === 'X') {
                    cols.map((colItem, colIdx) => {
                        // 배열 0번째 인덱스에 기존 값을 대입
                        if (colIdx === 0) {
                            newArr[index][colIdx] = newArr[index][colIdx];
                            // 배열 0번째 인덱스가 아닌 값에는 빈칸으로 변환 (체크박스 소멸)
                        } else {
                            newArr[index][colIdx] = '';
                        }
                    });
                    // 반대로 input type = text이면 checkbox로 바꾸어야 한다.
                } else {
                    cols.map((colItem, colIdx) => {
                        // 배열 0번째 인덱스에 기존 값을 대입
                        if (colIdx === 0) {
                            newArr[index][colIdx] = newArr[index][colIdx];
                            // 배열 0번째 인덱스가 아닌 값에는 X으로 변환 (체크박스 생성)
                        } else {
                            newArr[index][colIdx] = 'X';
                        }
                    });
                }
            }
        });
        setSecondRows(newArr);
        setTrainState(false);
        setRunState(false);
        setBuildState(false);
    };

    // train 버튼 클릭시
    async function train() {
        console.log('clicked');
        const strSpace: any = /\s/;
        if (subject === undefined || strSpace.exec(subject) || subject === '') {
            subject === 'untitled';
            // return;
        }
        // 사용자 입력 틀 구성
        const newArr: any = [];
        firstRows.map((item, index) => {
            if (item[1] === 'O' || item[1] === 'X') {
                newArr[index] = 'X';
            } else {
                newArr[index] = '';
            }
        });
        setUserInput(newArr);

        // json 표현1
        console.log('json1');
        const newFirst = [];
        const newSecond = [];
        firstRows.map((row, idx1) => {
            newFirst[idx1] = Object.assign(
                {},
                ...cols.map((col, idx2) => ({
                    [col]: row[idx2],
                })),
            );
        });
        secondRows.map((row, idx1) => {
            newSecond[idx1] = Object.assign(
                {},
                ...cols.map((col, idx2) => ({
                    [col]: row[idx2],
                })),
            );
        });

        // json 표현2
        console.log('json2');
        const newFirst2: any = [];
        const newSecond2: any = [];
        const newSecond2_len = secondRows.length;
        // cols, firstRows 배열을 하나의 object객체로 변환(json)
        cols.map((col, idx1) => {
            if (idx1 !== 0) {
                newFirst2[idx1 - 1] = Object.assign(
                    {},
                    ...firstRows.map((row, idx2) => {
                        if (row[idx1] === 'O') {
                            return { [row[0]]: 1 };
                        } else if (row[idx1] === 'X') {
                            return { [row[0]]: 0 };
                        } else {
                            return { [row[0]]: row[idx1] };
                        }
                    }),
                );
            }
        });
        console.log('newFirst2=', newFirst2);
        cols.map((col, idx1) => {
            if (idx1 !== 0 && idx1 < newSecond2_len + 1) {
                newSecond2[idx1 - 1] = Object.assign(
                    {},
                    ...secondRows.map((row, idx2) => {
                        return { [row[0]]: row[idx1] };
                    }),
                );
            }
        });

        let newArr2: any = [];
        secondRows.map((row, idx1) => {
            cols.map((col, idx2) => {
                if (idx2 !== 0) {
                    newArr2 = [...newArr2, Object.assign({}, { [row[0]]: row[idx2] })];
                }
            });
            newSecond2[idx1] = newArr2;
            newArr2 = [];
        });
        console.log('newSecond2=', newSecond2);

        // data
        const data_input = newFirst2;
        const data_output = newSecond2;
        setLabelData(data_output);

        console.log('ML training STart ');
        // TODO. 서버로 옮기는 작업
        let model_: any;
        dispatch(createModel({ data_input, data_output })).then((response: any) => {
            // model값이 내가 원하는 값이 아님 ㅜㅜ
            console.log(JSON.parse(response.payload.model));
            model_ = response.payload.model;
            setModel(model_);
        });

        // const model_: any = await createModel(data_input, data_output);
        // setModel(model_);
        console.log('ML training Finish ');

        setTrainState(true);
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
        const newArr: any = [...firstRows];
        const checked = e.target.checked;
        if (e.target.value === '') {
            if (checked) {
                newArr[rowIndex][colIndex] = 'O';
            } else if (!checked) {
                newArr[rowIndex][colIndex] = 'X';
            }
        } else {
            newArr[rowIndex][colIndex] = e.target.value;
        }

        setFirstRows(newArr);
        setTrainState(false);
        setRunState(false);
        setBuildState(false);
    };

    // second 바디부분 수정시
    const secondRowOnChange = (rowIndex: any, colIndex: any) => (e: any) => {
        const newArr: any = [...secondRows];
        const checked = e.target.checked;
        if (e.target.value === '') {
            if (checked) {
                newArr[rowIndex][colIndex] = 'O';
            } else if (!checked) {
                newArr[rowIndex][colIndex] = 'X';
            }
        } else {
            newArr[rowIndex][colIndex] = e.target.value;
        }
        setSecondRows(newArr);
        setTrainState(false);
        setRunState(false);
        setBuildState(false);
    };

    // first 바디 항목 추가
    function firstRowAdd() {
        setFirstRows((firstRows) => [...firstRows, []]);
        setTrainState(false);
        setRunState(false);
        setBuildState(false);
    }
    // first 바디 항목 제거
    function firstRowRemove() {
        const newFirstRows = firstRows.filter((itme, index) => index !== firstRowsCount - 1);
        setFirstRows(newFirstRows);
        setTrainState(false);
        setRunState(false);
        setBuildState(false);
    }
    // second 바디 추가
    function secondRowAdd() {
        setSecondRows((secondRows) => [...secondRows, []]);
        setTrainState(false);
        setRunState(false);
        setBuildState(false);
    }
    // second 바디 제거
    function secondRowRemove() {
        const newSecondRows = secondRows.filter((itme, index) => index !== secondRowsCount - 1);
        setSecondRows(newSecondRows);
        setTrainState(false);
        setRunState(false);
        setBuildState(false);
    }
    // first, second 헤더 항목 추가
    function ColAdd() {
        setCols((cols) => [...cols, '항목']);
        const newFirstRows = firstRows.map((item: any) => {
            // 배열 1번째 인덱스 값이 O 이거나 X이면 배열 마지막에 새로운 값을 X 대입 (체크박스를 나타내기 위해서)
            if (item[1] === 'O' || item[1] === 'X') {
                return item.concat('X');
                // 아닌 경우는 빈칸을 대입
            } else {
                return item.concat();
            }
        });
        setFirstRows(newFirstRows);
        const newSecondRows = secondRows.map((item: any) => {
            if (item[1] === 'O' || item[1] === 'X') {
                return item.concat('X');
            } else {
                return item.concat();
            }
        });
        setSecondRows(newSecondRows);
        setTrainState(false);
        setRunState(false);
        setBuildState(false);
    }
    // first, second 헤더 항목 제거
    function ColRemove() {
        // first 헤더 항목 제거 - colsCount-1(헤더의 마지막부분을 없앰)
        const newFirstCols = cols.filter((item, index) => index !== colsCount - 1);
        setCols(newFirstCols);
        // first 바디 항목들 제거 - 헤더의 마지막부분이 없애므로 관련된 바디 항목들도 없애주어야함
        const newFirstRows = firstRows.map((item) => {
            return item.filter((item, index) => index !== colsCount - 1);
        });
        setFirstRows(newFirstRows);
        // first 과정 동일
        const newSecondCols = cols.filter((item, index) => index !== colsCount - 1);
        setCols(newSecondCols);
        const newSecondRows = secondRows.map((item) => {
            return item.filter((item, index) => index !== colsCount - 1);
        });
        setSecondRows(newSecondRows);
        setRunState(false);
        setBuildState(false);
    }
    // 사용자가 내용을 수정시
    const userInputOnChange = (index: any) => (e: any) => {
        const newArr: any = [...userInput];
        // const newArr: any = userInput;
        // 선택한 값이 현재 O인 경우 X값 대입
        if (!e.target.checked && e.target.value === undefined) {
            newArr[index] = 'X';
            // X인 경우 O값 대입
        } else if (e.target.checked && e.target.value === undefined) {
            newArr[index] = 'O';
            // 둘 다 아닌 경우 input value 값을 대입
        } else {
            newArr[index] = e.target.value;
        }
        setUserInput(newArr);
    };
    // Run 버튼 클릭시
    async function runOnClick(data_label: any, data_pred: any) {
        const newRunResult: any = [];
        userInput.map((item, index) => {
            if (item === 'O') {
                newRunResult[index] = 1;
            } else if (item === 'X') {
                newRunResult[index] = 0;
            } else {
                newRunResult[index] = parseInt(item);
            }
        });
        // TODO. 서버로 옮기는 작업
        // setUserResult(createResult(model, data_label, newRunResult));
        console.log(model);
        dispatch(createResult({ model, data_label, newRunResult })).then((response: any) => {
            console.log(response.payload.result);
            setUserResult(response.payload.result);
        });
        setRunState(true);

        return;
    }
    function subjectOnChange(e: any) {
        setSubject(e.target.value);
        setSubjectErr(false);
    }

    function buildOncilck(e: any) {
        setBuildState(true);
    }

    function onClickFileUpload() {
        excelFile.current.click();
    }

    return (
        <div className="domainWrap">
            <div className="domainContent">
                <div className="domainTableWrap">
                    <div className="domainHeader">
                        <div className="domainTitle">
                            <input type="text" maxLength={30} placeholder="제목을 입력해주세요" autoFocus onChange={subjectOnChange} />
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
                                                colsCount++;
                                                return (
                                                    <th className="th" key={index}>
                                                        <input className="tableInput" type="text" defaultValue={col} onChange={colOnChange(index)} />
                                                    </th>
                                                );
                                            })}
                                        </tr>
                                    }
                                </thead>
                                <tbody>
                                    {
                                        <>
                                            {firstRows.map((row, rowIndex) => {
                                                const tds = cols.map((col, colIndex) => {
                                                    if (colIndex !== 0 && row[colIndex] === 'O') {
                                                        return (
                                                            <td className="td">
                                                                <input
                                                                    className="tableInput"
                                                                    type="checkbox"
                                                                    checked={true}
                                                                    value=""
                                                                    onChange={firstRowOnChange(rowIndex, colIndex)}
                                                                />
                                                            </td>
                                                        );
                                                    } else if (colIndex !== 0 && row[colIndex] === 'X') {
                                                        return (
                                                            <td className="td">
                                                                <input
                                                                    className="tableInput"
                                                                    type="checkbox"
                                                                    checked={false}
                                                                    value=""
                                                                    onChange={firstRowOnChange(rowIndex, colIndex)}
                                                                />
                                                            </td>
                                                        );
                                                    } else {
                                                        if (colIndex === 0) {
                                                            return (
                                                                <td className="td">
                                                                    <input
                                                                        className="tableInput"
                                                                        type="text"
                                                                        name="subject"
                                                                        value={row[colIndex]}
                                                                        onChange={firstRowOnChange(rowIndex, colIndex)}
                                                                        onDoubleClick={firstDblclick(rowIndex)}
                                                                    />
                                                                </td>
                                                            );
                                                        } else {
                                                            return (
                                                                <td className="td">
                                                                    <input
                                                                        className="tableInput"
                                                                        type="number"
                                                                        value={row[colIndex]}
                                                                        onChange={firstRowOnChange(rowIndex, colIndex)}
                                                                    />
                                                                </td>
                                                            );
                                                        }
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
                            <FontAwesomeIcon className="icon" icon={faPlusSquare} onClick={firstRowAdd} />
                            <FontAwesomeIcon className="icon" icon={faMinusSquare} onClick={firstRowRemove} />
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
                                            {secondRows.map((row, rowIndex) => {
                                                const tds = cols.map((col, colIndex) => {
                                                    if (colIndex !== 0 && row[colIndex] === 'O') {
                                                        return (
                                                            <td className="td">
                                                                <input
                                                                    className="tableInput"
                                                                    type="checkbox"
                                                                    checked={true}
                                                                    value=""
                                                                    onChange={secondRowOnChange(rowIndex, colIndex)}
                                                                />
                                                            </td>
                                                        );
                                                    } else if (colIndex !== 0 && row[colIndex] === 'X') {
                                                        return (
                                                            <td className="td">
                                                                <input
                                                                    className="tableInput"
                                                                    type="checkbox"
                                                                    checked={false}
                                                                    value=""
                                                                    onChange={secondRowOnChange(rowIndex, colIndex)}
                                                                />
                                                            </td>
                                                        );
                                                    } else {
                                                        if (colIndex === 0) {
                                                            return (
                                                                <td className="td">
                                                                    <input
                                                                        className="tableInput"
                                                                        type="text"
                                                                        name="subject"
                                                                        defaultValue={row[colIndex]}
                                                                        onDoubleClick={secondDblclick(rowIndex)}
                                                                        onChange={secondRowOnChange(rowIndex, colIndex)}
                                                                    />
                                                                </td>
                                                            );
                                                        } else {
                                                            return (
                                                                <td className="td">
                                                                    <input
                                                                        className="tableInput"
                                                                        type="number"
                                                                        defaultValue={row[colIndex]}
                                                                        onChange={secondRowOnChange(rowIndex, colIndex)}
                                                                    />
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
                            <FontAwesomeIcon className="icon" icon={faPlusSquare} onClick={secondRowAdd} />
                            <FontAwesomeIcon className="icon" icon={faMinusSquare} onClick={secondRowRemove} />
                        </div>
                    </div>
                </div>
                <div className="domainColWrap">
                    <div className="btnCenter">
                        <FontAwesomeIcon className="icon" icon={faPlusSquare} onClick={ColAdd} />
                        <FontAwesomeIcon className="icon" icon={faMinusSquare} onClick={ColRemove} />
                    </div>
                </div>
            </div>
            <div>
                <button onClick={train}>Train</button>
            </div>
            <div className="resultWrap">
                {trainState ? (
                    <>
                        <div className="contentWrap">
                            <div className="preview">Preview</div>
                            <div className="subject">{subject}</div>
                            <div className="tableGroup">
                                {firstRows.map((item, index) => {
                                    if (item[1] === 'O' || item[1] === 'X') {
                                        return (
                                            <div className="tableGroupBorder" key={index}>
                                                <input className="tableGroupBorder2 userInput" type="text" defaultValue={item[0]} readOnly />
                                                <input className="userInput" type="checkbox" onChange={userInputOnChange(index)} defaultValue="X" />
                                            </div>
                                        );
                                    } else {
                                        return (
                                            <div className="tableGroupBorder" key={index}>
                                                <input className="tableGroupBorder2 userInput" type="text" defaultValue={item[0]} readOnly />
                                                <input className="userInput" type="text" onChange={userInputOnChange(index)} />
                                            </div>
                                        );
                                    }
                                })}
                            </div>
                            <div className="runButtonDiv">
                                <button className="runButton" onClick={() => runOnClick(data_label, 0)}>
                                    Run
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <></>
                )}
                {/* <div>
                {trainState ? (
                    <>
                        <div>Preview</div>
                        <div>{subject}</div>
                        <div>
                            {firstRows.map((item, index) => {
                                if (item[1] === 'O' || item[1] === 'X') {
                                    return (
                                        <div key={index}>
                                            <input type="text" defaultValue={item[0]} readOnly />
                                            <input type="checkbox" onChange={userInputOnChange(index)} defaultValue="X" />
                                        </div>
                                    );
                                } else {
                                    return (
                                        <div key={index}>
                                            <input type="text" defaultValue={item[0]} readOnly />
                                            <input type="text" onChange={userInputOnChange(index)} />
                                        </div>
                                    );
                                }
                            })}
                        </div>
                        <div>
                            <button onClick={() => runOnClick(data_label, 0)}>Run</button>
                        </div>
                    </>
                ) : (
                    <></>
                )}
            </div> */}
                <div className="contentWrap">
                    {runState ? (
                        <>
                            <div>
                                {userResult.map((item: any) => {
                                    return (
                                        <>
                                            {item.rawData.map((rawItem: any) => {
                                                if (rawItem.label === 'O')
                                                    return (
                                                        <div className="userResultWrap">
                                                            <div className="userResultTitle" key={item.id}>
                                                                {item.title}
                                                            </div>
                                                            <div className="userResult">
                                                                <progress max="100" value={Math.round(rawItem.confidence * 100)} />
                                                                <div>{Math.round(rawItem.confidence * 100)} % </div>
                                                            </div>
                                                        </div>
                                                    );
                                            })}
                                        </>
                                    );
                                })}
                            </div>
                            <div className="buildButtonDiv">
                                <button className="buildButton" onClick={buildOncilck}>
                                    Build
                                </button>
                            </div>
                        </>
                    ) : (
                        <></>
                    )}
                </div>
                <div>
                    {buildState ? (
                        <div className="linkButtonDiv">
                            <button className="linkButton">LINK</button>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Domain;
