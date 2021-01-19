import React from 'react';
import styled from 'styled-components';

const TD = styled.td`
    min-width: 9vh;
    max-width: 10vh;
    border: 1px solid rgba(255, 255, 255, 1);
    padding: 5px;
    &:nth-child(1) {
    min-width: 19vh;
    max-width: 20vh;
`;
const TableInput = styled.input`
    box-sizing: border-box;
    border: none;
    border-radius: 3px;
    resize: none;
    line-height: 24px;
    padding: 8px;
    width: 100%;
    background: transparent;
    text-align: center;
    font-weight: bold;
`;

interface Props {
    row: any;
    index: any;
    rowOnChange: any;
    rowDoubleClick: any;
}

function DataRows({ row, index, rowOnChange, rowDoubleClick }: Props) {
    if (index !== 0 && row === 'O') {
        return (
            <TD>
                <TableInput type="checkbox" checked={true} value={''} onChange={rowOnChange} />
            </TD>
        );
    } else if (index !== 0 && row === 'X') {
        return (
            <TD>
                <TableInput type="checkbox" checked={false} value={''} onChange={rowOnChange} />
            </TD>
        );
    } else {
        if (index === 0) {
            return (
                <TD>
                    <TableInput type="text" name="subject" value={row || ''} onChange={rowOnChange} onDoubleClick={rowDoubleClick} />
                </TD>
            );
        } else {
            return (
                <TD>
                    <TableInput type="number" value={row || ''} onChange={rowOnChange} />
                </TD>
            );
        }
    }
}

export default DataRows;
