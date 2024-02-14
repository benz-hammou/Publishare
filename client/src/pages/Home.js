import Post from "../components/Post";

const Home = ({ posts, isLoading }) => {
  return (
    <>
      <Post posts={posts} isLoading={isLoading} />
    </>
  );
};

export default Home;
