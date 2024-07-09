import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { Blog } from "../hooks/index"
import { useBlogs } from "../hooks"
import { BlogSkeleton } from "../components/BlogSkeleton"

export const Blogs = () => {
    const {loading, blogs} = useBlogs();

    if(loading) {
        return <div>
            <Appbar/>
            <div className="flex justify-center">
                <div>
                    <BlogSkeleton/>
                    <BlogSkeleton/>
                    <BlogSkeleton/>
                    <BlogSkeleton/>
                    <BlogSkeleton/>
                </div>
            </div>
        </div>
    }
    return <div>
        <Appbar/>
        <div className="flex justify-center">
        <div>
            {blogs.map((blog: Blog) => <BlogCard 
            key={blog.id}
            id={blog.id}
            authorName={blog.author.name || "Anonymous"}
            title={blog.title}
            content={blog.content}
            publishedDate={"2024-07-09"}
            />)}
            
        </div>
        </div>
    </div>
}


