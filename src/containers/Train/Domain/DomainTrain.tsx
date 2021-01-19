import { useState } from 'react';
import { useSelector } from 'react-redux';
import { createModel } from 'features/domain/domainSlice';
import { RootState, useAppDispatch } from 'store/index';

function DomainTrain() {
    const dispatch = useAppDispatch();
    const { cols, firstRows, secondRows } = useSelector((state: RootState) => state.domain);

    // 사용자 입력
    const [userInput, setUserInput] = useState([]);
    // 머신러닝 관련
    const [model, setModel] = useState();
    const [data_label, setLabelData] = useState();

    // train 버튼 클릭시
    async function train() {
        // const strSpace: any = /\s/;
        // if (subject === undefined || strSpace.exec(subject) || subject === '') {
        //     subject === 'untitled';
        //     // return;
        // }
        // 사용자 입력 틀 구성
        const newArr: any = [];
        firstRows.map((item: any, index: any) => {
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
        firstRows.map((row: any, idx1: any) => {
            newFirst[idx1] = Object.assign(
                {},
                ...cols.map((col: any, idx2: any) => ({
                    [col]: row[idx2],
                })),
            );
        });
        secondRows.map((row: any, idx1: any) => {
            newSecond[idx1] = Object.assign(
                {},
                ...cols.map((col: any, idx2: any) => ({
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
        cols.map((col: any, idx1: any) => {
            if (idx1 !== 0) {
                newFirst2[idx1 - 1] = Object.assign(
                    {},
                    ...firstRows.map((row: any, idx2: any) => {
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
        cols.map((col: any, idx1: any) => {
            if (idx1 !== 0 && idx1 < newSecond2_len + 1) {
                newSecond2[idx1 - 1] = Object.assign(
                    {},
                    ...secondRows.map((row: any, idx2: any) => {
                        return { [row[0]]: row[idx1] };
                    }),
                );
            }
        });

        let newArr2: any = [];
        secondRows.map((row: any, idx1: any) => {
            cols.map((col: any, idx2: any) => {
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
            console.log(response);
            console.log(JSON.parse(response.payload.model));
            model_ = response.payload.model;
            setModel(model_);
        });

        // const model_: any = await createModel(data_input, data_output);
        // setModel(model_);
        console.log('ML training Finish ');

        // setTrainState(true);
    }
    return (
        <div>
            <button onClick={train}>Train</button>
        </div>
    );
}

export default DomainTrain;
