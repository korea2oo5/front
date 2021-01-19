import 'components/Train/Train.css';
function Train() {
    const content = [
        {
            _id: 1,
            title: 'image',
            description: 'Teach based on images, from files or your webcam.',
            image: 'teach-images.png',
            alt: 'image',
            link: '/train/image',
        },
        {
            _id: 2,
            title: 'domain',
            description: 'Teach a model to classify body positions using files or striking poses in your webcam.',
            image: 'teach-poses.png',
            alt: 'pose',
            link: '/train/domain',
        },
        {
            _id: 3,
            title: 'domain2',
            description: 'Teach a model to classify audio by recording short sound samples. (WAV/MP3/etc file support coming soon.)',
            image: 'teach-sounds.png',
            alt: 'sound',
            link: '/train/domain2',
        },
        {
            _id: 4,
            title: 'domainRenewal',
            description: 'Teach a model to classify audio by recording short sound samples. (WAV/MP3/etc file support coming soon.)',
            image: 'teach-sounds.png',
            alt: 'sound',
            link: '/train/domainRenewal',
        },
    ];
    return (
        <div className="trainWrap">
            <div className="title">New Project</div>
            {content.map((content) => {
                return (
                    <div className="train" key={content._id}>
                        <a href={content.link} className="card">
                            <div className="article">
                                <img src={content.image} alt={content.alt} object-fit="cover" />
                                <h2>{content.title}</h2>
                                <span>{content.description}</span>
                            </div>
                        </a>
                    </div>
                );
            })}
        </div>
    );
}

export default Train;
