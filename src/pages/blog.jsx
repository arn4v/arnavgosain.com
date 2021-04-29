const BlogPage = ({ posts }) => {
  return null;
};

const getStaticProps = async () => {
  return {
    props: {
      posts: [],
    },
    revalidate: 60,
  };
};

export default BlogPage;
