import 'components/Train/Image/Image.css';
import { useSelector, useDispatch } from 'react-redux';
import { imgs, containerAdd } from 'features/image/imageSlice';
import ImgGenerate from 'components/Train/Image/ImgGenerate';
import MachineLearning from 'components/Train/Image/MachineLearning';

function Image() {
    const Container = useSelector(imgs);
    const dispatch = useDispatch();
    console.log(Container.container);

    return (
        <div className="imageWrap">
            <div className="imageList">
                {Container.container.map((container) => (
                    <ImgGenerate key={container.id} id={container.id} />
                ))}
                <div className="add" onClick={() => dispatch(containerAdd())}>
                    ADD
                </div>
            </div>
            <div>
                <MachineLearning />
            </div>
        </div>
    );
}

export default Image;
