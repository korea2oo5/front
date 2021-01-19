import DomainTableButton from 'components/Train/Domain/DomainTableButton';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { setCols, setFirstRows, setSecondRows } from 'features/domain/domainSlice';
import { RootState } from 'store';

// btnCenter
function DomainCols() {
    const dispatch = useDispatch();
    const { cols, firstRows, secondRows } = useSelector((state: RootState) => state.domain);
    function ColAdd() {
        dispatch(setCols(cols.concat('기본')));
        const newFirstRows = firstRows.map((item: any) => {
            console.log(item);
            // 배열 1번째 인덱스 값이 O 이거나 X이면 배열 마지막에 새로운 값을 X 대입 (체크박스를 나타내기 위해서)
            if (item[1] === 'O' || item[1] === 'X') {
                return item.concat('X');
                // 아닌 경우는 빈칸을 대입
            } else {
                return item.concat();
            }
        });
        dispatch(setFirstRows(newFirstRows));
        const newSecondRows = secondRows.map((item: any) => {
            if (item[1] === 'O' || item[1] === 'X') {
                return item.concat('X');
            } else {
                return item.concat();
            }
        });
        dispatch(setSecondRows(newSecondRows));
        // setTrainState(false);
        // setRunState(false);
        // setBuildState(false);
    }
    // first, second 헤더 항목 제거
    function ColRemove() {
        // first 헤더 항목 제거 - colsCount-1(헤더의 마지막부분을 없앰)
        const newFirstCols = cols.filter((item: any, index: any) => index !== cols.length - 1);
        dispatch(setCols(newFirstCols));
        // first 바디 항목들 제거 - 헤더의 마지막부분이 없애므로 관련된 바디 항목들도 없애주어야함
        const newFirstRows = firstRows.map((item: any) => {
            return item.filter((item: any, index: any) => index !== cols.length - 1);
        });
        dispatch(setFirstRows(newFirstRows));
        // first 과정 동일
        const newSecondCols = cols.filter((item: any, index: any) => index !== cols.length - 1);
        dispatch(setCols(newSecondCols));
        const newSecondRows = secondRows.map((item: any) => {
            return item.filter((item: any, index: any) => index !== cols.length - 1);
        });
        dispatch(setSecondRows(newSecondRows));
        // setRunState(false);
        // setBuildState(false);
    }
    return (
        <>
            <DomainTableButton add={ColAdd} remove={ColRemove} />
        </>
    );
}

export default DomainCols;
