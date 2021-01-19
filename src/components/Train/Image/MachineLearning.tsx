import 'components/Train/Image/Image.css';
import { useRef, useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { imgsCollect, imgs } from 'features/image/imageSlice';
import Webcam from 'react-webcam';
import * as _ from 'lodash';
import { set } from 'lodash';
import ProgressBar_train from 'components/Train/Image/ProgressBar_train';

let featureExtractor;
let options;
let classifier: any;
let result = [{}];
let ml5;
// 이부분 추가해야함
const traingProgress = 0;

function MachineLearning() {
    const dispatch = useDispatch();
    const userData = useSelector(imgs);
    const Data = userData.data;
    const container = userData.container;
    console.log(Data);
    console.log(container);
    const [imgSrc, setImgSrc] = useState(''); // web cam image update
    const [best_label, setLabel] = useState(''); // web cam image update
    const [best_comment, setComment] = useState(''); // web cam image update
    const [previewState, setPreviewState] = useState(false); // web cam image update
    const classfyRef = useRef<any>(null); // classfy setInterval
    const webcamRef = useRef<any>(null); // web cam ref

    useEffect(() => {
        console.log('ML: useEffect1', container, container.length);
        clearInterval(classfyRef.current); // 현재 동작중인 classifier가 있으면 지워줘야함
        options = {
            topk: Math.min(5, container.length),
            numLabels: container.length,
        };
        ml5 = require('ml5');
        featureExtractor = ml5.featureExtractor('MobileNet', options, modelLoaded);
        classifier = featureExtractor.classification();
    }, [Data]);

    async function modelLoaded() {
        console.log('ML: Model Ready!!!!!');
        // Add images and train them
        console.log(Data);
        if (Data.length != 0) {
            console.log('1');
            await addImages();
            console.log('2');
            train();
        }
    }
    function addImages() {
        console.log('ML: addImages');
        Data.map((data: any) => {
            console.log(data);
            classifier.addImage(document.getElementById(data.iid), data.label);
        });
    }
    function train() {
        classifier.train(function (lossValue: any) {
            if (lossValue != null) {
                console.log('Loss is', lossValue);
            } else {
                console.log('Loss is', lossValue);
                console.log('training finished');
                setPreviewState(true);
                classfyRef.current = setInterval(() => classify(), 400);
                // classify();
            }
        });
    }
    function classify() {
        setImgSrc(webcamRef.current.getScreenshot());
        classifier.classify(document.getElementById('classyShot'), (err: any, res: any) => sorting(err, res));
    }
    function sorting(err: any, res: any) {
        result = res;

        // 작은값부터 큰값으로
        result.sort((a: any, b: any) => (a.label > b.label ? 1 : b.label > a.label ? -1 : 0));

        //큰값부터 작은값으로
        const result_: any = _.cloneDeep(result);
        result_.sort((a: any, b: any) => parseFloat(b.confidence) - parseFloat(a.confidence));

        // best label, best comment 선정
        console.log(result_);
        const label = result_[0].label;
        const Data_best: any = Data.filter((data: any) => (data.label === label ? true : false));
        const comment = Data_best[0].comment;
        setLabel(label);
        setComment(comment);
    }

    return (
        <>
            <div className="TrainWrap">
                <div>
                    <button onClick={() => dispatch(imgsCollect())}>Train Vision</button>
                </div>
                {previewState ? (
                    <div>
                        <div>
                            <span>Preview</span>
                        </div>
                        <div>
                            <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" width={200} />
                        </div>
                        <div>
                            <h2>{best_label}</h2>
                            <span>{best_comment}</span>
                            {result.map((item: any, idx: number) => (
                                <ProgressBar_train key={idx} id={idx} completed={Math.round(item.confidence * 100)} label={item.label} />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div>
                        <div>
                            <span>Preview</span>
                        </div>
                    </div>
                )}
            </div>
            <img src={imgSrc} id="classyShot" style={{ display: 'none' }} />
        </>
    );
}

export default MachineLearning;
