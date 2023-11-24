import { createContext, useContext, useMemo, useState } from "react";
import { useSearch } from "./SearchProvider";
import createRandomPost from "./createRandomPost";

const PostContext = createContext();

function PostsProvider({ children }) {
    const { searchQuery } = useSearch();
    const [posts, setPosts] = useState(() =>
        Array.from({ length: 30 }, () => createRandomPost())
    );
    // Derived state. These are the posts that will actually be displayed
    const searchedPosts =
        searchQuery.length > 0
            ? posts.filter((post) =>
                  `${post.title} ${post.body}`
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase())
              )
            : posts;

    function handleAddPost(post) {
        setPosts((posts) => [post, ...posts]);
    }

    function handleClearPosts() {
        setPosts([]);
    }
    const value = useMemo(
        function () {
            return {
                posts: searchedPosts,
                onAddPost: handleAddPost,
                onClearPosts: handleClearPosts,
            };
        },
        [searchedPosts]
    );
    return (
        <PostContext.Provider value={value}>{children}</PostContext.Provider>
    );
}

function usePosts() {
    return useContext(PostContext);
}
export { PostsProvider as default, usePosts };
