import Document, { Html, Main, Head, NextScript } from 'next/document'


export default class MyDocument extends Document {

    render() {
        return (
            <Html>
                <Head>
                    <meta name="theme-color" content="#000"/>
                    <meta name="keywords" content="Site com uma variedade de animes" />
                    <meta name="copyright" content="© 2021 ANIMx" />
                    <meta name="robots" content="index,follow" />

                    {/* Fonts */}
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='true' />
                    <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />


                    <link rel="shortcut icon" href="/icon.png" type="image/x-icon" />
                </Head>

                
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}