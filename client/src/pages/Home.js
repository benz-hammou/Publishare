import Post from "../components/Post";

const Home = ({ posts }) => {
  return (
    <>
      <Post posts={posts} />
    </>
  );
};

export default Home;
