import { useEffect, useState } from "react"
import appwriteService from "../appwrite/db";



export default function useFetch() {

    const [posts, setPosts] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fn = async function () {
            setLoading(true)
            try {
                const { documents } = await appwriteService.getPosts()
                setPosts(documents)
                // setLoading(false)


            } catch (err) {
                setError(err)
            }
            finally {
                setLoading(false)

            }
        }

        fn()
    }, [])

    return { posts, error, loading }

}