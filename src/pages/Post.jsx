import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/db";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import useFetch from "../hooks/useFetch";

export default function Post() {
  const { slug } = useParams();
  const { post, loading, error } = useFetch(slug);
  console.log("post is ", post);
  // const [post, setPost] = useState(null);
  const navigate = useNavigate();

  const { name, $id } = useSelector((state) => state.auth.userData);

  const isAuthor = post && $id ? post.userId === $id : false;
  console.log("author is ", isAuthor);
  console.log("user is ", name, $id);
  console.log("post id is ", post?.userId);

  // useEffect(() => {
  //   if (slug) {
  //     appwriteService.getPost(slug).then((post) => {
  //       if (post) setPost(post);
  //       else navigate("/");
  //     });
  //   } else navigate("/");
  // }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-8">
      <Container>
        <div className=" w-full flex justify-center mb-4 relative border rounded-md p-2">
          <img
            src={appwriteService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-md"
          />

          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        <div className="browser-css">{parse(post.content)}</div>
      </Container>
    </div>
  ) : loading && !error ? (
    <div className="bg-green-300 text-3xl px-16 py-4">Loading...</div>
  ) : (
    !loading && error && <div>error</div>
  );
}
