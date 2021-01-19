import { Component, useRef, useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Webcam from 'react-webcam';
import { containerDel, imgs, imgsAdd, imgsDel, imgsLabelUpdate, imgsComUpdate, imgsState } from 'features/image/imageSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faUpload } from '@fortawesome/free-solid-svg-icons';

interface Props {
    id: number;
}

function ImgGenerate({ id }: Props) {
    const dispatch = useDispatch();

    let imgSrc; // 웹캠으로 찍히는 사진 변수
    const imgsList = useSelector(imgs);
    const imgState = imgsList.container[id - 1];
    const state = imgState.state;

    const chosenContainer = imgsList.container.filter((obj) => obj.id == id);
    const chosenImgSet = chosenContainer[0].img;

    const webcamRef = useRef<any>(null);
    const intervalRef = useRef<any>(null);
    const fileRef = useRef<any>();

    const [select, setSelect] = useState(false);
    const [imageState, setImageState] = useState(state);

    // image capture 진행
    const capture = useCallback(() => {
        console.log('ImgGenerate: img capture activated');
        imgSrc = webcamRef.current.getScreenshot();
        console.log(imgSrc);
        dispatch(imgsAdd({ id: id, src: imgSrc }));
    }, [imgSrc]);

    // capture를 여러번 동작시키기 위해 pressHold 만듬
    const pressHold = useCallback(() => {
        console.log('ImgGenerate: PressHold Activated');
        capture();
        intervalRef.current = setInterval(capture, 100);
    }, [imgSrc]);

    // 누르면 삭제
    const ContainerDel = (id: number) => () => {
        console.log('ImgGenerate: DeleteContainer');
        dispatch(containerDel({ id }));
    };
    // 라벨 업데이트
    function ImgLabelUpdate(e: React.FocusEvent<HTMLInputElement>) {
        console.log('ImgGenerate: Labels will be updated!!');
        const label = e.target.value;
        dispatch(imgsLabelUpdate({ id: id, label: label }));
    }
    // comment 업데이트
    function ImgComUpdate(e: React.FocusEvent<HTMLTextAreaElement>) {
        console.log('ImgGenerate: A Comment is updated!!');
        const comment = e.target.value;
        console.log(comment);
        dispatch(imgsComUpdate({ id: id, comment: comment }));
    }
    // 웹캠, 파일 선택
    function selectOnChange(e: any) {
        console.log(e.target.value);
        if (e.target.value === 'webcam') {
            setSelect(false);
        } else if (e.target.value === 'file') {
            setSelect(true);
        }
        dispatch(imgsState({ id: id }));
    }

    useEffect(() => {
        setImageState(state);
        console.log(imageState);
    }, [state]);

    function handleClick() {
        fileRef.current.click();
    }

    function fileUpload(e: any) {
        for (const file of e.target.files) {
            console.log(URL.createObjectURL(file));
            dispatch(imgsAdd({ id: id, src: URL.createObjectURL(file) }));
        }
    }

    return (
        <>
            <div className="imageContent">
                <div className="imageTitle">
                    <input type="text" placeholder="제목" onBlur={ImgLabelUpdate} />
                    <span onClick={ContainerDel(id)}>&times;</span>
                </div>
                <div className="imageDescription">
                    <textarea placeholder="내용" name="" id="" cols={20} rows={2} onBlur={ImgComUpdate}></textarea>
                </div>
                {imageState ? (
                    <>
                        <div className="imageBox">
                            <div className="selectDiv">
                                <button className="selectBtn" onClick={selectOnChange} value="webcam">
                                    <FontAwesomeIcon icon={faVideo} />
                                    <span>webcam</span>
                                </button>
                                <button className="selectBtn" onClick={selectOnChange} value="file">
                                    <FontAwesomeIcon icon={faUpload} />
                                    <span>upload</span>
                                </button>
                            </div>
                            {select ? (
                                <>
                                    <input type="file" name="file" multiple hidden ref={fileRef} onChange={fileUpload} accept="image/*" />
                                    <div className="fileDiv" onClick={handleClick}>
                                        IMAGE
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" height={250} width={300} />
                                    <div>
                                        <button
                                            onMouseDown={pressHold}
                                            onMouseUp={() => clearInterval(intervalRef.current)}
                                            onMouseLeave={() => clearInterval(intervalRef.current)}
                                            className="getDataBtn"
                                        >
                                            Get Data!
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                        <div className={`${imageState ? 'imageSampleBox' : 'imageSampleBox2'}`}>
                            <div>
                                {chosenImgSet.map((imgs: any) => (
                                    <img key={imgs.iid} id={imgs.iid} src={imgs.src} onClick={() => dispatch(imgsDel({ id: id, iid: imgs.iid }))} />
                                ))}
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="imageBox">
                            <div className="selectDiv">
                                <button className="selectBtn" onClick={selectOnChange} value="webcam">
                                    <FontAwesomeIcon icon={faVideo} />
                                    <span>webcam</span>
                                </button>
                                <button className="selectBtn" onClick={selectOnChange} value="file">
                                    <FontAwesomeIcon icon={faUpload} />
                                    <span>upload</span>
                                </button>
                            </div>
                        </div>
                        <div className={`${imageState ? 'imageSampleBox' : 'imageSampleBox2'}`}>
                            <div>
                                {chosenImgSet.map((imgs: any) => (
                                    <img key={imgs.iid} id={imgs.iid} src={imgs.src} onClick={() => dispatch(imgsDel({ id: id, iid: imgs.iid }))} />
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default ImgGenerate;
