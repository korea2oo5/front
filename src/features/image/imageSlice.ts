import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';

let lastiid = 5;
let lastid = 2;

interface Icontainer {
    id: number;
    label: number;
    comment?: string;
    img: any;
    state: boolean;
}

interface Image {
    container: Icontainer[];
    data: string[];
}

const initialState: Image = {
    // 처음에 데이터 모으는 곳, 추가, 삭제 가능
    container: [
        {
            id: 1,
            label: 1,
            comment: '',
            img: [],
            state: false,
        },
        {
            id: 2,
            label: 2,
            comment: '',
            img: [],
            state: false,
        },
    ],
    data: [],
};
// 트레이닝에 사용될 데이터 포멧에 맞게 다시 모으는 곳

const slice = createSlice({
    name: 'imgs',
    initialState: initialState,
    reducers: {
        //container add
        containerAdd: (state) => {
            lastid += 1;
            state.container.push({
                id: lastid,
                label: lastid,
                img: [],
                state: false,
            });
        },

        //container delete
        containerDel: (state, action) => {
            const remainContainer = state.container.filter((x) => x.id != action.payload.id);
            state.container = remainContainer;
        },

        // img add
        imgsAdd: (state, action) => {
            lastiid += 1;
            const chosenContainer = state.container.filter((x) => x.id == action.payload.id)[0];
            const imgsrc = action.payload.src;
            chosenContainer.img.push({ iid: lastiid, src: imgsrc });
        },

        // img delete
        imgsDel: (state, action) => {
            const chosenContainer = state.container.filter((x) => x.id == action.payload.id)[0];
            const modifImgList = chosenContainer.img.filter((x: any) => x.iid != action.payload.iid);

            chosenContainer.img = modifImgList;
        },

        // input 아웃포커스 되면 label update
        imgsLabelUpdate: (state, action) => {
            const chosenContainer = state.container.filter((x) => x.id == action.payload.id)[0];
            chosenContainer.label = action.payload.label;
            console.log(JSON.stringify(chosenContainer));
            console.log(action.payload.label);
        },

        imgsComUpdate: (state, action) => {
            const chosenContainer = state.container.filter((x) => x.id == action.payload.id)[0];
            chosenContainer.comment = action.payload.comment;
            console.log(JSON.stringify(chosenContainer));
            console.log(action.payload.coment);
        },

        // reformat data objects
        // is this really necessary? i don't know
        imgsCollect: (state) => {
            console.log('Reducer: imgCollect');
            const newObj = state.container.map((x) => reformat(x));
            state.data = newObj.flat();
            console.log(state.data);
            // Object.assign(state[1].data, newObj.flat());
            // console.log(JSON.stringify(state[1].data));
            // console.log("Reducer: imgCollect done");
            console.log(JSON.stringify(state.data));
        },
        imgsState: (state, action) => {
            console.log(state, action);
            state.container.map((item) => {
                if (action.payload.id === item.id) {
                    console.log(action.payload.id);
                    console.log(item.id);
                    item.state = true;
                } else {
                    item.state = false;
                }
            });
        },
    },
});

export const imgs = (state: RootState) => state.imgs;

// Actions
export const { containerAdd, containerDel, imgsAdd, imgsDel, imgsLabelUpdate, imgsComUpdate, imgsCollect, imgsState } = slice.actions;

function reformat(input: any) {
    const lab = input.label;
    const img = input.img;
    const com = input.comment;
    const newObj = img.map((x: any) => Object.assign({}, x, { label: lab, iid: x.iid, comment: com }));
    return newObj;
}

// Reducer
export default slice.reducer;
