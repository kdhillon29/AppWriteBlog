import { useEffect, useState } from "react"
import appwriteService from "../appwrite/db";



export default function useFetch(slug = '') {

    const [posts, setPosts] = useState(null)
    const [post, setPost] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fn = async function () {
            setLoading(true)
            try {
                const { documents } = await appwriteService.getPosts()
                setPosts(documents)
                const document = slug ? await appwriteService.getPost(slug) : null
                setPost(document)
                // setLoading(false)


            } catch (err) {
                setError(err)
            }
            finally {
                setLoading(false)

            }
        }

        fn()
    }, [slug])

    return { posts, post, error, loading }

}