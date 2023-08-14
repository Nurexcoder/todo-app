import React from 'react';
import { Category, Place } from '@mui/icons-material';

const TryPremiumPage = () => {
    const features = [
        {
            title: 'Custom Category',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur efficitur ipsum vel maximus ultricies.',
        },
        {
            title: 'Location Todo',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur efficitur ipsum vel maximus ultricies.',
        },
    ];

    const [hoveredFeature, setHoveredFeature] = React.useState(null);

    const handleFeatureHover = (index) => {
        setHoveredFeature(index);
    };

    const handleFeatureLeave = () => {
        setHoveredFeature(null);
    };

    return (
        <div className="min-h-screen bg-main flex flex-col items-center justify-center">
            <h1 className="text-primary text-4xl font-bold mb-10">Try Premium</h1>

            <div className="bg-primary rounded-lg p-6 mb-10 shadow-xl w-96 min-w-[400px]">
                <h2 className="text-2xl font-bold mb-4">Features:</h2>

                {features.map((feature, index) => (
                    <div
                        key={index}
                        className={`flex items-center mb-4 ${hoveredFeature === index ? 'bg-secondary' : ''
                            }`}
                        onMouseEnter={() => handleFeatureHover(index)}
                        onMouseLeave={handleFeatureLeave}
                    >
                        <Category
                            className={`text-gen mr-2 ${hoveredFeature === index ? 'text-main' : 'text-secondary'
                                }`}
                        />
                        <span
                            className={`${hoveredFeature === index ? 'text-main' : 'text-secondary'
                                }`}
                        >
                            {feature.title}
                        </span>
                    </div>
                ))}

                <img
                    src="/images/todoGif.gif"
                    alt="Premium Image"
                    className="rounded-lg m-auto w-7/12"
                />
            </div>

            <div>
                <h2 className="text-2xl font-bold mb-4">Sign up/Sign in with Google:</h2>

                <button className="bg-medium hover:bg-high text-gen py-2 px-4 rounded flex items-center">
                    <span className="mr-2">Sign up/Sign in with Google</span>
                    <img
                        src="https://img.icons8.com/color/16/000000/google-logo.png"
                        alt="Google Logo"
                    />
                </button>
            </div>
        </div>
    );
};

export default TryPremiumPage;
