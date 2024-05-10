import axios from "axios";

export type PostType = {
	id: number;
	authorId: number;
	title: string;
	body: string;
};

export class PostNotFoundError extends Error {}

export const fetchPost = async (postId: string) => {
	console.log(`Fetching post with id ${postId}...`);
	await new Promise((r) => setTimeout(r, 500));
	const post = await axios
		.get<PostType>(`/api/${postId}`)
		.then((r) => r.data)
		.catch((err) => {
			if (err.response.status === 404) {
				throw new PostNotFoundError(`Post with id "${postId}" not found!`);
			}
			throw err;
		});

	return post;
};

export const fetchPosts = async () => {
	console.log("Fetching posts...");
	await new Promise((r) => setTimeout(r, 500));
	return axios
		.get<PostType[]>("/api")
		.then((r) => r.data)
		.catch((err) => {
			if (err.response.status === 404) {
				throw new PostNotFoundError("Posts not found!");
			}
			throw err;
		});
};
