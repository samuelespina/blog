export const queryArticles = `query{
  posts {
    nodes {
      content
      title
    }
  }
}`;
