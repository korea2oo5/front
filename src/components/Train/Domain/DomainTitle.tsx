import React from 'react';
import styled from 'styled-components';

const Title = styled.div`
    margin: 10px 0;
`;
const DomainTitleInput = styled.input`
    font-weight: bold;
    font-size: 1.3em;
`;

interface Props {
    title: any;
    titleOnChange: any;
}

function DomainTitle({ title, titleOnChange }: Props) {
    // TODO. title 값을 리덕스에 담아 추후에 트레이닝 작업 이후에 표시될 제목 항목에 대입해주는 과정이 필요
    console.log(title);
    return (
        <Title>
            <DomainTitleInput type="text" maxLength={30} placeholder="제목을 입력해주세요" autoFocus onChange={titleOnChange} />
        </Title>
    );
}

export default DomainTitle;
