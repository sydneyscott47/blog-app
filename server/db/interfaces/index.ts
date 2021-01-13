interface UserAttributes {
  id?: number;
  email: string;
  username: string;
  password: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

interface PostAttributes {
  id?: number;
  title: string;
  content?: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

interface FavoriteAttributes {
  userId: number;
  postId: number;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

export {
  UserAttributes,
  PostAttributes,
  FavoriteAttributes
}
