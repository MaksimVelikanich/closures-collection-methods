const DB = {
  collections: {
    posts: {
      posts_1: {
        name: 'Post 1',
        text: 'Some text 1'
      },
      posts_2: {
        name: 'Post 2',
        text: 'Some text 2'
      }
    },
    comments: {
      comments_1: {
        postId: 'post_1',
        text: 'Comment 1'
      },
      comments_2: {
        postId: 'post_1',
        text: 'Comment 2'
      }
    }
  }
};

const useCollection = (coll) => {
  return (name) => {
    const collection = DB.collections[coll][name];
    return collection;
  }
}


const collection = (coll) => {
  return {
    get: id => {
      const item = DB.collections[coll][id];
      return item ? { id, ...item } : null;
    },
    create: (name, data) => {
      const id = createNew(coll);
      DB.collections[coll][id] = data;
      return id;
    },
    deleteOne: id => {
      if (DB.collections[coll][id]) {
        delete DB.collections[coll][id];
        return true;
      }
      return false;
    },
    edit: (id, dataToEdit) => {
      if (DB.collections[coll][id]) {
        const updatedItem = { ...DB.collections[coll][id], ...dataToEdit };
        DB.collections[coll][id] = updatedItem;
        return true;
      }
      return false;
    },
    
  };
};

const createNew = (coll) => {
  const newId = Object.keys(DB.collections[coll]).length + 1;
  return `${coll}_${newId}`;
};

/*
.get test

const Usecollection = collection('posts');

const item1 = Usecollection.get('posts_1');
console.log(item1);
*/

/*
.create test

const postsCollection = collection('posts');
const newPostId = postsCollection.create('New post', { name: 'New post', text: 'Some text' });

console.log(postsCollection.get(newPostId));
console.log(DB.collections);
*/

/*
.deleteOne test
const UseCollection = collection('posts');

UseCollection.deleteOne("posts_1");
UseCollection.deleteOne("posts_2");
console.log(DB.collections);
*/

/*
.edit test
const UseCollection = collection('posts');

UseCollection.edit("posts_1", {"edited": true});
console.log(DB.collections);
*/