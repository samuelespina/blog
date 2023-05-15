export interface interfaceArticles {
  data: {
    posts: {
      nodes: {
        content: string;
        title: string;
      }[];
    };
  };
  extensions: {
    debug: {
      type: string;
      message: string;
    }[];
  };
}
