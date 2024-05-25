const GET_USER_ARTICLES = `query Publication(
  $id: ObjectId="631db6be3e8d6f3497ad5d20"
) {
  publication(
    id: $id
  ) {
    posts(first:5) {
      edges {
        node {
          title,
          brief,
          slug,
          url
        }
      }
      totalDocuments
    }
  } 
}`;
/*`
query Publication(
    $host: String="tanujabhatnagar.hashnode.dev"
  ) {
    publication(
      host: $host
    ) {
      id
      title
      displayTitle
      about {
        text
      }
      url
      author {
        id
        username
        name
      }
      posts(first: 3) {
        edges {
          node {
            title,
            brief,
            slug,
            publishedAt,
            url,
            coverImage{
              isPortrait,
              attribution
            }
          }
        }
        totalDocuments
      }
    } 
  }
`;*/

gql(GET_USER_ARTICLES, { page: 0 })
    .then(result => {
        const articles = result.data.publication.posts.edges;
        let container = document.createElement('div');
        container.setAttribute("id", "card");

        articles.forEach(article => {
            let title = document.createElement('h3');
            title.innerText = article.node.title;

            let brief = document.createElement('p');
            brief.innerText = article.node.brief;

            let link = document.createElement('a');
            link.innerText = 'Read more...';
            link.href = `https://tanujabhatnagar.hashnode.dev/${article.node.slug}`;
            container.appendChild(title);
            container.appendChild(brief);
            container.appendChild(link);
        })

        document.querySelector('.app').appendChild(container);
});
async function gql(query) {
    const data = await fetch('https://gql.hashnode.com/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query
        })
    });

    return data.json();
}