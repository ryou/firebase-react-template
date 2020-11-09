import firebase from 'firebase/app'
import { IPostRepository } from './IPostRepository'
import { Post } from '../../types'
import { USE_EMULATOR } from '../../config/env'
import { FIRESTORE_EMULATOR_PORT } from '../../config/firebase'
import { ValidationError } from '../../shared/errors/ValidationError'

export class FirebasePostRepositoryRepository implements IPostRepository {
  firestore: firebase.firestore.Firestore

  constructor() {
    this.firestore = firebase.firestore()
    if (USE_EMULATOR) {
      this.firestore.useEmulator('localhost', FIRESTORE_EMULATOR_PORT)
    }
  }

  async addPost(title: string, content: string): Promise<Post> {
    const docRef = await this.firestore
      .collection('posts')
      .add({
        title,
        content,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      // TODO: エラー判別の共通化
      .catch((error) => {
        if (error.code === 'permission-denied') {
          throw new ValidationError()
        } else {
          throw error
        }
      })

    const doc = await docRef.get()
    const data = doc.data()
    if (data === undefined) {
      throw new Error('data is undefined')
    }

    // TODO: serverTimestampの変換を共通化
    return {
      id: doc.id,
      title: data.title,
      content: data.content,
      createdAt: data.createdAt.toDate().toLocaleString(),
    }
  }

  async deletePost(id: string): Promise<void> {
    await this.firestore
      .collection('posts')
      .doc(id)
      .delete()
      // TODO: エラー判別の共通化
      .catch((error) => {
        if (error.code === 'permission-denied') {
          throw new ValidationError()
        } else {
          throw error
        }
      })
  }

  async listPosts() {
    const querySnapshot = await this.firestore
      .collection('posts')
      .get()
      // TODO: エラー判別の共通化
      .catch((error) => {
        if (error.code === 'permission-denied') {
          throw new ValidationError()
        } else {
          throw error
        }
      })

    const posts = querySnapshot.docs.map((doc) => {
      const data = doc.data()

      return {
        id: doc.id,
        title: data.title,
        content: data.content,
        createdAt: data.createdAt.toDate().toLocaleString(),
      }
    }) as Post[]
    console.log(posts)

    return posts
  }
}
