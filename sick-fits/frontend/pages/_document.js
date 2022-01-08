// global default document template
import Document, { Html, Head, NextScript, Main} from 'next/document';

export default class MyDocument extends Document {
    // classes in react have a render method rather than a return
    render() {
        return (
        <Html lang="en-US">
            {/* <Head></Head> */}
            <body>
                <Main/>
                <NextScript />
            </body>
        </Html>
        );
    }
}