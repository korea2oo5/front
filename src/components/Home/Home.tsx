import { useState } from 'react';
import 'components/Home/Home.css';

function Home() {
    const guide = [
        {
            _id: 1,
            title: '수집',
            description: '모델을 수집하세요.',
            image: 'collect.png',
            alt: 'collect',
            link: '',
            color: '#BDEBE1',
            shadow: 'shadow.png',
        },
        {
            _id: 2,
            title: '학습',
            description: '모델을 학습하세요.',
            image: 'train.png',
            alt: 'train',
            link: '',
            color: '#FFC7C0',
            shadow: 'shadow.png',
        },
        {
            _id: 3,
            title: '결과',
            description: '학습된 모델을 확인하세요.',
            image: 'export.png',
            alt: 'export',
            link: '',
            color: '#CBE7FF',
            shadow: 'shadow.png',
        },
    ];
    const imageContent = [
        {
            title: '도메인',
            description: '입력한 데이터에 따라',
            description2: '머신러닝을 학습하도록 지시합니다',
        },
        {
            title: '개발중',
            description: '현재 개발중입니다.',
            description2: '불편을 드려 대단히 죄송합니다',
        },
        {
            title: '사운드',
            description: '입력한 데이터에 따라',
            description2: '머신러닝을 학습하도록 지시합니다',
        },
        {
            title: '이미지',
            description: '입력한 데이터에 따라',
            description2: '머신러닝을 학습하도록 지시합니다',
        },
    ];

    const images = [1, 22, 33, 44];
    const [image, setImage] = useState(images);
    const [imageNumber, setImageNumber] = useState(0);

    function onClickImage(value: number) {
        setImageNumber(value - 1);
        console.log(value - 1);
        const images2 = [11, 22, 33, 44];
        images2[value - 1] = value;
        setImage(images2);
    }
    return (
        <>
            <div className="container">
                <section
                    className="sectionBanner banner"
                    style={{
                        backgroundImage: `url(${process.env.PUBLIC_URL + 'banner.jpg'})`,
                    }}
                >
                    <div className="bannerWrap">
                        <div>
                            <h1>
                                클릭 한번으로
                                <br /> 사람을 연결하다
                            </h1>
                        </div>
                        <div>
                            <h2>
                                여러분의 상상력을 <br />
                                러닝머신을 이용하여 구현해보세요
                            </h2>
                        </div>
                        <div>
                            <a href="/train">
                                <button>시작하기</button>
                            </a>
                        </div>
                    </div>
                </section>
                <section className="section">
                    <div className="sectionWrap">
                        <div className="item1">
                            <h1>어떻게 사용하나요?</h1>
                        </div>
                        {guide.map((guide) => {
                            return (
                                <div className="item2" key={guide._id}>
                                    <div>
                                        <h1>{guide.title}</h1>
                                    </div>
                                    <a
                                        href="#"
                                        className="card"
                                        style={{
                                            background: `${guide.color}`,
                                        }}
                                    >
                                        <img src={guide.image} alt={guide.alt} />
                                        <div>
                                            <span>
                                                <h2>{guide.description}</h2>
                                            </span>
                                        </div>
                                    </a>
                                    <div
                                        style={{
                                            backgroundImage: `url(${process.env.PUBLIC_URL + 'shadow.png'})`,
                                        }}
                                    ></div>
                                </div>
                            );
                        })}
                    </div>
                </section>
                <section className="section">
                    <div className="sectionWrap2">
                        <div className="wrap1">
                            <div></div>
                            <div>
                                <img onClick={() => onClickImage(1)} className="wrapImage" src={`${image[0]}.png`} />
                            </div>
                            <div></div>
                            <div>
                                <img onClick={() => onClickImage(2)} className="wrapImage" src={`${image[1]}.png`} />
                            </div>
                            <div>
                                <img className="wrapImage" src="0.png" />
                            </div>
                            <div>
                                <img onClick={() => onClickImage(3)} className="wrapImage" src={`${image[2]}.png`} />
                            </div>
                            <div></div>
                            <div>
                                <img onClick={() => onClickImage(4)} className="wrapImage" src={`${image[3]}.png`} />
                            </div>
                            <div></div>
                        </div>
                        <div className="wrap2">
                            <h1>How?</h1>
                            <div>
                                <h2>{imageContent[imageNumber].title}</h2>
                                <span>
                                    {imageContent[imageNumber].description}
                                    <br />
                                    {imageContent[imageNumber].description2}
                                </span>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="section">
                    <div className="sectionWrap2">
                        <div className="container2">
                            {/* <div className={`container2 ${rotate}`}> */}
                            <div></div>
                            <div className="circle">
                                {/* <div className={`circle ${rotateImg}`}> */}
                                <img onClick={() => onClickImage(1)} className="wrapImage" src={`${image[0]}.png`} />
                            </div>
                            <div></div>
                            <div className="circle">
                                {/* <div className={`circle ${rotateImg}`}> */}
                                <img onClick={() => onClickImage(2)} className="wrapImage" src={`${image[1]}.png`} />
                            </div>
                            <div>
                                {/* <img
                                    className={`wrapImage ${rotateImg}`}
                                    src="0.png"
                                /> */}
                                <img className="wrapImage" src="0.png" />
                            </div>
                            {/* <div className={`circle ${rotateImg}`}> */}
                            <div className="circle">
                                <img onClick={() => onClickImage(3)} className="wrapImage" src={`${image[2]}.png`} />
                            </div>
                            <div></div>
                            <div className="circle">
                                {/* <div className={`circle ${rotateImg}`}> */}
                                <img onClick={() => onClickImage(4)} className="wrapImage" src={`${image[3]}.png`} />
                            </div>
                            <div></div>
                        </div>
                        <div className="wrap2">
                            <h1>How?</h1>
                            <div>
                                <h2>{imageContent[imageNumber].title}</h2>
                                <span>
                                    {imageContent[imageNumber].description}
                                    <br />
                                    {imageContent[imageNumber].description2}
                                </span>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <section className="section container2">
                    <div className="circle"></div>
                    <div className="circle"></div>
                </section> */}
            </div>
        </>
    );
}

export default Home;
