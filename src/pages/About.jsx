import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { useScrollToTop } from '../hooks/useScrollToTop';
import { StorySection } from '../components/about/StorySection';
import { PhotoGallery } from '../components/about/PhotoGallery';
import { CallToAction } from '../components/about/CallToAction';

function About() {
    useScrollToTop();

    return (
        <div className="min-h-screen bg-primary pt-20">
            <div className="container mx-auto px-6 py-16">
                {/* Header Section */}
                <PageHeader
                    title="O Strzykawie"
                    description="Nasza historia, pasja i filozofia. Poznaj ludzi i wartości, które stoją za każdą filiżanką kawy w Strzykawie."
                />

                <div className="max-w-6xl mx-auto">
                    <StorySection />
                    <PhotoGallery />
                    <CallToAction />
                </div>
            </div>
        </div>
    );
}

export default About;