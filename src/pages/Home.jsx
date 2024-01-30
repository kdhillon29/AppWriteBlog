// import { useEffect, useState } from "react";
// import appwriteService from "../appwrite/db";
import { Container, PostCard } from "../components";
import useFetch from "../hooks/useFetch";

function Home() {
  const { posts, loading, error } = useFetch();
  console.log("loading stae is", loading);
  if (error) console.log("error in home page", error);

  if (posts && posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Login to read posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }
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

export default Home;
