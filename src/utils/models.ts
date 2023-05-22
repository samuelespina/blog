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

export interface interfaceCategoriesNames {
  data: {
    categories: {
      nodes: {
        name: string;
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

export interface interfaceSearch {
  data: {
    posts: {
      edges: {
        node: {
          id: string;
          title: string;
          excerpt: string;
        };
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

export interface interfaceCategoryArticles {
  data: {
    posts: {
      edges: {
        node: {
          title: string;
          content: string;
        };
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
