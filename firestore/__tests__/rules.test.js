// TODO: beforeAllとかみたいなjestのglobalなやつで警告出ている件解決
const firebase = require('@firebase/rules-unit-testing')
const fs = require('fs')

/**
 * The emulator will accept any project ID for testing.
 */
const PROJECT_ID = 'firestore-emulator-example'

function getAuthedFirestore(auth) {
  return firebase.initializeTestApp({ projectId: PROJECT_ID, auth }).firestore()
}

function getAuthedDB() {
  return getAuthedFirestore({
    uid: 'alice',
    role: 'user',
  })
}

function getAnonymousDB() {
  return getAuthedFirestore(null)
}

beforeAll(async () => {
  await firebase.loadFirestoreRules({
    projectId: PROJECT_ID,
    rules: fs.readFileSync('firestore.rules', 'utf8'),
  })
})

afterAll(async () => {
  await Promise.all(firebase.apps().map((app) => app.delete()))
})

beforeEach(async () => {
  await firebase.clearFirestoreData({ projectId: PROJECT_ID })
})

describe('read posts', () => {
  it('未認証でも全件取得可能', async () => {
    await firebase.assertSucceeds(getAnonymousDB().collection('posts').get())
  })
})

describe('create posts', () => {
  it('未認証ユーザーは追加に失敗する', async () => {
    await firebase.assertFails(
      getAnonymousDB().collection('posts').doc('test-id').set({
        title: 'test',
        content: 'test',
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
    )
  })

  it('認証ユーザーは追加できる', async () => {
    await firebase.assertSucceeds(
      getAuthedDB().collection('posts').doc('test-id').set({
        title: 'test',
        content: 'test',
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
    )
  })

  it('titleが無いと失敗する', async () => {
    await firebase.assertFails(
      getAuthedDB().collection('posts').doc('test-id').set({
        content: 'test',
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
    )
  })

  it('contentが無いと失敗する', async () => {
    await firebase.assertFails(
      getAuthedDB().collection('posts').doc('test-id').set({
        title: 'test',
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
    )
  })

  it('titleが0文字だと失敗する', async () => {
    await firebase.assertFails(
      getAuthedDB().collection('posts').doc('test-id').set({
        title: '',
        content: 'test',
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
    )
  })

  it('titleが1文字だと成功する', async () => {
    await firebase.assertSucceeds(
      getAuthedDB().collection('posts').doc('test-id').set({
        title: '1',
        content: 'test',
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
    )
  })

  it('titleが10文字だと成功する', async () => {
    await firebase.assertSucceeds(
      getAuthedDB().collection('posts').doc('test-id').set({
        title: '1234567890',
        content: 'test',
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
    )
  })

  it('titleが11文字だと失敗する', async () => {
    await firebase.assertFails(
      getAuthedDB().collection('posts').doc('test-id').set({
        title: '12345678901',
        content: 'test',
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
    )
  })

  it('contentが0文字だと失敗する', async () => {
    await firebase.assertFails(
      getAuthedDB().collection('posts').doc('test-id').set({
        title: 'test',
        content: '',
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
    )
  })

  it('contentが1文字だと成功する', async () => {
    await firebase.assertSucceeds(
      getAuthedDB().collection('posts').doc('test-id').set({
        title: 'test',
        content: '1',
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
    )
  })

  it('contentが100文字だと成功する', async () => {
    await firebase.assertSucceeds(
      getAuthedDB().collection('posts').doc('test-id').set({
        title: 'test',
        content:
          '1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890',
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
    )
  })

  it('contentが101文字だと失敗する', async () => {
    await firebase.assertFails(
      getAuthedDB().collection('posts').doc('test-id').set({
        title: 'test',
        content:
          '12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901',
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
    )
  })

  it('createdAtが無いと失敗する', async () => {
    await firebase.assertFails(
      getAuthedDB().collection('posts').doc('test-id').set({
        title: 'test',
        content: 'test',
      })
    )
  })

  it('createdAtの値がserverTimestampで生成されていないと失敗する', async () => {
    await firebase.assertFails(
      getAuthedDB().collection('posts').doc('test-id').set({
        title: 'test',
        content: 'test',
        createdAt: '1504720470415',
      })
    )
  })
})

describe('update posts', () => {
  beforeEach(async () => {
    await getAuthedDB().collection('posts').doc('test-id').set({
      title: 'test',
      content: 'test',
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
  })

  it('未認証ユーザーは更新に失敗する', async () => {
    await firebase.assertFails(
      getAnonymousDB().collection('posts').doc('test-id').update({
        title: 'test',
        content: 'test',
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
    )
  })

  it('認証ユーザーは更新に失敗する', async () => {
    await firebase.assertFails(
      getAuthedDB().collection('posts').doc('test-id').update({
        title: 'test',
        content: 'test',
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
    )
  })
})

describe('delete posts', () => {
  it('未認証ユーザーは削除に失敗する', async () => {
    await firebase.assertFails(
      getAnonymousDB().collection('posts').doc('test-id').delete()
    )
  })

  it('認証ユーザーは削除できる', async () => {
    await firebase.assertSucceeds(
      getAuthedDB().collection('posts').doc('test-id').delete()
    )
  })
})
