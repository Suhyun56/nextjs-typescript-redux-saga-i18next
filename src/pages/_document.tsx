import React from 'react';
import Document, { Html, Head, Main, NextScript, DocumentContext, DocumentInitialProps } from 'next/document';
import createEmotionServer from "@emotion/server/create-instance"; // 서버사이드 렌더링 시 캐칭된 css 옵션을 이용할 수 있게 해준다.
import createEmotionCache from '@/utils/styles/createEmotionCache';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const originalRenderPage = ctx.renderPage;
    const cache = createEmotionCache(); // 캐치된 객체를 정의해주고,
    const { extractCriticalToChunks } = createEmotionServer(cache); // 서버사이드 랜더링 시 할당된 스타일 객체를 스타일 오브젝트 객체에 입혀줄 것이다.

    // Run the React rendering logic synchronously
    ctx.renderPage = () =>
      originalRenderPage({
        // Useful for wrapping the whole react tree
        enhanceApp: (App) => App,
        // Useful for wrapping in a per-page basis
        enhanceComponent: (Component) => Component,
      })

    // Run the parent `getInitialProps`, it now includes the custom `renderPage`
    const initialProps = await Document.getInitialProps(ctx);
    const emotionStyles = extractCriticalToChunks(initialProps.html);
    const emotionStyleTags = emotionStyles.styles.map(
      (
        style // 스타일을 파싱해서 묶어주는 역할을 한다.
      ) => (
        <style
          data-emotion={`${style.key} ${style.ids.join(" ")}`}
          key={style.key}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: style.css }}
        />
      )
    );

    return {
      ...initialProps,
      styles: [...React.Children.toArray(initialProps.styles), ...emotionStyleTags],
    };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument