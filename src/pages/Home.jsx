import { useEffect, useState } from "react";
import authService from "../appwrite/auth"; // Ensure the path is correct
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";

function Home() {
    const [posts, setPosts] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = await authService.getCurrentUser();
                if (user) {
                    setIsLoggedIn(true);
                    const posts = await appwriteService.getPosts([]);
                    if (posts) {
                        setPosts(posts.documents);
                    }
                } else {
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.error("Error fetching data:", error.message);
                setIsLoggedIn(false);
            }
        };
        fetchData();
    }, []);

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                {isLoggedIn ? "Add your posts" : "Login to read posts"}
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {posts.map((post) => (
                        <div key={post.$id} className="p-2 w1/4">
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Home;
