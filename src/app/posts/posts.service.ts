import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';


@Injectable({providedIn: 'root'})
export class PostsService {
	private posts: Post[] = [];
	private postsUpdated = new Subject<Post[]>();

	constructor(private http: HttpClient){

	}
  
  getAdresse() {
    return "http://51.178.55.98:3000";
    //return "http://localhost:3000";
  }
  
	getPosts(){
		this.http
			.get<{message: string, posts: any}>(this.getAdresse() + '/api/posts/')
			.pipe(map((postData) => {
				return postData.posts.map(post => {
					return {
						title: post.title,
						content: post.content,
						id: post._id
					};
				});
			}))
			.subscribe((tempPosts) => {
				this.posts = tempPosts;
				this.postsUpdated.next([...this.posts]);
			});
	}

	getPostUpdateListener(){
		return this.postsUpdated.asObservable();
	}

	getPost(id: string){
		return this.http.get<{_id: string, title: string, content: string}>(this.getAdresse() + "/api/posts/" + id);
	}

	addPost(title: string, content: string){
		const post: Post = {id: null, title: title, content: content};
		this.http.post<{message: string, postId: string}>(this.getAdresse() + '/api/posts', post)
		.subscribe((responseData) => {
			const id = responseData.postId;
			post.id = id;
			this.posts.push(post);
			this.postsUpdated.next([...this.posts]);
		});
	}

	updatePost(id: string, title: string, content: string){
		const post: Post = { id: id, title: title, content: content };
		this.http
			.put(this.getAdresse() + "/api/posts/" + id, post)
			.subscribe(response => {
				const updatedPosts = [...this.posts];
				const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
				updatedPosts[oldPostIndex] = post;
				this.posts = updatedPosts;
				this.postsUpdated.next([...this.posts]);
			});
	}

	deletePost(postId: string){
		this.http.delete(this.getAdresse() + "/api/posts/" + postId)
			.subscribe(() => {
				const updatedPosts = this.posts.filter(post => post.id !== postId);
				this.posts = updatedPosts;
				this.postsUpdated.next([...this.posts]);
			});
	}
}