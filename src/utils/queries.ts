export const queryArticles = `query{
  posts {
    nodes {
      content
      title
    }
  }
}`;

export const queryCategories = `query{
  categories {
    nodes {
      name
    }
  }
}`;
