import React from 'react';
import styled from 'styled-components';
import DataRows from './DataRows';

const H2 = styled.h2`
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
    color: #7d67ff;
    margin-bottom: 10px;
`;
const DomainTableWrap = styled.table`
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
    color: #7d67ff;
    margin-bottom: 10px;
    display: block;
    overflow: auto;
    &::-webkit-scrollbar {
        width: 1px;
        background: none;
    }
    &::-webkit-scrollbar-thumb {
        background: #e8f0fe;
        opacity: 0.4;
    }
    &::-webkit-scrollbar-track {
        background: none;
    }
`;
const TH = styled.th`
    background-color: #e8f0fe;
    border: 1px solid rgba(255, 255, 255, 1);
    padding: 5px;
    &:nth-child(1) {
        min-width: 19vh;
        max-width: 20vh;
    }
`;
const TR = styled.tr`
    &:nth-child(even) {
        background-color: #e8e8e8e8;
    }
    &:nth-child(odd) {
        background-color: #f2f2f2;
    }
`;
interface Props {
    h2: string;
    cols: any;
    rows: any;
    colOnChange: any;
    rowOnChange: any;
    rowDoubleClick: any;
}

function DomainTable({ h2, cols, rows, colOnChange, rowOnChange, rowDoubleClick }: Props) {
    return (
        <div>
            <H2>{h2}</H2>
            <DomainTableWrap>
                <thead>
                    {
                        <tr>
                            {cols.map((col: any, index: any) => {
                                return (
                                    <TH key={index}>
                                        <input className="tableInput" type="text" defaultValue={col || ''} onChange={colOnChange(index)} />
                                    </TH>
                                );
                            })}
                        </tr>
                    }
                </thead>
                <tbody>
                    {
                        <>
                            {rows.map((row: any, rowIndex: any) => {
                                const tds = cols.map((col: any, colIndex: any) => (
                                    <DataRows
                                        key={colIndex}
                                        row={row[colIndex]}
                                        index={colIndex}
                                        rowOnChange={rowOnChange(rowIndex, colIndex)}
                                        rowDoubleClick={rowDoubleClick(rowIndex)}
                                    />
                                ));
                                return <TR key={rowIndex}>{tds}</TR>;
                            })}
                        </>
                    }
                </tbody>
            </DomainTableWrap>
        </div>
    );
}

export default DomainTable;
