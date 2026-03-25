import React from 'react'
import { Helmet } from 'react-helmet-async'

interface Props {
    children?: React.ReactNode;
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string;
    type?: string;
}

const RootLayout: React.FC<Props> = (props) => {
    const {
        children,
        title = 'Free Poster Generator - શ્રીકર વિદ્યા સંકુલ (Shreekar Vidhya Sankul) | BIGELEMENT INFOTECH',
        description = 'Create custom posters for શ્રીકર વિદ્યા સંકુલ (Shreekar Vidhya Sankul). Upload your photo, add your details, and download your personalized poster instantly. Free poster generator tool for students and schools.',
        keywords = 'poster generator, custom poster, school poster, student poster, શ્રીકર વિદ્યા સંકુલ (Shreekar Vidhya Sankul), poster maker, free poster creator, download poster, personalized poster, BIGELEMENT INFOTECH',
        image: imageProp,
        url: urlProp,
        type = 'website'
    } = props

    // Safely get window location for defaults
    const getBaseUrl = () => {
        if (typeof window !== 'undefined') {
            return window.location.origin
        }
        return 'https://svs.bigelementinfotech.com'
    }

    const getCurrentUrl = () => {
        if (typeof window !== 'undefined') {
            return window.location.href
        }
        return 'https://svs.bigelementinfotech.com/'
    }

    const image = imageProp || `${getBaseUrl()}/images/poster.png`
    const url = urlProp || getCurrentUrl()

    // Structured Data (JSON-LD) for better SEO
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Shreekar Vidhya Sankul Poster Generator',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'Web Browser',
        offers: {
            '@type': 'Offer',
            price: '500.00',
            priceCurrency: 'INR'
        },
        description: description,
        url: url,
        image: image,
        provider: {
            '@type': 'Organization',
            name: 'BIGELEMENT INFOTECH',
            url: 'https://svs.bigelementinfotech.com',
            contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+91-9638523654',
                contactType: 'Customer Service',
                areaServed: 'IN',
                availableLanguage: ['en', 'gu']
            },
            sameAs: [
                'https://www.facebook.com/bigelementinfotech',
                'https://www.linkedin.com/company/bigelementinfotech',
                'https://twitter.com/bigelementinfotech'
            ]
        },
        featureList: [
            'Upload custom photos',
            'Add personal details',
            'Download high-quality posters',
            'Free to use',
            'No registration required'
        ],
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.8',
            ratingCount: '150'
        }
    }

    const organizationData = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'BIGELEMENT INFOTECH',
        url: 'https://svs.bigelementinfotech.com',
        logo: image,
        contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+91-9638523654',
            contactType: 'Customer Service',
            areaServed: 'IN',
            availableLanguage: ['en', 'gu']
        },
        sameAs: [
            'https://www.facebook.com/bigelementinfotech',
            'https://www.linkedin.com/company/bigelementinfotech',
            'https://twitter.com/bigelementinfotech'
        ]
    }

    return (
        <>
            <Helmet>
                <meta charSet='utf-8' />
                <title>{title}</title>
                <meta name='description' content={description} />
                <meta name='keywords' content={keywords} />
                
                {/* Open Graph Meta Tags */}
                <meta property='og:title' content={title} />
                <meta property='og:description' content={description} />
                <meta property='og:image' content={image} />
                <meta property='og:url' content={url} />
                <meta property='og:type' content={type} />
                <meta property='og:site_name' content='BIGELEMENT INFOTECH' />
                <meta property='og:locale' content='en_US' />
                <meta property='og:locale:alternate' content='gu_IN' />
                
                {/* Twitter Card Meta Tags */}
                <meta name='twitter:card' content='summary_large_image' />
                <meta name='twitter:title' content={title} />
                <meta name='twitter:description' content={description} />
                <meta name='twitter:image' content={image} />
                <meta name='twitter:url' content={url} />
                
                {/* Additional SEO Meta Tags */}
                <meta name='robots' content='index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' />
                <meta name='googlebot' content='index, follow' />
                <link rel='canonical' href={url} />
                
                {/* Structured Data - JSON-LD */}
                <script type='application/ld+json'>
                    {JSON.stringify(structuredData)}
                </script>
                <script type='application/ld+json'>
                    {JSON.stringify(organizationData)}
                </script>
            </Helmet>

            {children}
        </>
    )
}

export { RootLayout }
