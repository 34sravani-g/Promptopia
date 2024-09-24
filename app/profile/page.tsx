"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Profile from '@components/Profile';

const MyProfile: React.FC = () => {
    const { data: session } = useSession();
    const router = useRouter();

    const [posts, setPosts] = useState<any[]>([]);

    const fetchPosts = async () => {
        const response = await fetch(`/api/users/${session?.user.id}/posts`);
        const data = await response.json();
        setPosts(data);
    };

    useEffect(() => {
        if (session?.user.id) fetchPosts();
    }, [session]);

    const handleEdit = (post: { _id: string }) => {
        router.push(`/update-prompt?id=${post._id}`);
    };

    const handleDelete = async (post: { _id: string }) => {
        const hasConfirmed = confirm("Are you sure you want to delete this prompt?");
        if (hasConfirmed) {
            try {
                await fetch(`/api/prompt/${post._id.toString()}`, { method: 'DELETE' });
                const filteredPosts = posts.filter((item) => item._id !== post._id);
                setPosts(filteredPosts);
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <Profile
            name='My'
            desc="Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination."
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    );
};

export default MyProfile;
