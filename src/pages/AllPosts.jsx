import { Container, PostCard } from "../components";
import useFetch from "../hooks/useFetch";

function AllPosts() {
  const { posts, loading, error } = useFetch();
  error && console.log("error in all pages", error);
  return (
    <>
      {loading && (
        <div className="bg-green-300 text-3xl px-16 py-4">Loading...</div>
      )}
      {posts && (
        <div className="w-full py-8">
          <Container>
            <div className="flex flex-wrap">
              {posts.map((post) => (
                <div key={post.$id} className="p-2 w-1/4">
                  <PostCard {...post} />
                </div>
              ))}
            </div>
          </Container>
        </div>
      )}
    </>
  );
}

export default AllPosts;
