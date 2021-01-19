import DomainTableButton from 'components/Train/Domain/DomainTableButton';
import DomainTable from 'components/Train/Domain/DomainTable';
import { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { setCols, setFirstRows } from 'features/domain/domainSlice';
import { RootState } from 'store';
import * as _ from 'lodash';

const DomainTableContentWrap = styled.div`
    margin: 1vh;
    box-shadow: 0px 1px 4px 0px rgba(1, 1, 1, 0.14);
`;

function DomainTableIndependentVar() {
    const dispatch = useDispatch();
    const { cols, firstRows } = useSelector((state: RootState) => state.domain);

    // 헤더부분 수정시
    const colOnChange = (index: any) => (e: any) => {
        const newArr = [...cols];
        newArr[index] = e.target.value;
        dispatch(setCols(newArr));
        // setTrainState(false);
        // setRunState(false);
        // setBuildState(false);
    };
    const rowOnChange = (rowIndex: any, colIndex: any) => (e: any) => {
        const newArr: any = _.cloneDeep(firstRows);
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

        dispatch(setFirstRows(newArr));
        // setTrainState(false);
        // setRunState(false);
        // setBuildState(false);
    };
    const rowDoubleClick = (index: any) => (e: any) => {
        const newArr: any = _.cloneDeep(firstRows);
        firstRows.map((rowItem: any, rowIdx: any) => {
            if (index === rowIdx) {
                // 배열 1번째 인덱스 값이 O 이거나 X이면 input type = checkbox 이므로 input type = text로 바꾸어야 한다.
                if (rowItem[1] === 'O' || rowItem[1] === 'X') {
                    cols.map((colItem: any, colIdx: any) => {
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
                    cols.map((colItem: any, colIdx: any) => {
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
        dispatch(setFirstRows(newArr));
        // setTrainState(false);
        // setRunState(false);
        // setBuildState(false);
    };
    // first 바디 항목 추가
    function rowAdd() {
        dispatch(setFirstRows(firstRows.concat([[]])));
        // setTrainState(false);
        // setRunState(false);
        // setBuildState(false);
    }
    // first 바디 항목 제거
    function rowRemove() {
        const newFirstRows = firstRows.filter((item: any, index: any) => index !== firstRows.length - 1);
        dispatch(setFirstRows(newFirstRows));
        // setTrainState(false);
        // setRunState(false);
        // setBuildState(false);
    }

    return (
        <DomainTableContentWrap>
            <DomainTable h2={'원인'} cols={cols} rows={firstRows} colOnChange={colOnChange} rowOnChange={rowOnChange} rowDoubleClick={rowDoubleClick} />
            <DomainTableButton add={rowAdd} remove={rowRemove} />
        </DomainTableContentWrap>
    );
}

export default DomainTableIndependentVar;
