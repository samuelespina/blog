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
      nodes: {
        featuredImage: {
          node: {
            sourceUrl: string;
          };
        };
      }[];
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

export interface interfaceCategoryArticles {
  data: {
    posts: {
      nodes: {
        featuredImage: {
          node: {
            sourceUrl: string;
          };
        };
      }[];
      edges: {
        node: {
          title: string;
          content: string;
        };
      }[];
    };
    extensions: {
      debug: {
        type: string;
        message: string;
      }[];
    };
  };
}

export interface interfaceQueryImg {
  data: {
    posts: {
      nodes: {
        featuredImage: {
          node: {
            sourceUrl: string;
          };
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
