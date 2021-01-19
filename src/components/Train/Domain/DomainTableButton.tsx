import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faMinusSquare } from '@fortawesome/free-solid-svg-icons';

const Button = styled.div`
    text-align: center;
`;

interface Props {
    add: any;
    remove: any;
}

function DomainTableButton({ add, remove }: Props) {
    return (
        <Button>
            <FontAwesomeIcon className="icon" icon={faPlusSquare} onClick={add} />
            <FontAwesomeIcon className="icon" icon={faMinusSquare} onClick={remove} />
        </Button>
    );
}

export default DomainTableButton;
