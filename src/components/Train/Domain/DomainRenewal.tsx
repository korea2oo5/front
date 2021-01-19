import React from 'react';
import styled from 'styled-components';
import DomainHeader from 'containers/Train/Domain/DomainHeader';
import DomainTableIndependentVar from 'containers/Train/Domain/DomainTableIndependentVar';
import DomainTableDependentVar from 'containers/Train/Domain/DomainTableDependentVar';
import DomainCols from 'containers/Train/Domain/DomainCols';
import DomainTrain from 'containers/Train/Domain/DomainTrain';

const DomainWrap = styled.div`
    display: grid;
    place-items: center;
    min-height: 85vh;
    width: 1240px;
    grid-template-rows: auto;
    column-gap: 20px;
    row-gap: 2rem;
    margin: 0 auto;
    padding: 5vh 0;
    grid-template-columns: 700px 200px 300px;
`;
const DomainContentWrap = styled.div`
    box-shadow: 0px 1px 4px 0px rgba(1, 1, 1, 0.14);
    display: flex;
    width: 100%;
    flex-direction: row;
`;
const DomainTableWrap = styled.div`
    box-shadow: 0px 1px 4px 0px rgba(1, 1, 1, 0.14);
    flex: 9.5;
    width: 650px;
`;
const DomainColWrap = styled.div`
    flex: 0.5;
    display: flex;
    align-items: center;
`;

function DomainTest() {
    return (
        <DomainWrap>
            <DomainContentWrap>
                <DomainTableWrap>
                    <DomainHeader />
                    <DomainTableIndependentVar />
                    <DomainTableDependentVar />
                </DomainTableWrap>
                <DomainColWrap>
                    <DomainCols />
                </DomainColWrap>
            </DomainContentWrap>
            <DomainTrain />
        </DomainWrap>
    );
}

export default DomainTest;
